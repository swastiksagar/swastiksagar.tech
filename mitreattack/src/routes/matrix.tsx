import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { TACTICS, TECHNIQUE_COUNT, SUBTECHNIQUE_COUNT } from "@/data/attack";

export const Route = createFileRoute("/matrix")({
  head: () => {
    const title = "ATT&CK Navigator Matrix — MITRE ATT&CK Field Reference";
    const description = `A lightweight kill-chain grid of all 14 MITRE ATT&CK enterprise tactics, ${TECHNIQUE_COUNT} techniques and ${SUBTECHNIQUE_COUNT} sub-techniques.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: "https://swastiksagar.tech/apps/mitreattack/matrix" },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: "https://swastiksagar.tech/apps/mitreattack/matrix" }],
    };
  },
  component: MatrixPage,
});

function MatrixPage() {
  const [showSubTechniques, setShowSubTechniques] = useState(false);
  const [layout, setLayout] = useState<"side" | "stacked">("side");

  useEffect(() => {
    const narrowScreen = window.matchMedia("(max-width: 900px)");
    const updateLayout = () => setLayout(narrowScreen.matches ? "stacked" : "side");
    updateLayout();
    narrowScreen.addEventListener("change", updateLayout);
    return () => narrowScreen.removeEventListener("change", updateLayout);
  }, []);

  return (
    <>
      <section className="page-wrap matrix-intro">
        <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-ink-dim">
          <Link to="/" className="link-inline">
            Matrix
          </Link>
          <span className="px-2">/</span>
          <span>Navigator</span>
        </nav>

        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-dim">
          Enterprise · {TACTICS.length} tactics · {TECHNIQUE_COUNT} techniques
        </p>
        <h1 className="font-serif text-[clamp(34px,5vw,54px)] font-semibold leading-[1.05] tracking-tight">
          ATT&amp;CK Navigator
        </h1>
        <p className="mt-4 max-w-[68ch] text-[15.5px] leading-relaxed text-ink-dim">
          Explore every Enterprise tactic in order. Use the side-by-side view to trace the kill
          chain, or switch to stacked view for a compact overview. Select any technique for its
          defensive notes.
        </p>
      </section>

      <section className="matrix-board-section" aria-label="Enterprise ATT&CK matrix">
        <div className="matrix-board">
          <div className="matrix-toolbar">
            <div className="matrix-toolbar-copy">
              <p className="matrix-toolbar-title">Enterprise tactics</p>
              <p>Choose a technique to open its detection notes.</p>
            </div>
            <div className="matrix-toolbar-actions">
              <div className="matrix-control-group" role="group" aria-label="Matrix layout">
                <button
                  type="button"
                  className={`matrix-control ${layout === "side" ? "is-active" : ""}`}
                  aria-pressed={layout === "side"}
                  onClick={() => setLayout("side")}
                >
                  Side-by-side
                </button>
                <button
                  type="button"
                  className={`matrix-control ${layout === "stacked" ? "is-active" : ""}`}
                  aria-pressed={layout === "stacked"}
                  onClick={() => setLayout("stacked")}
                >
                  Stacked
                </button>
              </div>
              <button
                type="button"
                className={`matrix-control matrix-subtechnique-toggle ${showSubTechniques ? "is-active" : ""}`}
                aria-pressed={showSubTechniques}
                onClick={() => setShowSubTechniques((visible) => !visible)}
              >
                {showSubTechniques ? "Hide sub-techniques" : "Show sub-techniques"}
              </button>
            </div>
          </div>

          <div className="matrix-scroll">
            <ol className="matrix-grid" data-layout={layout}>
              {TACTICS.map((tactic) => (
                <li key={tactic.slug} className="matrix-column">
                  <div className="matrix-tactic-heading">
                    <span className="matrix-tactic-order">
                      {String(tactic.order).padStart(2, "0")} · {tactic.id}
                    </span>
                    <h2>{tactic.name}</h2>
                    <span className="matrix-tactic-count">
                      {tactic.techniques.length} techniques
                    </span>
                  </div>
                  <ol className="matrix-technique-list">
                    {tactic.techniques.map((technique) => (
                      <li key={technique.id}>
                        <Link
                          to="/techniques/$id"
                          params={{ id: technique.id }}
                          className="matrix-technique"
                          title={`${technique.id} · ${technique.name}`}
                        >
                          <span className="matrix-technique-id">{technique.id}</span>
                          <span className="matrix-technique-name">{technique.name}</span>
                          {technique.subTechniques && technique.subTechniques.length > 0 && (
                            <span className="matrix-subtechnique-count">
                              +{technique.subTechniques.length}
                            </span>
                          )}
                        </Link>
                        {showSubTechniques &&
                          technique.subTechniques &&
                          technique.subTechniques.length > 0 && (
                            <ol className="matrix-subtechnique-list">
                              {technique.subTechniques.map((subTechnique) => (
                                <li key={subTechnique.id}>
                                  <Link
                                    to="/techniques/$id"
                                    params={{ id: subTechnique.id }}
                                    title={`${subTechnique.id} · ${subTechnique.name}`}
                                  >
                                    {subTechnique.name}
                                  </Link>
                                </li>
                              ))}
                            </ol>
                          )}
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className="matrix-footnote">
          Real intrusions do not follow a straight line. Use this reference to orient investigations
          and identify detection gaps, then validate priorities against your environment.
        </p>
      </section>
    </>
  );
}
