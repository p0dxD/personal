const applications = [
  {
    name: "JobSentry",
    url: "https://jobsentry.net",
    description:
      "AI-powered platform that detects fraudulent job postings using NLP and domain analysis. Protects job seekers from scams in real time.",
    tags: ["AI/LLM", "FastAPI", "React", "Kubernetes"],
    status: "Live",
  },
  {
    name: "Wellness Portal",
    url: "https://wellbeingportal.app",
    description:
      "Personal wellness tracking app with AI-driven insights. Log symptoms, moods, and habits — get personalized recommendations powered by a local LLM.",
    tags: ["AI/LLM", "Ollama", "FastAPI", "React"],
    status: "Live",
  },
  {
    name: "StockPulse",
    url: "https://stockpulse.joserod.space",
    description:
      "Personal finance dashboard that tracks up to two stocks with real-time price charts, technical indicators (RSI, MACD, EMA), and a composite feel score that signals buy, hold, or caution.",
    tags: ["FastAPI", "React", "Recharts", "yfinance"],
    status: "Live",
  },
];

const infrastructure = [
  {
    name: "K3s Home Lab",
    description:
      "Self-hosted 5-node Raspberry Pi Kubernetes cluster running 15+ production services: ArgoCD, Longhorn, MinIO, Fission, Grafana, Prometheus, and more.",
    tags: ["Kubernetes", "Raspberry Pi", "ArgoCD", "GitOps"],
  },
  {
    name: "CI/CD Pipeline",
    description:
      "Jenkins shared-library pipeline with multi-project support, parallel builds and tests, BuildKit image caching, automated Git tag bumping, and GitHub commit status reporting.",
    tags: ["Jenkins", "Docker", "BuildKit", "Shared Library"],
  },
  {
    name: "AI Inference Node",
    description:
      "NVIDIA Jetson Orin Nano configured as a dedicated edge AI node running Ollama (llama3.2). Serves LLM inference requests to Wellness Portal and other cluster services.",
    tags: ["NVIDIA", "Ollama", "LLM", "Edge AI"],
  },
  {
    name: "Observability Stack",
    description:
      "Grafana + Prometheus monitoring across all cluster nodes with custom dashboards for resource usage, application metrics, and alerting.",
    tags: ["Grafana", "Prometheus", "Monitoring", "Kubernetes"],
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
