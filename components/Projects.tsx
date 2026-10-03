const applications = [
  {
    name: "JobSentry",
    url: "https://jobsentry.net",
    description:
      "Multi-service scam-detection platform for job postings. A React frontend routes through a Node.js gateway to two specialized backends: a Quarkus/Java service for WHOIS domain-age lookups and a FastAPI service that streams LLM analysis via a local Ollama instance on a Jetson Orin Nano. Flags suspicious postings in seconds using domain age, linguistic red flags, and recruiter patterns.",
    tags: ["AI/LLM", "FastAPI", "Quarkus", "React", "Ollama", "Kubernetes"],
    status: "Live",
  },
  {
    name: "Wellness Portal",
    url: "https://wellbeingportal.app",
    description:
      "Personal wellness tracking app where users log symptoms, moods, sleep, and daily habits. A FastAPI backend aggregates the entries and sends them to a locally-hosted LLM (Ollama on Jetson Orin Nano) to generate personalized pattern insights — no data ever leaves the home lab.",
    tags: ["AI/LLM", "Ollama", "FastAPI", "React", "PostgreSQL"],
    status: "Live",
  },
  {
    name: "StockFinancia",
    url: "https://stockfinancia.com",
    description:
      "Personal finance dashboard with a composite PulseScore (1–10) built from RSI, MACD, EMA crossovers, Bollinger Bands, options flow, insider activity, and earnings proximity. Tracks watchlist stocks with intraday snapshots, 7/30/90-day verdict accuracy tracking, a paper trading ledger, AI-powered chat analysis, and real-time WebSocket announcements. Fully self-hosted on Kubernetes.",
    tags: ["FastAPI", "React", "PostgreSQL", "yfinance", "APScheduler", "WebSocket"],
    status: "Live",
  },
];

const inProgress = [
  {
    name: "rendimiento.ai",
    url: "https://github.com/p0dxD/rendimiento.ai",
    description:
      "My own CI/CD platform, replacing Jenkins and ArgoCD on the home lab: connect a GitHub repo, press Deploy, get a live HTTPS URL. A single Go binary detects the stack, builds images on a BuildKit pool spread across the cluster, and a Kubernetes controller deploys, self-heals and rolls back every release. It also installs cluster add-ons from Helm charts and git, wires in Postgres or Redis on request, and runs commands like mobile builds as CI steps. Every app on this site now ships through it.",
    tags: ["Go", "Kubernetes", "Controllers", "BuildKit", "React", "GitOps"],
  },
  {
    name: "SimpleRFC",
    url: "https://simplerfc.joserod.space",
    description:
      "Makes IETF RFCs easier to read: enter an RFC number or search by title and get plain-language section summaries, ASCII-art diagrams re-rendered as real Mermaid diagrams, and a glossary of key terms alongside the original text. Processed on demand via a local Ollama LLM and cached in SQLite.",
    tags: ["AI/LLM", "Next.js", "Ollama", "SQLite"],
  },
  {
    name: "SecPlus Study Guide",
    url: "https://secplus.joserod.space",
    description:
      "Study site for the CompTIA Security+ SY0-701 exam: notes broken down per exam objective with a quiz at the end of every section, whole-domain quizzes, timed 90-question mock exams weighted like the real test, acronym flashcards, and dense cheat sheets. All content is versioned markdown/JSON; progress is kept in the browser.",
    tags: ["Next.js", "TypeScript", "Study Guide", "Security+"],
  },
];

const infrastructure = [
  {
    name: "Self-Hosted Kubernetes",
    description:
      "A multi-node ARM64 Kubernetes cluster I built and run myself: Raspberry Pi 4s plus an NVIDIA Jetson for GPU work, with distributed block storage, object storage and a private image registry. Every site on this page is served from it.",
    tags: ["Kubernetes", "ARM64", "Raspberry Pi", "Distributed storage", "Self-hosted"],
  },
  {
    name: "CI/CD with rendimiento.ai",
    description:
      "Every app here ships through rendimiento.ai, the platform I built: each push is tested, built and released automatically, then watched; a release that breaks something is rolled back on its own, and I get an email about it.",
    tags: ["rendimiento.ai", "Go", "GitOps", "CI/CD", "Kubernetes"],
  },
  {
    name: "Edge AI Inference",
    description:
      "An NVIDIA Jetson Orin Nano in the cluster runs local LLM inference with GPU acceleration for JobSentry and Wellness Portal: no external API costs, and no data leaves the home lab.",
    tags: ["NVIDIA Jetson", "Ollama", "LLM", "CUDA", "Edge AI"],
  },
  {
    name: "Observability & Automation",
    description:
      "Metrics, dashboards and alerting for every node and app, uptime checks every minute, privacy-first web analytics, and automated maintenance that keeps the cluster patched without manual work.",
    tags: ["Monitoring", "Alerting", "Analytics", "Automation"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28 max-w-5xl mx-auto">
      {/* Applications */}
      <div className="mb-14 text-center">
        <span className="inline-block mb-3 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-300">
          Projects
        </span>
        <h2 className="text-4xl font-bold gradient-text">What I&apos;ve Built</h2>
        <p className="mt-3 text-slate-400 max-w-lg mx-auto">
          Live applications and the infrastructure powering them.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 mb-16">
        {applications.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass glass-hover rounded-2xl p-7 flex flex-col gap-4 group"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all">
                {project.name}
              </h3>
              <span className="shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/30">
                {project.status}
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed flex-1">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 text-xs text-violet-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <span className="text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
              {project.url.replace("https://", "")} ↗
            </span>
          </a>
        ))}
      </div>

      {/* In Progress */}
      <div className="mb-14 text-center">
        <span className="inline-block mb-3 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-300">
          In Progress
        </span>
        <h2 className="text-3xl font-bold gradient-text">What I&apos;m Building Now</h2>
        <p className="mt-3 text-slate-400 max-w-lg mx-auto">
          Live previews hosted directly on joserod.space subdomains — still being built.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 mb-16">
        {inProgress.map((project) => (
          <a
            key={project.name}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass glass-hover rounded-2xl p-7 flex flex-col gap-4 group"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all">
                {project.name}
              </h3>
              <span className="shrink-0 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-400 border border-amber-500/30">
                In Progress
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed flex-1">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 text-xs text-violet-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <span className="text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
              {project.url.replace("https://", "")} ↗
            </span>
          </a>
        ))}
      </div>

      {/* Infrastructure */}
      <div className="mb-10 text-center">
        <span className="inline-block mb-3 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-violet-300">
          Infrastructure
        </span>
        <h2 className="text-3xl font-bold gradient-text">The Stack Behind It</h2>
        <p className="mt-3 text-slate-400 max-w-lg mx-auto">
          Everything runs self-hosted on bare metal — no cloud bills.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {infrastructure.map((item) => (
          <div
            key={item.name}
            className="glass rounded-2xl p-7 flex flex-col gap-4"
          >
            <h3 className="text-xl font-bold text-white">
              {item.name}
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed flex-1">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 text-xs text-cyan-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
