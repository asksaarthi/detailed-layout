# 00a — Plan: exploring the context graph

**Where it lives:** `divya-ai/context/graph/graph.json` (built 25 Sep 06:52 IST from 1,573 chat messages), plus `memory.json` (Teddy's memory) and the curated story in `context/00–10*.md`.
**Size:** 1,342 nodes and 3,090 edges. 16 nodes are marked high sensitivity: they're hidden from tools unless you ask for them, and never raised unprompted.

> This file is public. It says *how* to explore the graph, never *what* is in it. Every query below runs on your Mac in the private repo.

## Tools
```sh
python3 scripts/graph_mcp.py navigate          # the map: node types, edge types, cheat sheet
python3 scripts/graph_mcp.py stats
python3 scripts/graph_mcp.py search '<words>'
python3 scripts/graph_mcp.py node person:divya # start here and follow the edges
python3 scripts/graph_mcp.py timeline 2026-09-25 2026-09-29
python3 scripts/graph_mcp.py quotes --topic food --speaker Divya
claude mcp add divya-graph -- python3 scripts/graph_mcp.py   # the same tools as an MCP server
```
Full traversal guide: `docs/context-graph-navigation.md`.

## What's in it (by type)
856 quotes (the evidence layer) · 86 facts · 74 artifacts · 46 songs · 42 days · 29 chart · 25 places · 24 sky · **20 tasks** · 19 preferences · 18 events · 16 calls · **15 plans** · 14 topics · 12 people · 9 feelings · 8 things · 7 motifs · 6 jokes · **6 promises** · 4 values · 4 patterns.

## Exploration plan, in order of usefulness for this weekend

| # | Pass | Query | Why | Status |
|---|---|---|---|---|
| G1 | **Orientation** | `navigate`, `stats` | Learn the shape before reading anything | ✅ done 25 Sep 11:45 |
| G2 | **Plans vs page** | every `plan:*` node against `data/events.json` and the page's Fri–Tue | What she sees must match the truth | ✅ done: all 15 plans match `events.json` (same ids and statuses; the cab is `gap`, and the page now handles that with the Uber link) |
| G3 | **Open loose ends** | every `task:*` node (20) | Things only you can close: bookings, cash, confirmations, questions to ask her | ⬜ you: read on the Mac, tick off what's done. At least two are stale: the ingest filter was fixed in T-08, and the link-change note was reversed |
| G4 | **Promises** | `node promise:*` (6) | Make sure the weekend keeps them (pickup, on call from takeoff to touchdown, updates…) | ⬜ you, tonight |
| G5 | **Her words for the weekend** | `timeline 2026-09-20 2026-09-25`, `quotes --topic flight/food/sleep` | What she's anxious about or looking forward to, in her own words | ⬜ before pickup |
| G6 | **Teddy's knowledge** | `build_teddy_pack.py` reads the graph (1,341 nodes) | The rebuilt pack (`63bc091`: Uber cab + v2 letters) isn't on the server yet, so Teddy may describe the old cab plan | ⬜ Mac: `gcloud run deploy teddy` (deploy plan step 3) |
| G7 | **Privacy fence** | high-sensitivity nodes + the gate's FORBIDDEN list | Nothing from the graph may reach the public page; the gates grep for the literals | ✅ enforced by the gates on every deploy |
| G8 | **After the trip** | re-run `build_graph.py` with the new chat export, then `timeline 2026-09-25 2026-09-29` | Feeds T-09 (journal) and the roadmap | ⬜ after landing |
