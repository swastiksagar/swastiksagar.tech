import { useEffect, useState } from "react";
import { CERTS, EXPS, GH, LI, MAIL, SIDE_PROJECT_PAGES, TOOLS, WORK } from "./data";

const NAV_LINKS = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Certifications", "#certifications"],
];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      {diagonal
        ? <path d="M5 15 15 5M6 5h9v9" />
        : <path d="M3 10h13m-5-5 5 5-5 5" />}
    </svg>
  );
}

function SideProjectIcon({ theme }) {
  const paths = {
    soc: <><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H12v15H5.5A2.5 2.5 0 0 0 3 20.5z" /><path d="M21 5.5A2.5 2.5 0 0 0 18.5 3H12v15h6.5a2.5 2.5 0 0 1 2.5 2.5z" /><path d="M6.5 7H9m-2.5 3H9m6-3h2.5M15 10h2.5" /></>,
    firewall: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" /><path d="m9 12 2 2 4-4" /></>,
    block: <><circle cx="12" cy="12" r="9" /><path d="m5.6 5.6 12.8 12.8" /></>,
    resources: <><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z" /><path d="M4 4.5v17m5-15h7m-7 4h7" /></>,
    attack: <><path d="M12 3 19 6v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3z" /><path d="m9 12 2 2 4-4" /></>,
    emailchecker: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6m-5 6 4 4" /></>,
    snort: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3" /><path d="M12 3.5V1m8.5 11H23M12 20.5V23M3.5 12H1m17-6 1.8-1.8M5.2 18.8l-1.8 1.8m14.1 0-1.8-1.8M5.2 5.2 3.4 3.4" /></>,
    secureboot: <><path d="M12 3 19 6v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3z" /><circle cx="12" cy="11" r="2" /><path d="M12 13v3" /></>,
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      {paths[theme] ?? paths.resources}
    </svg>
  );
}

function Clock() {
  const [time, setTime] = useState(() =>
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date())
  );

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };
    const timer = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return <time>{time}</time>;
}

