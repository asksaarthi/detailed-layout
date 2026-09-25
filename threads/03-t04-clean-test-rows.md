# 03 — T-04 clean test rows out of her log

**Status:** OPEN. Blocked on **your confirmed list** of ids.
**Priority:** P1.
**Source:** `NEXT-STEPS.md` T-04, `HANDOVER-DEEPSEEK.md` §4.4 and §7 Q14–16.

## Done
- T-08: `ingest_teddy.py` already excludes test and owner rows, and it's dry by default. Cleaning the log itself is still open.

## Left
- [ ] Use `scripts/booklet_log.py` to list devices that are certainly tests: two-event "I'm Divya" sign-ins in bursts (the 24 Sep 20:29–22:00 wave), `probe-*` sids, and harness timestamps.
- [ ] Show Pranav the **exact Firestore document ids** in the private repo or chat, **not in this public file**.
- [ ] Delete **only the ids he confirms, one at a time**: `npx firebase-tools firestore:delete <path>` from `ops/firebase`.
- [ ] Re-run `booklet_log.py` and confirm only her real device(s) and guests remain.
- [ ] Owner-tag your own devices with `?me=1` so they never look like hers.

## Done when
`booklet_log.py` shows only her real device(s) and guests.

## Open questions
- Q14: May the 25 two-event sign-ins from 24 Sep 20:29–22:00 and the `probe-*` sids be deleted, once you've seen the list?
- Q15: The unrecognised device that signed in as Divya at 00:52 IST today (pages edition, sign-in only): was that you? (The id is in `NEXT-STEPS.md` §5.)
- Q16: Which of your devices should be permanently `?me=1`?

## Paste into DeepSeek
> Do T-04 in `divya-ai`. List the certain test rows in her log with their exact doc ids and your reason for each, then stop and wait. Delete only the ids I confirm, one at a time, and show `booklet_log.py` after.
