import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ?? new URL("https://crona.work");
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  const items = posts.map((post) => {
    const slug = post.data.slug;
    const url = new URL(`/blog/${slug}/`, baseUrl).href;
    return `    <item>\n      <title>${escapeXml(post.data.title)}</title>\n      <description>${escapeXml(post.data.description)}</description>\n      <link>${url}</link>\n      <guid isPermaLink="true">${url}</guid>\n      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>\n    </item>`;
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Crona notes</title>\n    <description>Product notes and working practices from Crona.</description>\n    <link>${new URL("/blog/", baseUrl).href}</link>\n${items.join("\n")}\n  </channel>\n</rss>\n`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
