import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getAllPostsForAdmin } from "@/lib/posts";
import { deletePostAction, setPublishedAction } from "@/app/admin/posts/actions";
import { logout } from "@/app/admin/login/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import PublishToggle from "@/components/admin/PublishToggle";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireAdmin();
  const posts = await getAllPostsForAdmin();

  return (
    <main className="mesh-bg min-h-screen px-6 py-16 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold gradient-text">Posts</h1>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new"
            className="btn-gradient rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
          >
            New Post
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="glass glass-hover rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-200"
            >
              Log out
            </button>
          </form>
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-slate-400">No posts yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="glass rounded-xl p-5 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <h2 className="text-base font-semibold text-white truncate">
                    {post.title}
                  </h2>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                      post.published
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                        : "bg-slate-500/15 text-slate-400 border-slate-500/30"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Updated{" "}
                  {new Date(post.updated_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-300 hover:bg-violet-500/20 transition-colors"
                >
                  Edit
                </Link>
                <PublishToggle
                  action={setPublishedAction.bind(null, post.id, !post.published)}
                  published={post.published}
                />
                <DeleteButton action={deletePostAction.bind(null, post.id)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
