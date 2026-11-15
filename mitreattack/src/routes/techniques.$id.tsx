import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  TACTICS,
  getTechnique,
  getAllTechniquesAndSubs,
  type TechniqueWithTactic,
} from "@/data/attack";

export const Route = createFileRoute("/techniques/$id")({
  loader: ({ params }): { technique: TechniqueWithTactic } => {
    const technique = getTechnique(params.id);
    if (!technique) throw notFound();
    return { technique };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Technique not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { technique } = loaderData;
    const base = `${technique.id} ${technique.name}`;
    const title =
      base.length <= 42
        ? `${base} — ATT&CK Technique`
        : base.length <= 60
          ? base
          : `${base.slice(0, 57).trimEnd()}…`;
    const raw = `${technique.summary} Detection: ${technique.detection}`
      .replace(/\s+/g, " ")
      .trim();
    const description = raw.length > 158 ? `${raw.slice(0, 157).trimEnd()}…` : raw;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        {
          property: "og:url",
          content: `https://swastiksagar.tech/apps/mitreattack/techniques/${params.id}`,
        },
        { property: "og:type", content: "article" },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://swastiksagar.tech/apps/mitreattack/techniques/${params.id}`,
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description,
          }),
        },
      ],
    };
  },
  errorComponent: ({ error, reset }) => {
    console.error(error);
    return (
      <div className="page-wrap flex min-h-[60vh] flex-col justify-center">
        <p className="font-mono text-xs tracking-wide text-ink-dim">ERR_500</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold">This technique didn't load</h1>
        <button
          onClick={reset}
          className="mt-7 inline-flex w-fit rounded-sm border border-foreground bg-foreground px-4 py-2.5 font-mono text-xs text-background transition-colors hover:border-accent hover:bg-accent"
        >
          Try again
        </button>
      </div>
    );
  },
  notFoundComponent: () => {
    const { id } = Route.useParams();
    return (
      <div className="page-wrap flex min-h-[60vh] flex-col justify-center">
        <p className="font-mono text-xs tracking-wide text-ink-dim">ERR_404</p>
        <h1 className="mt-4 font-serif text-5xl font-semibold">Technique not found</h1>
        <p className="mt-3 max-w-[60ch] font-serif text-lg text-ink-dim">
          {id} isn't in this reference. Check the ID or head back to the matrix.
        </p>
        <div className="mt-7">
          <Link
            to="/"
            className="inline-flex rounded-sm border border-foreground bg-foreground px-4 py-2.5 font-mono text-xs text-background transition-colors hover:border-accent hover:bg-accent"
          >
            Back to the matrix
          </Link>
        </div>
      </div>
    );
  },
  component: TechniquePage,
});

