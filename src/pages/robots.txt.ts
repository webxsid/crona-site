import type { APIRoute } from "astro";

const siteUrl = "https://crona.work";

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site ?? new URL(siteUrl);
  const sitemapUrl = new URL("/sitemap.xml", baseUrl).href;

  return new Response(`User-agent: *
Allow: /
Sitemap: ${sitemapUrl}
`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
