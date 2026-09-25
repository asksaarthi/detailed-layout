// A local stand-in for Teddy's chat server, answering with DeepSeek.
// Serves the booklet itself plus the endpoints index.html calls: /chat (SSE), /genquiz, /answer, /state, /subscribe.
//   DEEPSEEK_API_KEY=… node harness/deepseek/server.mjs          (then open http://localhost:8080/?chat=http://localhost:8080)
//   MOCK=1 node harness/deepseek/server.mjs                        (no network: canned words, to test the plumbing)
// Nothing is stored: /answer, /state and /subscribe are accepted and dropped.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const PORT = Number(process.env.PORT || 8080);
const MOCK = process.env.MOCK === "1";
// trim + drop invisible separators a clipboard/password manager can silently tack on (U+2028/2029 line/paragraph
// separators, zero-width spaces, a BOM) — these are invisible until they hit the strict check below
const KEY = (process.env.DEEPSEEK_API_KEY || "").trim().replace(/[\u2028\u2029\u200b-\u200d\ufeff]/g, "");
const BASE = (process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com").replace(/\/$/, "");
const MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat";
if (!MOCK && !KEY) { console.error("Set DEEPSEEK_API_KEY (or MOCK=1 to run without DeepSeek)."); process.exit(1); }
if (!MOCK && !/^[\x21-\x7e]+$/.test(KEY)) {  // a key copied from a masked display carries "•" and can't go in a header
  console.error("DEEPSEEK_API_KEY has characters that can't be in a key (e.g. • from a masked copy). Paste the full key from platform.deepseek.com.");
  process.exit(1);
}

// What Teddy knows: the booklet's own visible text (scripts, styles and SVGs stripped).
const PAGE = fs.readFileSync(path.join(ROOT, "index.html"), "utf8")
  .replace(/<(script|style|svg)[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]+>/g, " ")
  .replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const PERSONA = `You are Teddy 🧸, a warm, playful teddy bear who lives inside "Bangalore, in detail", an answer booklet Pranav wrote for Divya about her trip to Bangalore. You are Pranav's wingman — on his side, and on hers. Keep replies short (1–3 sentences), kind, a little funny, at most one emoji. Only state trip facts that appear in the booklet below; if you don't know, say so gently.\n\nThe booklet:\n${PAGE}`;
const DEV_PERSONA = `You are a direct, capable coding assistant answering in a local dev chat page. Give concise, correct answers. Use fenced code blocks with a language tag for any code. Ask a clarifying question only when the request is genuinely ambiguous.`;

const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

async function deepseek(messages, { stream = false, json = false } = {}) {
  const r = await fetch(BASE + "/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + KEY },
    body: JSON.stringify({ model: MODEL, messages, stream, temperature: 0.9, ...(json ? { response_format: { type: "json_object" } } : {}) }),
  });
  if (!r.ok) throw new Error(`DeepSeek ${r.status}: ${(await r.text()).slice(0, 300)}`);
  return r;
}
async function* deltas(r) {  // OpenAI-style SSE → content tokens
  const dec = new TextDecoder(); let buf = "";
  for await (const chunk of r.body) {
    buf += dec.decode(chunk, { stream: true }); let i;
    while ((i = buf.indexOf("\n")) >= 0) {
      const l = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
      if (!l.startsWith("data:")) continue; const d = l.slice(5).trim(); if (d === "[DONE]") return;
      try { const t = JSON.parse(d).choices?.[0]?.delta?.content; if (t) yield t; } catch {}
    }
  }
}
async function complete(messages, json) {
  if (MOCK) return json ? JSON.stringify(mockJson(messages)) : "Mock Teddy here 🧸 (MOCK=1 — no DeepSeek call was made).";
  const j = await (await deepseek(messages, { json })).json();
  return j.choices?.[0]?.message?.content || "";
}

function convo(b) {  // the page's thread → chat messages, capped like the page caps it
  return (Array.isArray(b.messages) ? b.messages : []).slice(-12)
    .filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map(m => ({ role: m.role, content: m.content.slice(0, 2000) }));
}
function context(b) {
  return `Now: ${b.now || new Date().toISOString()}. Reader: ${b.who || "guest"}. Section open: ${b.sec || "teddy"}.`;
}

