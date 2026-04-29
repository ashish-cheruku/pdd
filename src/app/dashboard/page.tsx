"use client";
import Link from "next/link";
import { useState } from "react";
import { conversations, findListing, listings, myBookings, owners } from "@/data/mock";
import GearIcon from "@/components/GearIcon";

type Tab = "bookings" | "listings" | "earnings" | "messages";

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>("bookings");
  const me = owners.me;

  return (
    <div className="container-app py-8">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className={`grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br ${me.avatarGradient} text-base font-bold text-white shadow-sm`}>
            {me.initials}
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, {me.name.split(" ")[0]}</h1>
            <p className="text-sm text-ink-500">
              Member since {me.joined} · {me.rentalsCompleted} rentals completed
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/list-gear" className="btn-primary">+ List new gear</Link>
          <Link href="/search" className="btn-secondary">Find gear</Link>
        </div>
      </div>

      {/* stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat tone="emerald" label="Active bookings" value="3" sub="+1 this week" />
        <Stat tone="amber" label="Earnings (April)" value="$248.50" sub="↑ 18% vs March" />
        <Stat tone="sky" label="Owner rating" value="4.95 ★" sub="across 12 reviews" />
        <Stat tone="rose" label="CO₂ saved" value={`${me.co2Saved} kg`} sub="lifetime" />
      </div>

      {/* tabs */}
      <div className="mt-8 border-b border-white/10">
        <div className="flex gap-1 overflow-x-auto">
          {(["bookings", "listings", "earnings", "messages"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                "rounded-t-lg px-4 py-2.5 text-sm font-semibold capitalize whitespace-nowrap " +
                (tab === t
                  ? "border-b-2 border-emerald-400 text-white"
                  : "text-ink-500 hover:text-white")
              }
            >
              {t === "bookings" && "Upcoming Bookings"}
              {t === "listings" && "My Listings"}
              {t === "earnings" && "Earnings"}
              {t === "messages" && "Messages"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {tab === "bookings" && <Bookings />}
        {tab === "listings" && <Listings />}
        {tab === "earnings" && <Earnings />}
        {tab === "messages" && <Messages />}
      </div>
    </div>
  );
}

function Stat({
  tone,
  label,
  value,
  sub,
}: {
  tone: "emerald" | "amber" | "sky" | "rose";
  label: string;
  value: string;
  sub: string;
}) {
  const tones = {
    emerald: "from-emerald-400/15 to-emerald-400/[0.02] text-emerald-300",
    amber: "from-amber-400/15 to-amber-400/[0.02] text-amber-300",
    sky: "from-sky-400/15 to-sky-400/[0.02] text-sky-300",
    rose: "from-rose-400/15 to-rose-400/[0.02] text-rose-300",
  };
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br p-5 ${tones[tone]}`}>
      <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl opacity-50`} style={{
        background: tone === "emerald" ? "rgba(74,222,128,0.30)" : tone === "amber" ? "rgba(251,191,36,0.25)" : tone === "sky" ? "rgba(56,189,248,0.25)" : "rgba(244,114,182,0.25)"
      }} />
      <p className="relative text-[11px] font-semibold uppercase tracking-[0.10em] opacity-80">{label}</p>
      <p className="relative mt-2 text-2xl font-extrabold text-white">{value}</p>
      <p className="relative mt-1 text-xs opacity-70">{sub}</p>
    </div>
  );
}

