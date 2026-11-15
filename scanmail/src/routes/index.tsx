import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { analyzeEmail, type AnalysisResult, type Severity } from "@/lib/phishing-analyzer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Email Checker — Private Phishing Analysis | Swastik Sagar" },
      {
        name: "description",
        content:
          "Paste a suspicious email and get an instant risk score with every red flag explained — sender spoofing, fake links, urgent language. Free and private.",
      },
      {
        property: "og:title",
        content: "Email Checker — Private Phishing Analysis",
      },
      {
        property: "og:description",
        content:
          "Instant phishing risk score for any email you paste, with each red flag explained. No signup, nothing leaves your browser.",
      },
      { property: "og:url", content: "https://swastiksagar.tech/apps/emailchecker/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Email Checker — Private Phishing Analysis" },
      {
        name: "twitter:description",
        content:
          "Instant phishing risk score for any email you paste, with each red flag explained. No signup, nothing leaves your browser.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/70df4a62-ebf2-409b-b9c4-b35f27e76e38/id-preview-2b0cba76--4c86ccbf-eeb6-4df1-8bbb-0bc9d55590ac.lovable.app-1784896351501.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/70df4a62-ebf2-409b-b9c4-b35f27e76e38/id-preview-2b0cba76--4c86ccbf-eeb6-4df1-8bbb-0bc9d55590ac.lovable.app-1784896351501.png",
      },
    ],
    links: [{ rel: "canonical", href: "https://swastiksagar.tech/apps/emailchecker/" }],
  }),
  component: Home,
});

const SAMPLE = `From: PayPal Security <security-alert@paypa1-verify.com>
Reply-To: recover@mail-secure.ru
Subject: URGENT: Your account has been LIMITED!!!

Dear Customer,

We detected unauthorized activity on your PayPal account. Your account has been
suspended and will be permanently locked within 24 hours unless you verify your
identity IMMEDIATELY.

Please confirm your password and credit card here:
<a href="http://192.168.44.10/paypa1-login/verify">https://www.paypal.com/signin</a>

Or use the short link: https://bit.ly/3xR-verify

Act now to avoid permanent closure of your account!!!
`;

function severityStyles(sev: Severity) {
  if (sev === "high") return "border-danger/40 bg-danger/5 text-danger";
  if (sev === "medium") return "border-warn/40 bg-warn/5 text-warn";
  return "border-border bg-secondary text-muted-foreground";
}

function verdictTheme(v: AnalysisResult["verdict"]) {
  if (v === "Likely Phishing") return { color: "text-danger", bar: "bg-danger" };
  if (v === "Suspicious") return { color: "text-warn", bar: "bg-warn" };
  return { color: "text-safe", bar: "bg-safe" };
}

