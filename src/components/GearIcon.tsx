import type { IconKey } from "@/data/mock";

export default function GearIcon({
  k,
  className = "h-10 w-10",
}: {
  k: IconKey;
  className?: string;
}) {
  switch (k) {
    case "tent":
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <path d="M32 6 6 56h52L32 6Z" fill="#ffffff" opacity=".95" />
          <path d="M32 14 14 50h36L32 14Z" fill="#0f172a" opacity=".15" />
          <path d="M32 22v34" stroke="#fff" strokeWidth="2" />
          <path d="M22 56l10-18 10 18" stroke="#0f172a" strokeWidth="2" opacity=".4" />
        </svg>
      );
    case "backpack":
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <rect x="14" y="18" width="36" height="36" rx="8" fill="#fff" opacity=".95" />
          <path d="M22 18v-4a10 10 0 0 1 20 0v4" stroke="#fff" strokeWidth="3" />
          <rect x="22" y="30" width="20" height="10" rx="3" fill="#0f172a" opacity=".18" />
          <circle cx="32" cy="46" r="3" fill="#0f172a" opacity=".25" />
        </svg>
      );
    case "rope":
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <circle cx="32" cy="32" r="20" stroke="#fff" strokeWidth="6" />
          <circle cx="32" cy="32" r="12" stroke="#fff" strokeWidth="4" opacity=".7" />
          <circle cx="32" cy="32" r="4" fill="#fff" />
        </svg>
      );
    case "kayak":
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <path d="M6 36c10 8 18 8 26 8s16 0 26-8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="32" cy="32" rx="22" ry="6" fill="#fff" opacity=".9" />
          <path d="M14 24l4-6M50 24l-4-6" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "ski":
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <path d="M16 10l16 44M28 10l16 44" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <circle cx="34" cy="32" r="3" fill="#fff" />
          <path d="M50 14l-6 6" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "bike":
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <circle cx="16" cy="44" r="10" stroke="#fff" strokeWidth="3" />
          <circle cx="48" cy="44" r="10" stroke="#fff" strokeWidth="3" />
          <path d="M16 44l10-18h12l10 18M28 26h8" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "stove":
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <path d="M22 36h20v14a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V36Z" fill="#fff" opacity=".95" />
          <path d="M32 36c0-6-6-8-6-14 0-4 3-6 6-6s6 2 6 6c0 6-6 8-6 14Z" fill="#fff" />
        </svg>
      );
    case "sleep":
      return (
        <svg viewBox="0 0 64 64" className={className} fill="none">
          <path d="M8 38c12-10 36-10 48 0v12H8V38Z" fill="#fff" opacity=".95" />
          <circle cx="22" cy="36" r="6" fill="#0f172a" opacity=".2" />
          <path d="M28 38c4-2 8-2 12 0" stroke="#0f172a" strokeWidth="2" opacity=".25" />
        </svg>
      );
  }
}
