"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Something went wrong");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative px-6 py-28 max-w-2xl mx-auto">
      <div className="mb-14 text-center">
        <span className="inline-block mb-3 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-violet-300">
          Contact
        </span>
        <h2 className="text-4xl font-bold gradient-text">Get in Touch</h2>
        <p className="mt-3 text-slate-400">
          Have an idea, question, or just want to say hi? I&apos;d love to hear from you.
        </p>
      </div>

      <div className="glass rounded-2xl p-8 shadow-xl">
        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <div className="h-14 w-14 rounded-full bg-emerald-500/15 flex items-center justify-center text-3xl">
              ✓
            </div>
            <p className="text-lg font-semibold text-emerald-300">Message sent!</p>
            <p className="text-sm text-slate-400">I&apos;ll get back to you soon.</p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-2 text-sm text-violet-400 hover:text-violet-300 underline underline-offset-4"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Name</span>
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  className="rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-colors"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-colors"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Message</span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="What's on your mind?"
                className="rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-colors resize-none"
              />
            </label>

            {status === "error" && (
              <p className="text-sm text-red-400 bg-red-500/10 rounded-lg px-4 py-2.5 border border-red-500/20">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-gradient w-full rounded-xl py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>

      <p className="mt-8 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Podoi Tech LLC. All rights reserved.
      </p>
    </section>
  );
}
