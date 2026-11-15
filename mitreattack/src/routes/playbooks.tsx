import { createFileRoute, Link } from "@tanstack/react-router";
import { PLAYBOOKS } from "@/data/playbooks";

export const Route = createFileRoute("/playbooks")({
  head: () => {
    const title = "Alert Triage Playbooks — MITRE ATT&CK Field Reference";
    const description =
      "Step-by-step SOC playbooks for common alert types, mapped to MITRE ATT&CK techniques and kill-chain pivots.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: "/playbooks" },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: "/playbooks" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Alert Triage Playbooks",
            description,
            url: "https://swastiksagar.tech/apps/mitreattack/playbooks",
            hasPart: PLAYBOOKS.map((p) => ({
              "@type": "HowTo",
              name: p.title,
              description: p.trigger,

              url: "https://swastiksagar.tech/apps/mitreattack/playbooks",
            })),
          }),
        },
      ],
    };
  },
  component: PlaybooksPage,
});

function PlaybooksPage() {
  return (
    <div className="page-wrap mitre-playbooks-page pt-12 pb-4">
      <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-ink-dim">
        <Link to="/" className="link-inline">
          Matrix
        </Link>
        <span className="px-2">/</span>
        <span>Playbooks</span>
      </nav>

      <h1 className="font-serif text-[clamp(32px,5vw,52px)] font-semibold leading-[1.05] tracking-tight">
        Alert triage playbooks
      </h1>
      <p className="mt-3 max-w-[62ch] text-[15.5px] text-ink-dim">
        Common SOC alerts turned into repeatable workflows. Each playbook maps to ATT&amp;CK
        techniques and tells you what to check before and after the alert.
      </p>

      <ol className="rule-top mt-8 grid gap-5 pt-8 sm:grid-cols-2">
        {PLAYBOOKS.map((playbook) => (
          <li key={playbook.slug} id={playbook.slug} className="mitre-playbook-card">
            <h2 className="font-serif text-xl font-semibold">{playbook.title}</h2>
            <p className="mt-2 text-[14px] text-ink-dim">
              <span className="font-mono text-[11px] uppercase tracking-wide text-ink-dim">
                Trigger{" "}
              </span>
              {playbook.trigger}
            </p>
            <p className="mt-2 text-[14px] text-ink-dim">
              <span className="font-mono text-[11px] uppercase tracking-wide text-ink-dim">
                Data source{" "}
              </span>
              {playbook.dataSource}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {playbook.techniques.map((tech) => (
                <Link
                  key={tech.id}
                  to="/techniques/$id"
                  params={{ id: tech.id }}
                  className="rounded-sm border border-line-hard bg-background px-2 py-1 font-mono text-[11px] transition-colors hover:border-foreground"
                >
                  {tech.id} {tech.name}
                </Link>
              ))}
            </div>

            <h3 className="mt-5 font-mono text-[11px] uppercase tracking-wide text-ink-dim">
              Triage questions
            </h3>
            <ol className="mt-2 list-decimal space-y-2 pl-4 text-[15px] text-ink-dim">
              {playbook.triage.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-sm border border-border bg-background p-3">
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink-dim">
                  Pivot back
                </p>
                <p className="mt-1 text-[14px]">
                  <Link
                    to="/tactics/$slug"
                    params={{ slug: playbook.backward.slug }}
                    className="link-inline"
                  >
                    {playbook.backward.tactic}
                  </Link>
                </p>
                <p className="mt-1 text-[13px] text-ink-dim">{playbook.backward.question}</p>
              </div>
              <div className="rounded-sm border border-border bg-background p-3">
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink-dim">
                  Pivot forward
                </p>
                <p className="mt-1 text-[14px]">
                  <Link
                    to="/tactics/$slug"
                    params={{ slug: playbook.forward.slug }}
                    className="link-inline"
                  >
                    {playbook.forward.tactic}
                  </Link>
                </p>
                <p className="mt-1 text-[13px] text-ink-dim">{playbook.forward.question}</p>
              </div>
            </div>

            <h3 className="mt-5 font-mono text-[11px] uppercase tracking-wide text-red">
              Escalate if
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-[14px] text-ink-dim">
              {playbook.escalate.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
