"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { applicationCategories } from "@/app/components/applications/data";
import ApplicationsHero from "@/app/components/applications/ApplicationsHero";

interface ApplicationClientProps {
  locale: string;
  itemKey: string;
  categoryKey: string;
  number: number;
  url: string;
  difficulty: string;
  related: { slug: string; title: string; subtitle: string }[];
}

export default function ApplicationClient({
  locale,
  itemKey,
  categoryKey,
  number,
  url,
  difficulty,
  related,
}: ApplicationClientProps) {
  const t = useTranslations("Applications");
  const category = applicationCategories.find((c) => c.key === categoryKey)!;
  const Icon = category.icon;

  const cardClass = `group flex items-center gap-4 rounded-xl border border-gray-200 bg-white/80 p-4 backdrop-blur-sm transition-colors hover:shadow-lg dark:border-gray-700 dark:bg-slate-800/80 ${category.hover}`;
  const hoverSpring = { type: "spring", stiffness: 300, damping: 30 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <ApplicationsHero
        icon={<Icon className="h-10 w-10" />}
        title={t(`items.${itemKey}`)}
      >
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 dark:text-gray-200">
          <span>#{String(number).padStart(2, "0")}</span>
          <span>{t(`categories.${categoryKey}`)}</span>
        </div>
      </ApplicationsHero>

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
                      <span className="flex-1">
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
            <span className="flex-1 font-medium text-gray-900 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
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
