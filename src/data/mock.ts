export type Category =
  | "camping"
  | "hiking"
  | "climbing"
  | "water"
  | "winter"
  | "cycling";

export type Condition = "New" | "Like New" | "Good" | "Fair";

export type Owner = {
  id: string;
  name: string;
  initials: string;
  joined: string;
  responseRate: number;
  responseTime: string;
  verified: { email: boolean; id: boolean; phone: boolean };
  rating: number;
  reviews: number;
  bio: string;
  city: string;
  avatarGradient: string;
  itemsListed: number;
  rentalsCompleted: number;
  co2Saved: number;
};

export type Review = {
  id: string;
  reviewer: string;
  initials: string;
  date: string;
  rating: number;
  comment: string;
  avatarGradient: string;
};

export type Listing = {
  id: string;
  title: string;
  category: Category;
  condition: Condition;
  brand: string;
  model: string;
  weight: string;
  capacity: string;
  seasonRating: string;
  description: string;
  dailyPrice: number;
  weeklyPrice: number;
  ownerId: string;
  city: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  images: string[];
  thumbBg: string;
  iconKey: IconKey;
  reviews: Review[];
  highlights: string[];
};

export type IconKey =
  | "tent"
  | "backpack"
  | "rope"
  | "kayak"
  | "ski"
  | "bike"
  | "stove"
  | "sleep";

export const categories: {
  key: Category;
  label: string;
  icon: IconKey;
  hue: string;
}[] = [
  { key: "camping", label: "Camping", icon: "tent", hue: "from-emerald-400 to-emerald-600" },
  { key: "hiking", label: "Hiking", icon: "backpack", hue: "from-amber-400 to-orange-500" },
  { key: "climbing", label: "Climbing", icon: "rope", hue: "from-rose-400 to-rose-600" },
  { key: "water", label: "Water Sports", icon: "kayak", hue: "from-sky-400 to-blue-600" },
  { key: "winter", label: "Winter Sports", icon: "ski", hue: "from-cyan-300 to-indigo-500" },
  { key: "cycling", label: "Cycling", icon: "bike", hue: "from-lime-400 to-green-600" },
];

export const owners: Record<string, Owner> = {
  "u-001": {
    id: "u-001",
    name: "Maya Patel",
    initials: "MP",
    joined: "Mar 2024",
    responseRate: 98,
    responseTime: "within 1 hour",
    verified: { email: true, id: true, phone: true },
    rating: 4.92,
    reviews: 47,
    bio: "Weekend backpacker. I keep my gear meticulously maintained — happy to share tips on the best trails near Boulder.",
    city: "Boulder, CO",
    avatarGradient: "from-fuchsia-400 to-purple-600",
    itemsListed: 6,
    rentalsCompleted: 38,
    co2Saved: 142,
  },
  "u-002": {
    id: "u-002",
    name: "Daniel Reyes",
    initials: "DR",
    joined: "Jan 2025",
    responseRate: 100,
    responseTime: "within 30 minutes",
    verified: { email: true, id: true, phone: true },
    rating: 4.87,
    reviews: 23,
    bio: "Climber & alpinist. Most of my rack is well-loved but inspected after every trip.",
    city: "Boulder, CO",
    avatarGradient: "from-blue-400 to-indigo-600",
    itemsListed: 9,
    rentalsCompleted: 21,
    co2Saved: 78,
  },
  "u-003": {
    id: "u-003",
    name: "Aisha Khan",
    initials: "AK",
    joined: "Sep 2024",
    responseRate: 96,
    responseTime: "within 2 hours",
    verified: { email: true, id: true, phone: false },
    rating: 4.78,
    reviews: 18,
    bio: "Paddleboard instructor. Will throw in a free dry-bag with any rental.",
    city: "Lyons, CO",
    avatarGradient: "from-teal-400 to-cyan-600",
    itemsListed: 4,
    rentalsCompleted: 15,
    co2Saved: 51,
  },
  "u-004": {
    id: "u-004",
    name: "Ravi Menon",
    initials: "RM",
    joined: "Nov 2023",
    responseRate: 99,
    responseTime: "within 1 hour",
    verified: { email: true, id: true, phone: true },
    rating: 4.95,
    reviews: 62,
    bio: "Ski patrol off-season. All bindings shop-tuned.",
    city: "Estes Park, CO",
    avatarGradient: "from-amber-400 to-rose-500",
    itemsListed: 11,
    rentalsCompleted: 54,
    co2Saved: 198,
  },
  me: {
    id: "me",
    name: "Ashish Cheruku",
    initials: "AC",
    joined: "Apr 2026",
    responseRate: 100,
    responseTime: "within 15 minutes",
    verified: { email: true, id: false, phone: false },
    rating: 5.0,
    reviews: 3,
    bio: "Engineering student exploring weekend trips around Pilani. Looking forward to sharing my own gear soon.",
    city: "Pilani, RJ",
    avatarGradient: "from-amber-400 to-orange-500",
    itemsListed: 1,
    rentalsCompleted: 4,
    co2Saved: 18,
  },
};

