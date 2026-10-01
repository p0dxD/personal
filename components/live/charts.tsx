"use client";
// Interactive pieces of the live section: per-day deploy bars and 90-day
// uptime strips, each with a hover/focus tooltip. Colors: one validated
// blue for the single deploy series; reserved status colors (always with a
// label) for uptime.
import { useState } from "react";
import type { DayCount, DayRatio } from "@/lib/rendimiento";

const SERIES = "#3987e5";
export const STATUS = { good: "#0ca30c", warning: "#fab219", critical: "#d03b3b", none: "rgba(255,255,255,0.08)" };

function fmtDay(day: string) {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

type Tip = { x: number; w: number; text: string; sub?: string } | null;

/** A tooltip above the hovered mark, kept inside its chart's width. */
function TipBox({ tip }: { tip: Tip }) {
  if (!tip) return null;
  const align = tip.x < 70 ? "translate-x-0" : tip.x > tip.w - 70 ? "-translate-x-full" : "-translate-x-1/2";
  return (
    <div className={`pointer-events-none absolute -top-14 z-10 ${align} whitespace-nowrap rounded-lg border border-white/10 bg-[#14121c] px-3 py-1.5 text-xs shadow-xl`}
      style={{ left: tip.x }}>
      <div className="font-semibold text-white">{tip.text}</div>
      {tip.sub && <div className="text-slate-400">{tip.sub}</div>}
    </div>
  );
}

/** Deploys per day: one bar per day, the busiest day labelled. Leading
 *  days without deploys (before the platform existed) are left out, but at
 *  least 14 days are shown. */
export function DeployBars({ days: all }: { days: DayCount[] }) {
  const [tip, setTip] = useState<Tip>(null);
  const first = all.findIndex((d) => d.n > 0);
  const days = all.slice(Math.max(0, Math.min(first < 0 ? all.length : first, all.length - 14)));
  const max = Math.max(1, ...days.map((d) => d.n));
  const busiest = days.reduce((a, d) => (d.n > a.n ? d : a), days[0]);
  return (
    <div className="relative" onMouseLeave={() => setTip(null)}>
      <TipBox tip={tip} />
      <div className="flex h-36 items-end gap-[2px] border-b border-white/15"
        role="img" aria-label={`Deploys per day over the last ${days.length} days; busiest ${fmtDay(busiest.day)} with ${busiest.n}`}>
        {days.map((d) => (
          <div key={d.day} className="group relative flex h-full flex-1 items-end justify-center"
            onMouseEnter={(e) => {
              const parent = e.currentTarget.parentElement!.getBoundingClientRect();
              const box = e.currentTarget.getBoundingClientRect();
              setTip({ x: box.left - parent.left + box.width / 2, w: parent.width, text: `${d.n} deploy${d.n === 1 ? "" : "s"}`, sub: fmtDay(d.day) });
            }}>
            <div className="w-full max-w-[24px] rounded-t-[4px] transition-opacity group-hover:opacity-80"
              style={{ height: `${(d.n / max) * 100}%`, minHeight: d.n ? 3 : 0, background: SERIES }} />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-slate-500">
        <span>{fmtDay(days[0].day)}</span>
        <span>busiest: {fmtDay(busiest.day)} · {busiest.n}</span>
        <span>today</span>
      </div>
    </div>
  );
}

function dayState(u?: number): keyof typeof STATUS {
  if (u === undefined || u === null) return "none";
  if (u >= 0.999) return "good";
  if (u >= 0.95) return "warning";
  return "critical";
}
const stateLabel = { good: "Up", warning: "Partly down", critical: "Down", none: "No data yet" };

function fmtHour(iso: string) {
  return new Date(iso).toLocaleString("en-US", { weekday: "short", hour: "numeric" });
}

/** Uptime like a status page: one cell per day, or per hour while there is
 *  little history (hourly: true). */
export function UptimeStrip({ cells: daily, label, hourly }: { cells: DayRatio[]; label: string; hourly?: boolean }) {
  const [tip, setTip] = useState<Tip>(null);
  return (
    <div className="relative" onMouseLeave={() => setTip(null)}>
      <TipBox tip={tip} />
      <div className="flex h-7 gap-[2px]" role="img" aria-label={`${label}: uptime for the last ${daily.length} ${hourly ? "hours" : "days"}`}>
        {daily.map((d) => {
          const st = dayState(d.uptime);
          return (
            <span key={d.day} className="flex-1 rounded-[2px] transition-[filter] hover:brightness-125"
              style={{ background: STATUS[st] }}
              onMouseEnter={(e) => {
                const parent = e.currentTarget.parentElement!.getBoundingClientRect();
                const box = e.currentTarget.getBoundingClientRect();
                setTip({
                  x: box.left - parent.left + box.width / 2, w: parent.width,
                  text: d.uptime === undefined || d.uptime === null ? stateLabel.none : `${(d.uptime * 100).toFixed(d.uptime >= 0.99 ? 2 : 1)}% up`,
                  sub: `${hourly ? fmtHour(d.day) : fmtDay(d.day)} · ${stateLabel[st]}`,
                });
              }} />
          );
        })}
      </div>
    </div>
  );
}

export function UptimeLegend() {
  return (
    <div className="flex flex-wrap gap-4 text-xs text-slate-400">
      {(["good", "warning", "critical", "none"] as const).map((s) => (
        <span key={s} className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-[2px]" style={{ background: STATUS[s] }} />
          {stateLabel[s]}
        </span>
      ))}
    </div>
  );
}
