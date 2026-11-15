export type Severity = "low" | "medium" | "high";

export interface Finding {
  id: string;
  title: string;
  detail: string;
  severity: Severity;
  score: number;
}

export interface AnalysisResult {
  score: number; // 0-100 risk
  verdict: "Likely Safe" | "Suspicious" | "Likely Phishing";
  findings: Finding[];
  stats: {
    urls: string[];
    suspiciousUrls: string[];
    fromDomain: string | null;
    subject: string | null;
  };
}

const URGENCY_WORDS = [
  "urgent", "immediately", "action required", "verify your account",
  "suspended", "locked", "within 24 hours", "final notice", "act now",
  "confirm your identity", "unauthorized", "security alert",
];

const CREDENTIAL_WORDS = [
  "password", "login", "sign in", "credentials", "ssn", "social security",
  "credit card", "bank account", "wire transfer", "gift card",
];

const BRANDS = [
  "paypal", "apple", "microsoft", "amazon", "google", "netflix",
  "facebook", "instagram", "bank", "chase", "wells fargo", "irs", "usps", "fedex", "dhl",
];

const URL_SHORTENERS = [
  "bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd", "buff.ly", "rebrand.ly",
];

const FREE_MAIL = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "aol.com", "proton.me", "icloud.com"];

function extractHeader(email: string, name: string): string | null {
  const re = new RegExp(`^${name}\\s*:\\s*(.+)$`, "im");
  const m = email.match(re);
  return m ? m[1].trim() : null;
}

function extractEmail(str: string): string | null {
  const m = str.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/);
  return m ? m[0] : null;
}

function extractUrls(text: string): string[] {
  const urls = new Set<string>();
  const re = /\bhttps?:\/\/[^\s<>"')]+/gi;
  let m;
  while ((m = re.exec(text)) !== null) urls.add(m[0].replace(/[.,)\]]+$/, ""));
  // Also markdown-style links
  const md = /\]\((https?:\/\/[^)]+)\)/gi;
  while ((m = md.exec(text)) !== null) urls.add(m[1]);
  return [...urls];
}