function Home() {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  const result = useMemo(() => (submitted ? analyzeEmail(submitted) : null), [submitted]);

  return (
    <div className="min-h-screen text-foreground">
      <header className="site-brand-header sticky top-0 z-30 border-b border-border backdrop-blur">
        <div className="wrap flex min-h-[76px] items-center justify-between gap-4">
          <Link to="/" className="flex min-w-0 items-center gap-3 font-sans text-sm font-extrabold tracking-tight text-foreground">
            <span className="site-brand-icon" aria-hidden="true"><i /><i /><i /><i /></span>
            <span className="truncate">Email Checker</span>
          </Link>
          <a className="site-brand-home shrink-0" href="https://swastiksagar.tech/">Portfolio</a>
        </div>
      </header>

      <main className="wrap pb-20 pt-[70px]">
        <section>
          <p className="fig-label">FIG_000 · heuristic scanner v1.0 · 2026 · client-side · free</p>
          <h1 className="mt-5 text-[clamp(38px,6vw,64px)] font-semibold leading-[1.02] tracking-[-0.01em]">
            Phishing Email
            <br />
            <span className="font-normal text-faint">Checker</span>
          </h1>
          <p className="lede mt-[22px]">
            Paste any suspicious message — headers, body, links, the works. Every scan returns a
            risk score, a plain "why this is a flag" line, and a term-by-term breakdown of exactly
            what tripped.
          </p>
          <p className="mt-5 max-w-[68ch] font-mono text-[12.5px] leading-relaxed text-faint">
            Organized the way an analyst triages: sender forensics, link intelligence, language
            pressure, payload risk. Nothing is uploaded. It runs on your own machine, in your own
            browser.
          </p>
          <div className="mt-[30px] flex flex-wrap gap-3">
            <a href="#scanner" className="btn-base btn-primary">
              Scan an email →
            </a>
            <Link to="/blog/how-to-spot-a-phishing-email" className="btn-base btn-ghost">
              Read the guide
            </Link>
          </div>
        </section>

        <section className="glance-band bleed mt-14" aria-label="Scanner at a glance">
          <div className="glance-wrap">
            <p className="glance-heading">Scanner at a glance</p>
            <div className="glance-grid">
              {[
                { label: "Detection rules", value: "40+", fill: 82 },
                { label: "Signal categories", value: "6", fill: 60 },
                { label: "Avg. scan time", value: "<1s", fill: 95 },
                { label: "Data uploaded", value: "0 KB", fill: 100 },
                { label: "Price", value: "Free", fill: 100 },
              ].map((s) => (
                <div className="glance-stat" key={s.label}>
                  <div className="glance-stat-label">
                    <span>{s.label}</span>
                    <span className="glance-stat-value">{s.value}</span>
                  </div>
                  <div
                    className="glance-meter"
                    role="meter"
                    aria-label={s.label}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={s.fill}
                  >
                    <span style={{ width: `${s.fill}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>




        <section id="scanner" className="pt-14" aria-labelledby="scanner-heading">
          <p className="fig-label">FIG_001 · the scanner</p>
          <h2 id="scanner-heading" className="mt-3.5 text-[26px]">
            Paste the email
          </h2>


          <div className="mt-6 grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)]">
            <div className="min-w-0 rounded-2xl border border-border bg-card p-4 shadow-card sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                  Raw message
                </label>
                <div className="flex shrink-0 gap-2 font-mono text-[11px]">
                  <button
                    type="button"
                    onClick={() => setInput(SAMPLE)}
                    className="rounded-lg border border-border px-3 py-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                  >
                    Load example
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInput("");
                      setSubmitted(null);
                    }}
                    className="rounded-lg border border-border px-3 py-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <textarea
                id="email"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={"From: ...\nSubject: ...\n\n(body)"}
                className="mt-4 h-72 w-full resize-y rounded-xl border border-border-hard bg-background p-4 font-mono text-[13px] leading-relaxed text-foreground outline-none placeholder:text-faint focus:border-primary"
                spellCheck={false}
              />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="min-w-0 font-mono text-[11px] text-muted-foreground">
                  {input.length.toLocaleString()} characters
                </p>
                <button
                  type="button"
                  disabled={input.trim().length < 10}
                  onClick={() => setSubmitted(input)}
                  className="btn-base btn-primary shrink-0 disabled:opacity-30"
                >
                  Analyze email →
                </button>
              </div>
            </div>
            <div className="min-w-0">{result ? <ResultPanel result={result} /> : <EmptyPanel />}</div>
          </div>
        </section>

        <section className="mt-14 border-t border-border pt-14" aria-labelledby="features-heading">
          <p className="fig-label">FIG_002 · what gets checked</p>
          <h2 id="features-heading" className="mt-3.5 text-[26px]">
            Key security checks
          </h2>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Sender forensics",
                body: "Detects display-name spoofing, Reply-To mismatches, and brand impersonation from free email accounts.",
              },
              {
                title: "Link intelligence",
                body: "Flags look-alike domains, punycode, URL shorteners, raw IPs, and hidden mismatched hyperlinks.",
              },
              {
                title: "Private by design",
                body: "Analysis runs entirely in your browser. Your email content never leaves this page.",
              },
            ].map((f, i) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <dt className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.06em] text-faint">
                  {String(i + 1).padStart(2, "0")} · {f.title}
                </dt>
                <dd className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{f.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-14 border-t border-border pt-14" aria-labelledby="learn-heading">
          <p className="fig-label">FIG_003 · further reading</p>
          <h2 id="learn-heading" className="mt-3.5 text-[26px]">
            Learn to spot phishing yourself
          </h2>
          <p className="prose-p mt-3.5">
            The guide walks through the 10 red flags in a phishing email, how to read message
            headers, and exactly what to do if you already clicked a link.
          </p>
          <Link
            to="/blog/how-to-spot-a-phishing-email"
            className="mt-5 inline-flex border-b border-primary font-mono text-[12.5px] text-primary transition hover:opacity-70"
          >
            How to spot a phishing email →
          </Link>
        </section>

        <section className="mt-14 border-t border-border pt-10">
          <p className="max-w-[68ch] font-mono text-[12px] leading-relaxed text-muted-foreground">
            <span className="text-warn">Heads up —</span> Email Checker is a heuristic aid, not a
            verdict. When in doubt, do not click links or reply; verify the sender through an
            independent, trusted channel.
          </p>
        </section>
      </main>

      <footer className="border-t border-border py-[34px]">
        <div className="wrap font-mono text-[12px] text-muted-foreground">
          <a className="font-semibold text-foreground hover:text-accent" href="https://swastiksagar.tech/">← Back to Swastik Sagar’s portfolio</a>
          <span className="ml-3">Email Checker runs client-side</span>
        </div>
      </footer>

    </div>
  );
}

function EmptyPanel() {
  return (
    <div className="flex h-full min-h-[18rem] flex-col justify-center rounded-2xl border border-dashed border-border-hard bg-secondary/50 p-6 sm:p-8">
      <p className="fig-label">Awaiting scan</p>
      <p className="mt-2 max-w-md text-[15px] text-muted-foreground">

        Paste an email above and hit <span className="text-foreground">Analyze</span> to see the
        full risk breakdown here.
      </p>
    </div>
  );
}

function ResultPanel({ result }: { result: AnalysisResult }) {
  const theme = verdictTheme(result.verdict);
  return (
    <div className="h-full rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
      <p className="fig-label">Result</p>
      <div className="mt-3 flex items-end justify-between gap-4 border-b border-border pb-5">
        <div className={`text-3xl ${theme.color}`}>{result.verdict}</div>
        <div className="text-right">
          <div className={`font-mono text-3xl font-semibold leading-none ${theme.color}`}>
            {result.score}
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
            risk / 100
          </div>
        </div>
      </div>

      <div className="mt-4 h-1.5 w-full bg-secondary">
        <div className={`h-full ${theme.bar} transition-all`} style={{ width: `${result.score}%` }} />
      </div>

      {(result.stats.fromDomain || result.stats.subject) && (
        <dl className="mt-5 space-y-1.5 font-mono text-[12px]">
          {result.stats.subject && (
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-faint">Subject</dt>
              <dd className="truncate">{result.stats.subject}</dd>
            </div>
          )}
          {result.stats.fromDomain && (
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-faint">From domain</dt>
              <dd className="truncate">{result.stats.fromDomain}</dd>
            </div>
          )}
          <div className="flex gap-3">
            <dt className="w-24 shrink-0 text-faint">Links</dt>
            <dd>
              {result.stats.urls.length} found ·{" "}
              <span className={result.stats.suspiciousUrls.length ? "text-danger" : "text-safe"}>
                {result.stats.suspiciousUrls.length} suspicious
              </span>
            </dd>
          </div>
        </dl>
      )}

      <div className="mt-7">
        <p className="fig-label">Breakdown ({result.findings.length})</p>
        <ul className="mt-3 space-y-2">
          {result.findings.map((f) => (
            <li key={f.id} className={`border-l-2 py-2 pl-3 ${severityStyles(f.severity)}`}>
              <div className="grid grid-cols-[minmax(0,1fr)_4.5rem] items-baseline gap-3">
                <span className="text-[15px] font-semibold">{f.title}</span>
                <span className="text-left font-mono text-[10px] uppercase tracking-[0.1em] opacity-80">
                  {f.severity}
                </span>
              </div>
              <p className="mt-1 pr-[4.5rem] text-[13px] leading-relaxed opacity-90">{f.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