function ProjectPreview({ project }) {
  const rows = project.th.rows;

  return (
    <div className={`project-preview preview-${project.theme}`} aria-hidden="true">
      {project.theme === "splunk" && (
        <div className="mock-dashboard">
          <div className="mock-heading">
            <span className="mock-app-mark">S</span>
            <span><b>Security overview</b><small>Live event monitoring</small></span>
            <span className="mock-live"><i /> LIVE</span>
          </div>
          <div className="mock-stat-grid">
            <div><small>DNS EVENTS</small><b>2,563</b><span>+12.8%</span></div>
            <div><small>BLOCKED</small><b>377</b><span>LAST 24H</span></div>
            <div><small>DATA SOURCES</small><b>03</b><span>HEALTHY</span></div>
          </div>
          <div className="mock-chart-panel">
            <div><b>Event activity</b><span>Last 24 hours</span></div>
            <div className="dashboard-bars">{Array.from({ length: 22 }, (_, index) => <i key={index} />)}</div>
            <div className="chart-axis"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span></div>
          </div>
          <div className="mock-mini-table">
            <div className="mock-table-heading"><b>Top blocked domains</b><span>EVENTS</span></div>
            {rows.slice(0, 2).map(([label, value]) => (
              <div className="mock-table-row" key={label}><span><i />{label}</span><b>{value}</b></div>
            ))}
          </div>
        </div>
      )}

      {project.theme === "wazuh" && (
        <div className="mock-alert-console">
          <div className="mock-console-heading">
            <span className="mock-console-logo">W</span>
            <span><b>Security alerts</b><small>Endpoint monitoring · 3 events</small></span>
            <span className="mock-filter">FILTER <i>⌄</i></span>
          </div>
          <div className="mock-alert-summary"><span><i className="alert-red" />DETECTION STREAM</span><b>03 EVENTS</b><span>LAB ENVIRONMENT</span></div>
          <div className="mock-alert-list">
            {rows.map(([label, value], index) => (
              <div className="mock-alert-row" key={label}>
                <i className={`alert-severity alert-level-${index}`} />
                <span><b>{label}</b><small>Endpoint telemetry · Wazuh lab</small></span>
                <span className="alert-rule">{value}</span>
                <span className="alert-chevron">›</span>
              </div>
            ))}
          </div>
          <div className="mock-console-footer"><span><i /> File integrity · endpoint events · detections</span><span>MITRE ATT&amp;CK ↗</span></div>
        </div>
      )}

      {project.theme === "vulnerability" && (
        <div className="mock-scan-report">
          <div className="mock-report-header">
            <span className="mock-report-icon">⌕</span>
            <span><b>Scan report</b><small>Vulnerability assessment</small></span>
            <span className="mock-report-status"><i /> COMPLETE</span>
          </div>
          <div className="mock-risk-overview">
            <div className="risk-score"><strong>6.5</strong><span>MEDIUM</span></div>
            <div className="risk-copy"><b>Risk overview</b><small>Findings reviewed and prioritized</small><span className="risk-meter"><i /></span><small>Remediation in progress</small></div>
            <div className="risk-count"><b>02</b><small>FINDINGS</small></div>
          </div>
          <div className="mock-findings">
            <div className="mock-findings-title"><b>Priority findings</b><span>SEVERITY / CVSS</span></div>
            {rows.slice(0, 2).map(([label, value], index) => (
              <div className="mock-finding-row" key={label}>
                <span className={`finding-priority priority-${index}`} />
                <span>{label}</span>
                <b>{value.replace("cvss ", "")}</b>
                <span className={`finding-state state-${index}`}>{index === 0 ? "MEDIUM" : "REVIEW"}</span>
              </div>
            ))}
            <div className="mock-remediation"><i /> {rows[2][1]} · {rows[2][0]}</div>
          </div>
        </div>
      )}

      {project.theme === "malware" && (
        <div className="mock-malware-app">
          <div className="mock-malware-header">
            <span className="malware-brand-icon">⌘</span>
            <span><b>Malware Insight</b><small>File analysis workspace</small></span>
            <span className="analysis-badge"><i /> ANALYZED</span>
          </div>
          <div className="mock-file-card">
            <span className="file-icon">FILE</span>
            <span><b>sample.exe</b><small>PE executable · local analysis</small></span>
            <span className="file-menu">···</span>
          </div>
          <div className="mock-hash-card">
            <div><span>SHA-256</span><b>{rows[0][1]}</b></div>
            <div><span>MD5</span><b>{rows[1][1]}</b></div>
          </div>
          <div className="mock-ioc-header"><b>Extracted indicators</b><span>IOC SUMMARY</span></div>
          <div className="mock-ioc-grid">
            <div><b>04</b><span>DOMAINS</span></div>
            <div><b>02</b><span>IP ADDRESSES</span></div>
            <div><b>03</b><span>PE SECTIONS</span></div>
          </div>
          <div className="mock-analysis-footer"><span>● Analysis stays in your browser</span><span>Export report ↓</span></div>
        </div>
      )}

      {(project.theme === "attack" || project.theme === "emailchecker") && (
        <div className={`mock-reference-app mock-${project.theme}`}>
          <div className="mock-reference-heading">
            <span className="mock-reference-mark">{project.theme === "attack" ? "A" : "E"}</span>
            <span><b>{project.theme === "attack" ? "ATT&CK Field Reference" : "Email Checker"}</b><small>{project.theme === "attack" ? "Enterprise · tactics & detections" : "Client-side · heuristic analysis"}</small></span>
            <span className="mock-reference-status"><i /> {project.theme === "attack" ? "REFERENCE" : "PRIVATE"}</span>
          </div>
          <div className="mock-reference-metrics">
            {project.theme === "attack"
              ? [["14", "TACTICS"], ["TECHNIQUES", "INDEXED"], ["DETECTION", "NOTES"]].map(([value, label]) => (
                <div key={label}><b>{value}</b><span>{label}</span></div>
              ))
              : [["40+", "CHECKS"], ["0 KB", "UPLOADED"], ["<1s", "TYPICAL"]].map(([value, label]) => (
                <div key={label}><b>{value}</b><span>{label}</span></div>
              ))}
          </div>
          <div className="mock-reference-list">
            {rows.map(([label, value], index) => (
              <div key={label}><i>{String(index + 1).padStart(2, "0")}</i><span>{label}</span><b>{value}</b></div>
            ))}
          </div>
        </div>
      )}
      <span className="preview-index">{String(WORK.indexOf(project) + 1).padStart(2, "0")}</span>
    </div>
  );
}

