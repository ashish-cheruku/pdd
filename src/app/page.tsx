import Link from "next/link";
import { categories, listings, owners } from "@/data/mock";
import GearIcon from "@/components/GearIcon";

export default function LandingPage() {
  const featured = listings.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Aurora */}
        <div
          aria-hidden
          className="absolute -inset-x-32 -top-40 h-[640px] -z-10 opacity-80 blur-3xl"
          style={{
            background:
              "conic-gradient(from 220deg at 50% 50%, rgba(34,197,94,0.18), rgba(56,189,248,0.10), rgba(34,197,94,0.0) 60%, rgba(74,222,128,0.16))",
          }}
        />
        {/* grid */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-[640px] opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 60% 60% at 50% 30%, #000 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 60% at 50% 30%, #000 30%, transparent 100%)",
          }}
        />

        <div className="container-app pb-28 pt-20 md:pb-32 md:pt-28">
          <div className="max-w-3xl">
            <p className="chip-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
              Trust-First Hyper-Local Marketplace
            </p>
            <h1 className="mt-5 text-[44px] font-extrabold leading-[1.02] tracking-[-0.02em] text-white md:text-[72px]">
              Share the adventure.
              <br />
              <span className="bg-gradient-to-br from-emerald-200 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                Rent outdoor gear
              </span>
              <span className="text-white/60"> from your neighbours.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/60 md:text-lg">
              Verified profiles, escrow payments and a damage-protection plan.
              The gear is local. The trust is built-in.
            </p>
          </div>

          {/* Search Card */}
          <div className="glass mt-12 grid gap-2 rounded-2xl p-2 shadow-pop md:grid-cols-[2fr_1.4fr_1.4fr_auto]">
            <Field label="What do you need?" placeholder="2-person tent" />
            <Field label="Where?" placeholder="Boulder, CO" />
            <Field label="When?" placeholder="May 12 — May 14" />
            <Link href="/search" className="btn-primary !rounded-xl !px-6 md:!h-full">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.2" />
                <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              Search
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/55">
            <Stat label="Active listings" value="2,148" />
            <Sep />
            <Stat label="Verified owners" value="847" />
            <Sep />
            <Stat label="CO₂ saved" value="12,400 kg" />
            <Sep />
            <Stat label="Avg. rating" value="4.88 ★" />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-app -mt-10 md:-mt-14">
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {categories.map((c) => (
            <Link
              href={`/search?cat=${c.key}`}
              key={c.key}
              className="card card-hover flex flex-col items-center gap-3 p-4 text-center"
            >
              <span
                className={
                  "grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br " +
                  c.hue +
                  " shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]"
                }
              >
                <GearIcon k={c.icon} className="h-7 w-7" />
              </span>
              <span className="text-sm font-semibold text-white/90">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-app mt-20">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
              Featured nearby
            </p>
            <h2 className="mt-1.5 text-[28px] font-bold tracking-tight text-white md:text-[34px]">
              Highly rated gear in Boulder, CO
            </h2>
          </div>
          <Link href="/search" className="text-sm font-semibold text-emerald-300 hover:text-emerald-200">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => {
            const o = owners[l.ownerId];
            return (
              <Link
                href={`/listings/${l.id}`}
                key={l.id}
                className="card card-hover overflow-hidden"
              >
                <div
                  className="relative grid aspect-[4/3] place-items-center"
                  style={{ background: l.thumbBg }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <GearIcon k={l.iconKey} className="relative h-24 w-24 drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    {l.condition}
                  </span>
                  <button
                    aria-label="Save"
                    className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                      <path
                        d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="line-clamp-1 text-[15px] font-semibold text-white">
                      {l.title}
                    </h3>
                    <div className="flex shrink-0 items-center gap-1 text-sm font-medium text-white">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-amber-400" fill="currentColor">
                        <path d="m12 17.3 6.18 3.7-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      {l.rating}
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-white/45">
                    {l.distanceKm} km · {o.name}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-white">${l.dailyPrice}</span>
                      <span className="text-xs text-white/45">/ day</span>
                    </div>
                    <span className="chip-brand">✓ Verified</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container-app mt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
          How it works
        </p>
        <h2 className="mt-1.5 max-w-2xl text-[28px] font-bold tracking-tight text-white md:text-[34px]">
          Three steps. Secured end-to-end.
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Step n={1} title="Search" body="Filter by category, distance, dates and condition. Map view syncs with the list." />
          <Step n={2} title="Book" body="Request a date range. The owner approves; your card is captured into escrow only after that." />
          <Step n={3} title="Adventure" body="Pick up locally, use the gear, return it and leave a dual-sided review." />
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section className="container-app mt-24">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent p-10 md:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-emerald-500/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-32 h-[360px] w-[360px] rounded-full bg-cyan-500/20 blur-3xl"
          />
          <div className="relative grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="chip-brand">Sustainability dashboard</p>
              <h3 className="mt-3 text-[28px] font-bold tracking-tight text-white md:text-[34px]">
                Every shared rental keeps gear out of landfills.
              </h3>
              <p className="mt-4 max-w-lg text-white/65">
                We estimate the embodied CO₂ of each item and show it on every
                receipt. Last month our community saved enough emissions to drive
                from Pilani to Mumbai four times.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <BigStat n="12,400" l="kg CO₂ saved" />
              <BigStat n="$84k" l="kept in community" />
              <BigStat n="2,148" l="active listings" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <label className="rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 transition focus-within:border-emerald-400/40 focus-within:bg-white/[0.06]">
      <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent text-sm font-medium text-white placeholder-white/35 focus:outline-none"
      />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex items-baseline gap-2">
      <span className="text-base font-semibold text-white">{value}</span>
      <span className="text-white/45">{label}</span>
    </span>
  );
}

function Sep() {
  return <span className="hidden h-1 w-1 rounded-full bg-white/15 md:inline-block" />;
}

function BigStat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
      <div className="text-xl font-extrabold text-white md:text-2xl">{n}</div>
      <div className="mt-0.5 text-[11px] uppercase tracking-wide text-white/55">{l}</div>
    </div>
  );
}

function Step({
  n,
  title,
  body,
}: {
  n: number;
  title: string;
  body: string;
}) {
  return (
    <div className="card relative overflow-hidden p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl"
      />
      <div className="relative flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] font-bold text-emerald-300">
          {n}
        </span>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="relative mt-3 text-sm text-white/60">{body}</p>
    </div>
  );
}
