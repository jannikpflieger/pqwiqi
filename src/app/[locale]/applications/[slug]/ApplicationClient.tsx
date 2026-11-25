"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronLeft, ExternalLink, FileText } from "lucide-react";
import wordsCounter from "word-counting";
import {
  applicationCategories,
  type ApplicationItem,
} from "@/app/components/applications/data";
import { EntryBanner, ReadingTimePill } from "@/components/EntryBanner";
import { Card } from "@/components/ui/card";
import { ShareWidget } from "@/components/ShareWidget";
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
  const title = t(`items.${itemKey}`);
  const categoryName = t(`categories.${categoryKey}`);
  const summary = t(`summaries.${itemKey}`);
  // Same rate as Wiqi posts: 200 words per minute, rounded up
  const readingTime = Math.ceil(wordsCounter(summary).wordsCount / 200);

  const cardClass = `group flex items-center gap-4 rounded-xl border border-gray-200 bg-white/80 p-4 backdrop-blur-sm transition-colors hover:shadow-lg dark:border-gray-700 dark:bg-slate-800/80 ${category.hover}`;
  // Sidebar cards use the page's slate dark tones (as cardClass), not the near-black shared --card
  const sidebarDark = "dark:border-gray-700 dark:bg-slate-800/80";
  const hoverSpring = { type: "spring", stiffness: 300, damping: 30 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <EntryBanner badge={t("badge", { category: categoryName })} title={title}>
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

        {/* Three columns on desktop, like Wiqi entries. On mobile: image,
            summary, related articles, then the rest of the category. */}
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-start">
          {/* Left Sidebar: the rest of the category, then related articles */}
          <aside className="order-3 lg:order-none lg:w-64 lg:shrink-0">
            <div className="space-y-4 lg:sticky lg:top-1">
              {category.items.length > 1 && (
                <Card className={`p-4 ${sidebarDark}`}>
                  <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">
                    {categoryName}
                  </h3>
                  <nav className="space-y-1">
                    {category.items.map((item) => {
                      const isCurrent = item.key === itemKey;
                      return (
                        <Link
                          key={item.key}
                          href={`/${locale}/applications/${item.key}`}
                          aria-current={isCurrent ? "page" : undefined}
                          className={`block rounded-md px-3 py-2 text-sm transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-700/70 dark:hover:text-slate-200 ${
                            isCurrent
                              ? "bg-slate-100 font-medium text-slate-900 dark:bg-slate-700/70 dark:text-white"
                              : "text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          {t(`items.${item.key}`)}
                        </Link>
                      );
                    })}
                  </nav>
                </Card>
              )}

              {related.length > 0 && (
                <Card className={`p-4 ${sidebarDark}`}>
                  <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">
                    {t("related")}
                  </h3>
                  <div className="space-y-2">
                    {related.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/${locale}/posts/entries/${difficulty}/${post.slug}`}
                        className="block rounded-md p-3 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700/70 dark:hover:text-slate-200"
                      >
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {post.title}
                        </p>
                        {post.subtitle && (
                          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                            {post.subtitle}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <motion.main
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
            className={`order-2 min-w-0 flex-1 space-y-6 rounded-2xl border p-5 backdrop-blur-sm sm:p-6 lg:order-none ${category.box}`}
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
              <p className={PARAGRAPH_CLASS}>{summary}</p>
            </div>

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
          </motion.main>

          {/* Right Sidebar: exhibition image and sharing */}
          <aside className="order-1 lg:order-none lg:w-64 lg:shrink-0">
            <div className="space-y-4 lg:sticky lg:top-1">
              {image && (
                <Card className={`p-4 ${sidebarDark}`}>
                  <figure className="mx-auto w-48 lg:w-full">
                    <Image
                      src={image.src}
                      alt={t("imageAlt", { title })}
                      width={450}
                      height={824}
                      sizes="(min-width: 1024px) 224px, 192px"
                      className="h-auto w-full"
                    />
                    <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                      {t(`imageCredit.${image.credit}`)}
                    </figcaption>
                  </figure>
                </Card>
              )}
              <div className="hidden lg:block [&>*]:mt-0 dark:[&>*]:border-gray-700 dark:[&>*]:bg-slate-800/80 dark:[&_button]:bg-transparent">
                <ShareWidget
                  currentUrl=""
                  postTitle={title}
                  postSubtitle={categoryName}
                  shareLabel={tPosts("share")}
                  shareHelper={tPosts("shareHelper")}
                />
              </div>
            </div>
          </aside>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          {t("source")}
        </p>
      </section>
    </div>
  );
}
