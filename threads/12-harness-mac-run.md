# 12 — DeepSeek harness run on your Mac (no transcript yet)

**Status:** waiting on you. The "Deepseek in harness Chrome" session merged the key fix (PRs #1–#3 in this repo) and was waiting for you to run the harness on your Mac and paste `transcript.txt` back.
**Priority:** P3.
**Source:** `harness/deepseek/README.md` and that session's last state.

## Left
- [ ] Once: `npm i playwright && npx playwright install chromium` in this repo on your Mac.
- [ ] Plumbing check with no key: `MOCK=1 harness/deepseek/run.sh`.
- [ ] Real run: `DEEPSEEK_API_KEY=sk-… harness/deepseek/run.sh` (or `HEADED=1 …` to watch it). Paste the key by typing it or from the platform page. A masked copy with `•` characters is refused.
- [ ] Read `harness/deepseek/out/transcript.txt` and the screenshots. Check that Teddy only states facts from the booklet, stays 1–3 sentences, and uses at most one emoji.
- [ ] Paste the transcript into a session (or into the notes below) and note anything wrong.

## Notes / transcript
_(paste here — but only if it has nothing private; this repo is public)_
