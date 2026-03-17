import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

import react from "@astrojs/react";

const rawSiteUrl =
  process.env.PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  "https://www.matthieumorel.com/projets/tcgv";

const normalizedSiteInput = /^https?:\/\//i.test(rawSiteUrl)
  ? rawSiteUrl
  : `https://${rawSiteUrl}`;

const parsedSiteUrl = new URL(normalizedSiteInput);
const site = parsedSiteUrl.origin;
const normalizedPathname = parsedSiteUrl.pathname
  .replace(/\/index\.html?$/i, "/")
  .replace(/\/+$/, "");
const base = normalizedPathname === "" ? "/" : normalizedPathname;

export default defineConfig({
  site,
  base,
  vite: {
    plugins: [tailwindcss()],
    css: { devSourcemap: true },
    resolve: {
      // 👇 Résolution absolue (robuste sous Windows)
      alias: {
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@styles": fileURLToPath(new URL("./src/assets/css", import.meta.url)),
        "@images": fileURLToPath(
          new URL("./src/assets/images", import.meta.url),
        ),
        "@js": fileURLToPath(new URL("./src/assets/js", import.meta.url)),
        "@svg": fileURLToPath(new URL("./src/assets/svg", import.meta.url)),
        "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      },
    },
  },

  integrations: [react()],
});