function ProjectCard({ project, index, onSelect }) {
  const className = `project-card${index === 0 ? " project-card-featured" : ""}`;
  const content = (
    <>
      <ProjectPreview project={project} />
      <span className="project-meta">
        <span>{project.o}</span>
        <span>{project.d}</span>
      </span>
      <span className="project-title">
        <span>{project.t}</span>
        <span className="round-arrow"><ArrowIcon diagonal /></span>
      </span>
      <span className="project-summary">{project.s}</span>
      <span className="tag-list">
        {project.tags.slice(0, 3).map((tag) => <span className="tag" key={tag}>{tag}</span>)}
      </span>
    </>
  );

  return (
    <button className={className} onClick={() => onSelect(project)} aria-label={`View details for ${project.t}`}>
      {content}
    </button>
  );
}

function ProjectDialog({ project, onClose }) {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <section
        className="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="dialog-close" onClick={onClose} aria-label="Close project details">×</button>
        <span className="eyebrow">PROJECT NOTES · {project.o}</span>
        <h2 id="dialog-title">{project.t}</h2>
        <p className="dialog-date">{project.d}</p>
        <ul className="project-details">
          {project.b.map((detail) => <li key={detail}>{detail}</li>)}
        </ul>
        <div className="tag-list dialog-tags">
          {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        </div>
        <div className="dialog-actions">
          {project.r && (
            <a className="button button-dark" href={`${GH}/${project.r}`} target="_blank" rel="noopener noreferrer">
              View on GitHub <ArrowIcon diagonal />
            </a>
          )}
          {project.live && (
            <a className={project.r ? "button button-outline" : "button button-dark"} href={project.live} target="_blank" rel="noopener noreferrer">
              {project.r ? "Live demo" : "Open project"} <ArrowIcon diagonal />
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

function SideProjectPage({ project, onNavigate }) {
  const projectIndex = SIDE_PROJECT_PAGES.indexOf(project) + 1;

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content");
    document.title = `${project.title} — Side Project | Swastik Sagar`;
    description?.setAttribute("content", project.description);

    return () => {
      document.title = previousTitle;
      if (previousDescription !== null) description?.setAttribute("content", previousDescription);
    };
  }, [project]);

  return (
    <main className={`side-project-page side-project-${project.theme}`} id="top">
      <section className="side-project-hero">
        <div className="side-project-copy">
          <a className="side-project-back" href="/#experiments">← Back to side projects</a>
          <p className="eyebrow">{project.category} <span>{String(projectIndex).padStart(2, "0")} / {String(SIDE_PROJECT_PAGES.length).padStart(2, "0")}</span></p>
          <h1>{project.title}</h1>
          <p className="side-project-summary">{project.summary}</p>
          <p className="side-project-description">{project.description}</p>
          <div className="side-project-actions">
            <a className="button button-dark" href={project.repo} target="_blank" rel="noopener noreferrer">
              View on GitHub <ArrowIcon diagonal />
            </a>
            {project.appPath && (
              <a className="button button-outline" href={project.appPath}>
                {project.theme === "soc" ? "Open full curriculum" : ["attack", "emailchecker"].includes(project.theme) ? "Live demo" : "Open project"} <ArrowIcon diagonal />
              </a>
            )}
            {project.live && (
              <a className="button button-outline" href={project.live} target="_blank" rel="noopener noreferrer">
                {project.theme === "block" ? "Get the blocklist" : project.appPath ? "Original live site" : "Visit project"} <ArrowIcon diagonal />
              </a>
            )}
          </div>
        </div>
        <div className={`side-project-art side-art-${project.theme}`} aria-hidden="true">
          <span className="side-art-label">PROJECT FILE · 0{projectIndex}</span>
          <div className="side-art-center">
            <span className="side-art-symbol"><SideProjectIcon theme={project.theme} /></span>
            <span>{project.title}</span>
          </div>
          <span className="side-art-orbit side-art-orbit-one" />
          <span className="side-art-orbit side-art-orbit-two" />
          <span className="side-art-footer">SWASTIK SAGAR <i /> SECURITY PROJECTS</span>
        </div>
      </section>

      <section className="side-project-stats" aria-label={`${project.title} project details`}>
        {project.stats.map(([value, label]) => (
          <div key={label}><strong>{value}</strong><span>{label}</span></div>
        ))}
        <div className="side-project-stack">
          <span>BUILT AROUND</span>
          <div>{project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div>
        </div>
      </section>

      <section className="side-project-highlights">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHAT’S INSIDE <span>FEATURE OVERVIEW</span></p>
            <h2>Small details.<br /><span>Useful by design.</span></h2>
          </div>
          <p className="section-intro">A closer look at the project, based on the information in its README.</p>
        </div>
        <div className="side-highlight-grid">
          {project.highlights.map(([title, description], index) => (
            <article className="side-highlight-card" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      {project.resources && (
        <section className="side-resource-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">OPEN THE TOOLBOX <span>EXTERNAL LINKS</span></p>
              <h2>Learn, inspect,<br /><span>and experiment.</span></h2>
            </div>
            <p className="section-intro">These links are maintained by their respective projects. Check licensing and verify guidance before relying on it.</p>
          </div>
          <div className="side-resource-grid">
            {project.resources.map(([title, description, href], index) => (
              <a className="side-resource-card" href={href} target="_blank" rel="noopener noreferrer" key={href}>
                <span>0{index + 1}</span>
                <strong>{title}</strong>
                <small>{description}</small>
                <ArrowIcon diagonal />
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="side-project-sections">
        {project.sections.map((section, index) => (
          <article className="side-detail-section" key={section.title}>
            <div className="side-detail-heading">
              <p className="eyebrow">FIELD NOTES <span>0{index + 1}</span></p>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>
            <div className="side-detail-list">
              {section.items.map(([title, description]) => (
                <div className="side-detail-row" key={title}>
                  <span className="side-detail-mark" />
                  <div><h3>{title}</h3><p>{description}</p></div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="side-project-cta">
        <p className="eyebrow eyebrow-light">KEEP EXPLORING <span>MORE PROJECTS</span></p>
        <h2>Curiosity, <span>in practice.</span></h2>
        <p>Browse the other side projects or return to the main portfolio.</p>
        <a
          className="button button-light"
          href="/#experiments"
          onClick={(event) => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            onNavigate("/", "experiments");
          }}
        >
          Back to all side projects <ArrowIcon />
        </a>
      </section>
    </main>
  );
}

const PRIVACY_CONTENT = [
  {
    heading: "1. Overview",
    body: "I respect your privacy. This website is a personal portfolio designed to showcase my work in cyber security. I do not track you, use cookies for analytics, or collect any personal information automatically."
  },
  {
    heading: "2. Information You Provide",
    body: "The only personal information I receive is what you voluntarily choose to send me via email. This may include:",
    list: [
      "Your name",
      "Email address",
      "Contents of your message"
    ]
  },
  {
    heading: "3. How I Use Information",
    body: "I use the information you provide solely to respond to your inquiries or discuss potential work opportunities. I do not sell, rent, or share your information with third parties for marketing purposes."
  },
  {
    heading: "4. Third-Party Links",
    body: "This site contains links to external platforms like GitHub, LinkedIn, and Netlify. Once you leave this website, their respective privacy policies apply. I am not responsible for the privacy practices of these third-party sites."
  },
  {
    heading: "5. Security",
    body: "While I strive to protect any information you share, no method of transmission over the internet is 100% secure. As a security professional, I take reasonable steps to ensure the integrity of this portfolio."
  },
  {
    heading: "6. Contact",
    body: "If you have any questions about this privacy policy, you can reach me at swastiksagar06@gmail.com."
  }
];

const TERMS_CONTENT = [
  {
    heading: "1. Acceptance of Terms",
    body: "By accessing this website, you agree to comply with these terms. This site is for informational and educational purposes regarding my professional skills and projects."
  },
  {
    heading: "2. Intellectual Property",
    body: "All content on this site, including text, design, and code samples, is owned by Swastik Sagar unless otherwise stated. While many projects are open-source on GitHub, the specific presentation on this site is protected."
  },
  {
    heading: "3. Educational Use",
    body: "The security labs and tools shared here are for educational and ethical testing purposes only. I am not responsible for any misuse of the information provided."
  },
  {
    heading: "4. Disclaimer",
    body: "This website and its content are provided on an 'as-is' basis. I make no warranties about the completeness or accuracy of the information. Use of the site is at your own risk."
  },
  {
    heading: "5. Limitation of Liability",
    body: "In no event shall Swastik Sagar be liable for any damages arising out of the use or inability to use the materials on this site."
  },
  {
    heading: "6. Changes",
    body: "I reserve the right to modify these terms at any time without prior notice. Continued use of the site constitutes acceptance of the updated terms."
  }
];

function LegalPage({ title, lastUpdated, content, onNavigate }) {
  useEffect(() => {
    document.title = `${title} | Swastik Sagar`;
    const favicon = document.querySelector('link[rel="icon"]');
    const originalHref = favicon?.getAttribute("href");
    if (favicon) {
      favicon.setAttribute("href", "/favicon-red.svg");
    }
    window.scrollTo(0, 0);

    return () => {
        if (favicon && originalHref) {
            favicon.setAttribute("href", originalHref);
        }
    };
  }, [title]);

  return (
    <main className="legal-page" id="top">
      <section className="side-project-hero legal-hero">
        <div className="side-project-copy">
          <a className="side-project-back" href="/" onClick={(e) => {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            onNavigate("/");
          }}>← Back to home</a>
          <p className="eyebrow">LEGAL <span>LAST UPDATED {lastUpdated}</span></p>
          <h1>{title}</h1>
          <p className="side-project-summary">Transparency and trust in security.</p>
          <p className="side-project-description">
            This document outlines the {title.toLowerCase()} for Swastik Sagar’s portfolio and projects.
          </p>
        </div>
        <div className="side-project-art side-art-resources" aria-hidden="true">
           <span className="side-art-label">LEGAL DOC</span>
           <div className="side-art-center">
             <span className="side-art-symbol"><SideProjectIcon theme="resources" /></span>
             <span>{title}</span>
           </div>
           <span className="side-art-orbit side-art-orbit-one" />
           <span className="side-art-orbit side-art-orbit-two" />
           <span className="side-art-footer">SWASTIK SAGAR <i /> SECURITY</span>
        </div>
      </section>

      <section className="content-section">
        <div className="legal-text-wrapper">
          {content.map((section, index) => (
            <div key={index} className="legal-section">
              <h3>{section.heading}</h3>
              {section.body && <p>{section.body}</p>}
              {section.list && (
                <ul>
                  {section.list.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const syncPathname = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", syncPathname);
    return () => window.removeEventListener("popstate", syncPathname);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      window.requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView());
    }
  }, [pathname]);

  const navigate = (path, hash = "") => {
    window.history.pushState({}, "", hash ? `${path}#${hash}` : path);
    setPathname(path);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleProjectNavigation = (event, path) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(path);
  };
  const activeSideProject = SIDE_PROJECT_PAGES.find((project) => pathname === `/projects/${project.slug}`);
  const isTerms = pathname === "/terms";
  const isPrivacy = pathname === "/privacy";
  const isUnknownProject = pathname.startsWith("/projects/") && !activeSideProject && !isTerms && !isPrivacy;

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href={pathname === "/" ? "#top" : "/"} aria-label="Swastik Sagar home" onClick={(e) => {
          if (pathname !== "/") return;
          if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          window.scrollTo(0, 0);
        }}>
          <span className="wordmark-icon" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>swastik<span className="wordmark-period">.</span></span>
        </a>

        <button
          className="mobile-menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>

        <nav id="primary-navigation" className={`primary-navigation${menuOpen ? " is-open" : ""}`}>
          {!activeSideProject && NAV_LINKS.map(([label, href]) => (
            <a href={pathname === "/" ? href : `/${href}`} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="nav-contact" href={MAIL}>Let’s talk <ArrowIcon diagonal /></a>
        </nav>
      </header>

      {activeSideProject ? (
        <SideProjectPage project={activeSideProject} onNavigate={navigate} />
      ) : isTerms ? (
        <LegalPage title="Terms & Conditions" lastUpdated="NOV 2026" content={TERMS_CONTENT} onNavigate={navigate} />
      ) : isPrivacy ? (
        <LegalPage title="Privacy Policy" lastUpdated="NOV 2026" content={PRIVACY_CONTENT} onNavigate={navigate} />
      ) : isUnknownProject ? (
        <main className="side-project-not-found" id="top">
          <p className="eyebrow">404 · PROJECT NOT FOUND</p>
          <h1>This project page doesn’t exist.</h1>
          <a className="button button-dark" href="/#experiments">Back to portfolio <ArrowIcon /></a>
        </main>
      ) : (
      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="availability"><span /> Open to meaningful security work</div>
            <p className="hero-kicker">CYBER SECURITY ANALYST <span>·</span> NOIDA, INDIA</p>
            <h1>Making the digital world <span className="highlight">harder to break.</span></h1>
            <p className="hero-description">
              I work across security monitoring, threat hunting, vulnerability management and GRC —
              turning noisy signals into practical, lasting protection.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">Explore my work <ArrowIcon /></a>
              <a className="text-link" href={MAIL}>Get in touch <ArrowIcon diagonal /></a>
            </div>
            <div className="hero-location"><span className="location-pin" /> Noida, IN <span className="location-divider">·</span> <Clock /> IST</div>
          </div>

          <div className="profile-stage">
            <div className="profile-halo" />
            <div className="profile-card">
              <img src="/photo.jpg" alt="Swastik Sagar outdoors in Noida" fetchpriority="high" />
              <div className="profile-card-shade" />
            </div>
            <div className="profile-caption">
              <span>THE PERSON BEHIND THE LOGS</span>
              <strong>Swastik Sagar</strong>
              <span>Analyst · Builder · Lifelong learner</span>
            </div>
            <span className="profile-status profile-security-badge"><i /><span>SECURITY</span></span>
            <div className="floating-note note-top"><span className="note-icon">↗</span><span><b>Signal to insight</b><small>Curiosity-led analysis</small></span></div>
            <div className="floating-note note-bottom"><span className="note-icon note-check">✓</span><span><b>Defense in depth</b><small>People · process · technology</small></span></div>
          </div>
        </section>

        <section className="stats-strip" aria-label="Portfolio highlights">
          <div><strong>{String(WORK.length).padStart(2, "0")}</strong><span>Hands-on projects</span></div>
          <div><strong>03</strong><span>Professional certifications</span></div>
          <div><strong>12<span className="stat-plus">+</span></strong><span>Tools in my toolkit</span></div>
          <div className="stats-note"><span className="status-dot" /> Always learning. Always improving.</div>
        </section>

        <section className="content-section work-section" id="work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SELECTED WORK <span>01 — {String(WORK.length).padStart(2, "0")}</span></p>
              <h2>Built to learn.<br /><span>Designed to defend.</span></h2>
            </div>
            <p className="section-intro">Practical labs and tools that turn security concepts into repeatable workflows.</p>
          </div>
          <div className="project-grid">
            {WORK.map((project, index) => (
              <ProjectCard key={project.t} project={project} index={index} onSelect={setSelectedProject} />
            ))}
          </div>
        </section>

        <section className="experiments-section" id="experiments">
          <div className="section-heading section-heading-compact">
            <div>
              <p className="eyebrow">SIDE PROJECTS <span>SMALL IDEAS, REAL USE</span></p>
              <h2>Curiosity, <span>in practice.</span></h2>
            </div>
            <a className="text-link" href={GH} target="_blank" rel="noopener noreferrer">More on GitHub <ArrowIcon diagonal /></a>
          </div>
          <div className="experiment-grid">
            {EXPS.map((experiment, index) => (
              <div className={`experiment-card experiment-${experiment.theme}`} key={experiment.t}>
                <a
                  className="experiment-card-content"
                  href={`/projects/${experiment.slug}`}
                  aria-label={`Read about ${experiment.t}`}
                  onClick={(event) => handleProjectNavigation(event, `/projects/${experiment.slug}`)}
                >
                  <span className="experiment-index">0{index + 1}</span>
                  <span className="experiment-icon" aria-hidden="true"><SideProjectIcon theme={experiment.theme} /></span>
                  <span className="experiment-arrow"><ArrowIcon diagonal /></span>
                  <strong>{experiment.t}</strong>
                  <span>{experiment.s}</span>
                </a>
                {experiment.appPath && (
                  <a className="experiment-live-link" href={experiment.appPath} aria-label={`${experiment.theme === "soc" ? "Open curriculum" : "Open live demo"} for ${experiment.t}`}>
                    {experiment.theme === "soc" ? "Open curriculum" : "Live demo"} <ArrowIcon diagonal />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-grid">
            <div className="about-main">
              <p className="eyebrow eyebrow-light">A LITTLE ABOUT ME <span>BASED IN NOIDA, INDIA</span></p>
              <h2>Security is a practice,<br />not a checkbox.</h2>
              <p className="about-copy">
                I enjoy the full picture of defense: understand the environment, spot what matters,
                communicate risk clearly, and help make the fix stick. My day-to-day spans security
                monitoring, privacy assessments, risk reviews and vulnerability remediation.
              </p>
              <a className="button button-light" href={LI} target="_blank" rel="noopener noreferrer">
                Connect on LinkedIn <ArrowIcon diagonal />
              </a>
            </div>
            <div className="about-side">
              <article className="experience-card">
                <span className="eyebrow eyebrow-light">CURRENTLY</span>
                <div className="experience-role">
                  <span className="experience-symbol">V</span>
                  <span><strong>Cyber Security Analyst</strong><small>VVnT SeQuor · Noida</small></span>
                </div>
                <p>DPIAs, GRC support, vulnerability assessments, security monitoring and remediation tracking.</p>
                <span className="experience-date"><i /> Sep 2026 — Present</span>
              </article>
              <div className="education-card">
                <span className="eyebrow">EDUCATION</span>
                <strong>B.Tech, Computer Science</strong>
                <span>Techno International Batanagar · Kolkata</span>
                <span>Graduated July 2026 <i>·</i> CGPA 6.83</span>
              </div>
            </div>
          </div>
          <div className="toolkit">
            <div className="toolkit-heading"><span className="eyebrow eyebrow-light">TOOLS I WORK WITH</span><span>Hands-on, continuously expanding</span></div>
            <div className="tool-list">{TOOLS.map((tool) => <span key={tool}>{tool}</span>)}</div>
          </div>
        </section>

        <section className="certification-section" id="certifications">
          <div className="section-heading section-heading-compact">
            <div>
              <p className="eyebrow">LEARNING & CREDENTIALS <span>03 CERTIFICATIONS</span></p>
              <h2>Grounded in <span>the fundamentals.</span></h2>
            </div>
          </div>
          <div className="certification-list">
            {CERTS.map(([title, issuer], index) => (
              <article className="certification-item" key={title}>
                <span className="certification-number">0{index + 1}</span>
                <strong>{title}</strong>
                <span>{issuer}</span>
                <span className="certification-check">✓</span>
              </article>
            ))}
          </div>
        </section>
      </main>
      )}

      <footer className="site-footer">
        <div className="footer-main">
          <div>
            <a className="wordmark footer-wordmark" href={pathname === "/" ? "#top" : "/"}>
              <span className="wordmark-icon" aria-hidden="true"><i /><i /><i /><i /></span>
              <span>swastik<span className="wordmark-period">.</span></span>
            </a>
            <p>Thoughtful security. Practical impact.</p>
          </div>
          <div className="footer-links">
            <span className="eyebrow">FIND ME</span>
            <a href={GH} target="_blank" rel="noopener noreferrer">GitHub <ArrowIcon diagonal /></a>
            <a href={LI} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowIcon diagonal /></a>
            <a href={MAIL}>Email <ArrowIcon diagonal /></a>
          </div>
          <div className="footer-links">
            <span className="eyebrow">LEGAL</span>
            <a href="/terms" onClick={(e) => {
              if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              navigate("/terms");
            }}>Terms & Conditions</a>
            <a href="/privacy" onClick={(e) => {
              if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              navigate("/privacy");
            }}>Privacy Policy</a>
          </div>
          <a className="footer-top" href={pathname === "/" ? "#top" : "/"} onClick={(e) => {
            if (pathname !== "/") return;
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            window.scrollTo(0, 0);
          }}>Back to top ↑</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Swastik Sagar</span>
          <span>Made with curiosity in India <i>✳</i></span>
        </div>
      </footer>

      {selectedProject && <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}
