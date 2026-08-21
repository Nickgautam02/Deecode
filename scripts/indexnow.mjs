#!/usr/bin/env node
//
// IndexNow — ping the engines that accept a "this URL changed" signal
// instead of waiting to be crawled.
//
// ⚠ GOOGLE DOES NOT PARTICIPATE. It has been "monitoring" the protocol
// since 2021 and still has no endpoint. Nothing in this file will make
// anything appear in Google faster; for Google the only lever is
// Search Console, and re-requesting the same URL does not move it up
// the queue. Do not let this script create the impression that it did
// something for Google.
//
// What it IS for: Bing, Yandex, Naver, Seznam and Yep, all of which
// take the submission and act on it within hours. That matters here
// beyond Bing's own traffic, because DuckDuckGo serves Bing's index,
// and the assistant search products lean on Bing rather than running
// their own crawl of a domain this new. Getting into Bing quickly is
// the closest thing to a shortcut into AI answers.
//
// ── The URL list comes from our own live sitemap.xml, deliberately ──
// Not from a hardcoded array, and not from content/locations.ts. The
// sitemap is already the single statement of "pages that should be
// indexed", enforced against each page's `robots` metadata. Reading it
// back means this script cannot submit a route that is noindexed — no
// proposal URL can ever be pushed to a search engine by a typo here.
//
// Usage:  node scripts/indexnow.mjs [--dry-run]

const HOST = "www.deecodemediahouse.com";
const KEY = "9c08a7396494848f557ba7d0fe007762e36c1b82b7f90a7b";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const dryRun = process.argv.includes("--dry-run");

async function main() {
  // 1. Read the sitemap we actually serve, not a local build of it —
  //    if a deploy has not landed yet, submitting is premature anyway
  //    and this is what surfaces that.
  const sitemapUrl = `https://${HOST}/sitemap.xml`;
  const res = await fetch(sitemapUrl);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status} ${sitemapUrl}`);
  const xml = await res.text();
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  if (urlList.length === 0) throw new Error("sitemap contained no <loc> entries");

  // 2. The key file must be live before submitting, or every engine
  //    rejects the batch as unverified. Checking here turns a silent
  //    422 into a readable error.
  const keyRes = await fetch(KEY_LOCATION);
  const keyBody = keyRes.ok ? (await keyRes.text()).trim() : null;
  if (keyBody !== KEY) {
    throw new Error(
      `key file not verifiable at ${KEY_LOCATION} ` +
        `(status ${keyRes.status}, body "${keyBody ?? "—"}"). ` +
        `Deploy public/${KEY}.txt before running this.`,
    );
  }

  console.log(`Submitting ${urlList.length} URLs from ${sitemapUrl}:`);
  urlList.forEach((u) => console.log(`  ${u}`));

  if (dryRun) {
    console.log("\n--dry-run: nothing submitted.");
    return;
  }

  const submit = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  // 200 accepted · 202 accepted, key validation pending · 400 bad
  // request · 403 key invalid · 422 URL/key mismatch · 429 too many.
  const text = await submit.text();
  console.log(`\n${submit.status} ${submit.statusText} ${text || "(empty body)"}`);
  if (!submit.ok) process.exitCode = 1;
}

main().catch((err) => {
  console.error(`indexnow: ${err.message}`);
  process.exitCode = 1;
});
