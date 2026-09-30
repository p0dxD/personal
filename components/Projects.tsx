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
    name: "K3s Home Lab",
    description:
      "Six-node ARM64 Kubernetes cluster running k3s: five Raspberry Pi 4s (8 GB each; one control plane, four workers) plus an NVIDIA Jetson Orin Nano for GPU work, with about 120 pods across a dozen apps. Longhorn replicates block storage across nodes, MinIO provides S3-compatible storage for backups, MetalLB hands out addresses on the home network, and a private registry holds every image.",
    tags: ["k3s", "Raspberry Pi", "Longhorn", "MinIO", "MetalLB", "ARM64"],
  },
  {
    name: "CI/CD with rendimiento.ai",
    description:
      "Every app here ships through rendimiento.ai, the platform I built to replace Jenkins and ArgoCD. A push runs tests and builds as Kubernetes pods; images build on a BuildKit pool spread across the workers with a shared registry cache, and only the services whose code changed are rebuilt. Releases are pinned by image digest, deployed and self-healed by a controller, and roll back in one click. Cluster software is installed from a GitOps repo, and Renovate keeps dependencies current.",
    tags: ["rendimiento.ai", "Go", "BuildKit", "GitOps", "Renovate", "Kubernetes"],
  },
  {
    name: "AI Inference Node",
    description:
      "NVIDIA Jetson Orin Nano (8 GB, 1024-core Ampere GPU) joined to the cluster as its GPU node. Runs Ollama serving llama3.2:3b with CUDA through the NVIDIA container runtime; an app gets the GPU with one line in its deploy file. JobSentry and Wellness Portal call it over the cluster's internal network: no external API costs, and no data leaves the home lab.",
    tags: ["NVIDIA Jetson", "Ollama", "LLM", "Edge AI", "CUDA", "Kubernetes"],
  },
  {
    name: "Observability Stack",
    description:
      "VictoriaMetrics (a Prometheus-compatible stack with vmagent, vmalert and Alertmanager) and Grafana, installed with Helm, track every node, pod and Longhorn volume. Grafana stays on the home network only. Umami provides privacy-first analytics for the public sites, and a Hajimari start page links every internal tool.",
    tags: ["VictoriaMetrics", "Grafana", "Alertmanager", "Umami", "Helm"],
  },
  {
    name: "Automation & Resilience",
    description:
      "Ansible manages every node. A weekly timer applies OS updates one node at a time (health check, cordon, drain, reboot, wait for Ready) and emails a summary. A storm watcher checks National Weather Service alerts every 10 minutes; before severe weather it pauses deployments, scales databases down cleanly and powers the cluster off in order, control plane last.",
    tags: ["Ansible", "systemd", "Python", "Pi-hole", "Automation"],
  },
  {
    name: "Edge & Security",
    description:
      "Public traffic reaches the cluster only through Cloudflare's proxy; ingress-nginx and cert-manager serve every site over HTTPS with Let's Encrypt certificates issued by DNS challenge. Secrets live in git encrypted with sealed-secrets, build pods run isolated from the cluster and home network, and the rendimiento dashboard signs in through GitHub.",
    tags: ["Cloudflare", "cert-manager", "ingress-nginx", "Sealed Secrets", "Let's Encrypt"],
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
