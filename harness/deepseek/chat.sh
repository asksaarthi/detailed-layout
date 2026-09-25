#!/usr/bin/env bash
# One command: free the port, start the DeepSeek dev-chat server, open it in your browser.
#   DEEPSEEK_API_KEY=... harness/deepseek/chat.sh      (MOCK=1 to try it without a key)
set -euo pipefail
cd "$(dirname "$0")/../.."
export PORT="${PORT:-8080}" URL="http://localhost:${PORT:-8080}"
export NODE_USE_ENV_PROXY=1 NODE_NO_WARNINGS=1
[ -f /root/.ccr/ca-bundle.crt ] && export NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt

# whatever else was squatting on this port from an earlier run, gone
lsof -ti tcp:"$PORT" 2>/dev/null | xargs -r kill -9 2>/dev/null || true
sleep 0.3

node harness/deepseek/server.mjs > harness/deepseek/server.log 2>&1 &
SRV=$!
trap 'echo; echo "stopped (pid $SRV)"' EXIT
for _ in $(seq 50); do
  curl -fs "$URL/" -o /dev/null && break
  kill -0 $SRV 2>/dev/null || { cat harness/deepseek/server.log; exit 1; }
  sleep 0.2
done

echo "chat: $URL/harness/deepseek/chat.html  (pid $SRV, log: harness/deepseek/server.log)"
command -v open >/dev/null && open "$URL/harness/deepseek/chat.html" 2>/dev/null || true
echo "Ctrl+C to stop."
wait $SRV
