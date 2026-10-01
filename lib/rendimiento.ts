// Live numbers from rendimiento.ai, the CI/CD platform that runs this site.
// Fetched server-side over the cluster network, cached for a minute; when
// the platform cannot be reached the live section is simply left out.

export interface DayCount { day: string; n: number }
export interface DayRatio { day: string; uptime?: number }

export interface Delivery {
  deploys: number;
  builds: number;
  buildsSucceeded: number;
  medianBuildSec: number;
  medianLeadSec: number;
  verified: number;
  failedVerify: number;
  autoRollbacks: number;
  incidents: number;
  meanRecoverySec: number;
  deploysPerDay: DayCount[];
  activeApps: number;
  changeFailurePct: number;
}

export interface Site {
  app: string;
  service: string;
  url: string;
  up?: boolean;
  uptime24h?: number;
  uptime30d?: number;
  p50Ms: number;
  daily: DayRatio[];
  /** The last 48 hours, one per hour (day holds the hour, ISO 8601). */
  hourly: DayRatio[];
}

export interface ClusterNode {
  name: string;
  role: "control-plane" | "worker";
  arch: string;
  os: string;
  ready: boolean;
  pods: number;
  cpuCores: number;
  cpuUsed?: number;
  memBytes: number;
  memUsed?: number;
  gpus?: number;
}

export interface ReleaseEvent {
  app: string;
  number: number;
  at: string;
  rollbackOf?: number;
  verifyStatus?: string;
  automatic?: boolean;
}

export interface LiveStats {
  generatedAt: string;
  timeZone: string;
  delivery30d: Delivery;
  sites: Site[];
  cluster: { distribution: string; version: string; pods: number; apps: number; nodes: ClusterNode[] };
  recent: ReleaseEvent[];
}

const STATS_URL =
  process.env.RENDIMIENTO_STATS_URL ??
  "http://rendimiento.rendimiento-system.svc.cluster.local/api/public/stats";

export async function getLiveStats(): Promise<LiveStats | null> {
  try {
    const res = await fetch(STATS_URL, { next: { revalidate: 60 }, signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    return (await res.json()) as LiveStats;
  } catch {
    return null;
  }
}
