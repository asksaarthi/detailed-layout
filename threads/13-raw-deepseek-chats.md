# 13 — Raw DeepSeek chat threads

I couldn't find any exported DeepSeek conversations (chat.deepseek.com or `dsh` session logs) in either repo. `dsh` keeps its sessions on your Mac, and `ops/linear/session-register.json` only records metadata about them, never the conversation text.

If you have unfinished DeepSeek chats beyond threads 01–12, export or copy each one and ask for a file like this per chat:

```md
# NN — <thread title>
**Status:** <where it stopped>
**Source:** <dsh session id / chat link>

## Done
## Left
- [ ] …
## Done when
## Paste into DeepSeek
> …
```

Keep private details (bookings, addresses, doc ids, keys) in the private `divya-ai` repo, not here.
