import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { TACTICS, getTactic, type Tactic } from "@/data/attack";

export const Route = createFileRoute("/tactics/$slug")({
  loader: ({ params }): { tactic: Tactic } => {
    const tactic = getTactic(params.slug);
    if (!tactic) throw notFound();
    return { tactic };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Tactic not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { tactic } = loaderData;
    const rawTitle = `${tactic.name} (${tactic.id}) — ATT&CK Tactic`;
    const title = rawTitle.length > 60 ? `${tactic.name} — ATT&CK Tactic` : rawTitle;
    const rawDesc =
      `${tactic.objective} ${tactic.techniques.length} key ATT&CK techniques under ${tactic.name}, with the telemetry that detects each one.`
        .replace(/\s+/g, " ")
        .trim();
    const description = rawDesc.length > 158 ? `${rawDesc.slice(0, 157).trimEnd()}…` : rawDesc;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        {
          property: "og:url",
          content: `https://swastiksagar.tech/apps/mitreattack/tactics/${params.slug}`,
        },
        { property: "og:type", content: "article" },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://swastiksagar.tech/apps/mitreattack/tactics/${params.slug}`,
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
  component: TacticPage,
});

function TacticPage() {
  const { tactic } = Route.useLoaderData() as { tactic: Tactic };
  const prev = TACTICS.find((t) => t.order === tactic.order - 1);
  const next = TACTICS.find((t) => t.order === tactic.order + 1);

  return (
    <article className="page-wrap mitre-detail-page pt-12 pb-4">
      <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-ink-dim">
        <Link to="/" className="link-inline">
          Matrix
        </Link>
        <span className="px-2">/</span>
        <span>{tactic.name}</span>
      </nav>

      <p className="mb-4 font-mono text-xs tracking-wide text-ink-dim">
        STEP {String(tactic.order).padStart(2, "0")} OF 14 · {tactic.id}
      </p>
      <h1 className="font-serif text-[clamp(32px,5vw,52px)] font-semibold leading-[1.05] tracking-tight">
        {tactic.name}
      </h1>
      <p className="my-5 max-w-[62ch] font-serif text-lg text-ink-dim">{tactic.objective}</p>

      <div className="rule-top mt-8 pt-8">
        <p className="mb-3.5 max-w-[68ch] text-[15.5px] text-ink-dim">{tactic.description}</p>
        <div className="mitre-callout mt-6 rounded-sm border border-border bg-accent-soft p-5">
          <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-dim">
            Why it matters on shift
          </p>
          <p className="max-w-[68ch] text-[15.5px]">{tactic.whyItMatters}</p>
        </div>
      </div>

      <section className="mt-12">
        <p className="mb-2 font-mono text-xs tracking-wide text-ink-dim">
          {tactic.techniques.length} techniques
        </p>
        <h2 className="mb-6 font-serif text-2xl font-semibold">Techniques &amp; detection</h2>

        <ol className="divide-y divide-border rule-top">
          {tactic.techniques.map((tech) => (
            <li key={tech.id} className="mitre-detail-result py-6">
              <Link to="/techniques/$id" params={{ id: tech.id }} className="group block">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="rounded-sm border border-line-hard px-1.5 py-0.5 font-mono text-[11px]">
                    {tech.id}
                  </span>
                  <h3 className="font-serif text-xl font-semibold group-hover:text-accent">
                    {tech.name}
                  </h3>
                </div>
                <p className="mt-2.5 max-w-[68ch] text-[15.5px] text-ink-dim">{tech.summary}</p>
                <p className="mt-3 max-w-[68ch] border-l-2 border-line-hard pl-4 text-[14.5px]">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-ink-dim">
                    Detect it with{" "}
                  </span>
                  <br />
                  {tech.detection}
                </p>
              </Link>
              {tech.subTechniques && tech.subTechniques.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-ink-dim">
                    {tech.subTechniques.length} sub-techniques
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {tech.subTechniques.map((sub) => (
                      <li key={sub.id}>
                        <Link
                          to="/techniques/$id"
                          params={{ id: sub.id }}
                          className="inline-flex rounded-sm border border-border bg-paper-alt px-2 py-1 font-mono text-[11px] transition-colors hover:border-foreground hover:text-accent"
                        >
                          {sub.id} {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>

      <nav
        aria-label="Tactic pagination"
        className="mitre-pagination rule-top mt-10 flex flex-wrap justify-between gap-4 pt-6 font-mono text-xs"
      >
        {prev ? (
          <Link to="/tactics/$slug" params={{ slug: prev.slug }} className="link-inline">
            ← {String(prev.order).padStart(2, "0")} {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to="/tactics/$slug" params={{ slug: next.slug }} className="link-inline">
            {String(next.order).padStart(2, "0")} {next.name} →
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
