#!/usr/bin/env bash
# One command: start the DeepSeek Teddy, drive the booklet in headless Chrome, stop the server.
#   DEEPSEEK_API_KEY=… harness/deepseek/run.sh ["question" …]     (MOCK=1 to test without DeepSeek)
set -euo pipefail
cd "$(dirname "$0")/../.."
export PORT="${PORT:-8080}" URL="http://localhost:${PORT:-8080}"
# Node's fetch honours HTTPS_PROXY only when asked; the CA bundle is the cloud sandbox's proxy, if there is one.
export NODE_USE_ENV_PROXY=1 NODE_NO_WARNINGS=1
[ -f /root/.ccr/ca-bundle.crt ] && export NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt
[ -d /opt/pw-browsers ] && export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
node harness/deepseek/server.mjs > harness/deepseek/server.log 2>&1 &
SRV=$!; trap 'kill $SRV 2>/dev/null' EXIT
for _ in $(seq 50); do curl -fs "$URL/" -o /dev/null && break; kill -0 $SRV 2>/dev/null || { cat harness/deepseek/server.log; exit 1; }; sleep 0.2; done
node harness/deepseek/run.mjs "$@"
echo; echo "--- server log"; cat harness/deepseek/server.log
