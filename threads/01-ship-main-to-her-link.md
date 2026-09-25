# 01 — Ship `main` to her link (cab link `25g` + letters v2 `25h`)

**Status:** ready on `main`, **not published**. Cloud sessions can't push to the public repos, so the deploy has to run on your Mac.
**Priority:** P0, before the **Fri 17:00 IST freeze** (proposed freeze runs Fri 17:00 → Sat 02:00 IST).
**Source:** `divya-ai` `docs/handover/00-START-HERE.md` (09:00 update), `docs/handover/02-ops-runbook.md` §11, and the "DeepSeek threads handover" session.

## Done
- Cab fix (Uber one-tap link) on `main` as VER `2026-09-25g` (`0d27dfb`).
- Letters v2 on `main` as VER `2026-09-25h` (`4e36426`), moved into `data/letters.json` so the next build doesn't overwrite them.
- Merged: docs reconcile, memory watermark fix, messenger hardening, incremental-deploy tooling (`scripts/deploy_pages.sh --ref/--canary/--promote/--rollback`), the handover set.
- Gates green in the cloud session: 144 browser, 38 server, 48 chat, 6 memory, 34 quiz.

## Left
- [ ] Mac: `git -C ~/Projects/divya-ai fetch origin && git checkout main && git pull`. Confirm `git status` is clean. Deploy only from a clean tree.
- [ ] Re-run both gate suites on the Mac (`/ceo-review`): **both editions green**.
- [ ] Say **"SHIP — publish?" → yes** for this exact commit.
- [ ] `scripts/deploy_pages.sh --ref <commit>` (canary → promote), per doc 02 §11.
- [ ] Server: if `latestReadyRevisionName` is still `teddy-00023-p4v`, decide whether to `gcloud run deploy teddy` so the generated quiz gets the v3 "keep the surprise alive" rule. Default: **leave it**, because the freeze wins and the static quiz is v3 anyway.
- [ ] Verify live bytes: `curl -s "https://pranavhere01.github.io/detailed-layout/?v=$RANDOM" | grep -o 'VER = "[^"]*"'` → `25h`. Check the mirror too.
- [ ] Run `verify_live.sh`, add a `CHANGELOG.md` bullet, and add a board §6 row.

## Done when
Both URLs serve `25h` byte-identical to `site/pages/` at the deployed commit, and the gates, CHANGELOG and board are updated **before 17:00 IST**.

## Open question
- If it can't ship before 17:00: hold until after she lands (Sat 02:00), or ship during the freeze? **Default: hold. v1 letters stay live and safe.**

## Paste into DeepSeek
> In `divya-ai`, read `NEXT-STEPS.md`, `docs/handover/00-START-HERE.md` and `docs/handover/02-ops-runbook.md` §11. On a clean `main`, run both gate suites, show me the results, and ask "SHIP — publish?" for the exact commit. Only after my yes, deploy with `scripts/deploy_pages.sh --ref` (canary, then promote), verify live VER on both URLs, and update CHANGELOG and the board. Stop if it's past 17:00 IST.
