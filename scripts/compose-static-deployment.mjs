import { access, cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const apps = [
  { name: "MITRE ATT&CK", slug: "mitreattack", source: "mitreattack/dist/client", destination: "swastik-portfolio/dist/apps/mitreattack" },
  { name: "Email Checker", slug: "emailchecker", source: "scanmail/dist/client", destination: "swastik-portfolio/dist/apps/emailchecker" },
];

for (const app of apps) {
  const source = resolve(app.source);
  const entry = resolve(source, "index.html");
  const destination = resolve(app.destination);

  await access(entry);
  await mkdir(destination, { recursive: true });
  await cp(source, destination, { recursive: true, force: true });

  const sitemapPath = resolve(destination, "sitemap.xml");
  let sitemap = await readFile(sitemapPath, "utf8");
  const entries = [...sitemap.matchAll(/<url>[\s\S]*?<\/url>/g)].map(([entry]) => entry);
  const baseUrl = `https://swastiksagar.tech/apps/${app.slug}`;
  const uniqueEntries = [];
  const seenLocations = new Set();

  for (const entry of entries) {
    const location = entry.match(/<loc>(.*?)<\/loc>/);
    if (!location) throw new Error(`Missing URL location in ${sitemapPath}`);

    const canonicalLocation = location[1].replace(`${baseUrl}/apps/${app.slug}/`, `${baseUrl}/`);
    if (seenLocations.has(canonicalLocation)) continue;
    seenLocations.add(canonicalLocation);
    uniqueEntries.push(entry.replace(location[1], canonicalLocation));
  }

  if (entries.length === 0) throw new Error(`No URL entries found in ${sitemapPath}`);
  const firstUrl = sitemap.indexOf("<url>");
  const lastUrlset = sitemap.lastIndexOf("</urlset>");
  if (firstUrl < 0 || lastUrlset < 0) throw new Error(`Invalid sitemap structure in ${sitemapPath}`);
  sitemap = `${sitemap.slice(0, firstUrl)}${uniqueEntries.join("\n")}\n${sitemap.slice(lastUrlset)}`;
  await writeFile(sitemapPath, sitemap);

  console.log(`Composed ${app.name} at ${app.destination}`);
}

const curriculum = {
  name: "SOC Analyst from Scratch",
  source: resolve("SOCAnalystfromScratch.html"),
  destination: resolve("swastik-portfolio/dist/curriculum/soc-analyst-from-scratch/index.html"),
};

await access(curriculum.source);
await mkdir(curriculum.destination.replace(/[\\/][^\\/]+$/, ""), { recursive: true });
await cp(curriculum.source, curriculum.destination);
console.log(`Composed ${curriculum.name} at ${curriculum.destination}`);
