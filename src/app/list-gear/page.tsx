"use client";
import { useState } from "react";
import { categories, type Category } from "@/data/mock";

const steps = ["Basics", "Photos", "Specifications", "Pricing", "Location"] as const;
type StepIdx = 0 | 1 | 2 | 3 | 4;

export default function CreateListingPage() {
  const [idx, setIdx] = useState<StepIdx>(0);
  const [cat, setCat] = useState<Category>("camping");
  const [photos, setPhotos] = useState<number[]>([1, 2]);

  const next = () => setIdx(Math.min(4, idx + 1) as StepIdx);
  const back = () => setIdx(Math.max(0, idx - 1) as StepIdx);

  return (
    <div className="container-app py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">List your gear</h1>
          <p className="text-sm text-ink-500">
            Step {idx + 1} of 5 · {steps[idx]}
          </p>
        </div>
        <p className="text-sm text-ink-500">Average: <strong>~6 minutes</strong></p>
      </div>

      {/* progress */}
      <div className="mb-6 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div
              className={
                "grid h-8 w-8 place-items-center rounded-full text-xs font-bold " +
                (i < idx
                  ? "bg-emerald-400 text-black"
                  : i === idx
                  ? "bg-white text-black"
                  : "bg-white/[0.06] text-white/45")
              }
            >
              {i < idx ? "✓" : i + 1}
            </div>
            {i < steps.length - 1 && <div className="h-px flex-1 bg-white/10" />}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="card p-6">
          {idx === 0 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold">Tell us about your gear</h2>
              <Field
                label="Listing title"
                placeholder="e.g. REI Co-op Half Dome 2+ Tent"
                hint="Keep it short and specific. Include brand and model."
              />
              <div>
                <span className="label">Category</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => setCat(c.key)}
                      className={
                        "rounded-full border px-3 py-2 text-sm font-medium " +
                        (cat === c.key
                          ? "border-emerald-400/40 bg-emerald-400/[0.12] text-emerald-300"
                          : "border-white/10 bg-white/[0.04] text-white/80")
                      }
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
              <Textarea
                label="Description"
                placeholder="Describe condition, included accessories, and any care instructions."
                hint="Honest condition descriptions earn higher trust ratings."
              />
            </div>
          )}

          {idx === 1 && (
            <div>
              <h2 className="text-lg font-bold">Add photos</h2>
              <p className="mt-1 text-sm text-ink-500">
                <strong>Listings with 4+ photos book 3× more often.</strong> Show every angle and any wear honestly — Airbnb-style.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {photos.map((p) => (
                  <div key={p} className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-ink-200">
                    <div className="h-full w-full bg-gradient-to-br from-emerald-200 via-emerald-300 to-emerald-500" />
                    <button
                      onClick={() => setPhotos(photos.filter((x) => x !== p))}
                      className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-xs"
                      aria-label="Remove photo"
                    >
                      ✕
                    </button>
                    {p === 1 && (
                      <span className="absolute bottom-2 left-2 rounded-full bg-ink-900/80 px-2 py-0.5 text-[11px] font-semibold text-white">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setPhotos([...photos, photos.length + 1])}
                  className="grid aspect-[4/3] place-items-center rounded-xl border-2 border-dashed border-white/15 text-ink-500 hover:border-emerald-400 hover:text-emerald-300"
                >
                  <span>
                    <span className="block text-3xl">＋</span>
                    <span className="text-xs">Drag or upload</span>
                  </span>
                </button>
              </div>
              <div className="mt-5 grid gap-3 rounded-xl bg-emerald-400/[0.08] p-4 text-sm text-emerald-100 sm:grid-cols-3">
                <Tip>Take photos in daylight</Tip>
                <Tip>Include a wide & a close-up</Tip>
                <Tip>Show wear honestly</Tip>
              </div>
            </div>
          )}

          {idx === 2 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Brand" placeholder="REI Co-op" />
              <Field label="Model" placeholder="Half Dome 2+" />
              <Field label="Weight" placeholder="2.5 kg" />
              <Field label="Capacity" placeholder="2 person" />
              <Field label="Season rating" placeholder="3-Season" />
              <div>
                <span className="label">Condition</span>
                <select className="input mt-1">
                  <option>New</option>
                  <option>Like New</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
              </div>
              <Textarea label="What’s included" placeholder="Footprint, stuff sack, stake bag…" full />
            </div>
          )}

          {idx === 3 && (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Daily price (USD)" placeholder="18" />
                <Field label="Weekly price (USD)" placeholder="99" />
                <Field label="Security deposit" placeholder="50" />
                <div>
                  <span className="label">Damage protection</span>
                  <select className="input mt-1">
                    <option>Optional for renter</option>
                    <option>Required</option>
                    <option>Not offered</option>
                  </select>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4 text-sm">
                <p className="font-semibold">Suggested price range</p>
                <p className="mt-1 text-ink-600">
                  Similar items in Boulder rent for <strong>$15–$22/day</strong>. Listings priced near the median get booked
                  <strong> 2.4× faster</strong>.
                </p>
              </div>
            </div>
          )}

          {idx === 4 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="City" placeholder="Boulder" />
              <Field label="State / Region" placeholder="CO" />
              <Field label="Postal code" placeholder="80302" />
              <div>
                <span className="label">Pickup style</span>
                <select className="input mt-1">
                  <option>Meet at trailhead / public spot</option>
                  <option>From my home</option>
                  <option>Locker / drop-box</option>
                </select>
              </div>
              <Textarea label="Pickup notes" placeholder="Suggested time windows, parking tips…" full />
              <div className="grid place-items-center rounded-xl bg-white/[0.025] p-8 text-sm text-ink-500 sm:col-span-2">
                Map preview · only an approximate radius is shown to renters until booking is approved
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
              Listing checklist
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span
                    className={
                      "grid h-5 w-5 place-items-center rounded-full text-[11px] " +
                      (i < idx ? "bg-emerald-400 text-black" : "bg-white/[0.06] text-white/45")
                    }
                  >
                    {i < idx ? "✓" : i + 1}
                  </span>
                  <span className={i === idx ? "font-semibold" : "text-ink-600"}>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-5 text-sm">
            <p className="font-semibold">Why honest listings win</p>
            <p className="mt-2 text-ink-600">
              From M1 research: trust is the #1 barrier in P2P. Mandatory photos + condition reports
              prevent the “dark photo” problem that nearly killed Airbnb in 2009.
            </p>
          </div>
        </aside>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {idx > 0 && (
          <button onClick={back} className="btn-secondary">← Back</button>
        )}
        {idx < 4 ? (
          <button onClick={next} className="btn-primary">
            Continue →
          </button>
        ) : (
          <button className="btn-primary">Publish listing</button>
        )}
      </div>
    </div>
  );
}

function Field({ label, placeholder, hint }: { label: string; placeholder: string; hint?: string }) {
  return (
    <label className="block">
      <span className="label mb-1 block">{label}</span>
      <input className="input" placeholder={placeholder} />
      {hint && <p className="mt-1 text-xs text-ink-500">{hint}</p>}
    </label>
  );
}

function Textarea({ label, placeholder, hint, full }: { label: string; placeholder: string; hint?: string; full?: boolean }) {
  return (
    <label className={"block " + (full ? "sm:col-span-2" : "")}>
      <span className="label mb-1 block">{label}</span>
      <textarea rows={4} className="input min-h-[110px]" placeholder={placeholder} />
      {hint && <p className="mt-1 text-xs text-ink-500">{hint}</p>}
    </label>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-400/15 text-emerald-200 text-xs">✓</span>
      <span>{children}</span>
    </p>
  );
}
