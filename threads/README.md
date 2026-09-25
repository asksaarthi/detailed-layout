# Incomplete DeepSeek threads

One file per open thread from the DeepSeek (`dsh`) sessions and the Claude sessions that handed work to DeepSeek.
Each file has **what's done**, **what's left** (checkboxes), **done when**, the open questions, and a prompt you can paste into DeepSeek to continue it.

Gathered 25 Sep 2026 from `divya-ai` (`NEXT-STEPS.md` board, `HANDOVER-DEEPSEEK.md`, `docs/handover/`, `docs/linear-deepseek-start-here.md`, and `docs/deepseek-takeover.md` on branch `claude/love-divya-ai-actionables-titak5`) and from this repo's `claude/deepseek-harness-launch-vv0fw9` branch.

> **This repo is public.** These notes leave out booking references, addresses, passwords, Firestore doc ids, device ids and letter text on purpose. Look those up in the private `divya-ai` repo when you need them. Don't add them here.

| # | Thread | Priority | Waiting on | File |
|---|---|---|---|---|
| 00a | **Plan: exploring the context graph** | now | — | [00-context-graph-plan.md](00-context-graph-plan.md) |
| 00b | **Plan: deployment (to her link)** | now | You (Mac deploy) | [00-deployment-plan.md](00-deployment-plan.md) |
| 01 | Ship `main` (cab link `25g` + letters v2 `25h`) to her link | P0, before the 17:00 IST freeze | You (Mac deploy) | [01-ship-main-to-her-link.md](01-ship-main-to-her-link.md) |
| 02 | T-05 flight-night watch, Fri 19:00 → Sat 01:00 IST | P0 | A Mac-side owner | [02-t05-flight-night-watch.md](02-t05-flight-night-watch.md) |
| 03 | T-04 clean test rows out of her log | P1 | Your confirmed id list | [03-t04-clean-test-rows.md](03-t04-clean-test-rows.md) |
| 04 | T-06 daily sky note + B-01 Actions billing | P2 | Daily run / billing fix | [04-t06-daily-sky-note.md](04-t06-daily-sky-note.md) |
| 05 | T-07 Firebase authorized domain (B-02) | P3 | A console click | [05-t07-firebase-domain.md](05-t07-firebase-domain.md) |
| 06 | T-09 post-landing journal + context | P2 | She lands | [06-t09-post-landing-journal.md](06-t09-post-landing-journal.md) |
| 07 | Linear import (B-03) | P3 | API key or MCP connector | [07-linear-import.md](07-linear-import.md) |
| 08 | 30 decisions for Pranav (`HANDOVER-DEEPSEEK.md` §7) | P1: some are time-sensitive | You | [08-decisions-for-pranav.md](08-decisions-for-pranav.md) |
| 09 | Post-trip roadmap B2–B9 (T-10) | P4, after T-09 | Starts after the trip | [09-post-trip-roadmap.md](09-post-trip-roadmap.md) |
| 10 | 30 roadmap questions (C1–C30) | P4 | You, one block at a time | [10-roadmap-questions.md](10-roadmap-questions.md) |
| 11 | DeepSeek dev chat branch (unmerged, this repo) | P3 | Review + merge | [11-dev-chat-branch.md](11-dev-chat-branch.md) |
| 12 | DeepSeek harness run on your Mac (no transcript yet) | P3 | You run it and paste the output | [12-harness-mac-run.md](12-harness-mac-run.md) |
| 13 | Raw DeepSeek chat threads (none found) | — | You paste them in | [13-raw-deepseek-chats.md](13-raw-deepseek-chats.md) |

**Already done (not included):** T-00 reconcile, T-01 sandbox commit, T-02 server sandbox, T-03 hygiene sweep + `25f` ship, T-08 ingest filter, B-04 sky-card gate, roadmap B0 (unlock) and B1 (love philosophy).

## Standing rules for every thread
- Read `NEXT-STEPS.md` first and claim the row (`owner=<you> · since=<ISO>`) before you start.
- Anything Divya sees needs `/ceo-review` → "SHIP — publish?" → Pranav's yes → `/ship`. Page source is `site/template.html` + `data/*.json`; `site/index.html` is generated.
- Deploy only from a clean tree at a pushed commit. Never `git add -A` over another session's files.
- Journal each session in `journal/YYYY-MM-DD.md`, add one `CHANGELOG.md` bullet per ship, and write a signed §8 handoff line on the board.
