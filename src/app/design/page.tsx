import Link from "next/link";

export const metadata = {
  title: "Final Design (M4) — DfX, Architecture, BOM | EcoRent",
};

export default function DesignPage() {
  return (
    <div className="container-app py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="chip-brand">PDD MF-F473 · M4 Final Design</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
          Final Embodiment & Design Refinement
        </h1>
        <p className="mt-3 max-w-3xl text-ink-600">
          This page consolidates the M4 deliverables for EcoRent: the DfX
          refinement applied to the M3 concept, the final product architecture,
          updated Bill of Materials, cost estimate, and feasibility commentary.
        </p>
      </div>

      {/* Problem Statement */}
      <Section title="1 · Final problem statement">
        <div className="card border-l-4 border-emerald-400 p-6">
          <p className="text-lg italic text-ink-800">
            “<strong>Occasional outdoor adventurers (18–35)</strong> need a{" "}
            <strong>trustworthy way to access quality outdoor gear for short trips</strong> because{" "}
            <strong>buying gear is expensive and most kit sits idle 90% of the year</strong>, which could be met by{" "}
            <strong>a verified, hyper-local peer-to-peer marketplace with built-in escrow and damage protection</strong>.”
          </p>
        </div>
      </Section>

      {/* Selected concept */}
      <Section title="2 · M3 concept selected">
        <div className="grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <div className="card p-6">
            <h3 className="text-lg font-bold">Concept C — Trust-First Hyper-Local Marketplace</h3>
            <p className="mt-2 text-ink-600">
              Selected via Pugh chart with a net weighted score of <strong>+30</strong> — the only
              concept with zero negatives across 10 weighted criteria. Beats the
              full-managed model on cost & scalability, and beats classifieds on trust.
            </p>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <Bullet>Verified profiles + ID checks</Bullet>
              <Bullet>Mandatory photos with condition reports</Bullet>
              <Bullet>Stripe Connect escrow payments</Bullet>
              <Bullet>Dual-sided reviews</Bullet>
              <Bullet>Mapbox + PostGIS geospatial search</Bullet>
              <Bullet>In-app messaging threaded by booking</Bullet>
            </ul>
          </div>
          <div className="card grid grid-cols-2 gap-3 p-6">
            <Score concept="A · Classifieds" v={0} bar={0} />
            <Score concept="B · Full-Managed" v={0} bar={20} />
            <Score concept="C · Trust-First" v={30} bar={100} highlight />
            <Score concept="D · Subscription" v={-3} bar={5} negative />
            <Score concept="E · AI Matching" v={3} bar={20} />
          </div>
        </div>
      </Section>

      {/* DfX */}
      <Section
        title="3 · DfX refinement"
        sub="Two complementary methods applied: Design for Usability and Design for Accessibility."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Card title="A · Design for Usability (DfU)" tone="emerald">
            <p>
              Focus: reduce friction in the renter funnel and the trust handshake. Heuristic
              evaluation against Nielsen’s 10 surfaced 4 specific pain points in the M3 mockups.
            </p>
            <ChangeTable
              rows={[
                ["Booking page felt like one wall of fields", "Split into 3 stepper screens (Review → Pay → Confirm)", "Reduces cognitive load (Miller’s 7±2)"],
                ["Pickup address visible before approval", "Address only revealed after escrow capture", "Protects owner privacy; raises trust"],
                ["Listing card lacked verification cue", "Added “Verified Owner” chip on every card", "Surfaces trust at scan-time"],
                ["No live price as days changed", "Sticky price card recalculates instantly", "Removes recall, follows H6"],
              ]}
            />
          </Card>
          <Card title="B · Design for Accessibility (DfA)" tone="sky">
            <p>
              Target: WCAG 2.1 AA. The M3 mockups used dark text on coloured photo overlays
              and tiny tap targets that failed contrast and touch sizing.
            </p>
            <ChangeTable
              rows={[
                ["3.8:1 contrast on hero overlay", "Increased to 4.7:1 + skip-link", "WCAG 2.1 AA compliance"],
                ["Tap targets 32×32 px", "Raised to ≥44×44 px on all CTAs", "iOS/Android HIG; motor accessibility"],
                ["Date picker keyboard-trapped", "Range slider + native keyboard nav", "Works on screen readers"],
                ["Status conveyed by color only", "Added text + icon to every status badge", "Colour-blind users supported"],
              ]}
            />
          </Card>
        </div>

        <Section title="Why these modifications were necessary" small>
          <div className="card p-6 text-ink-700">
            <p>
              The M3 mockups proved the concept visually but bundled the booking flow and
              hid the trust signals that M1 identified as the primary barrier in P2P
              marketplaces. Without the DfU split-flow we expected ~28% drop-off at the
              payment step (industry benchmark for combined review+pay screens). The DfA
              changes are non-negotiable for NFR-05 and ADA compliance in the US launch
              region (Boulder, CO).
            </p>
          </div>
        </Section>

        <Section title="How the modifications improved the final design" small>
          <div className="grid gap-3 md:grid-cols-3">
            <Improvement big="−42%" label="estimated drop-off in booking flow" />
            <Improvement big="4.7 : 1" label="minimum text contrast (was 3.8 : 1)" />
            <Improvement big="100%" label="of CTAs ≥ 44 × 44 px tap-target" />
          </div>
        </Section>
      </Section>

      {/* Product Architecture */}
      <Section title="4 · Product architecture">
        <div className="card overflow-hidden p-6">
          <ArchitectureDiagram />
          <p className="mt-4 text-sm text-ink-600">
            Three-tier service-oriented architecture. Frontend in Next.js 14 (this app),
            REST API in Django + DRF, PostgreSQL with PostGIS for geospatial search, Redis
            for sessions, Stripe Connect for escrow, and AWS S3 + CloudFront for image
            delivery.
          </p>
        </div>
      </Section>

      {/* User flow */}
      <Section title="5 · Final user flow">
        <div className="card overflow-hidden p-6">
          <UserFlowDiagram />
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Quick href="/" label="1 · Landing" />
            <Quick href="/search" label="2 · Search" />
            <Quick href="/listings/l-001" label="3 · Listing detail" />
            <Quick href="/booking/l-001?days=3&protect=1" label="4 · Booking flow" />
            <Quick href="/dashboard" label="5 · Dashboard" />
            <Quick href="/profile/u-001" label="6 · Owner profile" />
          </div>
        </div>
      </Section>

      {/* Key features */}
      <Section title="6 · Key features delivered in this build">
        <div className="grid gap-4 md:grid-cols-3">
          <Feature title="Trust handshake" body="ID + email + phone verification surfaced as chips on every listing and profile." />
          <Feature title="Escrow booking" body="Three-step Review → Pay → Confirm flow. Card authorised now, captured on owner approval." />
          <Feature title="Geospatial search" body="Filter by category, price, distance, condition; toggle grid ↔ map view." />
          <Feature title="Owner dashboard" body="Bookings with progress bars, live earnings chart, payouts, threaded messaging." />
          <Feature title="Sustainability dashboard" body="Per-rental and lifetime CO₂ savings shown to both sides at every receipt." />
          <Feature title="Multi-step listing wizard" body="Five guided steps, mandatory photos, suggested-price hint, honest-condition nudges." />
        </div>
      </Section>

      {/* BOM */}
      <Section
        title="7 · Updated BOM, cost & feasibility"
        sub="Software BOM mapped to the architecture above. Costs are USD/month for an MVP at ~10 k MAU."
      >
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.025] text-left text-xs uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-4 py-3">Component / module</th>
                <th className="px-4 py-3">Function</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Manufacturing process</th>
                <th className="px-4 py-3 text-right">Qty</th>
                <th className="px-4 py-3 text-right">Est. cost / mo</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-t [&>tr]:border-white/[0.06]">
              {bom.map((r) => (
                <tr key={r.module}>
                  <td className="px-4 py-3 font-semibold">{r.module}</td>
                  <td className="px-4 py-3 text-ink-600">{r.fn}</td>
                  <td className="px-4 py-3"><Tag t={r.source} /></td>
                  <td className="px-4 py-3 text-ink-600">{r.process}</td>
                  <td className="px-4 py-3 text-right">{r.qty}</td>
                  <td className="px-4 py-3 text-right font-semibold">{r.cost}</td>
                </tr>
              ))}
              <tr className="bg-white/[0.025]/60">
                <td className="px-4 py-3 font-bold" colSpan={5}>
                  Approximate total / month
                </td>
                <td className="px-4 py-3 text-right font-extrabold">$496</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <FeasCard
            title="Standard / off-the-shelf"
            tone="emerald"
            items={[
              "Stripe Connect (payments)",
              "Mapbox GL JS (maps)",
              "AWS S3 + CloudFront (images)",
              "PostgreSQL + PostGIS",
              "Redis (sessions)",
              "Twilio SendGrid (email)",
              "Sentry (monitoring)",
            ]}
          />
          <FeasCard
            title="Custom-built"
            tone="amber"
            items={[
              "Next.js frontend (this app)",
              "Django REST API",
              "Trust scoring algorithm",
              "Sustainability / CO₂ estimator",
              "Booking & escrow state machine",
              "Onboarding ID-verification flow",
            ]}
          />
          <FeasCard
            title="Practical limitations"
            tone="rose"
            items={[
              "Cold-start: needs supply density before each city launches",
              "Dispute handling still requires a human in the loop",
              "Rural geocoding accuracy varies",
              "Stripe Connect not available in every country yet",
            ]}
          />
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="card p-6">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
              Manufacturing feasibility
            </h4>
            <p className="mt-2 text-ink-700">
              All paid services have managed tiers and free trials. The custom code (~12 k LOC)
              is buildable by a 1-engineer MVP team in 10–12 weeks based on the M2 user-story
              point estimates. Docker + Terraform make the environment reproducible.
            </p>
          </div>
          <div className="card p-6">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
              Assembly feasibility
            </h4>
            <p className="mt-2 text-ink-700">
              Each subsystem has a clear API boundary (REST + webhooks). New cities ship
              behind a feature flag. CI/CD via GitHub Actions deploys to AWS ECS in under 6
              minutes; rollbacks are one-click via Terraform.
            </p>
          </div>
        </div>
      </Section>

      {/* Conclusion */}
      <Section title="8 · Concluding statement">
        <div className="card border-l-4 border-emerald-400 bg-emerald-400/[0.06] p-6">
          <p className="text-lg font-semibold">
            Our final design addresses the user need by combining a hyper-local peer-to-peer
            marketplace with verified profiles, escrow payments and a damage-protection plan —
            making it both safe and affordable for occasional adventurers to access quality
            gear, while owners earn from kit that would otherwise sit idle.
          </p>
        </div>
        <p className="mt-4 text-sm text-ink-500">
          Next steps: closed beta in Boulder (CO) with 50 verified owners; user-testing
          against the M2 NFRs; iterate the dispute-resolution flow before opening to a
          second city.
        </p>
      </Section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">Open the live demo →</Link>
        <Link href="/dashboard" className="btn-secondary">See the dashboard</Link>
      </div>
    </div>
  );
}

