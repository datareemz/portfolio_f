import { assert } from "@/lib/assert";

interface PillData {
  icon: React.ReactNode;
  label: string;
}

const GRADUATION_CAP = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3 h-3"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
  </svg>
);

const MAP_PIN = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3 h-3"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const BRIEFCASE = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-3 h-3"
  >
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const PILLS: PillData[] = [
  { icon: GRADUATION_CAP, label: "Computer Science" },
  { icon: MAP_PIN, label: "Canada" },
  { icon: BRIEFCASE, label: "Data Engineer" },
];

export default function InfoPills() {
  assert(PILLS.length > 0, "Must have at least one pill");
  assert(PILLS.length <= 5, "Too many pills");

  return (
    <div className="flex flex-wrap justify-center gap-1.5">
      {PILLS.map((pill) => (
        <span
          key={pill.label}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400 hover:-translate-y-0.5 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-200 cursor-default"
        >
          {pill.icon}
          {pill.label}
        </span>
      ))}
    </div>
  );
}
