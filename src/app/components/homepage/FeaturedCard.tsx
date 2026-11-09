"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import enCards from "./data/en/cards.json";
import deCards from "./data/de/cards.json";

type Kind = "quantum_tuesdays" | "entries" | "alphabet";

/** Display order. Quantum Tuesdays is always first. */
const KINDS: Kind[] = ["quantum_tuesdays", "entries", "alphabet"];

/** The curated Quantum Tuesday this card has always opened on. */
const PINNED_TUESDAY_ID = "bits-to-qubits";

/** The entry the carousel opens on. Falls back to the first with an image. */
const PINNED_ENTRY = "entanglement";

const KIND_LABEL: Record<Kind, { en: string; de: string }> = {
  quantum_tuesdays: { en: "Quantum Tuesdays", de: "Quantendienstage" },
  entries: { en: "Quantum Entries", de: "Quanteneinträge" },
  alphabet: { en: "Quantum Alphabet", de: "Quantenalphabet" },
};

/** One colour per kind, so the tag is recognisable at a glance. */
const KIND_STYLE: Record<Kind, string> = {
  quantum_tuesdays:
    "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/30",
  entries:
    "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/30",
  alphabet:
    "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/30",
};

const COPY = {
  en: { difficulty: "Difficulty", cta: "Read this one", prev: "Previous", next: "Next", beginner: "Beginner", read: "min read" },
  de: { difficulty: "Niveau", cta: "Weiterlesen", prev: "Zurück", next: "Weiter", beginner: "Einsteiger", read: "Min. Lesezeit" },
};

interface CuratedCard {
  id: string;
  title: string;
  description: string;
  additionalInfo: string;
  ctaText: string;
  imageSrc: string;
  imageAlt: string;
  imageCaption: string;
  difficulty: string;
  readTime: string;
  endpoint: string;
}

interface Slide {
  kind: Kind;
  title: string;
  description: string;
  additionalInfo: string;
  ctaText: string;
  href: string;
  image: string | null;
  imageAlt: string;
  imageCaption: string;
  difficulty: string;
  readTime: string;
}

interface ApiFile {
  metadata?: Record<string, string>;
  slug: string;
  content?: string;
}

/**
 * Pulls the first markdown image out of an article body. Only absolute paths
 * are accepted: a handful of articles write a bare `images/…`, which does not
 * resolve from /public and would render broken.
 */
function firstImage(content?: string): { src: string; alt: string } | null {
  if (!content) return null;
  const match = content.match(/!\[([^\]]*)\]\((\/[^)\s]+)\)/);
  return match ? { src: match[2], alt: match[1] } : null;
}

/**
 * The first few prose paragraphs of an article body, so a card can describe
 * the piece in its own words rather than repeating a frontmatter label.
 * Headings, images, lists, quotes, code and display maths are skipped, and
 * inline markdown is stripped so it does not show as literal characters.
 */