function TechniquePage() {
  const { technique } = Route.useLoaderData() as { technique: TechniqueWithTactic };
  const all = getAllTechniquesAndSubs();
  const index = all.findIndex((t) => t.id === technique.id);
  const prev = index > 0 ? all[index - 1] : undefined;
  const next = index < all.length - 1 ? all[index + 1] : undefined;
  const prevTactic = TACTICS.find((t) => t.order === technique.tactic.order - 1);
  const nextTactic = TACTICS.find((t) => t.order === technique.tactic.order + 1);

  return (
    <article className="page-wrap mitre-detail-page pt-12 pb-4">
      <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-ink-dim">
        <Link to="/" className="link-inline">
          Matrix
        </Link>
        <span className="px-2">/</span>
        <Link to="/tactics/$slug" params={{ slug: technique.tactic.slug }} className="link-inline">
          {technique.tactic.name}
        </Link>
        <span className="px-2">/</span>
        {technique.parent && (
          <>
            <Link to="/techniques/$id" params={{ id: technique.parent.id }} className="link-inline">
              {technique.parent.id}
            </Link>
            <span className="px-2">/</span>
          </>
        )}
        <span>{technique.id}</span>
      </nav>

      <p className="mb-4 font-mono text-xs tracking-wide text-ink-dim">
        {technique.tactic.id} · {technique.tactic.name.toUpperCase()}
      </p>
      <h1 className="font-serif text-[clamp(32px,5vw,52px)] font-semibold leading-[1.05] tracking-tight">
        {technique.name}
      </h1>
      <div className="my-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-ink-dim">
        <span>{technique.id}</span>
        {technique.parent && (
          <span>
            Sub-technique of{" "}
            <Link to="/techniques/$id" params={{ id: technique.parent.id }} className="link-inline">
              {technique.parent.name}
            </Link>
          </span>
        )}
        {technique.platforms.length > 0 && <span>{technique.platforms.join(" · ")}</span>}
        <a href={technique.url} target="_blank" rel="noreferrer" className="link-inline">
          attack.mitre.org
        </a>
      </div>

      <div className="rule-top mt-8 pt-8">
        <p className="mb-3.5 max-w-[68ch] text-[15.5px] text-ink-dim">{technique.summary}</p>
        <div className="mitre-callout mt-6 rounded-sm border border-border bg-accent-soft p-5">
          <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wide text-foreground/80">
            Detect it with
          </p>
          <p className="max-w-[68ch] text-[15.5px]">{technique.detection}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="mitre-info-card rounded-sm border border-border bg-paper-alt p-5">
          <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wide text-foreground/80">
            Why it matters on shift
          </p>
          <p className="max-w-[68ch] text-[15.5px]">
            {technique.name} is one of the concrete ways adversaries achieve{" "}
            {technique.tactic.name.toLowerCase()}. Recognising it in telemetry lets you name the
            technique in your ticket and pivot to what came before and after.
          </p>
        </div>
        <div className="mitre-info-card rounded-sm border border-border bg-paper-alt p-5">
          <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wide text-foreground/80">
            What to look for next
          </p>
          <p className="max-w-[68ch] text-[15.5px]">
            After {technique.tactic.name.toLowerCase()}, the next tactic is usually{" "}
            {nextTactic ? (
              <Link to="/tactics/$slug" params={{ slug: nextTactic.slug }} className="link-inline">
                {nextTactic.name}
              </Link>
            ) : (
              "Impact"
            )}
            . Search your telemetry for the transition before closing the ticket.
          </p>
        </div>
      </div>

      {technique.subTechniques && technique.subTechniques.length > 0 && (
        <section className="mt-10">
          <p className="mb-2 font-mono text-xs tracking-wide text-ink-dim">
            {technique.subTechniques.length} sub-techniques
          </p>
          <h2 className="mb-5 font-serif text-2xl font-semibold">How it shows up in practice</h2>
          <ol className="rule-top divide-y divide-border">
            {technique.subTechniques.map((sub) => (
              <li key={sub.id} className="mitre-detail-result py-5">
                <Link to="/techniques/$id" params={{ id: sub.id }} className="group block">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="rounded-sm border border-line-hard px-1.5 py-0.5 font-mono text-[11px]">
                      {sub.id}
                    </span>
                    <h3 className="font-serif text-lg font-semibold group-hover:text-accent">
                      {sub.name}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-[68ch] text-[15px] text-ink-dim">{sub.summary}</p>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="mitre-context-card mt-8 rounded-sm border border-border p-5">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-wide text-foreground/80">
          Kill-chain context
        </p>
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          {prevTactic && (
            <>
              <span className="text-ink-dim">← before</span>
              <Link to="/tactics/$slug" params={{ slug: prevTactic.slug }} className="link-inline">
                {prevTactic.name}
              </Link>
            </>
          )}
          <span className="rounded-sm border border-line-hard px-2 py-1 text-foreground">
            {technique.tactic.name}
          </span>
          {nextTactic && (
            <>
              <span className="text-ink-dim">after →</span>
              <Link to="/tactics/$slug" params={{ slug: nextTactic.slug }} className="link-inline">
                {nextTactic.name}
              </Link>
            </>
          )}
        </div>
      </div>

      <nav
        aria-label="Technique pagination"
        className="mitre-pagination rule-top mt-10 flex flex-wrap justify-between gap-4 pt-6 font-mono text-xs"
      >
        {prev ? (
          <Link to="/techniques/$id" params={{ id: prev.id }} className="link-inline">
            ← {prev.id} {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to="/techniques/$id" params={{ id: next.id }} className="link-inline">
            {next.id} {next.name} →
          </Link>
        ) : (
          <Link to="/" className="link-inline">
            Back to the matrix →
          </Link>
        )}
      </nav>
    </article>
  );
}
