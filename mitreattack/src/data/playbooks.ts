export interface Playbook {
  slug: string;
  title: string;
  trigger: string;
  dataSource: string;
  techniques: { id: string; name: string }[];
  triage: string[];
  backward: { tactic: string; slug: string; question: string };
  forward: { tactic: string; slug: string; question: string };
  escalate: string[];
}

export const PLAYBOOKS: Playbook[] = [
  {
    slug: "suspicious-powershell",
    title: "Suspicious PowerShell / script execution",
    trigger:
      "An endpoint telemetry alert for encoded PowerShell, script block logging, or an Office application spawning an interpreter.",
    dataSource: "EDR, Windows Event ID 4104, Sysmon process creation",
    techniques: [
      { id: "T1059", name: "Command and Scripting Interpreter" },
      { id: "T1204", name: "User Execution" },
      { id: "T1027", name: "Obfuscated Files or Information" },
    ],
    triage: [
      "Is the parent process a mail client, browser, or document? That confirms delivery via user execution.",
      "Does the command line contain -enc, -w hidden, or a download cradle? Record the decoded payload.",
      "Did the same user or host run discovery commands (whoami, net, nltest) within minutes?",
    ],
    backward: {
      tactic: "Initial Access",
      slug: "initial-access",
      question: "How did the script reach the host? Check mail gateway and browser downloads.",
    },
    forward: {
      tactic: "Execution",
      slug: "execution",
      question: "What did the script do next? Look for scheduled tasks, WMI, or service creation.",
    },
    escalate: [
      "The script contacted an external host or downloaded a second-stage payload.",
      "The same PowerShell session later accessed LSASS or created a new local account.",
      "The activity occurred on a domain controller or privileged jump host.",
    ],
  },
  {
    slug: "lsass-credential-dumping",
    title: "LSASS access / credential dumping",
    trigger:
      "A process accessed LSASS memory, created a minidump, or Sysmon Event ID 10 fired with suspicious access rights.",
    dataSource: "Sysmon Event ID 10, Windows Security 4656, EDR",
    techniques: [
      { id: "T1003", name: "OS Credential Dumping" },
      { id: "T1055", name: "Process Injection" },
      { id: "T1562", name: "Impair Defenses" },
    ],
    triage: [
      "Which process accessed LSASS and with what access rights (0x1010 / 0x1410)?",
      "Is the source process a known security tool, or an unexpected binary in temp/Downloads?",
      "Did the host also create a volume shadow copy or read NTDS.dit?",
    ],
    backward: {
      tactic: "Execution",
      slug: "execution",
      question: "What executed the dumper? Trace the parent process tree back to delivery.",
    },
    forward: {
      tactic: "Lateral Movement",
      slug: "lateral-movement",
      question: "Where did the stolen credentials or hashes get used next? Search Type 3 logons.",
    },
    escalate: [
      "The dumper ran on a domain controller or backup server.",
      "You find Kerberoasting or AS-REP roasting activity in the same window.",
      "The same account began authenticating from new ASNs or countries.",
    ],
  },
  {
    slug: "lateral-movement-rdp-smb",
    title: "Lateral movement via RDP / SMB",
    trigger:
      "An authentication alert for RDP or SMB from an unusual source workstation, or a service creation on a remote host.",
    dataSource: "Windows Security 4624/4625, 7045, VPN logs, EDR",
    techniques: [
      { id: "T1021", name: "Remote Services" },
      { id: "T1570", name: "Lateral Tool Transfer" },
      { id: "T1550", name: "Use Alternate Authentication Material" },
    ],
    triage: [
      "Is the source host one the user normally works from? Check asset inventory and recent VPN logins.",
      "Was the destination a server the user has no business accessing?",
      "Did the session coincide with file writes to ADMIN$ or C$ on the target?",
    ],
    backward: {
      tactic: "Credential Access",
      slug: "credential-access",
      question: "Where did the credentials or tickets used here come from? Check for prior LSASS or Kerberos abuse.",
    },
    forward: {
      tactic: "Discovery",
      slug: "discovery",
      question: "What did the adversary look at next? Search for account, group, and trust enumeration.",
    },
    escalate: [
      "The source is a non-IT workstation accessing a domain controller or backup server.",
      "Multiple hosts were touched in a short window from the same source.",
      "A new account or service was created on the target during the session.",
    ],
  },
  {
    slug: "new-privileged-account",
    title: "New account created + privileged group add",
    trigger:
      "A local or domain account was created and immediately added to a privileged group, or MFA was registered after a risky sign-in.",
    dataSource: "Windows Security 4720/4732, Azure AD audit, IdP logs",
    techniques: [
      { id: "T1136", name: "Create Account" },
      { id: "T1098", name: "Account Manipulation" },
      { id: "T1484", name: "Domain or Tenant Policy Modification" },
    ],
    triage: [
      "Who requested the account or group change? Open a change ticket and verify approval.",
      "Was the account created outside normal business hours or from an unusual source host?",
      "Did the new account authenticate anywhere within minutes of creation?",
    ],
    backward: {
      tactic: "Persistence",
      slug: "persistence",
      question: "Is this the only persistence mechanism? Check run keys, services, and cloud app consents.",
    },
    forward: {
      tactic: "Privilege Escalation",
      slug: "privilege-escalation",
      question: "What did the new privileged account do next? Look for policy changes or sensitive access.",
    },
    escalate: [
      "The account was added to Domain Admins, Enterprise Admins, or a cloud global admin role.",
      "The creation happened from a host with other suspicious activity in the same window.",
      "No change ticket exists and the owning team does not recognize the request.",
    ],
  },
  {
    slug: "mass-archive-staging",
    title: "Mass file archive / staging for exfiltration",
    trigger:
      "A host created a large encrypted archive in a temp directory, or an account opened thousands of files across shares.",
    dataSource: "EDR file events, file server audit, DLP, proxy",
    techniques: [
      { id: "T1560", name: "Archive Collected Data" },
      { id: "T1039", name: "Data from Network Shared Drive" },
      { id: "T1041", name: "Exfiltration Over C2 Channel" },
    ],
    triage: [
      "Which process created the archive and what files were added?",
      "Is the account a normal user, a service account, or a server that should not be archiving data?",
      "Did the host then upload a similarly sized payload to an external destination?",
    ],
    backward: {
      tactic: "Collection",
      slug: "collection",
      question: "What data was staged? Identify sensitive shares or mailboxes accessed beforehand.",
    },
    forward: {
      tactic: "Exfiltration",
      slug: "exfiltration",
      question: "Did the archive leave the network? Check proxy, firewall, and DLP logs for outbound uploads.",
    },
    escalate: [
      "The archive contains sensitive data, PII, or intellectual property.",
      "A large outbound transfer to cloud storage or an unknown host followed the archive creation.",
      "The same pattern is observed on multiple endpoints simultaneously.",
    ],
  },
];

export function getPlaybook(slug: string): Playbook | undefined {
  return PLAYBOOKS.find((p) => p.slug === slug);
}
