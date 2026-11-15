export const GH = "https://github.com/swastiksagar";
export const LI = "https://www.linkedin.com/in/swastiksagar/";
export const MAIL = "mailto:swastiksagar06@gmail.com";
export const WORK = [
  {
    t: "Splunk SIEM Lab",
    s: "Windows event and DNS monitoring on a real-time Splunk pipeline",
    o: "Personal lab", d: "Sep 2025 – Present", r: "splunklabproject",
    theme: "splunk",
    th: { h: "Splunk · dns_blocked", bars: true, rows: [["ads.tracker.net", "1,284"], ["telemetry.vendor.io", "902"], ["cdn.malvertise.xyz", "377"]] },
    tags: ["Splunk Enterprise", "SPL", "Sysmon", "NextDNS"],
    b: [
      "Deployed Splunk Enterprise on Windows with a Universal Forwarder for real-time log ingestion.",
      "Analysed Windows Event Logs, DNS logs (NextDNS), Sysmon data and custom network activity for threat hunting and correlation.",
      "Built dashboards, field extractions and SPL queries to reproduce SOC workflows: event timelines, blocked DNS query detection, system activity views.",
    ],
  },
  {
    t: "Wazuh SIEM/XDR Lab",
    s: "Endpoint telemetry, file integrity monitoring and attack simulations",
    o: "Personal lab", d: "Aug 2025 – Present", r: "wazuhlabproject",
    theme: "wazuh",
    th: { h: "Wazuh · security events", bars: true, rows: [["sshd: brute force", "T1110"], ["FIM: file modified", "level 7"], ["privilege escalation", "T1068"]] },
    tags: ["Wazuh", "FIM", "VirusTotal", "MITRE ATT&CK"],
    b: [
      "Stood up a full Wazuh environment from the official OVA, secured dashboard access and onboarded Windows endpoints with agents.",
      "Configured File Integrity Monitoring and malware detection, integrating VirusTotal to analyse malicious samples.",
      "Ran threat-hunting simulations (SSH brute force, privilege escalation, auth failures) and mapped alerts to MITRE ATT&CK with dashboards and reports.",
    ],
  },
  {
    t: "Vulnerability Management Lab",
    s: "End-to-end scanning, triage and hardening with Nessus",
    o: "Personal lab", d: "Mar 2026 – Present", r: "nessuslabproject",
    theme: "vulnerability",
    th: { h: "Nessus · scan summary", bars: true, rows: [["SMB signing not required", "cvss 5.3"], ["SSL certificate untrusted", "cvss 6.5"], ["status", "remediated"]] },
    tags: ["Nessus Essentials", "CVSS", "Hardening"],
    b: [
      "Ran the full workflow: install, configure, scan and remediate.",
      "Triaged real findings such as SMB signing misconfigurations and SSL trust failures, validated false positives, and applied registry-level hardening.",
      "Practised scoping, CVSS interpretation and secure configuration changes.",
    ],
  },
  {
    t: "Malware Insight",
    s: "A client-side malware triage web app with IOC export",
    o: "Solo project", d: "Live", r: "malwareinsight",
    live: "https://malwareinsight.netlify.app",
    theme: "malware",
    th: { h: "Malware Insight · triage", rows: [["SHA-256", "9f86d0…0a08"], ["MD5", "098f6b…d8a1"], ["PE sections", "3 · imports 12"], ["IOCs", "4 domains · 2 IPs"]] },
    tags: ["Hashing", "PE parsing", "IOC export", "VirusTotal"],
    b: [
      "MD5, SHA-1 and SHA-256 hashing, strings extraction and PE header inspection, all in the browser with no upload by default.",
      "Auto-collects IOCs (hashes, domains, IPs, URLs) and exports to CSV or JSON.",
      "Optional VirusTotal enrichment and a searchable local history.",
    ],
  },
];

