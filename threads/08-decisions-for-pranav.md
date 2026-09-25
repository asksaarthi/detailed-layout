# 08 — Decisions for Pranav (the 30 questions in `HANDOVER-DEEPSEEK.md` §7)

Each answer changes a plan item. Answer inline: tick the box and write your answer after the arrow.
Items marked *(likely resolved)* have a later answer in the repo. Confirm them or cross them out.

## Her link and the move
- [ ] **Q1** Did you transfer `detailed-layout` to `asksaarthi` on purpose, or only `divya-ai`? Keep both copies, or delete the org copy? →
- [ ] **Q2** Which URL should she have for good: `pranavhere01.github.io/detailed-layout/` (the one on her phone now) or `asksaarthi.github.io/detailed-layout/`? →
- [ ] **Q3** Should the log viewer work on the org URL too? (Needs the Firebase domain click, thread 05.) →
- [ ] **Q4** Was moving `divya-ai` to the org meant to fix Actions billing? Does it work now? →

## Teddy, unlocked
- [ ] **Q5** Teddy has been open to her since `25c`/`25d` *(likely resolved: live since 04:59, now `25f`)*. Did you intend that before she flies? →
- [ ] **Q6** When Teddy must not answer (booking, address, what you wrote about her): keep "That one's Pranav's to tell you 🧸", or use a gentler line of your own? →
- [ ] **Q7** If she asks directly, should Teddy say it's an AI? (Persona says yes, honestly.) →
- [ ] **Q8** If DeepSeek is down mid-trip: offline quiz bank only (current), or a canned "I'm napping, ask him" line? →
- [ ] **Q9** DeepSeek balance was ~$13.56. At what threshold should the agent warn you to top up? →

## The sandbox ("🧪 Test as Divya")
- [ ] **Q10** Yellow bar + "Exit", or something subtler (a corner pill)? →
- [ ] **Q11** Reuse your dev login for the sandbox, or a separate login just for it? →
- [ ] **Q12** Every test starts as a brand-new phone (current), or it remembers state between tests? →
- [ ] **Q13** Also reachable by URL (`?sandbox=1` after a dev login)? →

## Her data and hygiene
- [ ] **Q14** Delete the 24 Sep 20:29–22:00 test sign-ins and the `probe-*` sids, after seeing the list? (Thread 03.) →
- [ ] **Q15** The unrecognised device that signed in as Divya at 00:52 IST (id in the private `NEXT-STEPS.md` §5): was that you? →
- [ ] **Q16** Which of your devices should be permanently owner-tagged (`?me=1`)? →
- [ ] **Q17** When `ingest_teddy.py` runs for real, record skipped answers at all? →
- [ ] **Q18** Mirror her quiz answers into the trip plan before she lands, or only after you've read them? →

## The weekend
- [ ] **Q19** Who watches the log Friday night: you, or an agent sending you summaries? Where should they go? (Thread 02.) →
- [ ] **Q20** How many knocks is too many? (Proposal: none automatic; you approve each one.) →
- [ ] **Q21** Is the 19:15 cab booked, so the letter's line is true? *(Likely resolved: an Uber one-tap link in `25g`.)* →
- [ ] **Q22** Has anything on the plan changed since `data/events.json` was last edited (the Sat/Sun lunch and evening venues)? →

## Content and voice
- [ ] **Q23** Any line in the seven letters to change before she reads them? *(Likely resolved: v2 approved, on `main` as `25h`, not yet live. See thread 01.)* →
- [ ] **Q24** ElevenLabs voice back this weekend (paid), or stay with sounds only (current)? →
- [ ] **Q25** Quiz Part 2 questions (recharge, space, care, low, reassure…): all nine OK to go to her, or hold any? →

## Process
- [ ] **Q26** DeepSeek harness permission mode for deploys: ask every time, or allow `deploy_pages.sh` and `gcloud run deploy` without prompts? →
- [ ] **Q27** May DeepSeek commit and push on its own, or only with your yes per commit? →
- [ ] **Q28** Keep changelog bullets this detailed (a paragraph each), or make them shorter? →
- [ ] **Q29** After the trip, what comes first: messenger Phase 2, the memory layer's write-back, or the `chaand.aur.chakor` roadmap? →
- [ ] **Q30** Did you tell another harness anything tonight that `HANDOVER-DEEPSEEK.md` contradicts? If so, which? →

## Also live on the board (`NEXT-STEPS.md` §5)
- [ ] Top-up warning threshold (same as Q9). →
- [ ] Cloud-session push access to `divya-ai` (D-57): install the Claude GitHub App on the repo, or keep cloud branches local-only? →
