import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedPostBySlug } from "@/lib/posts";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Jose R.`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="mesh-bg min-h-screen">
      <article className="relative px-6 py-28 max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="text-sm text-slate-500 hover:text-cyan-400 transition-colors"
        >
          ← Back to blog
        </Link>

        <header className="mt-8 mb-10">
          <h1 className="text-4xl font-bold gradient-text mb-3">{post.title}</h1>
          <p className="text-sm text-slate-500">
            {new Date(post.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 text-xs text-violet-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="glass rounded-2xl p-8 post-content">
          <MarkdownRenderer content={post.content} />
        </div>
      </article>
    </main>
  );
}
