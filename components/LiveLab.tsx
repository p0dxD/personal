import { getLiveStats, type ClusterNode, type LiveStats, type ReleaseEvent } from "@/lib/rendimiento";
import { DeployBars, STATUS, UptimeLegend, UptimeStrip } from "./live/charts";

// "Live from the home lab": real numbers from the cluster this site runs on,
// published by rendimiento.ai. Left out entirely if they cannot be fetched.

function minutes(sec: number) {
  if (!sec) return "—";
  return sec < 90 ? `${Math.round(sec)} s` : `${(sec / 60).toFixed(1)} min`;
}

function pct(v?: number, digits = 2) {
  if (v === undefined || v === null) return "—";
  return v >= 0.99995 ? "100%" : `${(v * 100).toFixed(digits)}%`;
}

function ago(iso: string) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 90) return "just now";
  if (s < 3600) return `${Math.round(s / 60)} min ago`;
  if (s < 86400) return `${Math.round(s / 3600)} h ago`;
  return `${Math.round(s / 86400)} d ago`;
}

function gb(bytes: number) {
  return `${(bytes / 2 ** 30).toFixed(bytes < 10 * 2 ** 30 ? 1 : 0)} GB`;
}

function hardware(n: ClusterNode) {
  if (n.gpus) return "NVIDIA Jetson Orin Nano · GPU";
  return `Raspberry Pi 4 · ${Math.round(n.memBytes / 2 ** 30)} GB`;
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-1 text-3xl font-bold text-white">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{note}</div>
    </div>
  );
}

function Meter({ label, used, total, fmt }: { label: string; used?: number; total: number; fmt: (n: number) => string }) {
  if (used === undefined) return null;
  const p = Math.min(100, (used / total) * 100);
  const color = p >= 85 ? STATUS.warning : "#3987e5";
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="tabular-nums text-slate-300">{fmt(used)} / {fmt(total)}</span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-[#3987e5]/15" role="meter" aria-label={label} aria-valuenow={Math.round(p)} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full" style={{ width: `${Math.max(p, 2)}%`, background: color }} />
      </div>
    </div>
  );
}

function releaseLine(e: ReleaseEvent) {
  if (e.rollbackOf && e.automatic) return { icon: "↩", tone: "text-amber-300", text: `rolled back to #${e.rollbackOf} automatically` };
  if (e.rollbackOf) return { icon: "↩", tone: "text-slate-300", text: `rolled back to #${e.rollbackOf}` };
  switch (e.verifyStatus) {
    case "passed": return { icon: "✓", tone: "text-emerald-400", text: "deployed · verified" };
    case "failed": return { icon: "✕", tone: "text-red-400", text: "failed verification · rolled back" };
    case "verifying": return { icon: "●", tone: "text-sky-400", text: "deploying · verifying now" };
  }
  return { icon: "●", tone: "text-slate-400", text: "deployed" };
}

