"use client";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { listings, owners } from "@/data/mock";
import GearIcon from "@/components/GearIcon";

export default function ProfilePage() {
  const params = useParams<{ id: string }>();
  const user = owners[params.id];
  if (!user) return notFound();

  const userListings = listings.filter((l) => l.ownerId === user.id);
  const [tab, setTab] = useState<"listings" | "reviews">("listings");

  return (
    <div className="container-app py-8">
      {/* gradient header */}
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-emerald-900/40 via-emerald-800/30 to-teal-900/40 px-6 pb-6 pt-10 text-white md:px-10">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-400/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="relative">
        <div className="flex flex-wrap items-end gap-6">
          <span className={`grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br ${user.avatarGradient} text-2xl font-extrabold text-white ring-4 ring-white/40`}>
            {user.initials}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">{user.name}</h1>
              {user.verified.id && <Verified label="ID verified" />}
              {user.verified.email && <Verified label="Email verified" />}
              {user.verified.phone && <Verified label="Phone verified" />}
            </div>
            <p className="mt-1 text-emerald-50/90">{user.city} · Member since {user.joined}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="chip-brand !bg-white/15 !text-white">★ {user.rating} · {user.reviews} reviews</span>
              <span className="chip-brand !bg-white/15 !text-white">{user.responseRate}% response · {user.responseTime}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary !border-white/20 !bg-white/10 !text-white hover:!bg-white/20">Message</button>
            <button className="btn-primary !bg-white !text-black">Follow</button>
          </div>
        </div>
        </div>
      </div>

      {/* trust + impact */}
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Metric label="Rentals completed" v={user.rentalsCompleted.toString()} sub="lifetime" />
        <Metric label="Items listed" v={user.itemsListed.toString()} sub="active" />
        <Metric label="Average rating" v={`${user.rating} ★`} sub={`${user.reviews} reviews`} />
        <Metric label="CO₂ saved" v={`${user.co2Saved} kg`} sub="estimated" tone="emerald" />
      </div>

      {/* about */}
      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_320px]">
        <div className="card p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
            About {user.name.split(" ")[0]}
          </h3>
          <p className="mt-3 text-ink-700">{user.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Backpacking", "Climbing", "Trail running", "Bouldering", "Stargazing"].map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
            Trust & verification
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <Trust ok={user.verified.email}>Email verified</Trust>
            <Trust ok={user.verified.id}>Government ID verified</Trust>
            <Trust ok={user.verified.phone}>Phone number verified</Trust>
            <Trust ok={true}>Linked Stripe payout account</Trust>
          </ul>
        </div>
      </div>

      {/* tabs */}
      <div className="mt-8 border-b border-white/10">
        <div className="flex gap-1">
          {(["listings", "reviews"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                "rounded-t-lg px-4 py-2.5 text-sm font-semibold capitalize " +
                (tab === t
                  ? "border-b-2 border-emerald-400 text-white"
                  : "text-ink-500 hover:text-white")
              }
            >
              {t === "listings" ? `Listings (${userListings.length})` : `Reviews (${user.reviews})`}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        {tab === "listings" ? (
          userListings.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {userListings.map((l) => (
                <Link key={l.id} href={`/listings/${l.id}`} className="card overflow-hidden transition hover:-translate-y-0.5 hover:shadow-pop">
                  <div className="grid aspect-[4/3] place-items-center" style={{ background: l.thumbBg }}>
                    <GearIcon k={l.iconKey} className="h-20 w-20" />
                  </div>
                  <div className="p-4">
                    <h4 className="line-clamp-1 text-sm font-semibold">{l.title}</h4>
                    <p className="text-xs text-ink-500">${l.dailyPrice}/day · ★ {l.rating}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-500">No listings yet.</p>
          )
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {(userListings[0]?.reviews || []).concat(userListings[1]?.reviews || []).slice(0, 4).map((r, i) => (
              <div key={i} className="card p-5">
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
    </div>
  );
}

function Metric({
  label,
  v,
  sub,
  tone,
}: {
  label: string;
  v: string;
  sub: string;
  tone?: "emerald";
}) {
  return (
    <div className={"card p-5 " + (tone === "emerald" ? "bg-gradient-to-br from-emerald-400/15 to-emerald-400/[0.02]" : "")}>
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{label}</p>
      <p className="mt-2 text-2xl font-extrabold">{v}</p>
      <p className="mt-1 text-xs text-ink-500">{sub}</p>
    </div>
  );
}

function Verified({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
      ✓ {label}
    </span>
  );
}

function Trust({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-center justify-between">
      <span className="flex items-center gap-2">
        <span
          className={
            "grid h-6 w-6 place-items-center rounded-full text-xs " +
            (ok ? "bg-emerald-400/[0.12] text-emerald-300 border border-emerald-400/25" : "bg-white/[0.05] text-ink-400")
          }
        >
          {ok ? "✓" : "—"}
        </span>
        <span className={ok ? "" : "text-ink-400"}>{children}</span>
      </span>
      {!ok && <span className="text-xs text-ink-500">pending</span>}
    </li>
  );
}
