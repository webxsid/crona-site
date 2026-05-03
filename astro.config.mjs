import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  integrations: [mdx()],
  output: "static",
  site: "https://crona.app",
  adapter: cloudflare(),
});