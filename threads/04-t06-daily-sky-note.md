# 04 — T-06 daily sky note (+ B-01 GitHub Actions billing)

**Status:** OPEN, recurring. The scheduled Action can't run because of **B-01**: Actions billing is blocked on the account.
**Priority:** P2.
**Source:** `NEXT-STEPS.md` T-06, B-01; `HANDOVER-DEEPSEEK.md` §4.7.

## Left
- [ ] Every morning, until billing is fixed: `python3 scripts/daily_update.py && git add context/today.md && git commit -m "context: today.md for <date> (local run)" && git push`.
- [ ] **B-01 (Pranav):** GitHub → Settings → Billing & plans. Fix Actions billing so the 06:00 IST job runs by itself. Then check one scheduled run succeeds, and retire the manual step.
- [ ] Don't hand-edit `context/today.md`.

## Done when
Done each day it runs. Done for good once the Action runs green on schedule.

## Open question
- Q4: Was moving `divya-ai` to the `asksaarthi` org meant to fix Actions billing? Does it work there now?
