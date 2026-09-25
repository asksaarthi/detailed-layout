// Drives the booklet in headless Chrome against the local DeepSeek Teddy (server.mjs), and saves screenshots + a transcript.
//   node harness/deepseek/run.mjs ["question" …]      (server.mjs must already be running; OUT=dir, URL=http://localhost:8080)
//   HEADED=1 opens a visible Chrome window, to watch it on your own computer
// Safety: test mode (sandbox) as the shared "guest" login, and every request that isn't localhost or Google Fonts is aborted,
// so nothing reaches her log, her answers, the state mirror or the push server.
// navigator.webdriver is reported false for this run only — otherwise the page (by design) answers with its canned local Teddy.
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const URL_ = process.env.URL || "http://localhost:8080";
const OUT = path.resolve(process.env.OUT || "harness/deepseek/out");
const ASKS = process.argv.slice(2).length ? process.argv.slice(2) : ["What's the plan for Saturday?", "Is he nervous too?", "What do I pack?"];
fs.mkdirSync(OUT, { recursive: true });
const { chromium } = await import("playwright").catch(() =>  // a local install, else the global one
  import(path.join(execSync("npm root -g").toString().trim(), "playwright/index.js")).then(m => m.default || m));

const browser = await chromium.launch({ headless: process.env.HEADED !== "1", slowMo: process.env.HEADED === "1" ? 150 : 0, executablePath: process.env.CHROME || undefined, args: ["--disable-blink-features=AutomationControlled"] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, serviceWorkers: "block", ignoreHTTPSErrors: true });  // fonts only: a TLS-inspecting proxy re-signs them
await ctx.route("**/*", r => {
  const h = new URL(r.request().url()).hostname;
  return ["localhost", "127.0.0.1", "fonts.googleapis.com", "fonts.gstatic.com"].includes(h) ? r.continue() : r.abort();
});
await ctx.addInitScript(() => {
  Object.defineProperty(Navigator.prototype, "webdriver", { get: () => false });
  if (!localStorage.getItem("booklet-sandbox")) {
    localStorage.setItem("booklet-sandbox", "1");
    localStorage.setItem("sbx:booklet-who", "guest");
    localStorage.setItem("sbx:booklet-auth", "v2:guest");
  }
});
const page = await ctx.newPage();
page.on("console", m => { if (m.type() === "error") console.log("[page]", m.text()); });

let n = 0;
const shot = async name => { const f = path.join(OUT, `${String(++n).padStart(2, "0")}-${name}.png`); await page.screenshot({ path: f }); console.log("shot", f); };
const settle = async () => {  // wait until Teddy has stopped typing and the send button is back
  await page.waitForFunction(() => !document.querySelector("#chatSend")?.disabled, null, { timeout: 60000 });
  await page.waitForTimeout(800);
};

await page.goto(`${URL_}/?chat=${encodeURIComponent(URL_)}`, { waitUntil: "networkidle" });
console.log("webdriver seen by page:", await page.evaluate(() => navigator.webdriver));
await shot("booklet");
await page.evaluate(() => document.querySelector("#tabTeddy").click());  // the tab can sit behind the phone menu
await settle(); await shot("teddy-intro");
if (await page.isVisible("#quizLater")) { await page.evaluate(() => document.querySelector("#quizLater").click()); await settle(); }  // skip the quiz: straight to free chat (the test-mode bar overlaps the button at 390px)

for (const q of ASKS) {
  console.log("> " + q);
  await page.fill("#chatInput", q);
  await page.evaluate(() => document.querySelector("#chatForm").requestSubmit());  // on a phone, Enter is a newline
  await page.waitForTimeout(500); await settle();
  await shot(q.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40));
}

const transcript = await page.$$eval("#chatLog > *", els => els.map(e => `${e.classList.contains("me") ? "Divya" : "Teddy"}: ${(e.querySelector(".txt") || e).innerText.trim()}`).filter(l => !/: $/.test(l)).join("\n\n"));
fs.writeFileSync(path.join(OUT, "transcript.txt"), transcript + "\n");
console.log("\n" + transcript);
await browser.close();
