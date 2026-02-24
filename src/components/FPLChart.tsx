"use client";

import { motion } from "framer-motion";
import { assert } from "@/lib/assert";
import Link from "next/link";

export interface WeekData {
  week: number;
  myPoints: number;
  avgPoints: number;
}

interface FPLChartProps {
  data: WeekData[];
  totalPoints: number;
  showProjectLink?: boolean;
}

const CHART = {
  width: 700,
  height: 280,
  padding: { top: 20, right: 20, bottom: 40, left: 45 },
} as const;

const INNER_W = CHART.width - CHART.padding.left - CHART.padding.right;
const INNER_H = CHART.height - CHART.padding.top - CHART.padding.bottom;
const Y_STEP = 20;
const MAX_TICKS = 10;
const INDIGO = "rgb(99, 102, 241)";
const GRAY = "rgb(156, 163, 175)";

function xScale(week: number, totalWeeks: number): number {
  assert(week >= 1, "Week must be at least 1");
  assert(totalWeeks > 1, "Need multiple weeks for scaling");
  return CHART.padding.left + ((week - 1) / (totalWeeks - 1)) * INNER_W;
}

function yScale(points: number, min: number, max: number): number {
  assert(max > min, "Max must exceed min");
  assert(points >= min - 1 && points <= max + 1, "Points out of range");
  return (
    CHART.padding.top + INNER_H - ((points - min) / (max - min)) * INNER_H
  );
}

function buildLinePath(
  data: WeekData[],
  key: "myPoints" | "avgPoints",
  yMin: number,
  yMax: number,
): string {
  assert(data.length > 1, "Need at least 2 data points");
  assert(key === "myPoints" || key === "avgPoints", "Invalid data key");
  const segments = data.map(
    (d) => `${xScale(d.week, data.length)},${yScale(d[key], yMin, yMax)}`,
  );
  return `M ${segments.join(" L ")}`;
}

function buildAreaPath(
  data: WeekData[],
  yMin: number,
  yMax: number,
): string {
  assert(data.length > 1, "Need at least 2 data points for area");
  assert(yMax > yMin, "Max must exceed min for area");
  const total = data.length;
  const line = data
    .map((d) => `${xScale(d.week, total)},${yScale(d.myPoints, yMin, yMax)}`)
    .join(" L ");
  const baseline = CHART.padding.top + INNER_H;
  const first = data[0];
  const last = data[data.length - 1];
  return [
    `M ${xScale(first.week, total)},${yScale(first.myPoints, yMin, yMax)}`,
    `L ${line}`,
    `L ${xScale(last.week, total)},${baseline}`,
    `L ${xScale(first.week, total)},${baseline}`,
    "Z",
  ].join(" ");
}