function prose(content: string | undefined, count: number): string[] {
  if (!content) return [];
  const out: string[] = [];
  for (const block of content.split(/\n\s*\n/)) {
    const text = block.trim().replace(/\s+/g, " ");
    if (!text) continue;
    if (/^(#{1,6}\s|!\[|>|\||[-*+]\s|\d+\.\s|```|\$\$|<)/.test(text)) continue;
    const clean = text
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();
    if (clean.length < 40) continue;
    out.push(
      clean.length > 260
        ? clean.slice(0, 257).replace(/\s+\S*$/, "") + "\u2026"
        : clean,
    );
    if (out.length === count) break;
  }
  return out;
}

function readingTime(content: string | undefined, lang: "en" | "de"): string {
  const words = (content ?? "").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} ${COPY[lang].read}`;
}

/** The pinned Quantum Tuesday, rendered exactly as it was curated. */
function curatedSlide(lang: "en" | "de", locale: string): Slide | null {
  const cards = (lang === "de" ? deCards : enCards) as CuratedCard[];
  const card = cards.find((c) => c.id === PINNED_TUESDAY_ID);
  if (!card) return null;
  return {
    kind: "quantum_tuesdays",
    title: card.title,
    description: card.description,
    additionalInfo: card.additionalInfo,
    ctaText: card.ctaText,
    href: `/${locale}/posts/quantum_tuesdays/elementary/${card.endpoint}`,
    image: card.imageSrc,
    imageAlt: card.imageAlt,
    imageCaption: card.imageCaption,
    difficulty: card.difficulty,
    readTime: card.readTime,
  };
}

function apiSlide(
  kind: Kind,
  file: ApiFile,
  lang: "en" | "de",
  locale: string,
): Slide {
  const img = firstImage(file.content);
  const title = file.metadata?.title ?? file.slug;
  const isAlphabet = kind === "alphabet";
  const paras = prose(file.content, isAlphabet ? 1 : 2);
  return {
    kind,
    title,
    description: paras[0] ?? file.metadata?.subtitle ?? "",
    additionalInfo: paras[1] ?? "",
    ctaText: COPY[lang].cta,
    href: isAlphabet
      ? `/${locale}/posts/alphabet`
      : `/${locale}/posts/${kind}/elementary/${encodeURIComponent(file.slug)}`,
    image: img?.src ?? null,
    imageAlt: img?.alt || title,
    imageCaption: img?.alt || "",
    // A glossary term has no level and is a paragraph long, so a difficulty
    // badge and a reading time would both be noise.
    difficulty: isAlphabet ? "" : COPY[lang].beginner,
    readTime: isAlphabet ? "" : readingTime(file.content, lang),
  };
}

/**
 * One slide per kind, chosen deterministically so the card shows the same
 * three things on every load. Quantum Tuesdays is the curated Bits To Qubits
 * card; the entry is the first carrying a usable image; the alphabet takes
 * its first term.
 */
async function fetchRest(locale: string, lang: "en" | "de"): Promise<Slide[]> {
  const requests = KINDS.filter((k) => k !== "quantum_tuesdays").map(async (kind) => {
    const body =
      kind === "alphabet"
        ? { folder: ["alphabet"], language: locale }
        : { folder: [kind], language: locale, difficulty: "elementary" };

    try {
      const res = await fetch("/api/getBlogPosts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) return null;

      const data = await res.json();
      const files: ApiFile[] = (data.files ?? [])
        .slice()
        .sort((a: ApiFile, b: ApiFile) => a.slug.localeCompare(b.slug));
      if (files.length === 0) return null;

      if (kind === "entries") {
        const pinned = files.find(
          (f) => f.slug === PINNED_ENTRY && firstImage(f.content) !== null,
        );
        const chosen =
          pinned ?? files.find((f) => firstImage(f.content) !== null);
        return chosen ? apiSlide(kind, chosen, lang, locale) : null;
      }
      return apiSlide(kind, files[0], lang, locale);
    } catch {
      return null;
    }
  });

  const results = await Promise.all(requests);
  return results.filter((s): s is Slide => s !== null);
}

export default function FeaturedCard({ locale }: { locale: string }) {
  const lang: "en" | "de" = locale === "de" ? "de" : "en";
  // The curated slide comes from a static import, so it can paint on the
  // first render. The other two need the API and are appended when they
  // arrive, rather than holding the whole card back until they do.
  const [slides, setSlides] = useState<Slide[]>(() => {
    const first = curatedSlide(lang, locale);
    return first ? [first] : [];
  });
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    let cancelled = false;
    const first = curatedSlide(lang, locale);
    setSlides(first ? [first] : []);
    setIndex(0);
    fetchRest(locale, lang).then((rest) => {
      if (cancelled) return;
      setSlides(first ? [first, ...rest] : rest);
    });
    return () => {
      cancelled = true;
    };
  }, [locale, lang]);

  // index may run past the ends; safeIndex wraps it.
  const go = useCallback((step: number) => {
    setDirection(step);
    setIndex((i) => i + step);
  }, []);

  if (slides.length === 0) return null;

  const safeIndex = ((index % slides.length) + slides.length) % slides.length;
  const slide = slides[safeIndex];

  // Alternating tilt, driven by the running index rather than the wrapped
  // one, so the lean keeps flipping across the wrap: coming back round to the
  // first slide leans the other way instead of resetting to the right.
  const parity = ((index % 2) + 2) % 2;
  const tilt = parity === 0 ? 2 : -1;
  const tiltSpring = { type: "spring" as const, stiffness: 220, damping: 22 };

  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5"
        animate={{ rotate: -tilt }}
        transition={tiltSpring}
      />

      <motion.div
        className="relative rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-slate-800"
        animate={{ rotate: tilt }}
        transition={tiltSpring}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.href}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            initial={{ opacity: 0, x: direction > 0 ? 48 : -48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -48 : 48 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="cursor-grab active:cursor-grabbing"
          >
            <Badge className={`mb-6 ${KIND_STYLE[slide.kind]}`}>
              {KIND_LABEL[slide.kind][lang]}
            </Badge>

            <div className="space-y-4">
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                {slide.title}
              </h3>

              {slide.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {slide.description}
                </p>
              )}

              {slide.additionalInfo && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {slide.additionalInfo}
                </p>
              )}

              <Link
                href={slide.href}
                draggable={false}
                className="mt-3 flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              {slide.image && (
                <div className="flex justify-center p-2">
                  <Link
                    href={slide.href}
                    draggable={false}
                    className="relative h-48 w-full overflow-hidden rounded-lg"
                  >
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-all hover:scale-105"
                      draggable={false}
                    />
                    {slide.imageCaption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                        <p className="text-sm font-medium text-white">
                          {slide.imageCaption}
                        </p>
                      </div>
                    )}
                  </Link>
                </div>
              )}

              {(slide.difficulty || slide.readTime) && (
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {slide.difficulty && `${COPY[lang].difficulty}: ${slide.difficulty}`}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {slide.readTime}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel controls */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.kind}
                type="button"
                onClick={() => {
                  const delta = i - safeIndex;
                  if (delta === 0) return;
                  setDirection(delta > 0 ? 1 : -1);
                  setIndex((cur) => cur + delta);
                }}
                aria-label={KIND_LABEL[s.kind][lang]}
                aria-current={i === safeIndex ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all ${
                  i === safeIndex
                    ? "w-5 bg-gray-700 dark:bg-gray-200"
                    : "w-1.5 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={COPY[lang].prev}
              className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-slate-700 dark:hover:text-gray-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={COPY[lang].next}
              className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-slate-700 dark:hover:text-gray-200"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
