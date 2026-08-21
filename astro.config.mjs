import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

function remarkGithubCallouts() {
  const calloutTypes = new Set(["note", "tip", "important", "warning", "caution"]);

  const escapeHtml = (value = "") =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const getText = (node) => {
    if (!node) return "";
    if (node.type === "text" || node.type === "inlineCode") return node.value ?? "";
    if (Array.isArray(node.children)) return node.children.map(getText).join("");
    return "";
  };

  const normalizeText = (value = "") => value.replace(/\s+/g, " ").trim();

  const transform = (node) => {
    if (!node || !Array.isArray(node.children)) return;

    for (let index = 0; index < node.children.length; index += 1) {
      const child = node.children[index];
      transform(child);

      if (
        child?.type !== "blockquote" ||
        !Array.isArray(child.children) ||
        child.children.length === 0
      ) {
        continue;
      }

      const firstParagraph = child.children[0];
      if (firstParagraph?.type !== "paragraph") {
        continue;
      }

      const markerMatch = getText(firstParagraph).match(
        /^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i,
      );
      if (!markerMatch) {
        continue;
      }

      const calloutType = markerMatch[1].toLowerCase();
      if (!calloutTypes.has(calloutType)) {
        continue;
      }

      const paragraphs = child.children
        .filter((entry) => entry.type === "paragraph")
        .map((entry) =>
          normalizeText(
            getText(entry).replace(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i, ""),
          ),
        )
        .filter(Boolean);

      const html = `<div class="callout callout--${calloutType}">${paragraphs.map((paragraph) => escapeHtml(paragraph)).join("<br /><br />")}</div>`;
      child.type = "html";
      child.value = html;
      delete child.children;
      delete child.position;
      delete child.depth;
      delete child.data;
    }
  };

  return (tree) => {
    transform(tree);
  };
}

export default defineConfig({
  integrations: [mdx(), react()],
  adapter: cloudflare(),
  markdown: {
    remarkPlugins: [remarkGithubCallouts],
  },
  output: "server",
  site: "https://crona.work",
});