async function chat(b, res) {
  res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });
  const send = o => res.write("data: " + JSON.stringify(o) + "\n\n");
  try {
    if (b.mode === "guide") {  // one JSON object: {say, target, cta}
      const g = b.guide || {};
      const sys = `${PERSONA}\n\nRight now you are the little guide bubble on the page. Reply ONLY with a JSON object {"say": string ≤ 200 chars, "target": one of the place ids or null, "cta": button label ≤ 24 chars}.\nPlaces: ${JSON.stringify(g.places || [])}\nOpen steps: ${JSON.stringify(g.open || [])}\nPage state: ${JSON.stringify(g.state || {})}\n${context(b)}`;
      const out = await complete([{ role: "system", content: sys }, ...convo(b)].concat(convo(b).length ? [] : [{ role: "user", content: "(the bubble just opened — nudge her to the next open step)" }]), true);
      let g2 = null; try { g2 = JSON.parse(out); } catch {}
      if (g2 && typeof g2.say === "string") send({ guide: g2 }); else send({ error: "bad guide json" });
    } else {
      let sys = `${PERSONA}\n\n${context(b)}`;
      if (b.mode === "closing") sys += `\n\nShe just finished a quiz. Her answers: ${JSON.stringify(b.quiz?.answers || {}).slice(0, 4000)}\nWrite a warm 2–3 sentence closing that reflects them back, then invite her to ask anything.`;
      const msgs = [{ role: "system", content: sys }, ...convo(b)];
      if (msgs.length === 1) msgs.push({ role: "user", content: "(say hi)" });
      if (MOCK) { for (const w of (await complete(msgs)).split(/(?<= )/)) { send({ d: w }); await new Promise(r => setTimeout(r, 30)); } }
      else for await (const t of deltas(await deepseek(msgs, { stream: true }))) send({ d: t });
    }
  } catch (e) { log("chat error", e.message); send({ error: e.message }); }
  send({ done: true }); res.end();
}

async function devchat(b, res) {  // a plain coding-assistant chat, no booklet persona: POST {messages:[{role,content},…]}
  res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });
  const send = o => res.write("data: " + JSON.stringify(o) + "\n\n");
  try {
    const msgs = [{ role: "system", content: DEV_PERSONA }, ...convo(b)];
    if (msgs.length === 1) msgs.push({ role: "user", content: "(say hi)" });
    if (MOCK) { for (const w of (await complete(msgs)).split(/(?<= )/)) { send({ d: w }); await new Promise(r => setTimeout(r, 30)); } }
    else for await (const t of deltas(await deepseek(msgs, { stream: true }))) send({ d: t });
  } catch (e) { log("devchat error", e.message); send({ error: e.message }); }
  send({ done: true }); res.end();
}

const GENQUIZ = `Write 7 fresh, playful get-to-know-you questions from Teddy to Divya. Reply ONLY with JSON {"quiz":[{"q": string ≤ 200 chars, "opts": [[value ≤ 24 chars, label ≤ 60 chars with an emoji, Teddy's reaction ≤ 140 chars], … 2 to 4 options], "skip": Teddy's line if she skips}]}. Values are short lowercase slugs, unique within a question. Do not repeat or rephrase any of these earlier questions:\n`;
async function genquiz(b, res) {
  let quiz = [];
  try {
    const out = await complete([{ role: "system", content: PERSONA }, { role: "user", content: GENQUIZ + String(b.previous || "").slice(-4000) }], true);
    const j = JSON.parse(out); quiz = Array.isArray(j) ? j : j.quiz || [];
  } catch (e) { log("genquiz error", e.message); }
  json(res, 200, { ok: quiz.length > 0, quiz });
}
function mockJson(messages) {
  if (/guide bubble/.test(messages[0].content)) return { say: "Mock guide 🧸 — the next step is this way.", target: null, cta: "Take me there" };
  return { quiz: Array.from({ length: 7 }, (_, i) => ({ q: `Mock question ${i + 1}: tea or coffee, round ${Date.now() % 1000}?`, opts: [["tea", "Tea ☕", "Chai it is."], ["coffee", "Coffee ☕", "Filter coffee, then."]] })) };
}

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".json": "application/json", ".webmanifest": "application/manifest+json", ".png": "image/png", ".mp4": "video/mp4", ".txt": "text/plain" };
const json = (res, code, o) => { res.writeHead(code, { "Content-Type": "application/json" }); res.end(JSON.stringify(o)); };
function readBody(req) { return new Promise(r => { let s = ""; req.on("data", c => { s += c; if (s.length > 1e6) req.destroy(); }); req.on("end", () => { try { r(JSON.parse(s || "{}")); } catch { r({}); } }); }); }

http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (req.method === "POST" || req.method === "DELETE") {
    const b = req.method === "POST" ? await readBody(req) : {};
    log(req.method, url.pathname, b.mode || "", b.messages?.at?.(-1)?.content?.slice(0, 80) || "");
    if (url.pathname === "/chat") return chat(b, res);
    if (url.pathname === "/devchat") return devchat(b, res);
    if (url.pathname === "/genquiz") return genquiz(b, res);
    return json(res, 200, { ok: true });  // /answer, /state, /subscribe: accepted, never stored
  }
  if (url.pathname === "/state") return json(res, 200, { ok: true, data: null });
  const f = path.join(ROOT, path.normalize(decodeURIComponent(url.pathname)).replace(/^[/\\]+/, "") || "index.html");
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) {
    const idx = path.join(f, "index.html");
    if (f.startsWith(ROOT) && fs.existsSync(idx)) { res.writeHead(200, { "Content-Type": TYPES[".html"] }); return fs.createReadStream(idx).pipe(res); }
    res.writeHead(404); return res.end("not found");
  }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
}).listen(PORT, () => log(`Teddy (${MOCK ? "MOCK" : "DeepSeek " + MODEL}) on http://localhost:${PORT}/?chat=http://localhost:${PORT}`));