export const EXPS = [
  { t: "SOC Analyst from Scratch", s: "A free, self-paced curriculum with 96 lessons, a learning roadmap, cheatsheets, and incident-response playbooks.", u: `${GH}/socanalystfromscratch`, slug: "soc-analyst-from-scratch", appPath: "/curriculum/soc-analyst-from-scratch/", theme: "soc", th: { h: "soc roadmap", rows: [["01 Networking", "done"], ["02 Operating systems", "done"], ["03 SIEM and logs", "next"], ["04 Incident response", "soon"]] } },
  { t: "sFirewall", s: "A Python firewall application with rule-based allow and deny filtering.", u: `${GH}/sfirewall`, slug: "sfirewall", theme: "firewall", small: true, th: { h: "rules", rows: [["ALLOW tcp 443", "in"], ["DENY tcp 23", "in"], ["DENY udp 5353", "out"]] } },
  { t: "sBlock", s: "A DNS blocklist for filtering malicious and unwanted domains.", u: `${GH}/sblock`, slug: "sblock", theme: "block", small: true, th: { h: "blocklist", rows: [["doubleclick.example", "blocked"], ["track.badcdn.xyz", "blocked"]] } },
  { t: "Resources", s: "A curated library of security learning material. Everything is free.", u: `${GH}/resources`, slug: "security-resources", theme: "resources", th: { h: "resources", rows: [["TryHackMe paths", "free"], ["Blue team labs", "free"], ["SIEM guides", "free"]] } },
  { t: "MITRE ATT&CK Field Reference", s: "Browse the Enterprise matrix, plain-language tactic guides, and defensive detection notes.", u: `${GH}/mitreattack`, slug: "mitre-attack", appPath: "/apps/mitreattack/", theme: "attack", th: { h: "ATT&CK · Enterprise", rows: [["Reconnaissance", "TA0043"], ["Initial access", "TA0001"], ["Execution", "TA0002"]] } },
  { t: "Email Checker", s: "Analyze suspicious emails privately in your browser and review the signals behind the risk score.", u: `${GH}/scanmail`, slug: "email-checker", appPath: "/apps/emailchecker/", theme: "emailchecker", th: { h: "Email Checker · analysis", rows: [["Sender forensics", "checked"], ["Link intelligence", "flagged"], ["Language pressure", "review"]] } },
  { t: "Snort Configuration", s: "A Windows-ready Snort 2.x IDS/IPS configuration with tuned paths and preprocessors.", u: `${GH}/snort.conf`, slug: "snort-configuration", theme: "snort", th: { h: "Snort · Windows IDS/IPS", rows: [["HOME_NET", "configured"], ["Preprocessors", "enabled"], ["Snort 2.x", "Windows"]] } },
  { t: "MSI Secure Boot Fix", s: "A step-by-step recovery guide for MSI laptops that fail to boot with a Secure Boot Violation.", u: `${GH}/secureboot`, slug: "secureboot", theme: "secureboot", th: { h: "MSI · Secure Boot recovery", rows: [["BIOS option", "quick fix"], ["Recovery USB", "FAT32"], ["Secure Boot", "re-enable"]] } },
];

