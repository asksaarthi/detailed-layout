# 02 — T-05 flight-night watch (Fri 19:00 → Sat 01:00 IST)

**Status:** OPEN and **unclaimed** on the board. It needs a Mac-side session with `gcloud` and Firestore access.
**Priority:** P0.
**Source:** `NEXT-STEPS.md` T-05, `HANDOVER-DEEPSEEK.md` §4.5, `docs/handover/03-trip-runbook.md`.

## Left
- [ ] Claim T-05 on the board (`owner=… · since=…`) and update your §1 heartbeat.
- [ ] Every ~30 min: `python3 scripts/booklet_log.py | head -20`.
- [ ] If she opens Teddy: check `python3 scripts/booklet_log.py --chats` for anything filtered or replaced ("That one's Pranav's to tell you"), and note it in the journal.
- [ ] Watch `gcloud run services logs read teddy --region asia-south1 --limit 50` for `napping` / `upstream` errors. If DeepSeek fails, follow the incident playbook in doc 03.
- [ ] Knocks (push notifications): **only on your word, one at a time**. Pass `--url` with her link, because `notify.py` defaults to the mirror.
- [ ] **No deploys during the freeze.**
- [ ] After she lands (~00:40 Sat), write the night's entry in `journal/2026-09-25.md`, then mark T-05 DONE with evidence.

## Done when
She has landed and the journal has the night's entry.

## Open questions (from doc 08 §2 / §7)
- Who watches: you, or an agent that sends you summaries? If an agent, where do the summaries go (WhatsApp, email, Linear)?
- How many knocks is too many? (Proposal: none automatic; you approve each one.)

## Paste into DeepSeek
> Claim T-05 in `divya-ai/NEXT-STEPS.md`. From 19:00 to 01:00 IST, every 30 minutes, run `booklet_log.py | head -20`, check `--chats` when she's using Teddy, and read the Cloud Run logs for `napping`/`upstream`. Report to me only what changed. Don't send any knock or deploy anything. After she lands, write the journal entry and close T-05.