function Bookings() {
  return (
    <div className="space-y-3">
      {myBookings.map((b) => {
        const l = findListing(b.listingId)!;
        return (
          <div key={b.id} className="card flex flex-wrap items-center gap-4 p-4">
            <span className="grid h-16 w-20 shrink-0 place-items-center rounded-lg" style={{ background: l.thumbBg }}>
              <GearIcon k={l.iconKey} className="h-10 w-10" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold">{l.title}</h3>
                <StatusBadge status={b.status} />
              </div>
              <p className="mt-0.5 text-xs text-ink-500">
                {b.startDate} → {b.endDate} · {b.partyName} · {b.id}
              </p>
              <BookingProgress status={b.status} />
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="btn-ghost">Message</button>
              {b.status === "completed" && <button className="btn-secondary">Leave review</button>}
              {b.status === "active" && <button className="btn-primary">Mark returned</button>}
              {(b.status === "pending" || b.status === "approved") && (
                <Link href={`/listings/${l.id}`} className="btn-secondary">View details</Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BookingProgress({ status }: { status: string }) {
  const steps = ["pending", "approved", "active", "completed"];
  const idx = Math.max(0, steps.indexOf(status));
  return (
    <div className="mt-3 flex gap-1.5">
      {steps.map((_, i) => (
        <span
          key={i}
          className={
            "h-1.5 flex-1 rounded-full " +
            (i <= idx ? "bg-emerald-400" : "bg-white/10")
          }
        />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-amber-400/[0.12] text-amber-300 border border-amber-400/25",
    approved: "bg-sky-400/[0.12] text-sky-300 border border-sky-400/25",
    active: "bg-emerald-400/[0.12] text-emerald-300 border border-emerald-400/25",
    completed: "bg-white/[0.06] text-white/60",
    cancelled: "bg-rose-400/[0.12] text-rose-300 border border-rose-400/25",
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${map[status]}`}>
      {status}
    </span>
  );
}

function Listings() {
  const myStuff = listings.slice(0, 3);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {myStuff.map((l) => (
        <div key={l.id} className="card overflow-hidden">
          <div className="grid aspect-[4/3] place-items-center" style={{ background: l.thumbBg }}>
            <GearIcon k={l.iconKey} className="h-20 w-20" />
          </div>
          <div className="p-4">
            <h3 className="line-clamp-1 text-sm font-semibold">{l.title}</h3>
            <p className="text-xs text-ink-500">${l.dailyPrice}/day · {l.condition}</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
              <Mini label="Views" v="412" />
              <Mini label="Bookings" v="14" />
              <Mini label="Earnings" v="$236" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="btn-ghost">Edit</button>
              <button className="btn-ghost">Pause</button>
              <Link href={`/listings/${l.id}`} className="btn-ghost">View</Link>
            </div>
          </div>
        </div>
      ))}
      <Link
        href="/list-gear"
        className="grid place-items-center rounded-2xl border-2 border-dashed border-white/15 p-10 text-center text-sm text-white/55 transition hover:border-emerald-400/50 hover:bg-emerald-400/[0.06] hover:text-emerald-300"
      >
        <span>
          <span className="block text-3xl">＋</span>
          <span className="mt-2 block font-semibold">List new gear</span>
        </span>
      </Link>
    </div>
  );
}

function Earnings() {
  const months = [
    { m: "Nov", v: 80 },
    { m: "Dec", v: 110 },
    { m: "Jan", v: 145 },
    { m: "Feb", v: 188 },
    { m: "Mar", v: 210 },
    { m: "Apr", v: 248 },
  ];
  const max = Math.max(...months.map((m) => m.v));
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="card p-6">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
              Cumulative earnings
            </p>
            <p className="mt-1 text-3xl font-extrabold">$981.00</p>
            <p className="text-xs text-ink-500">Last 6 months</p>
          </div>
          <select className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm">
            <option>Last 6 months</option>
            <option>This year</option>
            <option>All time</option>
          </select>
        </div>
        <div className="mt-6 flex items-end gap-3">
          {months.map((m) => (
            <div key={m.m} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-emerald-500 to-emerald-300 shadow-[0_-4px_14px_-4px_rgba(74,222,128,0.5)]"
                style={{ height: `${(m.v / max) * 180}px` }}
                title={`$${m.v}`}
              />
              <span className="text-[11px] text-ink-500">{m.m}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
          Recent payouts
        </h3>
        <ul className="mt-4 divide-y divide-white/[0.06] text-sm">
          {[
            ["Apr 24, 2026", "$36.00", "Processed"],
            ["Apr 11, 2026", "$54.50", "Processed"],
            ["Mar 28, 2026", "$120.00", "Processed"],
            ["Mar 14, 2026", "$38.00", "Pending"],
          ].map(([d, a, s]) => (
            <li key={d} className="flex items-center justify-between py-2.5">
              <div>
                <p className="font-medium">{a}</p>
                <p className="text-xs text-ink-500">{d}</p>
              </div>
              <span
                className={
                  "rounded-full px-2.5 py-0.5 text-[11px] font-semibold " +
                  (s === "Processed" ? "bg-emerald-400/[0.12] text-emerald-300 border border-emerald-400/25" : "bg-amber-400/[0.12] text-amber-300 border border-amber-400/25")
                }
              >
                {s}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Messages() {
  const [activeId, setActiveId] = useState(conversations[0].id);
  const active = conversations.find((c) => c.id === activeId)!;
  return (
    <div className="card grid overflow-hidden md:grid-cols-[300px_1fr]">
      <ul className="max-h-[560px] divide-y divide-white/[0.06] overflow-auto border-r border-white/[0.06]">
        {conversations.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => setActiveId(c.id)}
              className={
                "flex w-full items-start gap-3 p-3 text-left transition hover:bg-white/[0.03] " +
                (activeId === c.id ? "bg-emerald-400/[0.08]" : "")
              }
            >
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br ${c.gradient} text-xs font-bold text-white`}>
                {c.withInitials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-semibold">{c.withName}</p>
                  <span className="text-[11px] text-ink-500">{c.time}</span>
                </div>
                <p className="line-clamp-1 text-xs text-ink-500">{c.preview}</p>
              </div>
              {c.unread > 0 && (
                <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-emerald-400 px-1.5 text-[10px] font-bold text-white">
                  {c.unread}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex max-h-[560px] flex-col">
        <header className="flex items-center gap-3 border-b border-white/[0.06] p-4">
          <span className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${active.gradient} text-xs font-bold text-white`}>
            {active.withInitials}
          </span>
          <div>
            <p className="text-sm font-semibold">{active.withName}</p>
            <p className="text-xs text-emerald-300">● Online</p>
          </div>
        </header>
        <ul className="flex-1 space-y-3 overflow-auto bg-black/30 p-4">
          {active.thread.map((m, i) => (
            <li key={i} className={"flex " + (m.from === "me" ? "justify-end" : "justify-start")}>
              <div
                className={
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm " +
                  (m.from === "me"
                    ? "bg-gradient-to-br from-emerald-300 to-emerald-500 text-black"
                    : "border border-white/10 bg-white/[0.04] text-white")
                }
              >
                <p>{m.text}</p>
                <p className={"mt-1 text-[10px] " + (m.from === "me" ? "text-black/60" : "text-white/45")}>{m.time}</p>
              </div>
            </li>
          ))}
        </ul>
        <form className="flex items-center gap-2 border-t border-white/[0.06] p-3">
          <input className="input" placeholder={`Message ${active.withName.split(" ")[0]}…`} />
          <button type="button" className="btn-primary !px-4">Send</button>
        </form>
      </div>
    </div>
  );
}

function Mini({ label, v }: { label: string; v: string }) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-1.5">
      <div className="font-bold text-white">{v}</div>
      <div className="text-white/50">{label}</div>
    </div>
  );
}
