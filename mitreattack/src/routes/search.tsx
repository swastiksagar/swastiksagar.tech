import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  TACTICS,
  getAllTechniquesAndSubs,
  TECHNIQUE_COUNT,
  SUBTECHNIQUE_COUNT,
} from "@/data/attack";

export const Route = createFileRoute("/search")({
  validateSearch: (search) => ({
    q: String(search["q"] ?? ""),
    tactic: String(search["tactic"] ?? ""),
    sort: String(search["sort"] ?? "relevance"),
  }),
  head: () => {
    const title = "Search Techniques — MITRE ATT&CK Field Reference";
    const description = `Search all ${TECHNIQUE_COUNT} enterprise techniques and ${SUBTECHNIQUE_COUNT} sub-techniques by ID, name, summary, or detection telemetry.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: "https://swastiksagar.tech/apps/mitreattack/search" },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: "https://swastiksagar.tech/apps/mitreattack/search" }],
    };
  },
  component: SearchPage,
});

function highlight(text: string, query: string) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-accent-soft text-foreground">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function SearchPage() {
  const { q, tactic, sort } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    let filtered = getAllTechniquesAndSubs();

    if (tactic) {
      filtered = filtered.filter((t) => t.tactic.slug === tactic);
    }

    const seen = new Set<string>();
    filtered = filtered.filter((t) => {
      if (seen.has(t.id)) return false;
      seen.add(t.id);
      return true;
    });

    if (query) {
      filtered = filtered.filter(
        (t) =>
          t.id.toLowerCase().includes(query) ||
          t.name.toLowerCase().includes(query) ||
          t.summary.toLowerCase().includes(query) ||
          t.detection.toLowerCase().includes(query) ||
          t.tactic.name.toLowerCase().includes(query),
      );
    }

    if (sort === "chain") {
      filtered = [...filtered].sort(
        (a, b) => a.tactic.order - b.tactic.order || a.id.localeCompare(b.id),
      );
    } else if (query) {
      filtered = [...filtered].sort((a, b) => {
        const aName = a.name.toLowerCase().includes(query)
          ? 2
          : a.id.toLowerCase().includes(query)
            ? 1
            : 0;
        const bName = b.name.toLowerCase().includes(query)
          ? 2
          : b.id.toLowerCase().includes(query)
            ? 1
            : 0;
        return bName - aName || a.tactic.order - b.tactic.order;
      });
    }

    return filtered;
  }, [q, tactic, sort]);

  return (
    <div className="page-wrap mitre-search-page pt-12 pb-4">
      <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-ink-dim">
        <Link to="/" className="link-inline">
          Matrix
        </Link>
        <span className="px-2">/</span>
        <span>Search</span>
      </nav>

      <h1 className="font-serif text-[clamp(32px,5vw,52px)] font-semibold leading-[1.05] tracking-tight">
        Search techniques
      </h1>
      <p className="mt-3 max-w-[62ch] text-[15.5px] text-ink-dim">
        Search by MITRE ID, name, summary, or the telemetry that detects it. Filter by tactic and
        sort by relevance or kill-chain order.
      </p>

      <div className="mitre-search-controls rule-top mt-8 grid gap-4 pt-8 sm:grid-cols-[1fr_auto_auto]">
        <div>
          <label htmlFor="search-q" className="sr-only">
            Search
          </label>
          <input
            id="search-q"
            type="search"
            value={q}
            onChange={(e) => navigate({ search: { q: e.target.value, tactic, sort } })}
            placeholder="e.g. T1059, PowerShell, LSASS, beaconing"
            className="w-full rounded-sm border border-border bg-background px-3 py-2.5 font-mono text-sm text-foreground placeholder:text-ink-faint focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="search-tactic" className="sr-only">
            Tactic
          </label>
          <select
            id="search-tactic"
            value={tactic}
            onChange={(e) => navigate({ search: { q, tactic: e.target.value, sort } })}
            className="h-full w-full rounded-sm border border-border bg-background px-3 py-2.5 font-mono text-sm text-foreground focus:border-accent focus:outline-none sm:w-44"
          >
            <option value="">All tactics</option>
            {TACTICS.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="search-sort" className="sr-only">
            Sort
          </label>
          <select
            id="search-sort"
            value={sort}
            onChange={(e) => navigate({ search: { q, tactic, sort: e.target.value } })}
            className="h-full w-full rounded-sm border border-border bg-background px-3 py-2.5 font-mono text-sm text-foreground focus:border-accent focus:outline-none sm:w-40"
          >
            <option value="relevance">Relevance</option>
            <option value="chain">Kill-chain order</option>
          </select>
        </div>
      </div>

      <p className="mt-4 font-mono text-xs text-ink-dim" aria-live="polite">
        {results.length} result{results.length === 1 ? "" : "s"}
        {q ? ` for "${q}"` : ""}
        {tactic ? ` in ${TACTICS.find((t) => t.slug === tactic)?.name}` : ""}
      </p>

      <ol className="rule-top mt-6 divide-y divide-border">
        {results.map((tech) => (
          <li key={tech.id} className="mitre-search-result">
            <Link
              to="/techniques/$id"
              params={{ id: tech.id }}
              className="group block rounded-sm transition-colors"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="rounded-sm border border-line-hard px-1.5 py-0.5 font-mono text-[11px]">
                  {tech.id}
                </span>
                <h2 className="font-serif text-xl font-semibold group-hover:text-accent">
                  {highlight(tech.name, q)}
                </h2>
                <span className="font-mono text-[11px] text-ink-dim">
                  {tech.tactic.name}
                  {tech.parent ? ` · sub-technique of ${tech.parent.name}` : ""}
                </span>
              </div>
              <p className="mt-2 max-w-[68ch] text-[15px] text-ink-dim">
                {highlight(tech.summary, q)}
              </p>
              <p className="mt-2 max-w-[68ch] border-l-2 border-line-hard pl-4 text-[14px]">
                <span className="font-mono text-[10px] uppercase tracking-wide text-ink-dim">
                  Detect with{" "}
                </span>
                {highlight(tech.detection, q)}
              </p>
            </Link>
          </li>
        ))}
      </ol>

      {results.length === 0 && (
        <div className="rule-top mt-6 py-12 text-center">
          <p className="font-mono text-xs tracking-wide text-ink-dim">NO MATCHES</p>
          <p className="mt-2 text-[15.5px] text-ink-dim">
            Try a different term, clear the tactic filter, or browse the{" "}
            <Link to="/matrix" className="link-inline">
              matrix
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
