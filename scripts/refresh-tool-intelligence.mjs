import { readFile, writeFile } from "node:fs/promises";

const fileUrl = new URL("../data/tool-intelligence.json", import.meta.url);
const intelligence = JSON.parse(await readFile(fileUrl, "utf8"));
const entries = Object.entries(intelligence.tools);
const checkedAt = new Date().toISOString();

for (let start = 0; start < entries.length; start += 4) {
  await Promise.all(entries.slice(start, start + 4).map(async ([, tool]) => {
    tool.lastAttemptAt = checkedAt;
    const [official, news] = await Promise.allSettled([
      fetchOfficialPage(tool.sourceUrl),
      fetchLatestNews(tool.searchQuery),
    ]);

    if (official.status === "fulfilled") {
      tool.httpStatus = official.value.status;
      if (official.value.ok) {
        tool.lastCheckedAt = checkedAt;
        if (official.value.title) tool.officialTitle = official.value.title;
        if (official.value.summary) tool.officialSummary = official.value.summary;
      }
    } else {
      tool.httpStatus = 0;
    }

    if (news.status === "fulfilled" && news.value) {
      tool.latestHeadline = news.value.title;
      tool.latestHeadlineUrl = news.value.url;
      tool.latestHeadlineAt = news.value.publishedAt;
    }
  }));
}

intelligence.generatedAt = checkedAt;
await writeFile(fileUrl, `${JSON.stringify(intelligence, null, 2)}\n`, "utf8");
console.log(`Refreshed ${entries.length} curated tools at ${checkedAt}.`);

async function fetchOfficialPage(url) {
  const response = await fetchWithTimeout(url);
  const html = await response.text();
  const title = cleanText(matchFirst(html, [
    /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["'][^>]*>/i,
    /<title[^>]*>([\s\S]*?)<\/title>/i,
  ]));
  const summary = cleanText(matchFirst(html, [
    /<meta[^>]+(?:name|property)=["'](?:description|og:description)["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["'](?:description|og:description)["'][^>]*>/i,
  ])).slice(0, 260);
  return { ok: response.ok, status: response.status, title, summary: isUseful(summary) ? summary : "" };
}

async function fetchLatestNews(query) {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=zh-CN&gl=CN&ceid=CN:zh-Hans`;
  const response = await fetchWithTimeout(url);
  if (!response.ok) return null;
  const xml = await response.text();
  const item = xml.match(/<item>([\s\S]*?)<\/item>/i)?.[1];
  if (!item) return null;
  const title = cleanText(item.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");
  const link = cleanText(item.match(/<link>([\s\S]*?)<\/link>/i)?.[1] || "");
  const publishedAt = cleanText(item.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1] || "");
  return title && /^https?:\/\//.test(link) ? { title, url: link, publishedAt } : null;
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    return await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "Mozilla/5.0 (compatible; FindAI-InfoMonitor/1.0; +https://github.com/dh646956164/FindAI)" },
    });
  } finally {
    clearTimeout(timeout);
  }
}

function matchFirst(text, patterns) {
  for (const pattern of patterns) {
    const value = text.match(pattern)?.[1];
    if (value) return value;
  }
  return "";
}

function cleanText(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function isUseful(value) {
  return value.length >= 12 && !/(captcha|验证码|访问受限|enable javascript)/i.test(value);
}
