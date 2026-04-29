"use client";
import Link from "next/link";
import { notFound, useParams, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { findListing, owners, type Owner } from "@/data/mock";
import GearIcon from "@/components/GearIcon";

type Step = 1 | 2 | 3;

export default function BookingFlow() {
  const params = useParams<{ id: string }>();
  const sp = useSearchParams();
  const days = Number(sp.get("days") || 3);
  const protect = sp.get("protect") === "1";

  const listing = findListing(params.id);
  if (!listing) return notFound();
  const owner = owners[listing.ownerId];

  const [step, setStep] = useState<Step>(1);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "applepay" | "googlepay">("card");

  const subtotal = listing.dailyPrice * days;
  const serviceFee = +(subtotal * 0.1).toFixed(2);
  const protection = protect ? +(subtotal * 0.08).toFixed(2) : 0;
  const total = +(subtotal + serviceFee + protection).toFixed(2);

  return (
    <div className="container-app py-8">
      <Link href={`/listings/${listing.id}`} className="text-sm text-ink-500 hover:text-white">
        ← Back to listing
      </Link>

      <Stepper step={step} />

      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_360px]">
        <div>
          {step === 1 && <ReviewStep listing={listing} days={days} protect={protect} />}
          {step === 2 && (
            <PaymentStep
              method={paymentMethod}
              setMethod={setPaymentMethod}
              total={total}
            />
          )}
          {step === 3 && <ConfirmStep listing={listing} owner={owner} days={days} total={total} />}

          <div className="mt-6 flex flex-wrap gap-3">
            {step > 1 && step < 3 && (
              <button onClick={() => setStep((step - 1) as Step)} className="btn-secondary">
                ← Back
              </button>
            )}
            {step < 3 ? (
              <button onClick={() => setStep((step + 1) as Step)} className="btn-primary">
                {step === 1 ? "Continue to payment →" : "Confirm & pay $" + total.toFixed(2)}
              </button>
            ) : (
              <Link href="/dashboard" className="btn-primary">
                View in dashboard →
              </Link>
            )}
          </div>
        </div>

        <aside>
          <div className="md:sticky md:top-20">
            <div className="card overflow-hidden">
              <div className="grid aspect-[16/9] place-items-center" style={{ background: listing.thumbBg }}>
                <GearIcon k={listing.iconKey} className="h-20 w-20" />
              </div>
              <div className="p-4">
                <p className="text-xs text-ink-500">Booking summary</p>
                <h3 className="mt-1 text-base font-semibold">{listing.title}</h3>
                <p className="mt-1 text-xs text-ink-500">
                  {owner.name} · {listing.city}
                </p>
                <div className="mt-4 space-y-1.5 text-sm">
                  <Row k={`$${listing.dailyPrice} × ${days} days`} v={`$${subtotal.toFixed(2)}`} />
                  <Row k="Service fee (10%)" v={`$${serviceFee.toFixed(2)}`} />
                  {protect && <Row k="Damage protection" v={`$${protection.toFixed(2)}`} />}
                  <div className="my-2 border-t border-white/[0.06]" />
                  <Row k={<span className="font-bold">Total</span>} v={<span className="font-bold">${total.toFixed(2)}</span>} />
                </div>
                <p className="mt-3 text-[11px] text-ink-500">
                  Held in escrow until pickup confirmed.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stepper({ step }: { step: Step }) {
  const items = ["Review", "Payment", "Confirmation"];
  return (
    <div className="mt-6 flex items-center gap-3">
      {items.map((name, i) => {
        const idx = (i + 1) as Step;
        const done = step > idx;
        const active = step === idx;
        return (
          <div key={name} className="flex flex-1 items-center gap-3">
            <div
              className={
                "grid h-8 w-8 place-items-center rounded-full text-xs font-bold " +
                (done
                  ? "bg-emerald-400 text-black"
                  : active
                  ? "bg-white text-black"
                  : "bg-white/[0.06] text-white/45")
              }
            >
              {done ? "✓" : idx}
            </div>
            <span
              className={
                "text-sm " + (active ? "font-semibold text-ink-900" : "text-ink-500")
              }
            >
              {name}
            </span>
            {i < items.length - 1 && (
              <div className="h-px flex-1 bg-white/10" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ReviewStep({
  listing,
  days,
  protect,
}: {
  listing: ReturnType<typeof findListing>;
  days: number;
  protect: boolean;
}) {
  if (!listing) return null;
  return (
    <div className="space-y-5">
      <div className="card p-6">
        <h2 className="text-lg font-bold">Review your trip</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Info label="Pickup date" value="May 12, 2026 · 9:00 AM" />
          <Info label="Return date" value={`May ${12 + days}, 2026 · 6:00 PM`} />
          <Info label="Pickup location" value={`${listing.city} (exact address shared after approval)`} />
          <Info label="Damage protection" value={protect ? "Included — up to $500" : "Declined"} />
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-base font-semibold">Cancellation policy</h3>
        <ul className="mt-3 space-y-2 text-sm text-ink-700">
          <li>· Free cancellation up to 48 hours before pickup.</li>
          <li>· 50% refund if cancelled within 48 hours.</li>
          <li>· No refund after pickup time has passed.</li>
        </ul>
      </div>

      <div className="card p-6">
        <h3 className="text-base font-semibold">Pickup checklist</h3>
        <ul className="mt-3 grid gap-2 text-sm text-ink-700 sm:grid-cols-2">
          <Check>Compare the gear to the listing photos</Check>
          <Check>Confirm condition with the owner in-app</Check>
          <Check>Tap “Mark picked up” to release escrow timer</Check>
          <Check>Save the in-app return reminder</Check>
        </ul>
      </div>
    </div>
  );
}

function PaymentStep({
  method,
  setMethod,
  total,
}: {
  method: "card" | "applepay" | "googlepay";
  setMethod: (m: "card" | "applepay" | "googlepay") => void;
  total: number;
}) {
  return (
    <div className="space-y-5">
      <div className="card p-6">
        <h2 className="text-lg font-bold">How would you like to pay?</h2>
        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
          {[
            { k: "card", label: "Card" },
            { k: "applepay", label: "Apple Pay" },
            { k: "googlepay", label: "Google Pay" },
          ].map((p) => (
            <button
              key={p.k}
              onClick={() => setMethod(p.k as typeof method)}
              className={
                "rounded-xl border px-4 py-3 font-semibold transition " +
                (method === p.k
                  ? "border-emerald-400/40 bg-emerald-400/[0.12] text-emerald-300"
                  : "border-white/10 bg-white/[0.04] text-white/80 hover:border-white/20")
              }
            >
              {p.label}
            </button>
          ))}
        </div>

        {method === "card" ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Field label="Cardholder name" placeholder="Ashish Cheruku" />
            <Field label="Card number" placeholder="4242 4242 4242 4242" />
            <Field label="Expiry" placeholder="08 / 28" />
            <Field label="CVC" placeholder="123" />
            <Field label="Billing ZIP" placeholder="333031" full />
          </div>
        ) : (
          <div className="mt-5 grid place-items-center rounded-xl border border-dashed border-white/15 p-8 text-sm text-ink-500">
            Tap the {method === "applepay" ? "Apple Pay" : "Google Pay"} button on confirmation to authorise.
          </div>
        )}
      </div>

      <div className="card flex items-start gap-3 p-5 text-sm">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-400/[0.10] text-emerald-300">🔒</span>
        <p>
          Your card details are processed by <strong>Stripe</strong> (PCI-DSS Level 1).
          ${total.toFixed(2)} will be authorised now and only captured into escrow once the owner approves.
        </p>
      </div>
    </div>
  );
}

function ConfirmStep({
  listing,
  owner,
  days,
  total,
}: {
  listing: ReturnType<typeof findListing>;
  owner: Owner;
  days: number;
  total: number;
}) {
  if (!listing) return null;
  return (
    <div className="space-y-5">
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 text-white">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/20 text-2xl">
            ✓
          </span>
          <h2 className="mt-3 text-2xl font-bold">Booking requested!</h2>
          <p className="mt-1 text-emerald-50/90">
            Reference <strong>ECR-20260512-0042</strong> · Awaiting {owner.name}’s approval.
          </p>
        </div>
        <div className="p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
            What happens next
          </h3>
          <Timeline />
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-base font-semibold">Pickup instructions</h3>
        <p className="mt-2 text-sm text-ink-700">
          Once approved, the exact pickup address near {listing.city} will appear here.
          {owner.name} typically suggests Saturday mornings at the trailhead.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="btn-secondary">Add to Google Calendar</button>
          <button className="btn-secondary">Add to Apple Calendar</button>
          <button className="btn-ghost">Message {owner.name.split(" ")[0]}</button>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-base font-semibold">Sustainability impact</h3>
        <p className="mt-2 text-sm text-ink-700">
          By renting instead of buying for this {days}-day trip, you’re estimated to save{" "}
          <strong className="text-emerald-300">~6.4 kg CO₂</strong> and{" "}
          <strong className="text-emerald-300">${(listing.dailyPrice * 8 - total).toFixed(0)}</strong>{" "}
          versus a new purchase.
        </p>
      </div>
    </div>
  );
}

function Timeline() {
  const events = [
    { time: "Now", title: "Request sent", body: "Owner notified by email + push." },
    { time: "Within 24h", title: "Owner approves", body: "Escrow capture; address revealed." },
    { time: "Pickup day", title: "Mark picked up", body: "Tap-confirm in dashboard." },
    { time: "Return day", title: "Return & review", body: "Both sides leave reviews." },
  ];
  return (
    <ol className="mt-4 space-y-4">
      {events.map((e, i) => (
        <li key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className={"grid h-8 w-8 place-items-center rounded-full text-xs font-bold " + (i === 0 ? "bg-emerald-400 text-black" : "bg-white/[0.06] text-white/45")}>
              {i + 1}
            </span>
            {i < events.length - 1 && <span className="mt-1 w-px flex-1 bg-white/10" />}
          </div>
          <div className="pb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">{e.time}</p>
            <p className="text-sm font-semibold">{e.title}</p>
            <p className="text-sm text-ink-600">{e.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Field({ label, placeholder, full }: { label: string; placeholder: string; full?: boolean }) {
  return (
    <label className={"block " + (full ? "sm:col-span-2" : "")}>
      <span className="label mb-1">{label}</span>
      <input className="input" placeholder={placeholder} />
    </label>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-ink-500">{label}</div>
      <div className="mt-0.5 text-sm font-semibold">{value}</div>
    </div>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-400/[0.12] text-emerald-300 border border-emerald-400/25">✓</span>
      {children}
    </li>
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