function getDomain(url: string): string | null {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function isIpHost(host: string): boolean {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(host);
}

function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

export function analyzeEmail(raw: string): AnalysisResult {
  const email = raw.trim();
  const findings: Finding[] = [];
  const lower = email.toLowerCase();

  const subject = extractHeader(email, "Subject");
  const fromRaw = extractHeader(email, "From");
  const replyTo = extractHeader(email, "Reply-To");
  const fromAddr = fromRaw ? extractEmail(fromRaw) : null;
  const replyAddr = replyTo ? extractEmail(replyTo) : null;
  const fromDomain = fromAddr ? fromAddr.split("@")[1].toLowerCase() : null;
  const replyDomain = replyAddr ? replyAddr.split("@")[1].toLowerCase() : null;

  // 1. Reply-To mismatch
  if (fromDomain && replyDomain && fromDomain !== replyDomain) {
    findings.push({
      id: "reply-to-mismatch",
      title: "Reply-To domain differs from From domain",
      detail: `From uses "${fromDomain}" but replies go to "${replyDomain}". Classic spoofing tactic.`,
      severity: "high",
      score: 25,
    });
  }

  // 2. Display name spoofing (From has a brand name but domain doesn't match)
  if (fromRaw && fromDomain) {
    const displayName = fromRaw.replace(/<.*>/, "").toLowerCase();
    for (const brand of BRANDS) {
      if (displayName.includes(brand) && !fromDomain.includes(brand)) {
        findings.push({
          id: `spoof-${brand}`,
          title: `Display name mentions "${brand}" but domain doesn't match`,
          detail: `From line shows "${brand}" but the actual sender domain is "${fromDomain}".`,
          severity: "high",
          score: 22,
        });
        break;
      }
    }
    if (FREE_MAIL.includes(fromDomain)) {
      for (const brand of BRANDS) {
        if (displayName.includes(brand)) {
          findings.push({
            id: "brand-from-freemail",
            title: "Brand claim from a free email service",
            detail: `Message claims to be from "${brand}" but is sent from ${fromDomain}, a free consumer email provider.`,
            severity: "high",
            score: 20,
          });
          break;
        }
      }
    }
  }

  // 3. URLs analysis
  const urls = extractUrls(email);
  const suspiciousUrls: string[] = [];
  for (const url of urls) {
    const host = getDomain(url);
    if (!host) continue;
    let flagged = false;

    if (isIpHost(host)) {
      findings.push({
        id: `ip-url-${host}`,
        title: "Link points to a raw IP address",
        detail: `${url} uses an IP instead of a domain — legitimate companies do not.`,
        severity: "high",
        score: 18,
      });
      flagged = true;
    }
    if (URL_SHORTENERS.some((s) => host.endsWith(s))) {
      findings.push({
        id: `shortener-${host}`,
        title: `Uses a URL shortener (${host})`,
        detail: `Shorteners hide the real destination and are often abused in phishing.`,
        severity: "medium",
        score: 10,
      });
      flagged = true;
    }
    // Punycode / IDN
    if (host.includes("xn--")) {
      findings.push({
        id: `punycode-${host}`,
        title: "Internationalized (punycode) domain",
        detail: `${host} may be visually impersonating another brand using look-alike characters.`,
        severity: "high",
        score: 18,
      });
      flagged = true;
    }
    // Excessive subdomains
    if (host.split(".").length >= 5) {
      findings.push({
        id: `deep-subdomain-${host}`,
        title: "Excessive subdomains in link",
        detail: `${host} has many subdomains, sometimes used to fake a trusted name in the URL.`,
        severity: "medium",
        score: 8,
      });
      flagged = true;
    }
    // Brand look-alike
    for (const brand of BRANDS) {
      const root = host.split(".").slice(-2, -1)[0] || "";
      if (root && root !== brand && root.includes(brand.slice(0, 4)) && levenshtein(root, brand) <= 2 && root !== brand) {
        findings.push({
          id: `lookalike-${host}-${brand}`,
          title: `Look-alike domain for "${brand}"`,
          detail: `"${host}" closely resembles ${brand}.com but isn't the real domain.`,
          severity: "high",
          score: 20,
        });
        flagged = true;
        break;
      }
    }
    if (flagged) suspiciousUrls.push(url);
  }

  // 4. Mismatched link text vs href (markdown or "click here" patterns)
  const htmlLinkRe = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let ml;
  while ((ml = htmlLinkRe.exec(email)) !== null) {
    const href = ml[1];
    const text = ml[2].replace(/<[^>]+>/g, "").trim();
    const textUrl = text.match(/https?:\/\/[^\s]+/);
    if (textUrl) {
      const hrefHost = getDomain(href);
      const textHost = getDomain(textUrl[0]);
      if (hrefHost && textHost && hrefHost !== textHost) {
        findings.push({
          id: `link-mismatch-${hrefHost}`,
          title: "Link text hides the real URL",
          detail: `Visible text points to "${textHost}" but the link actually goes to "${hrefHost}".`,
          severity: "high",
          score: 22,
        });
      }
    }
  }

  // 5. Urgency
  const urgencyHits = URGENCY_WORDS.filter((w) => lower.includes(w));
  if (urgencyHits.length > 0) {
    findings.push({
      id: "urgency",
      title: "Uses urgency / pressure language",
      detail: `Detected: ${urgencyHits.slice(0, 4).map((w) => `"${w}"`).join(", ")}. Phishing relies on rushing you.`,
      severity: urgencyHits.length >= 2 ? "high" : "medium",
      score: Math.min(15, urgencyHits.length * 6),
    });
  }

  // 6. Credential / money asks
  const credHits = CREDENTIAL_WORDS.filter((w) => lower.includes(w));
  if (credHits.length > 0) {
    findings.push({
      id: "credentials",
      title: "Requests credentials or payment info",
      detail: `Mentions: ${credHits.slice(0, 4).map((w) => `"${w}"`).join(", ")}.`,
      severity: "medium",
      score: Math.min(15, credHits.length * 5),
    });
  }

  // 7. Attachments
  if (/\.(exe|scr|zip|rar|iso|js|vbs|docm|xlsm|htm|html)\b/i.test(email) && /attach/i.test(email)) {
    findings.push({
      id: "risky-attachment",
      title: "Mentions a risky attachment type",
      detail: "Executables, macro-enabled Office files, and HTML attachments are common phishing payloads.",
      severity: "high",
      score: 15,
    });
  }

  // 8. Generic greeting
  if (/^(dear (customer|user|sir\/madam|valued (customer|member))|hello dear)/im.test(email)) {
    findings.push({
      id: "generic-greeting",
      title: "Generic, impersonal greeting",
      detail: "Real companies typically address you by name.",
      severity: "low",
      score: 5,
    });
  }

  // 9. Poor spelling heuristic: many 3+ consecutive punctuation or ALL CAPS shouts
  if (/[A-Z]{6,}/.test(email) || /(!{3,}|\?{3,})/.test(email)) {
    findings.push({
      id: "shouting",
      title: "Aggressive punctuation or ALL CAPS",
      detail: "Unprofessional formatting is a common phishing tell.",
      severity: "low",
      score: 4,
    });
  }

  // Score aggregation with soft cap
  const rawScore = findings.reduce((s, f) => s + f.score, 0);
  const score = Math.max(0, Math.min(100, Math.round(100 * (1 - Math.exp(-rawScore / 45)))));

  let verdict: AnalysisResult["verdict"];
  if (score >= 65) verdict = "Likely Phishing";
  else if (score >= 30) verdict = "Suspicious";
  else verdict = "Likely Safe";

  if (findings.length === 0) {
    findings.push({
      id: "no-signals",
      title: "No common phishing signals detected",
      detail: "Still verify the sender through a trusted channel before acting.",
      severity: "low",
      score: 0,
    });
  }

  return {
    score,
    verdict,
    findings: findings.sort((a, b) => b.score - a.score),
    stats: { urls, suspiciousUrls, fromDomain, subject },
  };
}
