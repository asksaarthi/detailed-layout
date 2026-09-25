# 09 — Post-trip roadmap B2–B9 (board T-10)

**Status:** not started. **It begins only after T-09** (thread 06). B0 (unlock) and B1 (love philosophy) are done.
**Priority:** P4.
**Source:** `docs/deepseek-takeover.md` §B on branch `claude/love-divya-ai-actionables-titak5`. That file isn't on `main` yet; merge or cherry-pick it first. Master spec: `docs/chaand-aur-chakor.md`.

When an item starts, add it to the board as `T-10.<n>` with an owner and done-when. Anything she sees goes through `/ceo-review` → "SHIP — publish?" → your yes → `/ship`. Ask the matching block of questions from thread 10 when an item comes up. Don't ask all thirty at once.

## B2 — Voice to Teddy (questions C11–C15)
- [ ] B2.1 Recorder in the page: hold to record, slide to cancel or lock, waveform, review player, `MediaRecorder` webm/opus with an mp4 fallback, an IndexedDB queue, and nothing recorded under automation.
- [ ] B2.2 "For me, or for him?" chips after Send, with no default.
- [ ] B2.3 `POST /voice` in `server/app.js`: 5 MB cap, `to ∈ {teddy, pranav}`, Storage `teddy-only/` or `for-pranav/`, and rules with no client reads.
- [ ] B2.4 `scripts/transcribe.py` runs nightly with faster-whisper and deletes local audio after each run.
- [ ] B2.5 `server/persona.md`: the six honesty sentences and Teddy's reaction line to a voice note.
- [ ] B2.6 DeepSeek as primary provider in `server/lib/openrouter.js`, with the key from Secret Manager.
- [ ] B2.7 Gates: recorder UX at 390 px; no upload under automation; Teddy-only notes never in `--chats`; `npm test` green.
- **Accept:** a guest records, reviews and sends "for Teddy". The note lands in Storage with `to: teddy`, `transcribe.py --dry` lists it, and nothing in Divya AI shows it.

## B3 — Letters and Days (C16–C20)
- [ ] B3.1 Letter schema `unlock.kind ∈ {time, days, story, moon, manual, trip}`; migrate the seven letters under `trip: "blr-2026-09"`.
- [ ] B3.2 `booklet-days`: a day counts on one Teddy message, quiz answer or letter opened. It never resets. Add it to `SYNC_KEYS`, a moons row, a consent line and an off switch.
- [ ] B3.3 Day letters 3/7/14/30 in `data/letters.json`, **typed by you** (`author: "pranav"`; the build refuses any other author).
- [ ] B3.4 Moon kinds: full moon, Sharad Purnima, her birthday, chakor night (as poetry only).
- [ ] B3.5 Gates: nothing is ever lost; the count is visible and switchable; letters are typed by you.
- **Accept:** 3 days opens the day-3 letter, a 10-day gap changes nothing, and the off switch hides the moons and stops counting.

## B4 — Songs (C21–C22)
- [ ] B4.1 A Spotify developer app (you) and `scripts/spotify_pull.py` for a nightly pull of the three playlists, with playlist diffs recorded as events.
- [ ] B4.2 `data/songs.json` merged from the pull and the chat export, with "why I sent it" prompts in Divya AI.
- [ ] B4.3 Her side: a Songs card and an optional "Link your Spotify" card with one-tap unlink.
- [ ] B4.4 Milestones at 10/50/100 songs as gift lines.
- **Accept:** `songs.json` has 48+ songs with positions, and the invite card folds away on "Later" with no counter.

## B5 — Keepsakes (C23–C25)
- [ ] B5.1 Upload on the Divya AI Me tab → `POST /upload` → `keepsakes-private/`.
- [ ] B5.2 `scripts/ingest_keepsakes.py`: EXIF, offline reverse geocode, faces, duplicates, OCR, flags to `flagged.md`. The public copy is ≤ 1600 px and ≤ 300 KB with EXIF/GPS stripped, made only after caption and approval.
- [ ] B5.3 A shelf card in the booklet, her photo button, and `keepsake` graph nodes.
- **Accept:** a GPS-tagged test image gives a private record with a place and a public copy with no EXIF, and a flagged image never reaches `site/pages/`.

## B6 — Milestones, notifications, recaps (C26–C27)
- [ ] B6.1 `data/milestones.json` + nightly `scripts/milestones.py`.
- [ ] B6.2 `data/notify_rules.json`, with drafts going to your inbox. `/knock` is quiet 22:00–07:00 IST with a cap of 2/day, and anything else queues to 07:00.
- [ ] B6.3 `scripts/recap.py` on the 10th builds the cards for the 11th, plus a yearly recap in October.
- **Accept:** a knock at 23:00 is queued to 07:00; a third knock in a day is refused; recaps have no counts beyond days and letters.

## B7 — Her data rights (C28)
- [ ] B7.1 `/me/export` (zip) and `/me/delete` (everything, with a report shown to her), as two menu rows.
- **Accept:** after delete, Storage, Firestore, memory nodes, graph facts, the push subscription and the mirror profile are all empty for her login.

## B8 — His heavy app + the in-between mode
- [ ] B8.1 Today: ritual line, next up, inbox, self-checks.
- [ ] B8.2 Us: timeline, private map (Leaflet + OSM), share with her, write a letter.
- [ ] B8.3 Me: uploads, diet line, gratitude.
- [ ] B8.4 The booklet's between-trips hero, with rituals from `data/events.json`.
- **Accept:** `build_app.py` output renders the six tabs at 390 px with no console errors, and the map shows only in his app.

## B9 — Messenger Phase 2 (`chat/PLAN.md`), last

## Order (C29) and money (C30)
Default order: voice → letters & days → songs → keepsakes → milestones → messenger. Money: DeepSeek API + Firebase Storage only.