export default async function LiveLab() {
  const s: LiveStats | null = await getLiveStats();
  if (!s) return null;
  const d = s.delivery30d;
  const sites = s.sites;
  const up = sites.filter((x) => x.up).length;
  const withMonth = sites.filter((x) => x.uptime30d !== undefined && x.uptime30d !== null);
  const avg30 = withMonth.length ? withMonth.reduce((a, x) => a + (x.uptime30d ?? 0), 0) / withMonth.length : undefined;
  const buildRate = d.builds ? d.buildsSucceeded / d.builds : undefined;
  const nodes = [...s.cluster.nodes].sort((a, b) => (a.role === b.role ? a.name.localeCompare(b.name) : a.role === "control-plane" ? -1 : 1));
  // Daily cells once there are two weeks of history; hourly until then.
  const historyDays = Math.max(0, ...sites.map((x) => x.daily.filter((c) => c.uptime !== undefined && c.uptime !== null).length));
  const hourly = historyDays < 14 && sites.every((x) => x.hourly?.length);
  const updated = new Date(s.generatedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: s.timeZone, timeZoneName: "short" });

  return (
    <section id="live" className="relative mx-auto max-w-5xl px-6 py-28">
      <div className="mb-14 text-center">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live
        </span>
        <h2 className="text-4xl font-bold gradient-text">Live from the Home Lab</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-400">
          Real numbers from the cluster this page runs on, published every minute by{" "}
          <a href="https://github.com/p0dxD/rendimiento.ai" target="_blank" rel="noopener noreferrer" className="text-violet-300 hover:text-violet-200">rendimiento.ai</a>,
          the CI/CD platform I built. Updated {updated}.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        <Stat label="Sites online" value={`${up} / ${sites.length}`} note="checked every minute" />
        <Stat label="Uptime, last 30 days" value={pct(avg30)} note="average of the public sites" />
        <Stat label="Deploys, last 30 days" value={String(d.deploys)} note={`across ${d.activeApps} apps`} />
        <Stat label="Push to live" value={minutes(d.medianLeadSec)} note="typical, from git push to release" />
        <Stat label="Builds succeeding" value={buildRate === undefined ? "—" : `${Math.round(buildRate * 100)}%`} note={`${d.buildsSucceeded} of ${d.builds} on main`} />
        <Stat label="Bad releases caught" value={String(d.autoRollbacks)} note="rolled back automatically" />
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-5">
        <div className="glass rounded-2xl p-6 md:col-span-3">
          <div className="mb-5 flex items-baseline justify-between">
            <h3 className="font-semibold text-white">Deploys per day</h3>
            <span className="text-xs text-slate-500">{d.deploys} in 30 days</span>
          </div>
          <DeployBars days={d.deploysPerDay} />
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
            <div>
              <div className="text-xl font-semibold text-white">{minutes(d.medianBuildSec)}</div>
              <div className="text-xs text-slate-500">typical build, test to image</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-white">{d.verified}</div>
              <div className="text-xs text-slate-500">releases verified live</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-white">{d.incidents ? minutes(d.meanRecoverySec) : "—"}</div>
              <div className="text-xs text-slate-500">{d.incidents} outage{d.incidents === 1 ? "" : "s"}, mean recovery</div>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            Every push to main is tested, built on a BuildKit pool across the Pis, released, and watched for 5 minutes; a release that breaks a site is rolled back on its own.
          </p>
        </div>
        <div className="glass rounded-2xl p-6 md:col-span-2">
          <h3 className="mb-4 font-semibold text-white">Recent releases</h3>
          <ul className="space-y-2.5">
            {s.recent.slice(0, 8).map((e) => {
              const l = releaseLine(e);
              return (
                <li key={`${e.app}-${e.number}`} className="flex items-start gap-2.5 text-sm">
                  <span className={`mt-px w-4 text-center ${l.tone}`} aria-hidden>{l.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="text-slate-200">{e.app}</span> <span className="text-slate-500">#{e.number}</span>
                    <span className="block text-xs text-slate-500">{l.text} · {ago(e.at)}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="glass mb-6 rounded-2xl p-6">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-semibold text-white">Sites</h3>
          <UptimeLegend />
        </div>
        <div className="space-y-5">
          {sites.map((x) => (
            <div key={`${x.app}-${x.service}`}>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: x.up ? STATUS.good : STATUS.critical }} aria-hidden />
                  <a href={x.url} target="_blank" rel="noopener noreferrer" className="font-medium text-slate-200 hover:text-white">
                    {x.url.replace("https://", "")}
                  </a>
                  <span className={`text-xs ${x.up ? "text-emerald-400" : "text-red-400"}`}>{x.up ? "Up" : "Down"}</span>
                </div>
                <div className="flex gap-4 text-xs tabular-nums text-slate-400">
                  <span>{pct(x.uptime30d)} <span className="text-slate-600">30 d</span></span>
                  <span>{x.p50Ms ? `${x.p50Ms} ms` : "—"} <span className="text-slate-600">typical</span></span>
                </div>
              </div>
              <UptimeStrip cells={hourly ? x.hourly : x.daily} hourly={hourly} label={x.url} />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-slate-600">
          <span>{hourly ? "48 hours ago" : "90 days ago"}</span>
          <span>{hourly ? "now, by the hour (90-day view once there are two weeks of history)" : "today"}</span>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-semibold text-white">The cluster</h3>
          <span className="text-xs text-slate-500">{s.cluster.distribution} {s.cluster.version.replace(/\+.*/, "")} · {nodes.length} nodes · {s.cluster.pods} pods · {s.cluster.apps} apps</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nodes.map((n) => (
            <div key={n.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-slate-200">{n.name}</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] ${n.ready ? "bg-emerald-500/10 text-emerald-300" : "bg-red-500/10 text-red-300"}`}>
                  {n.ready ? "Ready" : "Not ready"}
                </span>
              </div>
              <div className="mt-1 text-xs text-slate-500">{hardware(n)} · {n.role === "control-plane" ? "control plane" : "worker"} · {n.pods} pods</div>
              <div className="mt-3 space-y-2.5">
                <Meter label="CPU" used={n.cpuUsed} total={n.cpuCores} fmt={(v) => `${v.toFixed(v < 10 ? 1 : 0)} cores`} />
                <Meter label="Memory" used={n.memUsed} total={n.memBytes} fmt={gb} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
