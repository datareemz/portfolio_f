import Link from "next/link";
import { assert } from "@/lib/assert";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "About Me", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact Me", href: "/contact" },
];

export default function NavLinks() {
  assert(NAV_ITEMS.length > 0, "Must have at least one nav item");
  assert(NAV_ITEMS.length <= 5, "Too many nav items");

  return (
    <nav className="flex flex-wrap justify-center gap-4">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all duration-200"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
