# 05 — T-07 Firebase authorized domain for the mirror (B-02)

**Status:** OPEN, optional. Only you can do it, because Claude's classifier refused the API call.
**Priority:** P3.
**Source:** `NEXT-STEPS.md` T-07, B-02; `HANDOVER-DEEPSEEK.md` §4.8.

## Left
- [ ] Decide whether you need `/log/` to work on the mirror at all (Q3). Her link's `/log/` already works.
- [ ] If yes: Firebase console → Authentication → Settings → Authorized domains → add `asksaarthi.github.io`.
- [ ] Test the email-link sign-in on `https://asksaarthi.github.io/detailed-layout/log/`.
- [ ] Mark T-07 and B-02 done on the board.

## Done when
The mirror's `/log/` signs in, or you decide it isn't needed and close the row.

## Related
- Q1–Q2: which URL is canonical for good. Today it's `pranavhere01.github.io/detailed-layout/`, with the mirror on `asksaarthi`.