const sampleReviewsA: Review[] = [
  {
    id: "r1",
    reviewer: "Priya S.",
    initials: "PS",
    date: "Mar 14, 2026",
    rating: 5,
    comment:
      "Tent was spotless and pitched easily. Maya even threw in a footprint — saved us in the rain on night 2!",
    avatarGradient: "from-pink-400 to-rose-600",
  },
  {
    id: "r2",
    reviewer: "Jordan T.",
    initials: "JT",
    date: "Feb 27, 2026",
    rating: 5,
    comment:
      "Pickup was 2 minutes from the trailhead. Honest condition photos — exactly as described.",
    avatarGradient: "from-sky-400 to-blue-600",
  },
  {
    id: "r3",
    reviewer: "Hana M.",
    initials: "HM",
    date: "Feb 11, 2026",
    rating: 4,
    comment:
      "Great gear. Took off one star only because the stuff sack zipper sticks a bit. Would rent again.",
    avatarGradient: "from-emerald-400 to-teal-600",
  },
];

const sampleReviewsB: Review[] = [
  {
    id: "r1",
    reviewer: "Chris W.",
    initials: "CW",
    date: "Apr 02, 2026",
    rating: 5,
    comment: "Rope was practically new. Daniel walked me through the inspection process — super reassuring.",
    avatarGradient: "from-violet-400 to-fuchsia-600",
  },
  {
    id: "r2",
    reviewer: "Lena K.",
    initials: "LK",
    date: "Mar 20, 2026",
    rating: 5,
    comment: "Excellent communication. Showed up with a clean rope bag and a printed log.",
    avatarGradient: "from-amber-400 to-orange-600",
  },
];