/* ----------------- helpers ----------------- */

function Section({
  title,
  sub,
  children,
  small,
}: {
  title: string;
  sub?: string;
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <section className="mt-12">
      <h2
        className={
          "font-bold tracking-tight " +
          (small ? "text-base text-ink-700" : "text-2xl md:text-3xl")
        }
      >
        {title}
      </h2>
      {sub && <p className="mt-1 text-sm text-ink-500">{sub}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Card({
  title,
  tone,
  children,
}: {
  title: string;
  tone: "emerald" | "sky";
  children: React.ReactNode;
}) {
  const t = tone === "emerald" ? "border-emerald-400" : "border-sky-400";
  return (
    <div className={"card border-l-4 p-6 " + t}>
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="mt-3 space-y-3 text-ink-700">{children}</div>
    </div>
  );
}

function ChangeTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
      <table className="w-full text-xs">
        <thead className="bg-white/[0.025] text-left uppercase tracking-wide text-ink-500">
          <tr>
            <th className="px-3 py-2">Issue in M3</th>
            <th className="px-3 py-2">Modification in M4</th>
            <th className="px-3 py-2">Reason</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-white/[0.06]">
              <td className="px-3 py-2.5 text-ink-600">{r[0]}</td>
              <td className="px-3 py-2.5 font-medium">{r[1]}</td>
              <td className="px-3 py-2.5 text-ink-500">{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Score({
  concept,
  v,
  bar,
  highlight,
  negative,
}: {
  concept: string;
  v: number;
  bar: number;
  highlight?: boolean;
  negative?: boolean;
}) {
  return (
    <div className={"rounded-xl border p-3 " + (highlight ? "border-emerald-400/30 bg-emerald-400/[0.08]" : "border-white/[0.06] bg-white/[0.025]")}>
      <p className="text-xs font-semibold text-white/80">{concept}</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <span
          className={"block h-full " + (negative ? "bg-rose-400" : highlight ? "bg-gradient-to-r from-emerald-400 to-emerald-300 shadow-[0_0_8px_rgba(74,222,128,0.6)]" : "bg-white/30")}
          style={{ width: `${Math.max(5, Math.abs(bar))}%` }}
        />
      </div>
      <p className={"mt-2 text-xs font-bold " + (negative ? "text-rose-400" : highlight ? "text-emerald-300" : "text-white/60")}>
        Net {v >= 0 ? "+" : ""}{v}
      </p>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-ink-700">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/[0.12] text-emerald-300 border border-emerald-400/25">✓</span>
      {children}
    </li>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="card p-5">
      <h4 className="text-base font-semibold">{title}</h4>
      <p className="mt-1 text-sm text-ink-600">{body}</p>
    </div>
  );
}

function Improvement({ big, label }: { big: string; label: string }) {
  return (
    <div className="card border-l-4 border-emerald-400 p-5">
      <p className="text-3xl font-extrabold text-emerald-300">{big}</p>
      <p className="mt-1 text-xs text-ink-600">{label}</p>
    </div>
  );
}

function Quick({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm font-semibold text-white/85 transition hover:border-emerald-400/40 hover:bg-emerald-400/[0.08] hover:text-emerald-300">
      {label}
    </Link>
  );
}

function Tag({ t }: { t: string }) {
  const map: Record<string, string> = {
    Off: "bg-emerald-400/[0.10] text-emerald-300",
    Custom: "bg-amber-400/[0.12] text-amber-300 border border-amber-400/25",
  };
  return <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${map[t]}`}>{t === "Off" ? "Off-the-shelf" : "Custom"}</span>;
}

function FeasCard({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "emerald" | "amber" | "rose";
}) {
  const tones = {
    emerald: "border-emerald-400",
    amber: "border-amber-400",
    rose: "border-rose-400",
  };
  return (
    <div className={"card border-l-4 p-5 " + tones[tone]}>
      <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-500">{title}</h4>
      <ul className="mt-3 space-y-1.5 text-sm text-ink-700">
        {items.map((it) => (
          <li key={it}>· {it}</li>
        ))}
      </ul>
    </div>
  );
}

function ArchitectureDiagram() {
  return (
    <svg viewBox="0 0 900 320" className="w-full">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="#22c55e" />
          <stop offset="1" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      {/* clients */}
      <Box x={20} y={20} w={150} h={60} title="Web (Next.js 14)" />
      <Box x={20} y={100} w={150} h={60} title="iOS / Android (Expo)" />
      {/* gateway */}
      <Box x={220} y={60} w={140} h={60} title="API Gateway / CDN" gradient />
      {/* services */}
      <Box x={400} y={20} w={140} h={50} title="Auth + Identity" />
      <Box x={400} y={80} w={140} h={50} title="Listings & Search" />
      <Box x={400} y={140} w={140} h={50} title="Booking & Escrow" />
      <Box x={400} y={200} w={140} h={50} title="Messaging" />
      <Box x={400} y={260} w={140} h={50} title="Reviews & Trust" />
      {/* data */}
      <Box x={580} y={40} w={140} h={50} title="PostgreSQL + PostGIS" subtle />
      <Box x={580} y={100} w={140} h={50} title="Redis cache" subtle />
      <Box x={580} y={160} w={140} h={50} title="AWS S3 (images)" subtle />
      <Box x={580} y={220} w={140} h={50} title="Stripe Connect" subtle />
      <Box x={580} y={280} w={140} h={50} title="SendGrid + Twilio" subtle />
      {/* observability */}
      <Box x={770} y={140} w={110} h={50} title="Sentry + Datadog" gradient />

      {/* connectors */}
      {[
        [170, 50, 220, 90],
        [170, 130, 220, 90],
        [360, 90, 400, 45],
        [360, 90, 400, 105],
        [360, 90, 400, 165],
        [360, 90, 400, 225],
        [360, 90, 400, 285],
        [540, 45, 580, 65],
        [540, 105, 580, 125],
        [540, 165, 580, 185],
        [540, 225, 580, 245],
        [540, 285, 580, 305],
        [720, 165, 770, 165],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeDasharray="4 3" />
      ))}
    </svg>
  );
}

function Box({
  x,
  y,
  w,
  h,
  title,
  gradient,
  subtle,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  gradient?: boolean;
  subtle?: boolean;
}) {
  const fill = gradient ? "url(#g1)" : subtle ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.06)";
  const stroke = gradient ? "transparent" : "rgba(255,255,255,0.10)";
  const color = gradient ? "#08080a" : "#f5f5f7";
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={fill} stroke={stroke} />
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill={color}
      >
        {title}
      </text>
    </g>
  );
}

function UserFlowDiagram() {
  const steps = ["Landing", "Search", "Listing", "Booking", "Confirm", "Pickup", "Return + Review"];
  return (
    <svg viewBox="0 0 900 110" className="w-full">
      {steps.map((s, i) => {
        const x = 20 + i * 125;
        return (
          <g key={s}>
            <rect x={x} y={30} width={110} height={50} rx={25} fill="rgba(74,222,128,0.10)" stroke="#4ade80" strokeWidth="1.5" />
            <text x={x + 55} y={60} textAnchor="middle" fontSize="13" fontWeight="600" fill="#f5f5f7">
              {s}
            </text>
            {i < steps.length - 1 && (
              <path d={`M ${x + 110} 55 L ${x + 125} 55`} stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow)" />
            )}
          </g>
        );
      })}
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#22c55e" />
        </marker>
      </defs>
    </svg>
  );
}

const bom: { module: string; fn: string; source: "Off" | "Custom"; process: string; qty: string; cost: string }[] = [
  { module: "Next.js frontend", fn: "Web UI, SSR, SEO", source: "Custom", process: "TS + React + Tailwind", qty: "1 codebase", cost: "$0 (own dev)" },
  { module: "Django REST API", fn: "Business logic, auth, booking state machine", source: "Custom", process: "Python 3.12 + DRF", qty: "1 service", cost: "$0 (own dev)" },
  { module: "PostgreSQL + PostGIS", fn: "Relational + geospatial store", source: "Off", process: "AWS RDS managed", qty: "db.t4g.medium", cost: "$78" },
  { module: "Redis", fn: "Sessions, rate-limit, cache", source: "Off", process: "AWS ElastiCache", qty: "cache.t4g.small", cost: "$28" },
  { module: "AWS S3 + CloudFront", fn: "Listing images, CDN", source: "Off", process: "AWS managed", qty: "~500 GB egress", cost: "$45" },
  { module: "ECS Fargate", fn: "API + worker hosting", source: "Off", process: "AWS managed containers", qty: "2 × 0.5 vCPU", cost: "$62" },
  { module: "Stripe Connect", fn: "Escrow, payouts, KYC", source: "Off", process: "API + webhooks", qty: "%-based", cost: "2.9% + 30¢ / txn" },
  { module: "Mapbox GL JS", fn: "Maps + geocoding", source: "Off", process: "JS SDK", qty: "Up to 50k loads/mo", cost: "$0 (free tier)" },
  { module: "Twilio SendGrid", fn: "Transactional email", source: "Off", process: "API", qty: "100k emails/mo", cost: "$20" },
  { module: "Sentry + Datadog", fn: "Errors + APM", source: "Off", process: "SDKs", qty: "1 project", cost: "$45" },
  { module: "GitHub Actions + Terraform", fn: "CI/CD, IaC", source: "Off", process: "YAML + HCL", qty: "Unlimited (public)", cost: "$0" },
  { module: "Domain + TLS", fn: "DNS, SSL", source: "Off", process: "Route53 + ACM", qty: "1 zone", cost: "$2" },
  { module: "Trust score engine", fn: "Combines KYC + history + reviews", source: "Custom", process: "Python service", qty: "1 module", cost: "$0 (own dev)" },
  { module: "CO₂ estimator", fn: "Per-rental sustainability metric", source: "Custom", process: "Lookup + per-cat factor", qty: "1 module", cost: "$0 (own dev)" },
  { module: "Onboarding KYC integration", fn: "ID verification flow", source: "Off", process: "Stripe Identity", qty: "$1.50 / verify", cost: "~$216 @ 144/mo" },
];
