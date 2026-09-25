#!/usr/bin/env bash
# One command, fully automatic: sanitize the key, find a free port, start the DeepSeek dev-chat
# server, open it in Chrome. Never touches ports/processes it doesn't own — if 8080 is taken by
# something else (an IDE, another dev server, whatever), it just picks the next free port instead.
#   DEEPSEEK_API_KEY=... harness/deepseek/chat.sh      (MOCK=1 to try it without a key)
set -euo pipefail
cd "$(dirname "$0")/../.."
export NODE_USE_ENV_PROXY=1 NODE_NO_WARNINGS=1
[ -f /root/.ccr/ca-bundle.crt ] && export NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt

# strip invisible paste artifacts (line/paragraph separators, zero-width spaces, a BOM) and
# surrounding whitespace a clipboard or password manager can silently tack onto a copied key
if [ -n "${DEEPSEEK_API_KEY:-}" ]; then
  DEEPSEEK_API_KEY="$(python3 -c '
import sys
s = sys.argv[1]
for cp in (0x2028, 0x2029, 0xfeff, 0x200b, 0x200c, 0x200d):  # line/paragraph sep., BOM, zero-width spaces
    s = s.replace(chr(cp), "")
sys.stdout.write(s.strip())
' "$DEEPSEEK_API_KEY")"
  export DEEPSEEK_API_KEY
  case "$DEEPSEEK_API_KEY" in
    *REPLACE*|*your-key*|*YOUR_KEY*|*'<'*|*'…'*|'')
      echo "DEEPSEEK_API_KEY looks like a placeholder, not a real key (\"$DEEPSEEK_API_KEY\")." >&2
      echo "Set it to the actual key from platform.deepseek.com, or use MOCK=1 to try the UI without one." >&2
      exit 1 ;;
  esac
fi

# first free port from 8080 up — never kills anything, just steps around what's already listening
port=8080
while (exec 3<>"/dev/tcp/127.0.0.1/$port") 2>/dev/null; do exec 3>&- 2>/dev/null; port=$((port + 1)); done
export PORT="$port" URL="http://localhost:$port"

node harness/deepseek/server.mjs > harness/deepseek/server.log 2>&1 &
SRV=$!
trap 'echo; echo "stopped (pid $SRV)"' EXIT
for _ in $(seq 50); do
  curl -fs "$URL/" -o /dev/null && break
  kill -0 $SRV 2>/dev/null || { cat harness/deepseek/server.log; exit 1; }
  sleep 0.2
done

echo "chat: $URL/harness/deepseek/chat.html  (pid $SRV, log: harness/deepseek/server.log)"
open -a "Google Chrome" "$URL/harness/deepseek/chat.html" 2>/dev/null \
  || open "$URL/harness/deepseek/chat.html" 2>/dev/null \
  || echo "(couldn't auto-open a browser — open the URL above by hand)"
echo "Ctrl+C to stop."
wait $SRV
