import Link from "next/link";
import { getPublishedPosts } from "@/lib/posts";

export default async function LatestPosts() {
  const posts = await getPublishedPosts(3);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="relative px-6 py-28 max-w-5xl mx-auto">
      <div className="mb-14 text-center">
        <span className="inline-block mb-3 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-violet-300">
          Blog
        </span>
        <h2 className="text-4xl font-bold gradient-text">Latest Posts</h2>
        <p className="mt-3 text-slate-400 max-w-lg mx-auto">
          Notes on what I&apos;m building and studying.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass glass-hover rounded-2xl p-7 flex flex-col gap-4 group"
          >
            <h3 className="text-lg font-bold text-white group-hover:gradient-text transition-all">
              {post.title}
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed flex-1">
              {post.excerpt}
            </p>

            <span className="text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
              Read more ↗
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="glass glass-hover inline-block rounded-xl px-7 py-3 text-sm font-semibold text-slate-200 shadow"
        >
          View all posts →
        </Link>
      </div>
    </section>
  );
}
