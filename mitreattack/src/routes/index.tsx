import { createFileRoute, Link } from "@tanstack/react-router";
import { TACTICS, TACTIC_COUNT, TECHNIQUE_COUNT, SUBTECHNIQUE_COUNT } from "@/data/attack";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MITRE ATT&CK Matrix — Plain-Language Field Reference" },
      {
        name: "description",
        content:
          "All 14 MITRE ATT&CK enterprise tactics in kill-chain order, each with key techniques and the exact telemetry that detects them. Written for working SOC analysts.",
      },
      {
        property: "og:title",
        content: "MITRE ATT&CK Matrix — Plain-Language Field Reference",
      },
      {
        property: "og:description",
        content: `14 tactics, ${TECHNIQUE_COUNT} techniques, ${SUBTECHNIQUE_COUNT} sub-techniques, and the log sources that catch them. A free field reference for SOC analysts.`,
      },
      { property: "og:url", content: "https://swastiksagar.tech/apps/mitreattack/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://swastiksagar.tech/apps/mitreattack/" }],
  }),
  component: Index,
});

const STATS = [
  { label: "Tactics", value: String(TACTIC_COUNT) },
  { label: "Techniques", value: String(TECHNIQUE_COUNT) },
  { label: "Sub-techniques", value: String(SUBTECHNIQUE_COUNT) },
  { label: "Matrix", value: "Enterprise" },
  { label: "Kill-chain order", value: "Recon → Impact" },
];

function Index() {
  return (
    <>
      <section className="page-wrap mitre-home-hero">
        <div className="mitre-home-hero-panel">
          <p className="mitre-eyebrow">FIG_001 · ENTERPRISE MATRIX · V17 · FIELD REFERENCE</p>
          <h1>
            MITRE ATT&amp;CK <span>in kill-chain order</span>
          </h1>
          <p className="mitre-home-lede">
            Fourteen tactics, {TECHNIQUE_COUNT} techniques, {SUBTECHNIQUE_COUNT} sub-techniques, and
            for every single one, the log source that actually catches it. A practical reference for
            analysts investigating alerts and building detection coverage.
          </p>
          <p className="mitre-home-note">
            Explore each tactic, understand why it matters on shift, and follow
            technique-by-technique detection guidance.
          </p>
          <div className="mitre-home-actions">
            <a href="#matrix" className="mitre-button mitre-button-primary">
              Open the matrix →
            </a>
            <a href="#how" className="mitre-button mitre-button-secondary">
              How to read it
            </a>
          </div>
        </div>
      </section>

      <div className="mitre-stats-band">
        <dl className="page-wrap mitre-stats-grid">
          {STATS.map((s) => (
            <div className="mitre-stat-card" key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section id="how" className="page-wrap mitre-explainer scroll-mt-20">
        <div className="mitre-section-heading">
          <p className="mitre-eyebrow">A QUICK FIELD GUIDE</p>
          <h2>How to read the matrix</h2>
        </div>
        <p className="mitre-prose">
          A <strong className="font-semibold text-foreground">tactic</strong> is the adversary's
          goal — the <em>why</em>. A{" "}
          <strong className="font-semibold text-foreground">technique</strong> is how they achieve
          it, and carries an ID like{" "}
          <code className="font-mono text-[13px] text-foreground">T1059</code>. The matrix reads
          left to right as a rough kill chain, but real intrusions loop: an adversary discovers,
          moves laterally, discovers again, escalates, and returns to credential access half a dozen
          times before impact.
        </p>
        <p className="mitre-prose">
          Use it three ways. As a{" "}
          <strong className="font-semibold text-foreground">triage vocabulary</strong>, so your
          alert notes say "T1003 OS credential dumping" instead of "weird lsass thing". As a{" "}
          <strong className="font-semibold text-foreground">coverage map</strong>, colouring in the
          techniques your detections actually cover and staring at the gaps. And as a{" "}
          <strong className="font-semibold text-foreground">hunting backlog</strong> — pick one
          uncovered technique per week and go looking.
        </p>
        <p className="mitre-prose">
          What the matrix will not tell you is priority. Fourteen tactics are not equally likely.
          Initial access, execution, credential access, and lateral movement account for most of
          what a Tier 1 analyst sees in a year.
        </p>
      </section>

      <section id="matrix" className="page-wrap mitre-tactic-section scroll-mt-20">
        <div className="mitre-section-heading">
          <p className="mitre-eyebrow">
            Enterprise · {TACTIC_COUNT} tactics · {TECHNIQUE_COUNT} techniques ·{" "}
            {SUBTECHNIQUE_COUNT} sub-techniques
          </p>
          <h2>The matrix</h2>
          <p className="mitre-prose">
            Each column is a tactic, listed in the order an intrusion typically progresses. Open one
            to read its full write-up and the detection notes for every technique inside it.
          </p>
        </div>

        <ol className="mitre-tactic-cards">
          {TACTICS.map((t) => (
            <li key={t.slug}>
              <Link
                to="/tactics/$slug"
                params={{ slug: t.slug }}
                className="mitre-tactic-card group"
              >
                <div className="mitre-tactic-card-meta">
                  <span>
                    {String(t.order).padStart(2, "0")} · {t.id}
                  </span>
                  <span>{t.techniques.length} tech</span>
                </div>
                <h3>{t.name}</h3>
                <p>{t.objective}</p>
                <ul className="mitre-technique-tags">
                  {t.techniques.slice(0, 3).map((tech) => (
                    <li key={tech.id}>{tech.id}</li>
                  ))}
                  {t.techniques.length > 3 && (
                    <li className="mitre-technique-more">+{t.techniques.length - 3}</li>
                  )}
                </ul>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section id="triage" className="page-wrap mitre-triage scroll-mt-20">
        <div className="mitre-section-heading">
          <p className="mitre-eyebrow">INVESTIGATION WORKFLOW</p>
          <h2>Mapping an alert on shift</h2>
        </div>
        <p className="mitre-prose">
          Four questions turn a raw alert into an ATT&amp;CK-mapped ticket that the next analyst can
          actually pick up.
        </p>
        <ol className="mitre-triage-list">
          {[
            {
              q: "What was the adversary trying to achieve?",
              a: "That answer is the tactic. If lsass.exe was accessed, the goal was credentials — TA0006, regardless of which tool did it.",
            },
            {
              q: "What specific method did they use?",
              a: "That is the technique. Credential access via comsvcs.dll minidump is T1003.001, LSASS Memory. Record the sub-technique when you can prove it.",
            },
            {
              q: "What came before it?",
              a: "Pivot backwards a tactic. Credential access implies execution implies initial access. Go find those events — they are almost always in your telemetry already.",
            },
            {
              q: "What comes next if I am wrong about scope?",
              a: "Pivot forwards. After credential access comes lateral movement. Search for Type 3 logons from that host in the following hour before you close the ticket.",
            },
          ].map((row, i) => (
            <li key={row.q}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{row.q}</h3>
                <p>{row.a}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
