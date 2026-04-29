"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, listings, owners, type Category } from "@/data/mock";
import GearIcon from "@/components/GearIcon";

const conditionOptions = ["New", "Like New", "Good", "Fair"] as const;

export default function SearchPage() {
  const [selectedCats, setSelectedCats] = useState<Category[]>([]);
  const [maxPrice, setMaxPrice] = useState(50);
  const [maxDistance, setMaxDistance] = useState(50);
  const [minRating, setMinRating] = useState(0);
  const [conds, setConds] = useState<string[]>([]);
  const [sort, setSort] = useState<"relevance" | "low" | "high" | "distance" | "rating">("relevance");
  const [view, setView] = useState<"grid" | "map">("grid");

  const filtered = useMemo(() => {
    let r = listings.slice();
    if (selectedCats.length) r = r.filter((l) => selectedCats.includes(l.category));
    r = r.filter(
      (l) =>
        l.dailyPrice <= maxPrice &&
        l.distanceKm <= maxDistance &&
        l.rating >= minRating &&
        (conds.length === 0 || conds.includes(l.condition))
    );
    if (sort === "low") r.sort((a, b) => a.dailyPrice - b.dailyPrice);
    if (sort === "high") r.sort((a, b) => b.dailyPrice - a.dailyPrice);
    if (sort === "distance") r.sort((a, b) => a.distanceKm - b.distanceKm);
    if (sort === "rating") r.sort((a, b) => b.rating - a.rating);
    return r;
  }, [selectedCats, maxPrice, maxDistance, minRating, conds, sort]);

  const toggleCat = (c: Category) =>
    setSelectedCats((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));
  const toggleCond = (c: string) =>
    setConds((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));
  const clearAll = () => {
    setSelectedCats([]);
    setMaxPrice(50);
    setMaxDistance(50);
    setMinRating(0);
    setConds([]);
  };

  return (
    <div className="container-app py-8">
      {/* Top search bar */}
      <div className="card mb-6 grid items-center gap-3 p-3 md:grid-cols-[1.6fr_1.2fr_1.2fr_auto]">
        <Field label="Search" defaultValue="2-person tent" />
        <Field label="Where" defaultValue="Boulder, CO" />
        <Field label="When" defaultValue="May 12 — May 14" />
        <button className="btn-primary !rounded-xl">Update</button>
      </div>

      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        {/* FILTERS */}
        <aside className="space-y-6">
          <FilterSection title="Category">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => {
                const on = selectedCats.includes(c.key);
                return (
                  <button
                    key={c.key}
                    onClick={() => toggleCat(c.key)}
                    className={
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition " +
                      (on
                        ? "border-emerald-400/40 bg-emerald-400/[0.12] text-emerald-300"
                        : "border-white/10 bg-white/[0.04] text-white/80 hover:border-white/20")
                    }
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          <FilterSection title={`Price: up to $${maxPrice}/day`}>
            <input
              type="range"
              min={5}
              max={50}
              step={1}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-400"
            />
            <div className="flex justify-between text-[11px] text-ink-500">
              <span>$5</span>
              <span>$50+</span>
            </div>
          </FilterSection>

          <FilterSection title={`Distance: within ${maxDistance} km`}>
            <input
              type="range"
              min={5}
              max={50}
              step={1}
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full accent-emerald-400"
            />
            <div className="flex justify-between text-[11px] text-ink-500">
              <span>5</span>
              <span>50+</span>
            </div>
          </FilterSection>

          <FilterSection title="Min owner rating">
            <div className="flex gap-2">
              {[0, 3, 4, 4.5].map((v) => (
                <button
                  key={v}
                  onClick={() => setMinRating(v)}
                  className={
                    "rounded-full border px-3 py-1.5 text-xs font-medium " +
                    (minRating === v
                      ? "border-emerald-400/40 bg-emerald-400/[0.12] text-emerald-300"
                      : "border-white/10 bg-white/[0.04] text-white/80")
                  }
                >
                  {v === 0 ? "Any" : `${v}★+`}
                </button>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Condition">
            <div className="flex flex-wrap gap-2">
              {conditionOptions.map((c) => {
                const on = conds.includes(c);
                return (
                  <button
                    key={c}
                    onClick={() => toggleCond(c)}
                    className={
                      "rounded-full border px-3 py-1.5 text-xs font-medium " +
                      (on
                        ? "border-emerald-400/40 bg-emerald-400/[0.12] text-emerald-300"
                        : "border-white/10 bg-white/[0.04] text-white/80")
                    }
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          <button
            onClick={clearAll}
            className="text-sm font-semibold text-emerald-300 hover:underline"
          >
            Clear all filters
          </button>
        </aside>

        {/* RESULTS */}
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink-700">
              <span className="font-semibold text-ink-900">{filtered.length}</span> items
              near <span className="font-semibold">Boulder, CO</span>
            </p>
            <div className="flex items-center gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-ink-700"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="low">Price: Low → High</option>
                <option value="high">Price: High → Low</option>
                <option value="distance">Distance</option>
                <option value="rating">Rating</option>
              </select>
              <div className="rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-sm">
                {(["grid", "map"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={
                      "rounded-full px-3 py-1.5 capitalize " +
                      (view === v ? "bg-white text-black shadow-sm" : "text-white/70 hover:text-white")
                    }
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {view === "grid" ? (
            filtered.length === 0 ? (
              <EmptyState onClear={clearAll} />
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((l) => {
                  const o = owners[l.ownerId];
                  return (
                    <Link
                      key={l.id}
                      href={`/listings/${l.id}`}
                      className="card group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-pop"
                    >
                      <div
                        className="relative grid aspect-[4/3] place-items-center"
                        style={{ background: l.thumbBg }}
                      >
                        <GearIcon k={l.iconKey} className="h-24 w-24" />
                        <span className="absolute left-3 top-3 rounded-full bg-black/45 backdrop-blur-md border border-white/15 px-2.5 py-1 text-xs font-semibold text-ink-800 shadow-sm">
                          {l.condition}
                        </span>
                        <span className="absolute right-3 top-3 rounded-full bg-black/45 backdrop-blur-md border border-white/15 px-2.5 py-1 text-xs font-bold text-ink-900 shadow-sm">
                          ${l.dailyPrice}/d
                        </span>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="line-clamp-1 text-[15px] font-semibold">
                            {l.title}
                          </h3>
                          <div className="flex items-center gap-1 text-sm font-medium">
                            <svg viewBox="0 0 24 24" className="h-4 w-4 text-amber-500" fill="currentColor">
                              <path d="m12 17.3 6.18 3.7-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            {l.rating}
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-ink-500">
                          {l.distanceKm} km · {o.name}
                        </p>
                        <div className="mt-3 flex items-center justify-between text-xs text-ink-500">
                          <span>{l.reviewCount} reviews</span>
                          <span className="chip-brand">Verified</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )
          ) : (
            <MapView listings={filtered} />
          )}
        </section>
      </div>
    </div>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card p-4">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-600">
        {title}
      </h4>
      {children}
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 transition focus-within:border-emerald-400/40 focus-within:bg-white/[0.06]">
      <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">
        {label}
      </span>
      <input
        defaultValue={defaultValue}
        className="w-full bg-transparent text-sm font-medium text-white placeholder-white/35 focus:outline-none"
      />
    </label>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="card grid place-items-center p-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-white/[0.06] text-white/45">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-semibold">No gear matches those filters</h3>
      <p className="mt-1 max-w-sm text-sm text-ink-500">
        Try expanding the search radius or clearing some filters.
      </p>
      <button onClick={onClear} className="btn-primary mt-5">
        Clear all filters
      </button>
    </div>
  );
}

function MapView({ listings: items }: { listings: typeof listings }) {
  return (
    <div className="card overflow-hidden">
      <div className="grid md:grid-cols-[1fr_360px]">
        <div className="relative h-[520px] bg-[#0c1410]">
          <svg viewBox="0 0 600 520" className="absolute inset-0 h-full w-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(74,222,128,0.08)" strokeWidth="1" />
              </pattern>
              <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(74,222,128,0.18)" />
                <stop offset="100%" stopColor="rgba(74,222,128,0)" />
              </radialGradient>
            </defs>
            <rect width="600" height="520" fill="#0c1410" />
            <rect width="600" height="520" fill="url(#grid)" />
            <circle cx="300" cy="260" r="180" fill="url(#mapGlow)" />
            <path d="M0,300 C150,260 250,360 600,260" stroke="rgba(74,222,128,0.35)" strokeWidth="2.5" fill="none" />
            <path d="M0,140 C200,180 320,80 600,160" stroke="rgba(56,189,248,0.30)" strokeWidth="2.5" fill="none" />
            <path d="M120,40 C200,120 280,200 360,500" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
          </svg>
          {items.map((l, i) => {
            const x = 8 + ((i * 137) % 80);
            const y = 12 + ((i * 91) % 70);
            return (
              <Link
                key={l.id}
                href={`/listings/${l.id}`}
                className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 px-3 py-1.5 text-xs font-bold text-black shadow-[0_0_0_4px_rgba(74,222,128,0.20),0_8px_24px_-6px_rgba(74,222,128,0.6)] transition hover:scale-110"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                ${l.dailyPrice}
              </Link>
            );
          })}
          <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
            {items.length} pins · Boulder area
          </div>
        </div>
        <ul className="max-h-[520px] divide-y divide-white/[0.06] overflow-auto border-l border-white/[0.06]">
          {items.map((l) => (
            <li key={l.id}>
              <Link href={`/listings/${l.id}`} className="flex items-center gap-3 p-3 transition hover:bg-white/[0.03]">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-lg" style={{ background: l.thumbBg }}>
                  <GearIcon k={l.iconKey} className="h-9 w-9" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-semibold">{l.title}</p>
                  <p className="text-xs text-ink-500">
                    ${l.dailyPrice}/day · {l.distanceKm} km · ★ {l.rating}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
