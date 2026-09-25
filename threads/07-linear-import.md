# 07 — Linear import (B-03)

**Status:** BLOCKED on an **authenticated writer**: a Linear personal API key, or the Linear MCP connector. The dsh session had no Linear tools.
**Priority:** P3.
**Source:** `NEXT-STEPS.md` B-03 and §5, `docs/linear-deepseek-start-here.md`, `docs/linear-deepseek-handover.md` (main runbook), `ops/linear/seed-plan.json`, `ops/linear/import-map.json`.

## Done
- Destination decided at **06:35 IST, Path A**: a separate **Free** workspace `Divya AI` (slug `divya-ai`), solo. Business was declined on cost, and the startup offer doesn't apply.
- Workspace created and verified: Free plan, solo member, no approved email domains, invite links off. Team `DIV` exists.
- Seed inventory prepared: 4 objectives, 7 projects, 36 issue drafts with stable ids.

> The start-here doc still says **Path B** in places. That's stale: the board's 06:35 entry (Path A) wins.

## Left
- [ ] **Pranav:** give an authenticated writer. Either create a Linear personal API key for the `divya-ai` workspace and store it in the credential store (never paste it into a file), or connect the Linear MCP connector to that workspace.
- [ ] Verify identity, workspace and team with **read** calls before writing. Switching workspace in the browser doesn't switch MCP auth.
- [ ] Refresh the seed's statuses against the current repo (many items shipped since 04:00).
- [ ] Pilot: create or adopt `issue.delivery.001` with its project and initiative. Save the remote ids in `import-map.json`, read every field back, then re-run reconciliation to prove there are no duplicates.
- [ ] Import the rest one at a time. **Never blindly retry a create whose result was uncertain.**
- [ ] The reviewer automation is a **separate owned change**, not part of this import.

## Controls
No personal narratives, raw chats, letters, addresses, booking details, Firestore data or secrets in Linear. No invites, billing changes or deploys as a side effect.

## Done when
All intended issues are in `DIV`, with ids in `import-map.json`, relationships verified and no duplicates.

## Paste into DeepSeek
> Take over the Divya AI Linear import. Read `docs/linear-deepseek-start-here.md` and `docs/linear-deepseek-handover.md`; the board's B-03 (Path A, Free workspace `divya-ai`, team `DIV`) overrides any Path B text. Verify account/workspace/team with reads, refresh `seed-plan.json` statuses, pilot `issue.delivery.001` with read-back, then import the rest sequentially. Report completed actions, remote ids, blockers and next three steps.
