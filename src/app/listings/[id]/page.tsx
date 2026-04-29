"use client";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { findListing, owners } from "@/data/mock";
import GearIcon from "@/components/GearIcon";

export default function ListingDetailPage() {
  const params = useParams<{ id: string }>();
  const listing = findListing(params.id);
  if (!listing) return notFound();
  const owner = owners[listing.ownerId];

  const [days, setDays] = useState(3);
  const [protect, setProtect] = useState(true);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">(
    "description"
  );

  const subtotal = useMemo(() => listing.dailyPrice * days, [days, listing]);
  const serviceFee = useMemo(() => Math.round(subtotal * 0.1 * 100) / 100, [subtotal]);
  const protection = protect ? Math.round(subtotal * 0.08 * 100) / 100 : 0;
  const total = +(subtotal + serviceFee + protection).toFixed(2);

  return (
    <div className="container-app py-8">
      {/* breadcrumb */}
      <nav className="mb-4 text-sm text-ink-500">
        <Link href="/search" className="hover:text-white">
          ← Back to search
        </Link>
      </nav>

      <div className="grid gap-8 md:grid-cols-[1fr_380px]">
        {/* LEFT */}
        <div>
          {/* gallery */}
          <div className="card overflow-hidden">
            <div
              className="relative grid aspect-[16/10] place-items-center"
              style={{ background: listing.thumbBg }}
            >
              <GearIcon k={listing.iconKey} className="h-44 w-44 drop-shadow-lg" />
              <span className="absolute left-4 top-4 rounded-full bg-black/45 backdrop-blur-md border border-white/15 px-3 py-1.5 text-xs font-semibold text-ink-800 shadow-sm">
                {listing.category} · {listing.condition}
              </span>
              <button
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/45 backdrop-blur-md text-white border border-white/15 shadow-sm hover:bg-black/60"
              >
                ‹
              </button>
              <button
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/45 backdrop-blur-md text-white border border-white/15 shadow-sm hover:bg-black/60"
              >
                ›
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white">
                1 / 6
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2 p-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-lg ring-1 ring-white/10"
                  style={{ background: listing.thumbBg, opacity: i === 0 ? 1 : 0.55 }}
                />
              ))}
            </div>
          </div>

          {/* title + meta */}
          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {listing.title}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-ink-600">
                <span className="flex items-center gap-1">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-amber-500" fill="currentColor">
                    <path d="m12 17.3 6.18 3.7-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="font-semibold text-ink-900">{listing.rating}</span>
                  <span className="text-ink-500">({listing.reviewCount} reviews)</span>
                </span>
                <span>·</span>
                <span>{listing.city}</span>
                <span>·</span>
                <span>{listing.distanceKm} km away</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary !py-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Share
              </button>
              <button className="btn-secondary !py-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="1.7" />
                </svg>
                Save
              </button>
            </div>
          </div>

          {/* tabs */}
          <div className="mt-6 border-b border-white/10">
            <div className="flex gap-2">
              {(["description", "specs", "reviews"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={
                    "rounded-t-lg px-4 py-2.5 text-sm font-semibold capitalize transition " +
                    (activeTab === t
                      ? "border-b-2 border-emerald-400 text-white"
                      : "text-ink-500 hover:text-white")
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            {activeTab === "description" && (
              <div className="card p-6">
                <p className="text-ink-700">{listing.description}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {listing.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-ink-700">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-400/[0.12] text-emerald-300 border border-emerald-400/25">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="card overflow-hidden">
                <table className="w-full text-sm">
                  <tbody className="[&>tr:nth-child(odd)]:bg-white/[0.025]">
                    <SpecRow k="Brand" v={listing.brand} />
                    <SpecRow k="Model" v={listing.model} />
                    <SpecRow k="Weight" v={listing.weight} />
                    <SpecRow k="Capacity" v={listing.capacity} />
                    <SpecRow k="Season Rating" v={listing.seasonRating} />
                    <SpecRow k="Condition" v={listing.condition} />
                    <SpecRow k="Daily Price" v={`$${listing.dailyPrice}`} />
                    <SpecRow k="Weekly Price" v={`$${listing.weeklyPrice}`} />
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="card grid items-center gap-6 p-6 sm:grid-cols-[auto_1fr]">
                  <div className="text-center">
                    <div className="text-5xl font-extrabold">{listing.rating}</div>
                    <div className="text-amber-500">★★★★★</div>
                    <div className="text-xs text-ink-500">{listing.reviewCount} reviews</div>
                  </div>
                  <div className="space-y-1.5">
                    {[5, 4, 3, 2, 1].map((s, i) => {
                      const pct = [88, 9, 2, 1, 0][i];
                      return (
                        <div key={s} className="flex items-center gap-3 text-xs text-ink-600">
                          <span className="w-6 text-right">{s}★</span>
                          <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                            <span className="block h-full bg-amber-400" style={{ width: `${pct}%` }} />
                          </span>
                          <span className="w-8 text-right">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {listing.reviews.map((r) => (
                  <div key={r.id} className="card p-5">
                    <div className="flex items-center gap-3">
                      <span className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${r.avatarGradient} text-sm font-bold text-white`}>
                        {r.initials}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{r.reviewer}</p>
                        <p className="text-xs text-ink-500">{r.date} · {"★".repeat(r.rating)}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-ink-700">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* owner */}
          <section className="mt-8 card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
              Meet your owner
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <Link href={`/profile/${owner.id}`} className="flex items-center gap-3">
                <span className={`grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br ${owner.avatarGradient} text-base font-bold text-white`}>
                  {owner.initials}
                </span>
                <div>
                  <p className="text-base font-semibold">{owner.name}</p>
                  <p className="text-xs text-ink-500">
                    Member since {owner.joined} · {owner.responseRate}% response rate · responds {owner.responseTime}
                  </p>
                </div>
              </Link>
              <div className="flex gap-2">
                {owner.verified.email && <span className="chip-brand">Email verified</span>}
                {owner.verified.id && <span className="chip-brand">ID verified</span>}
                {owner.verified.phone && <span className="chip-brand">Phone verified</span>}
              </div>
            </div>
            <p className="mt-4 text-sm text-ink-700">{owner.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="btn-secondary">Message {owner.name.split(" ")[0]}</button>
              <Link href={`/profile/${owner.id}`} className="btn-ghost">View full profile</Link>
            </div>
          </section>
        </div>

        {/* RIGHT — sticky booking card */}
        <aside>
          <div className="md:sticky md:top-20">
            <div className="card p-5">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold">${listing.dailyPrice}</span>
                  <span className="text-sm text-ink-500"> / day</span>
                </div>
                <span className="text-xs text-ink-500">${listing.weeklyPrice} / week</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <DateBox label="Pickup" value="May 12, 2026" />
                <DateBox label="Return" value={`May ${12 + days}, 2026`} />
              </div>

              <label className="mt-3 block">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                  Days
                </span>
                <input
                  type="range"
                  min={1}
                  max={14}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="mt-1 w-full accent-emerald-400"
                />
                <div className="flex justify-between text-[11px] text-ink-500">
                  <span>1 day</span>
                  <span>{days} days selected</span>
                  <span>14 days</span>
                </div>
              </label>

              <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 p-3">
                <input
                  type="checkbox"
                  checked={protect}
                  onChange={(e) => setProtect(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-emerald-400"
                />
                <span>
                  <span className="block text-sm font-semibold">
                    Damage protection
                  </span>
                  <span className="block text-xs text-ink-500">
                    Covers up to $500 in accidental damage. Recommended for high-value gear.
                  </span>
                </span>
              </label>

              <div className="mt-5 space-y-1.5 text-sm">
                <Row k={`$${listing.dailyPrice} × ${days} days`} v={`$${subtotal.toFixed(2)}`} />
                <Row k="Service fee (10%)" v={`$${serviceFee.toFixed(2)}`} />
                {protect && <Row k="Damage protection" v={`$${protection.toFixed(2)}`} />}
                <div className="my-2 border-t border-white/[0.06]" />
                <Row k={<span className="font-bold">Total</span>} v={<span className="font-bold">${total.toFixed(2)}</span>} />
              </div>

              <Link
                href={`/booking/${listing.id}?days=${days}&protect=${protect ? 1 : 0}`}
                className="btn-primary mt-5 w-full"
              >
                Request to book
              </Link>
              <p className="mt-2 text-center text-[11px] text-ink-500">
                You won’t be charged until {owner.name.split(" ")[0]} approves
              </p>
            </div>

            <div className="mt-4 card p-4 text-xs text-ink-600">
              <p className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-400/[0.12] text-emerald-300 border border-emerald-400/25">🛡</span>
                Funds held in <strong>Stripe Connect escrow</strong> until pickup is confirmed.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <tr>
      <td className="w-1/3 px-5 py-3 text-ink-500">{k}</td>
      <td className="px-5 py-3 font-medium">{v}</td>
    </tr>
  );
}

function DateBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-ink-500">
        {label}
      </div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}

function Row({ k, v }: { k: React.ReactNode; v: React.ReactNode }) {
  return (
    <div className="flex justify-between text-ink-700">
      <span>{k}</span>
      <span>{v}</span>
    </div>
  );
}
