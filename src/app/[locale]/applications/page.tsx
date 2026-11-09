"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChevronRight, Clock, Layers } from "lucide-react";
// Font Awesome Free icons, licensed CC BY 4.0 (https://fontawesome.com/license/free)
import { FaMagnifyingGlass, FaTableCellsLarge } from "react-icons/fa6";
import { applicationCategories } from "@/app/components/applications/data";
import ApplicationsHero from "@/app/components/applications/ApplicationsHero";

// "Search applications" mark: app grid with a magnifying glass on top
const ApplicationsIcon = () => (
  <span className="relative inline-block h-10 w-10">
    <FaTableCellsLarge className="h-full w-full" />
    <FaMagnifyingGlass className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-indigo-900 p-1 text-pink-300" />
  </span>
);

export default function Page({ params }: { params: { locale: string } }) {
  const t = useTranslations("Applications");

  // Number items 1..n continuously across categories
  let counter = 0;
  const categories = applicationCategories.map((category) => ({
    ...category,
    items: category.items.map((item) => ({ ...item, number: ++counter })),
  }));
  const totalItems = counter;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <ApplicationsHero
        icon={<ApplicationsIcon />}
        title={t("title")}
        subtitle={t("subtitle")}
      >
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 dark:text-gray-200">
          <div className="flex items-center gap-2">
            <span>
              {totalItems} {t("count")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{t("readTime")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>
              {categories.length} {t("categoriesLabel")}
            </span>
          </div>
        </div>
      </ApplicationsHero>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.key}
                variants={itemVariants}
                className={`rounded-2xl border p-5 backdrop-blur-sm sm:p-6 ${category.box}`}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-sm ${category.iconWrap}`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {t(`categories.${category.key}`)}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((item) => (
                    <motion.div
                      key={item.key}
                      whileHover={{ y: -4 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <Link
                        href={`/${params.locale}/applications/${item.key}`}
                        className={`group flex items-center gap-4 rounded-xl border border-gray-200 bg-white/80 p-4 backdrop-blur-sm transition-colors hover:shadow-lg dark:border-gray-700 dark:bg-slate-800/80 ${category.hover}`}
                      >
                        <span
                          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-lg font-bold text-white ${category.number}`}
                        >
                          {item.number}
                        </span>
                        <span className="flex-1 font-medium text-gray-900 transition-colors group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                          {t(`items.${item.key}`)}
                        </span>
                        <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400 transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          {t("source")}
        </p>
      </section>
    </div>
  );
}
