"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
} from "lucide-react";
import wordsCounter from "word-counting";
import {
  applicationCategories,
  type ApplicationItem,
} from "@/app/components/applications/data";
import { EntryBanner, ReadingTimePill } from "@/components/EntryBanner";
import { PARAGRAPH_CLASS } from "@/app/components/about/shared";

interface ApplicationClientProps {
  locale: string;
  itemKey: string;
  categoryKey: string;
  number: number;
  url: string;
  image?: ApplicationItem["image"];
  difficulty: string;
  related: { slug: string; title: string; subtitle: string }[];
}

export default function ApplicationClient({
  locale,
  itemKey,
  categoryKey,
  number,
  url,
  image,
  difficulty,
  related,
}: ApplicationClientProps) {
  const t = useTranslations("Applications");
  const tPosts = useTranslations("Posts");
  const category = applicationCategories.find((c) => c.key === categoryKey)!;
  const Icon = category.icon;
  const summary = t(`summaries.${itemKey}`);
  // Same rate as Wiqi posts: 200 words per minute, rounded up
  const readingTime = Math.ceil(wordsCounter(summary).wordsCount / 200);

  const cardClass = `group flex items-center gap-4 rounded-xl border border-gray-200 bg-white/80 p-4 backdrop-blur-sm transition-colors hover:shadow-lg dark:border-gray-700 dark:bg-slate-800/80 ${category.hover}`;
  const hoverSpring = { type: "spring", stiffness: 300, damping: 30 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <EntryBanner
        badge={t(`categories.${categoryKey}`)}
        title={t(`items.${itemKey}`)}
      >
        <span className="flex items-center gap-1.5">
          <Icon className="h-4 w-4" />#{String(number).padStart(2, "0")}
        </span>
        <span className="text-white/50">•</span>
        <ReadingTimePill>
          {readingTime} {tPosts("min read")}
        </ReadingTimePill>
      </EntryBanner>

      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Back to Applications Button */}
        <div className="mb-6">
          <Link
            href={`/${locale}/applications`}
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <ChevronLeft className="h-4 w-4" />
            {t("back")}
          </Link>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 12 }}
          className={`space-y-8 rounded-2xl border p-5 backdrop-blur-sm sm:p-6 ${category.box}`}
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-sm ${category.iconWrap}`}
              >
                <FileText className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                {t("summaryHeading")}
              </h2>
            </div>
            {image ? (
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <figure className="mx-auto w-48 shrink-0 lg:order-last">
                  <Image
                    src={image.src}
                    alt={t("imageAlt", { title: t(`items.${itemKey}`) })}
                    width={450}
                    height={824}
                    sizes="192px"
                    className="h-auto w-full"
                  />
                  <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                    {t(`imageCredit.${image.credit}`)}
                  </figcaption>
                </figure>
                <p className={`${PARAGRAPH_CLASS} lg:flex-1`}>{summary}</p>
              </div>
            ) : (
              <p className={PARAGRAPH_CLASS}>{summary}</p>
            )}
          </div>

          {related.length > 0 && (
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-sm ${category.iconWrap}`}
                >
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {t("related")}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((post) => (
                  <motion.div
                    key={post.slug}
                    whileHover={{ y: -4 }}
                    transition={hoverSpring}
                  >
                    <Link
                      href={`/${locale}/posts/entries/${difficulty}/${post.slug}`}
                      className={`h-full ${cardClass}`}
                    >
                      <span className="min-w-0 flex-1 hyphens-auto break-words">
                        <span className="block font-medium text-gray-900 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                          {post.title}
                        </span>
                        {post.subtitle && (
                          <span className="mt-1 block text-sm text-gray-500 dark:text-gray-400">
                            {post.subtitle}
                          </span>
                        )}
                      </span>
                      <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400 transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -4 }}
            transition={hoverSpring}
            className={cardClass}
          >
            <span
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white ${category.number}`}
            >
              <ExternalLink className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1 hyphens-auto break-words font-medium text-gray-900 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
              {t("moreDetails")}
            </span>
          </motion.a>
        </motion.div>

        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          {t("source")}
        </p>
      </section>
    </div>
  );
}
