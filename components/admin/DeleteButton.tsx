"use client";

export default function DeleteButton({ action }: { action: () => void }) {
  return (
    <form action={action}>
      <button
        type="submit"
        onClick={(e) => {
          if (!window.confirm("Delete this post? This cannot be undone.")) {
            e.preventDefault();
          }
        }}
        className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20 transition-colors"
      >
        Delete
      </button>
    </form>
  );
}
