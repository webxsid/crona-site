import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const staticPaths = ["/", "/docs/", "/install/", "/companions/", "/support/", "/privacy/", "/changelog/"];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ?? new URL("https://crona.work");
  const docs = await getCollection("docs");
  const urls = [
    ...staticPaths,
    ...docs.map((doc) => `/docs/${doc.id}/`),
  ].map((path) => new URL(path, baseUrl).href);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url)}</loc>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
