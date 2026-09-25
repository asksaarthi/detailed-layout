# 11 — DeepSeek dev chat branch (this repo, unmerged)

**Status:** 7 commits on `claude/deepseek-harness-launch-vv0fw9`, **not merged to `main`**. The last session said it was tested and told you to `git pull` that branch and run `harness/deepseek/chat.sh`.
**Priority:** P3.
**Source:** `git log origin/main..origin/claude/deepseek-harness-launch-vv0fw9` and the "DeepSeek harness launch" session.

## What the branch adds
- `harness/deepseek/chat.html`: a plain dark chat page that talks straight to DeepSeek, with no booklet persona.
- `harness/deepseek/chat.sh`: asks for the key once and keeps it in the macOS Keychain (or `~/.config/deepseek-harness/key`, mode 600). It strips invisible paste characters, picks the first free port from 8080, starts the server and opens Chrome. `--reset-key` forgets the key.
- `server.mjs`: a `POST /devchat` endpoint (SSE) with a coding-assistant persona.
- `run.mjs`: waits for `#tabTeddy` to attach before clicking.

## Left
- [ ] Try it on the Mac: `git fetch origin && git checkout claude/deepseek-harness-launch-vv0fw9 && harness/deepseek/chat.sh`. Check you get a streamed reply, then try `MOCK=1`.
- [ ] **Fix before merging:** `server.mjs` calls `.listen(PORT)` with no host, so it binds every interface. Anyone on the same Wi-Fi could use `/devchat` and spend your DeepSeek key. Change it to `.listen(PORT, "127.0.0.1", …)`.
- [ ] In `chat.sh`, the `trap … EXIT` only echoes. Ctrl+C usually takes the server down with it, but an explicit `kill $SRV` would be safer, the way `run.sh` does it.
- [ ] Add `chat.sh` / `chat.html` to `harness/deepseek/README.md`.
- [ ] Open a PR to `main` and merge it, or drop the branch if you don't want the dev chat.

## Done when
The branch is merged (with the localhost bind) or deliberately closed.