export default function FPLChart({
  data,
  totalPoints,
  showProjectLink = true,
}: FPLChartProps) {
  assert(data.length > 1, "Need at least 2 weeks of data");
  assert(totalPoints > 0, "Total points must be positive");

  const totalWeeks = data.length;
  const weeksBeatAvg = data.filter((d) => d.myPoints > d.avgPoints).length;
  const latestWeek = data[data.length - 1];

  const allPts = data.flatMap((d) => [d.myPoints, d.avgPoints]);
  const rawMin = Math.min(...allPts);
  const rawMax = Math.max(...allPts);
  const pad = Math.ceil((rawMax - rawMin) * 0.12);
  const yMin = rawMin - pad;
  const yMax = rawMax + pad;

  const myPath = buildLinePath(data, "myPoints", yMin, yMax);
  const avgPath = buildLinePath(data, "avgPoints", yMin, yMax);
  const areaPath = buildAreaPath(data, yMin, yMax);

  const yTicks: number[] = [];
  const tickStart = Math.ceil(yMin / Y_STEP) * Y_STEP;
  let count = 0;
  for (let y = tickStart; y <= yMax && count < MAX_TICKS; y += Y_STEP) {
    yTicks.push(y);
    count += 1;
  }

  const xLabels = data.filter(
    (d) => d.week === 1 || d.week % 5 === 0 || d.week === totalWeeks,
  );

  const latestX = xScale(latestWeek.week, totalWeeks);
  const latestY = yScale(latestWeek.myPoints, yMin, yMax);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-white/[0.02] p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            {/* Soccer ball icon */}
            <svg
              className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <polygon
                points="12,7 16.8,10.5 14.9,16 9.1,16 7.2,10.5"
                stroke="currentColor"
                strokeWidth="1"
                fill="currentColor"
                opacity="0.12"
              />
              <line x1="12" y1="7" x2="12" y2="2" stroke="currentColor" strokeWidth="1" />
              <line x1="16.8" y1="10.5" x2="21.5" y2="8.9" stroke="currentColor" strokeWidth="1" />
              <line x1="14.9" y1="16" x2="17.9" y2="20.1" stroke="currentColor" strokeWidth="1" />
              <line x1="9.1" y1="16" x2="6.1" y2="20.1" stroke="currentColor" strokeWidth="1" />
              <line x1="7.2" y1="10.5" x2="2.5" y2="8.9" stroke="currentColor" strokeWidth="1" />
            </svg>
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                FPL 2025 Bot Performance
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Bot weekly points vs Average weekly points
              </p>
            </div>
          </div>
          <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-0.5 rounded-full bg-indigo-500" />
              Bot
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-0.5 rounded-full bg-gray-400 opacity-60" />
              Average
            </span>
          </div>
        </div>

        {/* Chart */}
        <svg
          viewBox={`0 0 ${CHART.width} ${CHART.height}`}
          className="w-full"
          role="img"
          aria-label={`FPL performance chart over ${totalWeeks} game weeks`}
        >
          <defs>
            <linearGradient id="fplAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={INDIGO} stopOpacity="0.25" />
              <stop offset="100%" stopColor={INDIGO} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines + Y labels */}
          {yTicks.map((y) => (
            <g key={`grid-${y}`}>
              <line
                x1={CHART.padding.left}
                y1={yScale(y, yMin, yMax)}
                x2={CHART.width - CHART.padding.right}
                y2={yScale(y, yMin, yMax)}
                className="chart-grid-line"
              />
              <text
                x={CHART.padding.left - 8}
                y={yScale(y, yMin, yMax) + 4}
                textAnchor="end"
                fontSize="11"
                className="chart-label"
              >
                {y}
              </text>
            </g>
          ))}

          {/* Subtle vertical pitch-style markers */}
          {data
            .filter((d) => d.week % 5 === 0)
            .map((d) => (
              <line
                key={`vgrid-${d.week}`}
                x1={xScale(d.week, totalWeeks)}
                y1={CHART.padding.top}
                x2={xScale(d.week, totalWeeks)}
                y2={CHART.padding.top + INNER_H}
                className="chart-grid-line"
                strokeDasharray="3 3"
              />
            ))}

          {/* X axis labels */}
          {xLabels.map((d) => (
            <text
              key={`x-${d.week}`}
              x={xScale(d.week, totalWeeks)}
              y={CHART.height - 12}
              textAnchor="middle"
              fontSize="11"
              className="chart-label"
            >
              GW{d.week}
            </text>
          ))}

          {/* Area fill */}
          <motion.path
            d={areaPath}
            fill="url(#fplAreaGrad)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.2 }}
          />

          {/* Average line */}
          <motion.path
            d={avgPath}
            fill="none"
            stroke={GRAY}
            strokeWidth="1.5"
            strokeOpacity="0.6"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          />

          {/* My points line */}
          <motion.path
            d={myPath}
            fill="none"
            stroke={INDIGO}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />

          {/* Soccer ball marker at latest game week */}
          <motion.g
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            <g transform={`translate(${latestX}, ${latestY})`}>
              <circle
                r="8"
                fill="var(--background)"
                stroke={INDIGO}
                strokeWidth="1.5"
              />
              <polygon
                points="0,-4 3.8,-1.2 2.4,3.2 -2.4,3.2 -3.8,-1.2"
                fill={INDIGO}
                opacity="0.15"
                stroke={INDIGO}
                strokeWidth="0.6"
              />
              <line x1="0" y1="-4" x2="0" y2="-8" stroke={INDIGO} strokeWidth="0.6" />
              <line x1="3.8" y1="-1.2" x2="7.6" y2="-2.5" stroke={INDIGO} strokeWidth="0.6" />
              <line x1="2.4" y1="3.2" x2="4.7" y2="6.5" stroke={INDIGO} strokeWidth="0.6" />
              <line x1="-2.4" y1="3.2" x2="-4.7" y2="6.5" stroke={INDIGO} strokeWidth="0.6" />
              <line x1="-3.8" y1="-1.2" x2="-7.6" y2="-2.5" stroke={INDIGO} strokeWidth="0.6" />
            </g>
          </motion.g>
        </svg>

        {/* Stats footer */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Total</span>
              <span className="ml-1.5 font-semibold">
                {totalPoints.toLocaleString()} pts
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">
                Beat avg
              </span>
              <span className="ml-1.5 font-semibold">
                {weeksBeatAvg}/{totalWeeks} weeks
              </span>
            </div>
          </div>
          {showProjectLink && (
            <Link
              href="/projects/fpl2025"
              className="text-sm text-indigo-500 hover:text-indigo-400 transition-colors font-medium"
            >
              View project &rarr;
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
