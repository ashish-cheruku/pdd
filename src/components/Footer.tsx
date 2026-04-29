import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-token">
      <div className="container-app grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-black shadow-[0_0_18px_-4px_rgba(74,222,128,0.6)]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12 3 4 21h16L12 3Z" />
              </svg>
            </span>
            <span className="text-base font-bold text-fg">
              Eco<span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">Rent</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-fg-3">
            Share the adventure. Reduce the waste. Rent gear from neighbours
            you can trust.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-3 py-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            Live demo · MVP build
          </p>
        </div>

        <FooterCol
          title="Explore"
          items={[
            ["Camping", "/search?cat=camping"],
            ["Hiking", "/search?cat=hiking"],
            ["Climbing", "/search?cat=climbing"],
            ["Water Sports", "/search?cat=water"],
          ]}
        />
        <FooterCol
          title="Earn"
          items={[
            ["List Your Gear", "/list-gear"],
            ["Dashboard", "/dashboard"],
            ["How Payouts Work", "/"],
            ["Damage Protection", "/"],
          ]}
        />
        <FooterCol
          title="Trust & Safety"
          items={[
            ["ID Verification", "/"],
            ["Secure Payments", "/"],
            ["Reviews System", "/"],
            ["Help Centre", "/"],
          ]}
        />
      </div>
      <div className="border-t border-token py-5">
        <div className="container-app flex flex-col items-start justify-between gap-2 text-xs text-fg-4 md:flex-row md:items-center">
          <p>© 2026 EcoRent. Built for PDD MF-F473, BITS Pilani.</p>
          <p>
            CO₂ saved this month: <span className="font-semibold text-emerald-700 dark:text-emerald-300">12,400 kg</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: [string, string][];
}) {
  return (
    <div>
      <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-fg-4">
        {title}
      </h4>
      <ul className="space-y-2.5 text-sm text-fg-2">
        {items.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="transition hover:text-emerald-700 dark:hover:text-emerald-300">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