export const listings: Listing[] = [
  {
    id: "l-001",
    title: "REI Co-op Half Dome 2+ Tent",
    category: "camping",
    condition: "Like New",
    brand: "REI Co-op",
    model: "Half Dome 2+",
    weight: "2.5 kg",
    capacity: "2 person",
    seasonRating: "3-Season",
    description:
      "Spacious 2-person backpacking tent with two doors and vestibules. Color-coded poles for fast pitching. Includes footprint, stuff sack and stake bag. Inspected and seam-sealed before every rental.",
    dailyPrice: 18,
    weeklyPrice: 99,
    ownerId: "u-001",
    city: "Boulder, CO",
    distanceKm: 3.2,
    rating: 4.9,
    reviewCount: 47,
    thumbBg:
      "linear-gradient(135deg,#10b981 0%,#059669 60%,#065f46 100%)",
    images: [],
    iconKey: "tent",
    reviews: sampleReviewsA,
    highlights: [
      "Pitches in under 4 minutes",
      "Footprint included",
      "Inspected after every rental",
    ],
  },
  {
    id: "l-002",
    title: "Osprey Atmos AG 65 Backpack",
    category: "hiking",
    condition: "Good",
    brand: "Osprey",
    model: "Atmos AG 65",
    weight: "2.04 kg",
    capacity: "65 L",
    seasonRating: "All-Season",
    description:
      "Anti-Gravity suspended mesh backpanel. Stayed dry through three weeks of the JMT. Sized M; adjustable torso. Rain cover and hip-belt pockets included.",
    dailyPrice: 12,
    weeklyPrice: 65,
    ownerId: "u-001",
    city: "Boulder, CO",
    distanceKm: 3.2,
    rating: 4.8,
    reviewCount: 32,
    thumbBg:
      "linear-gradient(135deg,#f59e0b 0%,#d97706 50%,#92400e 100%)",
    images: [],
    iconKey: "backpack",
    reviews: sampleReviewsA,
    highlights: ["Rain cover included", "Sized M (adjustable torso)"],
  },
  {
    id: "l-003",
    title: "Petzl Volta 9.2 Climbing Rope (60m)",
    category: "climbing",
    condition: "Like New",
    brand: "Petzl",
    model: "Volta 9.2",
    weight: "3.7 kg",
    capacity: "60 m",
    seasonRating: "All-Season",
    description:
      "Lightweight single rope rated for sport, multi-pitch and alpine. Logged 14 pitches. Comes with rope bag and printed inspection log.",
    dailyPrice: 22,
    weeklyPrice: 120,
    ownerId: "u-002",
    city: "Boulder, CO",
    distanceKm: 5.6,
    rating: 4.95,
    reviewCount: 23,
    thumbBg:
      "linear-gradient(135deg,#fb7185 0%,#e11d48 60%,#9f1239 100%)",
    images: [],
    iconKey: "rope",
    reviews: sampleReviewsB,
    highlights: ["Inspection log included", "Rope bag + tarp"],
  },
  {
    id: "l-004",
    title: "BOTE Breeze Aero Inflatable SUP",
    category: "water",
    condition: "Good",
    brand: "BOTE",
    model: "Breeze Aero 11'6\"",
    weight: "10.4 kg",
    capacity: "Up to 113 kg",
    seasonRating: "Spring–Fall",
    description:
      "Inflatable stand-up paddleboard, perfect for lakes and slow rivers. Pump, paddle, leash and dry-bag included. Packs to backpack size in under 5 minutes.",
    dailyPrice: 35,
    weeklyPrice: 195,
    ownerId: "u-003",
    city: "Lyons, CO",
    distanceKm: 14.3,
    rating: 4.7,
    reviewCount: 18,
    thumbBg:
      "linear-gradient(135deg,#38bdf8 0%,#0ea5e9 55%,#0c4a6e 100%)",
    images: [],
    iconKey: "kayak",
    reviews: sampleReviewsB,
    highlights: ["Pump + paddle + leash", "Free dry-bag"],
  },
  {
    id: "l-005",
    title: "Black Diamond Vertex Crampons",
    category: "winter",
    condition: "Good",
    brand: "Black Diamond",
    model: "Vertex",
    weight: "0.85 kg",
    capacity: "Universal",
    seasonRating: "Winter",
    description:
      "12-point steel crampons, semi-auto bindings. Resharpened this season. Recommended for B2/B3 boots.",
    dailyPrice: 14,
    weeklyPrice: 78,
    ownerId: "u-004",
    city: "Estes Park, CO",
    distanceKm: 38.1,
    rating: 4.9,
    reviewCount: 27,
    thumbBg:
      "linear-gradient(135deg,#67e8f9 0%,#0891b2 50%,#312e81 100%)",
    images: [],
    iconKey: "ski",
    reviews: sampleReviewsB,
    highlights: ["Resharpened", "Carry case included"],
  },
  {
    id: "l-006",
    title: "Specialized Rockhopper 29 MTB",
    category: "cycling",
    condition: "Good",
    brand: "Specialized",
    model: "Rockhopper Sport 29",
    weight: "13.6 kg",
    capacity: "Frame M (5'7\"–5'11\")",
    seasonRating: "All-Season",
    description:
      "Hardtail mountain bike with hydraulic disc brakes and 1x10 drivetrain. Recently serviced — new chain and brake pads.",
    dailyPrice: 28,
    weeklyPrice: 159,
    ownerId: "u-004",
    city: "Estes Park, CO",
    distanceKm: 38.1,
    rating: 4.85,
    reviewCount: 35,
    thumbBg:
      "linear-gradient(135deg,#a3e635 0%,#65a30d 55%,#14532d 100%)",
    images: [],
    iconKey: "bike",
    reviews: sampleReviewsA,
    highlights: ["New chain & pads", "Helmet included"],
  },
  {
    id: "l-007",
    title: "MSR PocketRocket 2 Stove + Pot Set",
    category: "camping",
    condition: "Like New",
    brand: "MSR",
    model: "PocketRocket 2",
    weight: "0.34 kg",
    capacity: "1–2 person",
    seasonRating: "3-Season",
    description:
      "Ultralight canister stove with 1.3L pot, lid, mug and folding spork. Boils 0.5L in ~3:30. Fuel canister not included.",
    dailyPrice: 7,
    weeklyPrice: 36,
    ownerId: "u-001",
    city: "Boulder, CO",
    distanceKm: 3.2,
    rating: 4.9,
    reviewCount: 21,
    thumbBg:
      "linear-gradient(135deg,#f97316 0%,#ea580c 55%,#7c2d12 100%)",
    images: [],
    iconKey: "stove",
    reviews: sampleReviewsA,
    highlights: ["Pot + mug + spork", "Boils 0.5L in 3:30"],
  },
  {
    id: "l-008",
    title: "NEMO Disco 15 Down Sleeping Bag",
    category: "camping",
    condition: "Like New",
    brand: "NEMO",
    model: "Disco 15",
    weight: "1.04 kg",
    capacity: "Regular (up to 6')",
    seasonRating: "3-Season (15°F)",
    description:
      "Spoon-shaped down bag with thermo gills for ventilation. Always stored uncompressed. Liner available on request.",
    dailyPrice: 16,
    weeklyPrice: 88,
    ownerId: "u-002",
    city: "Boulder, CO",
    distanceKm: 5.6,
    rating: 4.8,
    reviewCount: 19,
    thumbBg:
      "linear-gradient(135deg,#a78bfa 0%,#7c3aed 55%,#312e81 100%)",
    images: [],
    iconKey: "sleep",
    reviews: sampleReviewsB,
    highlights: ["Stored uncompressed", "Liner on request"],
  },
];

