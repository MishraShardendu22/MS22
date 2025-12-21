"use client";

import { Activity, GitCommit } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

// Lazy load Recharts components
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false },
);
const ComposedChart = dynamic(
  () => import("recharts").then((mod) => mod.ComposedChart),
  { ssr: false },
);
const Area = dynamic(() => import("recharts").then((mod) => mod.Area), {
  ssr: false,
});
const Bar = dynamic(() => import("recharts").then((mod) => mod.Bar), {
  ssr: false,
});
const Line = dynamic(() => import("recharts").then((mod) => mod.Line), {
  ssr: false,
});
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), {
  ssr: false,
});
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), {
  ssr: false,
});
const CartesianGrid = dynamic(
  () => import("recharts").then((mod) => mod.CartesianGrid),
  { ssr: false },
);
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), {
  ssr: false,
});
const Legend = dynamic(() => import("recharts").then((mod) => mod.Legend), {
  ssr: false,
});

interface CommitsActivityCardProps {
  commits: Array<{ date: string; count: number }>;
  calendar: any;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-xl">
        <p className="text-xs text-gray-400 mb-1">
          Week of{" "}
          {new Date(data.week).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </p>
        <div className="space-y-1">
          <p className="text-sm text-cyan-400 font-semibold flex items-center gap-2">
            <GitCommit className="w-3 h-3" />
            {data.commits} commits
          </p>
          {data.trend && (
            <p
              className={`text-xs ${data.trend > 0 ? "text-green-400" : "text-red-400"}`}
            >
              {data.trend > 0 ? "↑" : "↓"} {Math.abs(data.trend)}% vs avg
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const CommitsActivityCard = ({
  commits,
  calendar,
}: CommitsActivityCardProps) => {
  if (!commits || commits.length === 0) {
    return null;
  }

  // Memoize data processing to avoid recalculation
  const { weeklyData, enrichedData, avgCommits } = useMemo(() => {
    const weekly = commits
      .reduce((acc: any[], commit: { date: string; count: number }) => {
        if (!commit.date || !commit.count) return acc;

        const date = new Date(commit.date);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        const weekKey = weekStart.toISOString().split("T")[0];

        const existing = acc.find((w: any) => w.week === weekKey);
        if (existing) {
          existing.commits += commit.count;
        } else {
          acc.push({
            week: weekKey,
            commits: commit.count,
          });
        }
        return acc;
      }, [])
      .slice(-52);

    const avgCommits =
      weekly.reduce((sum: number, w: any) => sum + w.commits, 0) /
      weekly.length;

    const enriched = weekly.map((week: any, index: number) => {
      const movingAvg =
        index >= 3
          ? weekly
              .slice(Math.max(0, index - 3), index + 1)
              .reduce((sum: number, w: any) => sum + w.commits, 0) /
            Math.min(4, index + 1)
          : week.commits;

      const trend = (((week.commits - avgCommits) / avgCommits) * 100).toFixed(
        1,
      );

      return {
        ...week,
        movingAvg: Math.round(movingAvg),
        trend: Number.parseFloat(trend),
      };
    });

    return { weeklyData: weekly, enrichedData: enriched, avgCommits };
  }, [commits]);

  const totalCommits = weeklyData.reduce(
    (sum: number, w: any) => sum + w.commits,
    0,
  );
  const avgPerWeek = Math.round(avgCommits);
  const peakWeek = weeklyData.reduce(
    (max: any, w: any) => (w.commits > (max?.commits || 0) ? w : max),
    { commits: 0 },
  );

  const recentTrend =
    enrichedData.slice(-4).reduce((sum: number, w: any) => sum + w.commits, 0) /
    4;
  const previousTrend =
    enrichedData
      .slice(-8, -4)
      .reduce((sum: number, w: any) => sum + w.commits, 0) / 4;
  const trendChange = (
    ((recentTrend - previousTrend) / previousTrend) *
    100
  ).toFixed(1);

  return (
    <div className="bg-linear-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
          <Activity className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Development Activity</h3>
          <p className="text-xs text-gray-400">
            Commit patterns and trends over time
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
          <p className="text-xs text-gray-400 mb-1">Total</p>
          <p className="text-xl font-bold text-white">{totalCommits}</p>
        </div>
        <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
          <p className="text-xs text-gray-400 mb-1">Avg/Week</p>
          <p className="text-xl font-bold text-cyan-400">{avgPerWeek}</p>
        </div>
        <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
          <p className="text-xs text-gray-400 mb-1">Peak Week</p>
          <p className="text-xl font-bold text-green-400">{peakWeek.commits}</p>
        </div>
        <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
          <p className="text-xs text-gray-400 mb-1">Recent Trend</p>
          <p
            className={`text-xl font-bold ${parseFloat(trendChange) >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {parseFloat(trendChange) > 0 ? "+" : ""}
            {trendChange}%
          </p>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={enrichedData}
            margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              opacity={0.3}
            />

            <XAxis
              dataKey="weekLabel"
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              axisLine={{ stroke: "#374151" }}
              tickLine={{ stroke: "#374151" }}
              interval={Math.floor(enrichedData.length / 8)}
              angle={-45}
              textAnchor="end"
              height={60}
            />

            <YAxis
              yAxisId="left"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={{ stroke: "#374151" }}
              tickLine={{ stroke: "#374151" }}
              label={{
                value: "Commits",
                angle: -90,
                position: "insideLeft",
                fill: "#9CA3AF",
                fontSize: 12,
              }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm text-gray-300">{value}</span>
              )}
            />

            <Area
              yAxisId="left"
              type="monotone"
              dataKey="commits"
              fill="url(#areaGradient)"
              stroke="none"
              name="Commit Volume"
            />

            <Bar
              yAxisId="left"
              dataKey="commits"
              fill="#06b6d4"
              opacity={0.6}
              radius={[4, 4, 0, 0]}
              name="Weekly Commits"
            />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="movingAvg"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              name="4-Week Moving Avg"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <p className="text-gray-500">Last 52 weeks</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500/60"></div>
            <span className="text-gray-400">Commits</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-400">Trend</span>
          </div>
        </div>
      </div>
    </div>
  );
};
