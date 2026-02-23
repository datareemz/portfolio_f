import { assert } from "@/lib/assert";

const CURRENT_YEAR = 2026;

export default function Footer() {
  assert(CURRENT_YEAR > 2000, "Year must be valid");
  assert(CURRENT_YEAR < 3000, "Year must be valid");

  return (
    <footer className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {CURRENT_YEAR} Oluwaseyi Kareem</p>
        <a
          href="https://github.com/datareemz"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