export const findListing = (id: string) => listings.find((l) => l.id === id);

export type Booking = {
  id: string;
  listingId: string;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "active" | "completed" | "cancelled";
  partyName: string;
  partyInitials: string;
  partyGradient: string;
  totalPrice: number;
  asRole: "explorer" | "owner";
};

export const myBookings: Booking[] = [
  {
    id: "ECR-20260512-0042",
    listingId: "l-001",
    startDate: "May 12, 2026",
    endDate: "May 14, 2026",
    status: "approved",
    partyName: "Maya Patel",
    partyInitials: "MP",
    partyGradient: "from-fuchsia-400 to-purple-600",
    totalPrice: 41.4,
    asRole: "explorer",
  },
  {
    id: "ECR-20260518-0103",
    listingId: "l-004",
    startDate: "May 18, 2026",
    endDate: "May 19, 2026",
    status: "pending",
    partyName: "Aisha Khan",
    partyInitials: "AK",
    partyGradient: "from-teal-400 to-cyan-600",
    totalPrice: 38.5,
    asRole: "explorer",
  },
  {
    id: "ECR-20260424-0091",
    listingId: "l-007",
    startDate: "Apr 24, 2026",
    endDate: "Apr 26, 2026",
    status: "completed",
    partyName: "Maya Patel",
    partyInitials: "MP",
    partyGradient: "from-fuchsia-400 to-purple-600",
    totalPrice: 16.1,
    asRole: "explorer",
  },
  {
    id: "ECR-20260601-0211",
    listingId: "l-006",
    startDate: "Jun 01, 2026",
    endDate: "Jun 03, 2026",
    status: "active",
    partyName: "Ravi Menon",
    partyInitials: "RM",
    partyGradient: "from-amber-400 to-rose-500",
    totalPrice: 64.4,
    asRole: "explorer",
  },
];

export type Conversation = {
  id: string;
  withName: string;
  withInitials: string;
  gradient: string;
  preview: string;
  time: string;
  unread: number;
  thread: { from: "me" | "them"; text: string; time: string }[];
};

export const conversations: Conversation[] = [
  {
    id: "c-1",
    withName: "Maya Patel",
    withInitials: "MP",
    gradient: "from-fuchsia-400 to-purple-600",
    preview: "Sounds good — see you Saturday at 9am at the trailhead!",
    time: "2h",
    unread: 0,
    thread: [
      { from: "them", text: "Hey! Welcome to EcoRent. Pickup is just off Boulder Canyon Drive.", time: "Yesterday 6:14 PM" },
      { from: "me", text: "Perfect. Is 9am Saturday okay? I’ll be in a blue Tata Nexon.", time: "Yesterday 6:42 PM" },
      { from: "them", text: "Sounds good — see you Saturday at 9am at the trailhead!", time: "2h ago" },
    ],
  },
  {
    id: "c-2",
    withName: "Aisha Khan",
    withInitials: "AK",
    gradient: "from-teal-400 to-cyan-600",
    preview: "Yes, the SUP comes with a leash and dry bag.",
    time: "1d",
    unread: 1,
    thread: [
      { from: "me", text: "Hi! Does the SUP come with a leash?", time: "Yesterday 11:02 AM" },
      { from: "them", text: "Yes, the SUP comes with a leash and dry bag.", time: "Yesterday 11:10 AM" },
    ],
  },
  {
    id: "c-3",
    withName: "Ravi Menon",
    withInitials: "RM",
    gradient: "from-amber-400 to-rose-500",
    preview: "Bike’s tuned and ready. Helmet is in the trunk pouch.",
    time: "3d",
    unread: 0,
    thread: [
      { from: "them", text: "Bike’s tuned and ready. Helmet is in the trunk pouch.", time: "3 days ago" },
    ],
  },
];
