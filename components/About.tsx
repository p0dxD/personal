const skills = [
  "AI / LLMs", "Next.js", "TypeScript",
  "Kubernetes", "ArgoCD", "Docker",
  "Python", "Node.js", "PostgreSQL",
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 max-w-5xl mx-auto">
      <div className="mb-14 text-center">
        <span className="inline-block mb-3 rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-pink-300">
          About
        </span>
        <h2 className="text-4xl font-bold gradient-text">Podoi Tech LLC</h2>
      </div>

      <div className="grid gap-10 md:grid-cols-2 items-center">
        <div className="glass rounded-2xl p-8 space-y-5 text-slate-300 leading-relaxed">
          <p>
            I&apos;m Jose R., an indie developer and founder of{" "}
            <span className="text-violet-300 font-semibold">Podoi Tech LLC</span> — a
            one-person studio focused on building practical AI products.
          </p>
          <p>
            My work sits at the intersection of artificial intelligence and everyday
            usefulness. I believe the most impactful software solves problems that
            real people face every day — not just enterprise edge cases.
          </p>
          <p>
            I run a self-hosted infrastructure stack on Kubernetes (k3s), ship
            continuously with ArgoCD, and obsess over clean, maintainable code.
          </p>
        </div>

        <div className="glass rounded-2xl p-8">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-5">
            Tech I work with
          </h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-slate-300 hover:border-violet-500/40 hover:text-violet-200 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
