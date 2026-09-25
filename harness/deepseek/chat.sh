#!/usr/bin/env bash
# One command, fully automatic: get the key, find a free port, start the DeepSeek dev-chat server,
# open it in Chrome. Never touches ports/processes it doesn't own: if 8080 is taken by something
# else, it picks the next free port instead.
#   harness/deepseek/chat.sh               first run asks for the key (hidden) and saves it; later runs reuse it
#   harness/deepseek/chat.sh --reset-key   forget the saved key and ask again
#   MOCK=1 harness/deepseek/chat.sh        try the UI without a key
# The key is kept in the macOS Keychain (service "deepseek-api-key"), or in ~/.config/deepseek-harness/key
# (mode 600) where there is no Keychain. A DEEPSEEK_API_KEY already in the environment wins over both.
set -euo pipefail
cd "$(dirname "$0")/../.."
export NODE_USE_ENV_PROXY=1 NODE_NO_WARNINGS=1
[ -f /root/.ccr/ca-bundle.crt ] && export NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt

SVC=deepseek-api-key
KEYFILE="${XDG_CONFIG_HOME:-$HOME/.config}/deepseek-harness/key"
has_keychain() { command -v security >/dev/null 2>&1; }
load_key() {
  if has_keychain; then security find-generic-password -s "$SVC" -w 2>/dev/null && return; fi
  [ -f "$KEYFILE" ] && cat "$KEYFILE"
}
save_key() {
  if has_keychain; then security add-generic-password -U -a "$USER" -s "$SVC" -w "$1" && return; fi
  mkdir -p "$(dirname "$KEYFILE")"
  (umask 077; printf '%s' "$1" > "$KEYFILE")
}
forget_key() {
  if has_keychain; then security delete-generic-password -s "$SVC" >/dev/null 2>&1 || true; fi
  rm -f "$KEYFILE"
}

if [ "${1:-}" = "--reset-key" ]; then forget_key; echo "Saved DeepSeek key forgotten." >&2; fi

if [ "${MOCK:-}" != "1" ]; then
  from_prompt=""
  [ -n "${DEEPSEEK_API_KEY:-}" ] || DEEPSEEK_API_KEY="$(load_key || true)"
  if [ -z "${DEEPSEEK_API_KEY:-}" ]; then
    [ -t 0 ] || { echo "No DeepSeek key saved yet; run this in a terminal so it can ask for one." >&2; exit 1; }
    printf 'Paste your DeepSeek API key (it will not show), then press Enter: ' >&2
    IFS= read -rs DEEPSEEK_API_KEY; echo >&2
    from_prompt=1
  fi

  # strip invisible paste artifacts (line/paragraph separators, zero-width spaces, a BOM) and
  # surrounding whitespace a clipboard or password manager can silently tack onto a copied key
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
      echo "That doesn't look like a real DeepSeek key. Get one at platform.deepseek.com and run this again." >&2
      exit 1 ;;
  esac
  if [ -n "$from_prompt" ]; then
    save_key "$DEEPSEEK_API_KEY"
    echo "Key saved. Next time just run harness/deepseek/chat.sh (--reset-key to change it)." >&2
  fi
fi

# first free port from 8080 up: never kills anything, just steps around what's already listening
port=8080
while (exec 3<>"/dev/tcp/127.0.0.1/$port") 2>/dev/null; do port=$((port + 1)); done
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
  || echo "(couldn't auto-open a browser; open the URL above by hand)"
echo "If replies say the key is invalid: harness/deepseek/chat.sh --reset-key"
echo "Ctrl+C to stop."
wait $SRV
