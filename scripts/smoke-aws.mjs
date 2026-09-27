import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const { url } = JSON.parse(readFileSync(".sst/outputs.json", "utf8"));
const password = JSON.parse(process.env.SST_RESOURCE_PreviewPassword ?? "{}").value;
assert.ok(password?.length >= 32);
const origin = new URL(url);
assert.equal(origin.protocol, "https:");
assert.ok(origin.hostname.endsWith(".cloudfront.net"));
const headers = { Authorization: `Basic ${Buffer.from(`preview:${password}`).toString("base64")}` };
async function get(path, auth = true) {
  const r = await fetch(new URL(path, origin), { headers: auth ? headers : {}, redirect: "manual", signal: AbortSignal.timeout(120_000) });
  return { status: r.status, headers: r.headers, body: await r.text() };
}
for (const path of ["/", "/api/executive-orders", "/_next/static/missing.js"]) {
  assert.equal((await get(path, false)).status, 401, path);
}
const home = await get("/");
assert.equal(home.status, 200);
assert.match(home.headers.get("x-robots-tag") ?? "", /noindex/);
assert.match(home.body, /How Many Executive Orders/);
assert.ok(!home.body.includes("Loading Executive Orders Data"), "Home page must render data rather than its loading fallback");
const asset = home.body.match(/src="([^"<>]*\/_next\/static\/[^"<>]+\.js[^"<>]*)"/)?.[1];
assert.ok(asset);
assert.equal((await get(asset)).status, 200);
const api = await get("/api/executive-orders");
assert.equal(api.status, 200, "Data API must work, not just render a loading page");
const data = JSON.parse(api.body);
assert.ok(data.total > 0);
assert.equal(data.total, data.orders.length);
assert.ok(data.presidentStats.length > 0);
assert.ok(data.yearlyStats.length > 0);
assert.equal((await get("/migration-test-missing-page")).status, 404);
console.log(`PASS authenticated page, real data API, assets, noindex, anonymous rejection and 404: ${origin.origin}`);
