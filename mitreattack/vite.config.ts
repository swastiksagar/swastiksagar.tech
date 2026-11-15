// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { getAllTechniquesAndSubs, TACTICS } from "./src/data/attack.ts";

const pages = [
  { path: "/", sitemap: { priority: 1, changefreq: "weekly" as const } },
  { path: "/matrix", sitemap: { priority: 0.9, changefreq: "weekly" as const } },
  { path: "/search", sitemap: { priority: 0.8, changefreq: "weekly" as const } },
  { path: "/playbooks", sitemap: { priority: 0.8, changefreq: "weekly" as const } },
  ...TACTICS.map((tactic) => ({
    path: `/tactics/${tactic.slug}`,
    sitemap: { priority: 0.7, changefreq: "monthly" as const },
  })),
  ...getAllTechniquesAndSubs().map((technique) => ({
    path: `/techniques/${technique.id}`,
    sitemap: { priority: 0.6, changefreq: "monthly" as const },
  })),
];

export default defineConfig({
  vite: { base: "/apps/mitreattack/" },
  nitro: false,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    pages,
    router: { basepath: "/apps/mitreattack" },
    sitemap: {
      host: "https://swastiksagar.tech/apps/mitreattack",
      outputPath: "sitemap.xml",
    },
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: true,
      crawlLinks: true,
      failOnError: true,
    },
  },
});
