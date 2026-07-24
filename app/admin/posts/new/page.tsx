import { requireAdmin } from "@/lib/auth";
import PostEditor from "@/components/admin/PostEditor";
import { createPostAction } from "@/app/admin/posts/actions";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  await requireAdmin();

  return (
    <main className="mesh-bg min-h-screen px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold gradient-text mb-8">New Post</h1>
      <PostEditor action={createPostAction} />
    </main>
  );
}
