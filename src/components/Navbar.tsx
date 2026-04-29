"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/search", label: "Explore" },
  { href: "/list-gear", label: "List Gear" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-token backdrop-blur-xl" style={{ background: "color-mix(in oklab, var(--canvas) 75%, transparent)" }}>
      <div className="container-app flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-300 to-emerald-500 text-black shadow-[0_0_20px_-4px_rgba(74,222,128,0.6)]">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path d="M12 3 4 21h16L12 3Z" fill="currentColor" />
              <path d="M12 8.5 8 18h8L12 8.5Z" fill="#08080a" opacity=".55" />
            </svg>
          </span>
          <span className="text-[17px] font-bold tracking-tight text-fg">
            Eco<span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">Rent</span>
          </span>
          <span className="ml-2 hidden rounded-full border border-token bg-surface-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-fg-3 md:inline-block">
            Beta
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-token bg-surface-2 p-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={
                  "rounded-full px-4 py-1.5 text-sm font-medium transition " +
                  (active
                    ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-900/5 dark:bg-[#1a1a1d] dark:text-white dark:ring-white/10 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                    : "text-fg-3 hover:text-fg")
                }
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="hidden h-9 w-9 place-items-center rounded-full border border-token bg-surface-2 text-fg-2 transition hover:text-fg md:grid"
            aria-label="Notifications"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .53-.21 1.04-.59 1.41L4 17h5m6 0a3 3 0 1 1-6 0m6 0H9"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Link
            href="/profile/me"
            className="hidden md:inline-flex"
            aria-label="My profile"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-xs font-bold text-black ring-1 ring-white/10">
              AC
            </span>
          </Link>
          <Link href="/list-gear" className="btn-primary !px-4 !py-2">
            List Gear
          </Link>
        </div>
      </div>
    </header>
  );
}
