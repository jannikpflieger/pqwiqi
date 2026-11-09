import {
  HeartPulse,
  ShieldCheck,
  Briefcase,
  Globe2,
  Zap,
  Cpu,
  type LucideIcon,
} from "lucide-react";

// `related` lists slugs of Wiqi entries (public/posts/<locale>/<difficulty>/entries).
export interface ApplicationItem {
  key: string;
  url: string;
  related: string[];
}

// Display text lives in hello.json under "Applications.categories" / "Applications.items".
// Tailwind classes are written out in full so the JIT compiler picks them up.
export interface ApplicationCategory {
  key: string;
  icon: LucideIcon;
  box: string;
  iconWrap: string;
  number: string;
  hover: string;
  items: ApplicationItem[];
}

const DM_BASE =
  "https://www.deutsches-museum.de/forschung/forschungsinstitut/projekte";

export const applicationCategories: ApplicationCategory[] = [
  {
    key: "health",
    icon: HeartPulse,
    box: "border-pink-200/70 bg-pink-500/10 dark:border-pink-500/20 dark:bg-pink-400/10",
    iconWrap: "from-pink-500 to-rose-500",
    number: "from-pink-500 to-rose-500",
    hover: "hover:border-pink-300 dark:hover:border-pink-500/50",
    items: [
      {
        key: "prosthesis",
        url: `${DM_BASE}/quantentraeume/prothesensteuerung-durch-quantensensoren`,
        related: ["qsensors", "qmedicine", "spin"],
      },
      {
        key: "cancer",
        url: `${DM_BASE}/quantentraeume/quantenbasierte-krebsfrueherkennung`,
        related: ["qmedicine", "qhyperpolarisation"],
      },
      {
        key: "drugs",
        url: `${DM_BASE}/quantentechnologien-in-der-medikamentenentwicklung`,
        related: ["qmedicine", "qchemistry", "qml", "variationalqeigensolvers"],
      },
      {
        key: "imaging",
        url: `${DM_BASE}/quantenbildgebung`,
        related: ["entanglement", "interference"],
      },
    ],
  },
  {
    key: "communication",
    icon: ShieldCheck,
    box: "border-blue-200/70 bg-blue-500/10 dark:border-blue-500/20 dark:bg-blue-400/10",
    iconWrap: "from-blue-600 to-indigo-600",
    number: "from-blue-600 to-indigo-600",
    hover: "hover:border-blue-300 dark:hover:border-blue-500/50",
    items: [
      {
        key: "cryptography",
        url: `${DM_BASE}/quantentraeume/quantenkryptographie`,
        related: ["noncloning", "measurement", "qkd", "qcommunication"],
      },
      {
        key: "internet",
        url: `${DM_BASE}/quanteninternet`,
        related: [
          "entanglement",
          "noncloning",
          "qteleportation",
          "qcommunication",
        ],
      },
    ],
  },
  {
    key: "business",
    icon: Briefcase,
    box: "border-indigo-200/70 bg-indigo-500/10 dark:border-indigo-500/20 dark:bg-indigo-400/10",
    iconWrap: "from-indigo-500 to-purple-600",
    number: "from-indigo-500 to-purple-600",
    hover: "hover:border-indigo-300 dark:hover:border-indigo-500/50",
    items: [
      {
        key: "logistics",
        url: `${DM_BASE}/quantenoptimierung-in-der-logistik`,
        related: ["scv", "qoptimization", "qtunnelling"],
      },
      {
        key: "finance",
        url: `${DM_BASE}/quantum-finance`,
        related: ["qoptimization", "variationalqeigensolvers"],
      },
    ],
  },
  {
    key: "earth",
    icon: Globe2,
    box: "border-emerald-200/70 bg-emerald-500/10 dark:border-emerald-500/20 dark:bg-emerald-400/10",
    iconWrap: "from-emerald-500 to-teal-500",
    number: "from-emerald-500 to-teal-500",
    hover: "hover:border-emerald-300 dark:hover:border-emerald-500/50",
    items: [
      {
        key: "weather",
        url: `${DM_BASE}/quantentraeume/quantentechnologien-in-der-wettervorhersage`,
        related: ["qsensors", "nisq"],
      },
      {
        key: "navigation",
        url: `${DM_BASE}/quantentraeume/quantennavigation`,
        related: ["qsensors", "scv"],
      },
      {
        key: "gravimeters",
        url: `${DM_BASE}/untergrundanalyse-mit-quanten-gravimetern`,
        related: ["scv", "interference"],
      },
    ],
  },
  {
    key: "energy",
    icon: Zap,
    box: "border-cyan-200/70 bg-cyan-500/10 dark:border-cyan-500/20 dark:bg-cyan-400/10",
    iconWrap: "from-cyan-500 to-sky-500",
    number: "from-cyan-500 to-sky-500",
    hover: "hover:border-cyan-300 dark:hover:border-cyan-500/50",
    items: [
      {
        key: "batteries",
        url: `${DM_BASE}/quantenakkus`,
        related: ["qsuperabsorption", "entanglement"],
      },
      {
        key: "catalysis",
        url: `${DM_BASE}/quantenkatalyse`,
        related: ["qchemistry", "scv", "variationalqeigensolvers"],
      },
      { key: "dots", url: `${DM_BASE}/quantendots`, related: ["spin"] },
    ],
  },
  {
    key: "computing",
    icon: Cpu,
    box: "border-purple-200/70 bg-purple-500/10 dark:border-purple-500/20 dark:bg-purple-400/10",
    iconWrap: "from-purple-600 to-pink-500",
    number: "from-purple-600 to-pink-500",
    hover: "hover:border-purple-300 dark:hover:border-purple-500/50",
    items: [
      {
        key: "ai",
        url: `${DM_BASE}/quanten-und-kuenstliche-intelligenz`,
        related: ["scv", "algorithms", "qml", "nisq"],
      },
      {
        key: "transistors",
        url: `${DM_BASE}/quantentraeume/ein-atom-transistoren`,
        related: [],
      },
    ],
  },
];

// Items numbered 1..n continuously across categories, as shown on the overview
export const applicationItems = applicationCategories
  .flatMap((category) => category.items.map((item) => ({ ...item, category })))
  .map((item, index) => ({ ...item, number: index + 1 }));