export const SIDE_PROJECT_PAGES = [
  {
    slug: "soc-analyst-from-scratch",
    title: "SOC Analyst from Scratch",
    category: "OPEN SECURITY CURRICULUM",
    summary: "A free, self-paced reference for learning how Security Operations Center work is actually organized.",
    description: "A single, self-contained learning site that guides students and working professionals from alert triage through investigation and threat hunting, with a dedicated career track.",
    repo: `${GH}/socanalystfromscratch`,
    appPath: "/curriculum/soc-analyst-from-scratch/",
    theme: "soc",
    stack: ["HTML", "CSS", "Vanilla JavaScript", "SOC workflows"],
    stats: [["96", "LESSONS"], ["4", "LEARNING TRACKS"], ["5", "IR PLAYBOOKS"]],
    highlights: [
      ["Learn by SOC tier", "Move through triage fundamentals, investigation and incident response, then threat hunting and detection engineering."],
      ["Learn · Lab · Build", "Filter lessons by learning mode. Every lesson includes an explanation, why it matters, and a breakdown of key terms."],
      ["Reference while learning", "Use quick references for event IDs, Linux logs, ports, SPL, Wireshark, ATT&CK, Sigma and YARA."],
      ["Prepare for the role", "Follow a self-paced career roadmap covering homelabs, certifications, portfolio work and interviews."],
    ],
    sections: [
      {
        title: "Curriculum, organized by responsibility",
        description: "The README groups the 96 lessons into four tracks that follow how SOC analysts grow.",
        items: [
          ["Tier 1 · Triage & fundamentals", "32 lessons covering networking, operating systems, security basics, SIEM, alert triage, phishing and malware concepts."],
          ["Tier 2 · Investigation & response", "33 lessons covering deeper SIEM and network monitoring, EDR, threat intelligence, incident response, forensics and cloud monitoring."],
          ["Tier 3 · Hunting & detection engineering", "23 lessons covering threat hunting, detection engineering, adversary emulation, automation and security maturity."],
          ["Career · Homelabs & getting hired", "8 lessons on portfolio projects, job searches, resumes, interviews, and choosing a career path."],
        ],
      },
      {
        title: "A roadmap you can adapt",
        description: "Five suggested stages, from foundational skills to choosing a specialty. The timeline is guidance, not a deadline.",
        items: [
          ["Months 0–3 · Foundations", "Work through Tier 1, start Security+ preparation and set up a basic Wazuh lab."],
          ["Months 3–6 · First Tier 1 reps", "Start applying for Tier 1 roles, begin Tier 2 and publish an initial homelab write-up."],
          ["Months 6–9 · Investigation depth", "Complete Tier 2, pursue a relevant certification and practise handling an incident end to end."],
          ["Months 9–14+ · Specialize", "Study Tier 3, publish detection work and explore forensics, threat intelligence or governance."],
        ],
      },
      {
        title: "Practice with incident playbooks",
        description: "Five expandable walkthrough templates lead from detection through documentation. Adapt thresholds, tools and escalation paths to your environment.",
        items: [
          ["Phishing email", "Triage a reported suspicious email."],
          ["Ransomware", "Work through a mass-encryption response."],
          ["Credential compromise", "Investigate brute force and account compromise."],
          ["Endpoint malware", "Respond to a malware detection."],
          ["Unusual outbound transfer", "Investigate potentially suspicious data movement."],
        ],
      },
    ],
  },
  {
    slug: "sfirewall",
    title: "sFirewall",
    category: "DESKTOP NETWORK SECURITY",
    summary: "A Python desktop application for configuring firewall rules and reviewing active connections.",
    description: "Built with Tkinter, sFirewall provides a graphical interface for managing domain, IP/port/protocol, and application-path rules, alongside a view of active network connections.",
    repo: `${GH}/sfirewall`,
    live: null,
    theme: "firewall",
    stack: ["Python 3.12+", "Tkinter", "Windows", "Network controls"],
    stats: [["03", "RULE CONTROL AREAS"], ["TCP", "PROTOCOL EXAMPLE"], ["LIVE", "CONNECTION VIEW"]],
    highlights: [
      ["Domain rules", "Enter a domain to block it or remove it from the block list."],
      ["IP and port filtering", "Specify an IP address and port, choose a protocol, then block or unblock the matching rule."],
      ["Application control", "Use an executable path to block or restore an application's network access."],
      ["Active connections", "Review local and remote addresses, ports, connection states, process names and protocol."],
    ],
    sections: [
      {
        title: "Rule controls",
        description: "The README describes three controls in the desktop interface.",
        items: [
          ["Domain blocking", "Block or unblock a domain such as example.com."],
          ["IP address filtering", "Set an address such as 192.168.1.1, a port such as 443, and a protocol (TCP is the documented example)."],
          ["Application control", "Provide a full executable path, for example C:\\Program Files\\App\\App.exe, to block or unblock an application."],
        ],
      },
      {
        title: "Monitor active connections",
        description: "Use the connection panel to inspect context around network activity and investigate unknown processes.",
        items: [
          ["Connection details", "Local and remote address/port, connection state, process name, and protocol."],
          ["Example processes", "The README mentions Windows services such as svchost.exe and applications including msedge.exe, MsEdgeWebView2.exe, MSTeams.exe, and CentralService.exe."],
        ],
      },
      {
        title: "Requirements & installation",
        description: "The repository documents Windows and Python 3.12+ requirements, and provides a Winget installation command.",
        items: [
          ["Platform", "Windows OS."],
          ["Runtime", "Python 3.12 or newer."],
          ["Install", "winget install --id=SwastikSagar.sFirewall.PreRelease -e"],
        ],
      },
    ],
  },
  {
    slug: "sblock",
    title: "sBlock",
    category: "DOMAIN BLOCKLIST",
    summary: "A shell-script-generated hosts list for filtering advertising, tracking and malware domains.",
    description: "sBlock generates a hosts-format blocklist that can be used with compatible DNS-based blockers, firewalls and custom scripts. The README documents support for popular filter-list applications.",
    repo: `${GH}/sblock`,
    live: "https://raw.githubusercontent.com/swastiksagar/sblock/refs/heads/main/blocklist.txt",
    theme: "block",
    stack: ["Shell script", "Hosts format", "DNS filtering", "MIT License"],
    stats: [["03", "FILTER CATEGORIES"], ["158", "README SNAPSHOT"], ["MIT", "LICENSE"]],
    highlights: [
      ["Ad blocking", "Prevent domains used to serve intrusive ads from resolving."],
      ["Tracker protection", "Filter domains associated with tracking scripts."],
      ["Malware-domain filtering", "Block access to domains associated with malware distribution."],
      ["Flexible integration", "Add the list to a compatible blocker, firewall, or custom script."],
    ],
    sections: [
      {
        title: "Add the list to your blocker",
        description: "The README gives the raw blocklist URL and examples of compatible apps.",
        items: [
          ["AdAway", "Import the sBlock URL as a custom hosts source."],
          ["AdGuard", "Add the list in custom filter settings."],
          ["uBlock Origin", "Add the URL as a custom filter list."],
        ],
      },
      {
        title: "Hosts-format output",
        description: "The generated file uses standard hosts-file entries. The README's example maps a blocked domain to 0.0.0.0 and shows a 158-domain snapshot; the live list may change over time.",
        items: [
          ["Blocklist source", "The repository's blocklist.txt file."],
          ["Example entry", "A blocked domain is mapped to 0.0.0.0 in the hosts file."],
          ["Repository structure", "The README lists the script, README, and blocklist output."],
        ],
      },
      {
        title: "Use with care",
        description: "Review lists before applying them. The README notes that replacing a system hosts file requires administrative permission; using a supported filter-list import is an alternative.",
        items: [
          ["Check compatibility", "Use an integration method documented by your blocker."],
          ["Review changes", "Confirm which domains the current list contains before enabling it."],
        ],
      },
    ],
  },
  {
    slug: "security-resources",
    title: "Security Resources",
    category: "FREE LEARNING LINKS",
    summary: "A curated set of free tools and references for security learners.",
    description: "The repository gathers practical links for the MITRE ATT&CK reference, phishing email checker and SOC learning curriculum. Its README emphasizes free access and encourages users to verify licensing and accuracy.",
    repo: `${GH}/resources`,
    live: null,
    theme: "resources",
    stack: ["Free resources", "Blue team", "Analysis tools", "Learning"],
    stats: [["03", "LINKED RESOURCES"], ["FREE", "ACCESS"], ["OPEN", "CURATED LIST"]],
    highlights: [
      ["MITRE ATT&CK", "Field reference for the ATT&CK knowledge base."],
      ["Scan Email", "Phishing email checker."],
      ["SOC Analyst from Scratch", "A learning curriculum for SOC analysts."],
    ],
    resources: [
      ["MITRE ATT&CK", "Field reference", "/projects/mitre-attack"],
      ["Email Checker", "Phishing email checker", "/projects/email-checker"],
      ["SOC Analyst from Scratch", "SOC learning curriculum", "/projects/soc-analyst-from-scratch"],
    ],
    sections: [
      {
        title: "A few notes before you dive in",
        description: "The README includes practical guidance for using community learning resources.",
        items: [
          ["Organize your learning", "Group saved materials by topics such as SOC, malware analysis and web security."],
          ["Check licensing", "Verify licensing before reusing or redistributing material."],
          ["Confirm that advice is current", "Cross-check dated guidance against official documentation."],
          ["Pair reading with practice", "Use hands-on labs and trusted references alongside free learning materials."],
        ],
      },
    ],
  },
  {
    slug: "mitre-attack",
    title: "MITRE ATT&CK Field Reference",
    category: "THREAT DETECTION REFERENCE",
    summary: "An interactive guide to Enterprise tactics, techniques, and defensive detection.",
    description: "Explore ATT&CK in kill-chain order, with practical explanations and detection notes designed to help analysts connect adversary behavior to the telemetry they can investigate.",
    repo: `${GH}/mitreattack`,
    appPath: "/apps/mitreattack/",
    theme: "attack",
    stack: ["MITRE ATT&CK", "React", "Detection engineering", "Searchable reference"],
    stats: [["14", "TACTICS"], ["96+", "TECHNIQUES"], ["FREE", "FIELD REFERENCE"]],
    highlights: [
      ["Navigate the matrix", "Browse Enterprise tactics in kill-chain order and understand the objectives behind each stage."],
      ["Read technique guides", "Explore techniques and sub-techniques with concise summaries, platforms, and defensive detection ideas."],
      ["Search and investigate", "Find techniques by name or ID, then follow linked tactics and playbooks."],
      ["Built for defenders", "Use plain-language context to connect ATT&CK concepts with logs and telemetry on shift."],
    ],
    sections: [
      {
        title: "A practical ATT&CK companion",
        description: "A focused reference for learning the framework and applying it during investigations.",
        items: [
          ["Enterprise tactics", "Review the 14 tactics and the adversary objectives they represent."],
          ["Techniques and sub-techniques", "Follow technique IDs, descriptions, affected platforms, and detection notes."],
          ["Playbooks and search", "Use focused playbooks and search to move from a behavior to relevant techniques."],
        ],
      },
    ],
  },
  {
    slug: "email-checker",
    title: "Email Checker",
    category: "PRIVATE PHISHING ANALYSIS",
    summary: "Review suspicious emails with a client-side checker that explains its findings.",
    description: "Inspect message headers, text, and links for common phishing signals. The analysis runs locally in the browser, and results explain why a message may be suspicious.",
    repo: `${GH}/scanmail`,
    appPath: "/apps/emailchecker/",
    theme: "emailchecker",
    stack: ["React", "Client-side analysis", "Email security", "Privacy-first"],
    stats: [["40+", "HEURISTIC CHECKS"], ["LOCAL", "BROWSER ANALYSIS"], ["FREE", "EMAIL TOOL"]],
    highlights: [
      ["Inspect sender details", "Compare sender and reply-to domains, display names, and message headers for mismatches."],
      ["Review links", "Identify suspicious destinations, shortened URLs, raw IP addresses, and misleading link text."],
      ["Understand the score", "See a risk summary with plain-language explanations for each detected signal."],
      ["Keep analysis private", "The checker processes pasted content in the browser rather than uploading it for analysis."],
    ],
    sections: [
      {
        title: "A clearer first pass on suspicious mail",
        description: "Use the results as investigation signals, not as a substitute for verification or a security review.",
        items: [
          ["Paste the message", "Add the raw email headers and body text to inspect sender and message clues."],
          ["Analyze links and language", "Review destination mismatches, urgency, credential requests, and other common patterns."],
          ["Verify before acting", "A heuristic score can be wrong. Confirm suspicious messages through trusted channels and established security processes."],
        ],
      },
    ],
  },
  {
    slug: "snort-configuration",
    title: "Snort IDS/IPS Configuration",
    category: "WINDOWS IDS/IPS CONFIGURATION",
    summary: "A Windows-compatible Snort 2.x configuration for a practical intrusion-detection setup.",
    description: "The repository provides a Snort configuration with Windows installation paths, a customizable HOME_NET, rule-category includes, and enabled protocol preprocessors. Review local paths and rules before using it in your environment.",
    repo: `${GH}/snort.conf`,
    theme: "snort",
    stack: ["Snort 2.x", "Windows", "IDS/IPS", "Network monitoring"],
    stats: [["2.x", "SNORT VERSION"], ["WINDOWS", "TARGET PLATFORM"], ["IDS / IPS", "OPERATING MODES"]],
    highlights: [
      ["Windows-ready paths", "Uses the C:\\Snort directory layout for configuration, rules, and supporting files."],
      ["Network scope", "Defines HOME_NET so you can set the local address range you intend to monitor."],
      ["Protocol preprocessors", "Enables protocol-aware preprocessing for traffic such as HTTP, DNS, SMTP, SSL, FTP, and SIP."],
      ["Flexible deployment", "Documents alert-only IDS and inline IPS use; validate rules and interface settings for your setup."],
    ],
    sections: [
      {
        title: "Start with a reviewed configuration",
        description: "This repository contains a configuration file, not a packaged Snort application. Adapt it to your installation and network before running it.",
        items: [
          ["Install Snort 2.x for Windows", "The README expects Snort under C:\\Snort and the configuration at C:\\Snort\\etc\\snort.conf."],
          ["Update rules and local settings", "Place the rule files in the documented directories, set HOME_NET, and check paths and preprocessor options."],
          ["Test before monitoring", "Validate the configuration and run in alert-only mode first; use inline IPS only with a deliberate, tested network setup."],
        ],
      },
    ],
  },
  {
    slug: "secureboot",
    title: "MSI Secure Boot Violation Fix",
    category: "MSI BOOT RECOVERY GUIDE",
    summary: "A clear recovery guide for MSI laptops that stop at a Secure Boot Violation screen.",
    description: "The guide presents two recovery paths: temporarily changing Secure Boot in BIOS when available, or preparing MSI's recovery USB tool on another computer. Follow current manufacturer guidance for your exact device.",
    repo: `${GH}/secureboot`,
    theme: "secureboot",
    stack: ["MSI BIOS", "Secure Boot", "UEFI recovery", "Windows support"],
    stats: [["MSI", "DEVICE FOCUS"], ["2", "RECOVERY PATHS"], ["SECURE BOOT", "RESTORE AFTER FIX"]],
    highlights: [
      ["Try the BIOS option", "If BIOS is accessible, the README documents a temporary Secure Boot setting change as a quick recovery path."],
      ["Prepare a recovery USB", "Use a separate working PC, a FAT32 USB drive, and the recovery utility linked from MSI."],
      ["Boot and recover", "The guide outlines selecting the USB from the boot menu and letting the recovery process finish."],
      ["Restore protection", "It includes a final step to re-enable Secure Boot after recovery and points to MSI support guidance."],
    ],
    sections: [
      {
        title: "A careful recovery checklist",
        description: "This community guide is based on MSI support material. Firmware menus can vary by model; confirm the steps for your laptop before changing settings.",
        items: [
          ["Check the model-specific guidance", "Review the official MSI FAQ and confirm that the recovery instructions apply to your device."],
          ["Choose the appropriate recovery path", "Use the BIOS option only if available, or prepare the recovery media on a separate working computer."],
          ["Re-enable Secure Boot", "After the recovery completes, restore Secure Boot and contact MSI Support if the boot issue remains."],
        ],
      },
    ],
  },
];

export const CERTS = [
  ["Google Cybersecurity Professional Certificate", "Coursera · July 2026"],
  ["Junior Cybersecurity Analyst", "Cisco · July 2025"],
  ["Blue Team Junior Analyst", "Security Blue Team · July 2025"],
];

export const TOOLS = ["Splunk", "ELK Stack", "Wireshark", "Wazuh (EDR)", "Snort", "Suricata", "Nessus", "MITRE ATT&CK", "Bash", "PowerShell", "Windows & Linux", "TryHackMe top 3%"];
