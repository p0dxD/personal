import Link from "next/link";
import { getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog — Jose R.",
  description: "Notes on what I'm building and studying.",
};

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="mesh-bg min-h-screen">
      <section className="relative px-6 py-28 max-w-5xl mx-auto">
        <div className="mb-14 text-center">
          <span className="inline-block mb-3 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-violet-300">
            Blog
          </span>
          <h1 className="text-4xl font-bold gradient-text">Notes &amp; Updates</h1>
          <p className="mt-3 text-slate-400 max-w-lg mx-auto">
            What I&apos;m building, breaking, and studying.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-slate-400">No posts yet — check back soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass glass-hover rounded-2xl p-7 flex flex-col gap-4 group"
              >
                <h2 className="text-xl font-bold text-white group-hover:gradient-text transition-all">
                  {post.title}
                </h2>

                <p className="text-sm text-slate-400 leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 text-xs text-violet-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
