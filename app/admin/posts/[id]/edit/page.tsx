import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getPostByIdForAdmin } from "@/lib/posts";
import PostEditor from "@/components/admin/PostEditor";
import { updatePostAction } from "@/app/admin/posts/actions";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();

  const { id } = await params;
  const post = await getPostByIdForAdmin(Number(id));
  if (!post) notFound();

  const boundAction = updatePostAction.bind(null, post.id);

  return (
    <main className="mesh-bg min-h-screen px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold gradient-text mb-8">Edit Post</h1>
      <PostEditor action={boundAction} post={post} />
    </main>
  );
}
