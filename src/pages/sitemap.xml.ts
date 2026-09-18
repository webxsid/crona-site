import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const staticPaths = ["/", "/mac/", "/support/", "/privacy/", "/releases/", "/blog/"];

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
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const urls: { url: string; lastmod?: string }[] = staticPaths.map((path) => ({
    url: new URL(path, baseUrl).href,
  }));
  urls.push(
    ...posts.map((post) => ({
      url: new URL(`/blog/${post.data.slug}/`, baseUrl).href,
      lastmod: (post.data.updatedDate ?? post.data.pubDate).toISOString(),
    })),
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ url, lastmod }) => `  <url>
    <loc>${escapeXml(url)}</loc>${
      lastmod
        ? `
    <lastmod>${lastmod}</lastmod>`
        : ""
    }
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
