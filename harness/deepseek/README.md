# Teddy on DeepSeek, in Chrome

A local stand-in for Teddy's chat server that answers with DeepSeek, plus a headless Chrome run of the booklet against it.

```sh
DEEPSEEK_API_KEY=sk-… harness/deepseek/run.sh                     # the three default questions
DEEPSEEK_API_KEY=sk-… harness/deepseek/run.sh "Tell me about the moon thing 🌕" "What's Monday?"
MOCK=1 harness/deepseek/run.sh                                     # no DeepSeek: checks the plumbing
HEADED=1 DEEPSEEK_API_KEY=sk-… harness/deepseek/run.sh            # a visible Chrome window, to watch it
```

On your own computer (Node 18+): `git clone https://github.com/asksaarthi/detailed-layout && cd detailed-layout`,
then `npm i playwright && npx playwright install chromium` once, then any of the commands above.

Screenshots and `transcript.txt` land in `harness/deepseek/out/` (gitignored); the server's log in `server.log`.
Options: `DEEPSEEK_MODEL` (default `deepseek-chat`; `deepseek-reasoner` works too), `DEEPSEEK_BASE_URL`, `PORT`, `OUT`.

- **server.mjs** serves the repo and the endpoints `index.html` calls: `/chat` (SSE — free chat, the quiz closing, and the guide
  bubble's `{say, target, cta}`), `/genquiz` (seven fresh questions), and `/answer`, `/state`, `/subscribe` (accepted, never stored).
  Teddy's knowledge is the booklet's own visible text, so he only knows what the page says. This is not the Cloud Run server's prompt.
- **run.mjs** opens `/?chat=http://localhost:8080` at phone size, signs in as the shared `guest` login in test mode (sandbox),
  pauses the quiz, asks the questions, and saves a screenshot after each answer.

Safety: every request that isn't localhost or Google Fonts is aborted, and the page is in test mode, so nothing reaches her
log, her answers, the state mirror or the push server. The page treats `?chat=` as a local open (DEV) as well.
`navigator.webdriver` is reported `false` for this run only; with it `true`, the page answers from its canned local Teddy by design.

In the Claude Code cloud sandbox, `api.deepseek.com` has to be allowed in the environment's network settings first.
