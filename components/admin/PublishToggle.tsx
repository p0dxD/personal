"use client";

export default function PublishToggle({
  action,
  published,
}: {
  action: () => void;
  published: boolean;
}) {
  return (
    <form action={action}>
      <button
        type="submit"
        className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition-colors"
      >
        {published ? "Unpublish" : "Publish"}
      </button>
    </form>
  );
}
