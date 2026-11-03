"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Clock, ExternalLink, Layers } from "lucide-react";
// Font Awesome Free icons, licensed CC BY 4.0 (https://fontawesome.com/license/free)
import { FaMagnifyingGlass, FaTableCellsLarge } from "react-icons/fa6";
import { applicationCategories } from "@/app/components/applications/data";

// "Search applications" mark: app grid with a magnifying glass on top
const ApplicationsIcon = () => (
  <span className="relative inline-block h-10 w-10">
    <FaTableCellsLarge className="h-full w-full" />
    <FaMagnifyingGlass className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-indigo-900 p-1 text-pink-300" />
  </span>
);

export default function Page() {
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
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 py-20">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-white/20"
              initial={{
                x:
                  typeof window !== "undefined"
                    ? Math.random() * window.innerWidth
                    : Math.random() * 1200,
                y:
                  typeof window !== "undefined"
                    ? Math.random() * window.innerHeight
                    : Math.random() * 800,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * -200 - 100],
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm"
            >
              <span className="text-white">
                <ApplicationsIcon />
              </span>
            </motion.div>

            <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300 dark:text-gray-100">
              {t("subtitle")}
            </p>

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
          </motion.div>
        </div>
      </section>

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
                    <motion.a
                      key={item.key}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -4 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
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
                      <ExternalLink className="h-4 w-4 flex-shrink-0 text-gray-400 transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400" />
                    </motion.a>
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
