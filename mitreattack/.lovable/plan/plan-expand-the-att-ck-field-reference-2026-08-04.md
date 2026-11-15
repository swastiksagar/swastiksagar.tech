# Plan: Expand the ATT&CK Field Reference

Add four field-ready features to the existing MITRE ATT&CK reference site while keeping the same editorial "paper & ink" style and 980 px measure.

## 1. Technique detail pages

Create a dedicated route for every technique.

- New route: `src/routes/techniques.$id.tsx` → `/techniques/$id`
- Loader looks up the technique by MITRE ID across all tactics; throws `notFound()` for unknown IDs.
- Page shows:
  - Breadcrumb: Matrix → Tactic → Technique
  - Technique ID, name, tactic it belongs to
  - Summary and detection note (reused from existing data)
  - New "On shift" box: one-sentence framing of why a Tier 1 analyst cares
  - New "What to look for next" box: links to likely next tactics (e.g., Credential Access → Lateral Movement)
  - Pagination to previous / next technique in kill-chain order
- Head metadata: unique title, description, canonical, Open Graph, JSON-LD Article.
- Link every technique chip and list item on the tactic page and matrix page to its detail page.

## 2. Global search + filters

Add a searchable index of all techniques.

- New route: `src/routes/search.tsx` → `/search`
- Search state in URL via `validateSearch` (`q`, `tactic`, `sort`).
- Search indexes technique ID, name, summary, and detection text.
- Filters: tactic dropdown, sort by kill-chain order or relevance.
- Results render as cards with ID badge, name, tactic, summary snippet, and a link to the detail page.
- Add a search input to the site header that navigates to `/search?q=...`.
- Head metadata for the search page.

## 3. ATT&CK Navigator-style matrix

Add a visual kill-chain grid.

- New route: `src/routes/matrix.tsx` → `/matrix`
- Render a horizontal scrollable grid: 14 tactic columns, technique cells stacked inside each column.
- Each cell shows technique ID + short name and links to the technique detail page.
- Add a subtle color key by tactic group (pre-access, access, post-access, impact) using existing accent/amber/green/red tokens.
- Keep it lightweight — no external navigator dependency, just HTML/CSS.
- Head metadata for the matrix page.
- Add "Matrix" link to the header nav.

## 4. Alert triage playbooks

Add practical SOC workflows.

- New route: `src/routes/playbooks.tsx` → `/playbooks`
- Create `src/data/playbooks.ts` with 4–5 common alert types:
  - Suspicious PowerShell / script execution
  - LSASS access / credential dumping
  - Lateral movement via RDP/SMB
  - New account created + privileged group add
  - Mass file archive / staging for exfiltration
- Each playbook includes:
  - Trigger alert / data source
  - First 3 triage questions
  - ATT&CK techniques to map
  - Next pivot (backward and forward in kill chain)
  - Escalation criteria
- Head metadata for the playbooks page.
- Add "Playbooks" link to the header nav.

## 5. Navigation & discovery updates

- Update `src/routes/__root.tsx` header to include Matrix, Search, and Playbooks links.
- Convert header anchor links to TanStack `<Link>` where appropriate.
- Add a sitemap.xml server route and public robots.txt if not already present.

## 6. Verification

- Run `bun run build` to confirm all routes compile.
- Run a Playwright check for accessibility (axe-core) and console errors on the new routes.

---

No new npm dependencies are required. All work uses existing TanStack Router, React, and Tailwind setup.