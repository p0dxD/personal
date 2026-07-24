"use client";

import { useState } from "react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import type { Post } from "@/lib/posts";

type PostEditorProps = {
  action: (formData: FormData) => void;
  post?: Post;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function PostEditor({ action, post }: PostEditorProps) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [tags, setTags] = useState(post?.tags.join(", ") ?? "");
  const [content, setContent] = useState(post?.content ?? "");

  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm text-slate-400">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            className="rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="slug" className="text-sm text-slate-400">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            className="rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="excerpt" className="text-sm text-slate-400">
          Excerpt
        </label>
        <input
          id="excerpt"
          name="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="tags" className="text-sm text-slate-400">
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          name="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 transition-colors"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="text-sm text-slate-400">
            Content (Markdown)
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={20}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white font-mono outline-none focus:border-violet-500/50 transition-colors resize-y"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-slate-400">Preview</span>
          <div className="glass rounded-xl p-4 post-content overflow-y-auto max-h-[32rem]">
            <MarkdownRenderer content={content || "*Nothing to preview yet.*"} />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="btn-gradient self-start rounded-xl px-7 py-3 text-sm font-semibold text-white shadow-lg"
      >
        {post ? "Save changes" : "Create post"}
      </button>
    </form>
  );
}
