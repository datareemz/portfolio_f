import fs from "fs";
import path from "path";
import { assert } from "@/lib/assert";
import type { WeekData } from "@/components/FPLChart";

interface ParsedFPL {
  weeks: WeekData[];
  totalPoints: number;
}

const CSV_PATH = path.join(
  process.cwd(),
  "src",
  "resources",
  "performance_weekly_performance.csv",
);

export function parseFPLData(): ParsedFPL {
  assert(fs.existsSync(CSV_PATH), "FPL CSV file must exist");

  const raw = fs.readFileSync(CSV_PATH, "utf-8");
  assert(raw.length > 0, "CSV file must not be empty");

  const lines = raw.trim().split("\n");
  const header = lines[0];
  assert(header.includes("game_week"), "CSV must have game_week column");

  const rows = lines.slice(1);
  assert(rows.length > 0, "CSV must have at least one data row");

  let lastTotal = 0;

  const weeks: WeekData[] = rows.map((line) => {
    const cols = line.split(",");
    assert(cols.length >= 5, "Each row needs at least 5 columns");

    const week = parseInt(cols[0], 10);
    const myPoints = parseInt(cols[1], 10);
    const avgPoints = parseInt(cols[2], 10);
    const totalPoints = parseInt(cols[4], 10);

    assert(!isNaN(week), "Week must be a valid number");
    assert(!isNaN(myPoints), "My points must be a valid number");

    lastTotal = totalPoints;

    return { week, myPoints, avgPoints };
  });

  assert(weeks.length > 1, "Need at least 2 weeks for charting");
  assert(lastTotal > 0, "Total points must be positive");

  return { weeks, totalPoints: lastTotal };
}
