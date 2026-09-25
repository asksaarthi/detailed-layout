# 00b — Plan: deployment, lowest-hanging fruit first, one step at a time

**Goal:** everything that's ready goes live for both of you. Divya gets every letter unlocked. You get the log viewer and the same page. Each step is built from a pushed commit, passes both gate editions, goes to the canary (`asksaarthi.github.io/detailed-layout/`) first, then gets promoted to her link (`pranavhere01.github.io/detailed-layout/`) and verified byte-for-byte before the next step starts.

**Freeze:** nothing ships after **Fri 17:00 IST** until she has landed.

| Step | What | Effort | Who | Status |
|---|---|---|---|---|
| 1 | **`main` → VER `2026-09-25h`** (✅ gated in the cloud: 144/144 both editions): Uber one-tap cab link (`25g`) + the seven v2 letters you approved (`25h`) + current `/log/` viewer | build + gates only | **you, on the Mac** | ⬜ |
| 2 | **Unlock every letter for Divya** (gate, takeoff, landing and flight-home letters open now) → VER `2026-09-25i` | 1 data change + gate update | **you, on the Mac** (✅ tested in the cloud: 144/144 both editions) | ⬜ |
| 3 | **Teddy server**: deploy the rebuilt knowledge pack (`63bc091`) so Teddy knows about the Uber link and the v2 letters | one `gcloud` command | **you, on the Mac** (no gcloud in the cloud) | ⬜ |
| 4 | **Bring `divya-ai` in line with what's live**: apply the unlock patch, commit `ops/deploys.jsonl`, push the `live/*` tags | copy-paste | **you, on the Mac** (cloud can't push to `divya-ai`) | ⬜ |

Not in this deploy: the messenger (not built into the page, and its ratchet has a known bug), voice, songs, keepsakes, the App Store wrapper. Those are the post-trip roadmap (thread 09).

## Step 3 (Mac)
```sh
cd ~/Projects/divya-ai && git pull
gcloud run services describe teddy --region asia-south1 --format='value(status.latestReadyRevisionName)'   # expect teddy-00023-p4v
(cd server && npm test) && gcloud run deploy teddy --source server --region asia-south1   # the exact command is in server/README.md
curl -s https://teddy-621180935719.asia-south1.run.app/health
```

## Step 2 — the exact change (tested in the cloud: **144/144 gates on both editions**)
In `divya-ai` on `main` (`af3b21d`):
1. `data/letters.json`: set `"unlock"` to `null` for `gate`, `takeoff`, `land` and `home` (the other three are already `null`).
2. `site/template.html` and `site/sw.js`: `VER = "2026-09-25h"` → `VER = "2026-09-25i"`.
3. `scripts/review_site.py`, three expectations that change on purpose:
   - `LOCKS` becomes `{"before": ("gate", False), "in-air": ("land", False), "monday": ("home", False)}`.
   - The "locked letter: Teddy guards it with a live countdown" check becomes "every letter is open": no `Opens in`, and `#letterModal` isn't `.locked`.
   - "coming back" expects `2 of 7 letters` (the gate letter now opens during that test).
4. `python3 scripts/build_pages.py`, both gate editions, commit, push, then deploy (below).

## Step 4 (Mac)
After step 2 is committed, `divya-ai` matches what's live. Also commit `ops/deploys.jsonl` and push the `live/*` tags.

## Rollback
Each public repo gets one commit per step. To undo a step: `git revert HEAD && git push` in that repo, but **bump VER** so service workers flip their cache. Or run `ROLLBACK_VER=… ./scripts/deploy_pages.sh --project detailed-layout --rollback` from the Mac.

## Deploying to her link only
The cloud session isn't allowed to push to the live site; its safety check blocks production deploys. On the Mac:
```sh
cd ~/Projects/divya-ai && git pull && ./scripts/deploy_pages.sh --project detailed-layout
```
That runs the gates, pushes to the canary (`asksaarthi`) and then to her link. **Known snag:** `asksaarthi/detailed-layout` `main` has three harness PRs that aren't in your deploy clone, so the canary push may be rejected as "diverged". The script never force-pushes. The fix is your call: merge that `main` into `deploy/detailed-layout`, or point `PAGES_MIRRORS` at another mirror you're happy to overwrite.
