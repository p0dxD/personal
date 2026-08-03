import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
      </div>

      <div className="relative z-10 glass rounded-3xl px-10 py-14 max-w-2xl w-full shadow-2xl">
        {/* Company badge */}
        <span className="inline-block mb-6 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-violet-300">
          Podoi Tech LLC
        </span>

        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-4">
          <span className="gradient-text">Jose R.</span>
        </h1>

        <p className="text-lg text-slate-300 mb-2 font-medium">
          Founder &amp; Builder
        </p>

        <p className="mt-4 text-slate-400 leading-relaxed max-w-md mx-auto">
          I build AI-powered tools that solve real everyday problems — from job hunting
          to personal productivity and beyond.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="btn-gradient rounded-xl px-7 py-3 text-sm font-semibold text-white shadow-lg"
          >
            View Projects
          </a>
          <Link
            href="/blog"
            className="glass glass-hover rounded-xl px-7 py-3 text-sm font-semibold text-slate-200 shadow"
          >
            Blog
          </Link>
          <a
            href="https://jobsentry.net"
            target="_blank"
            rel="noopener noreferrer"
            className="glass glass-hover rounded-xl px-7 py-3 text-sm font-semibold text-slate-200 shadow"
          >
            jobsentry.net ↗
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#projects"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
      >
        <span>scroll</span>
        <svg className="h-4 w-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
