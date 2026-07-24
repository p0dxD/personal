import { login } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="mesh-bg min-h-screen flex items-center justify-center px-6">
      <form
        action={login}
        className="glass rounded-3xl px-10 py-12 max-w-sm w-full shadow-2xl flex flex-col gap-6"
      >
        <div className="text-center">
          <span className="inline-block mb-4 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-violet-300">
            Admin
          </span>
          <h1 className="text-2xl font-bold gradient-text">Sign in</h1>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm text-slate-400">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 transition-colors"
          />
        </div>

        {error && (
          <p className="text-sm text-red-400 text-center">Incorrect password.</p>
        )}

        <button
          type="submit"
          className="btn-gradient rounded-xl px-7 py-3 text-sm font-semibold text-white shadow-lg"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
