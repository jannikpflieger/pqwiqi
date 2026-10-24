"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { useAnimation } from "motion/react";
import { Search, Sun } from "lucide-react";
import Image from "next/image";
import { Atom } from "phosphor-react";

import { DarkModeAwareBackground } from "../../components/homepage/DarkModeAwareBackground";
import QuantumMap from "../../components/QuantumMap";

interface HomeProps {
  params: {
    locale: string;
  };
}

export default function Home({ params }: HomeProps) {
  const t = useTranslations("QuantumMap");
  const controls = useAnimation();

  // Animate in on mount
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const wiqiDescriptionLines = t("WiQi Description").split("\n");

  return (
    <div className="relative bg-gradient-to-b from-slate-50 to-white dark:from-black dark:to-slate-900">
      {/*
        One wave background for the whole page, so it sits behind the quantum
        map further down as well as behind the hero. Sections that carry their
        own background colour cover it; the transparent ones — the hero, the
        description and the map itself — let it show through.
        DarkModeAwareBackground swaps the light and dark wave variants by
        watching the document for theme changes.
      */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
        <DarkModeAwareBackground />
      </div>

      {/* Hero Section - Full Width with Animated Background */}
      <section className="relative z-10 w-full overflow-hidden py-28">
        <motion.div
          className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="mx-auto flex flex-col items-center justify-center p-8 text-center md:max-w-3xl">
            <motion.div className="w-full max-w-2xl space-y-8">
              <motion.div variants={itemVariants}>
                <motion.h1
                  className="bg-gradient-to-r from-slate-900 via-pink-800 to-indigo-800 bg-clip-text px-2 pb-3 pt-1 font-serif text-4xl font-bold leading-[1.15] tracking-tight text-transparent dark:from-white dark:via-pink-200 dark:to-indigo-200 md:text-6xl"
                  variants={itemVariants}
                >
                  {t("Title")}
                </motion.h1>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

      </section>

      {/* Description Section */}
      <section className="relative z-10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 text-center"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {t("Description")}
            </p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {t("Project Name")}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {t("Funding")
                .split("**")
                .map((part, index) =>
                  index % 2 === 1 ? (
                    <span key={index} className="font-bold">
                      {part}
                    </span>
                  ) : (
                    part
                  ),
                )}
            </p>
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              WIQI
            </span>{" "}
            {wiqiDescriptionLines.map((line, idx) => (
              <span key={idx} className="text-gray-700 dark:text-gray-300">
                {line}
                {idx < wiqiDescriptionLines.length - 1 && <br />}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Navbar Demo Section */}
      <section className="relative z-10 bg-gray-50 px-4 dark:bg-gray-900 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Mock Navbar - Replica of actual Header */}
            <div className="relative w-full select-none border-b border-slate-200 bg-white/80 backdrop-blur-lg dark:border-slate-800/80 dark:bg-slate-900/80">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo Section - Exact replica */}
                  <div className="flex items-center">
                    <div className="flex items-center space-x-2">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-600 to-pink-500 p-0.5 shadow-lg">
                        <Image
                          src="/static/logos/wiqi/wq.png"
                          alt="WiQi Logo"
                          width={30}
                          height={30}
                          className="h-full w-full rounded-full bg-white object-contain p-0.5 dark:bg-slate-900"
                        />
                      </div>
                      <span className="hidden text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:inline-block">
                        <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                          WiQi
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Search Bar - Exact replica */}
                  <div className="relative hidden w-full max-w-md lg:block">
                    <div className="relative flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800">
                      <Search
                        className="mr-2 h-4 w-4 text-slate-400 dark:text-slate-500"
                        aria-hidden="true"
                      />
                      <input
                        type="search"
                        placeholder="Suchen..."
                        className="h-8 flex-1 border-0 bg-transparent p-0 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
                        disabled
                      />
                    </div>
                  </div>

                  {/* Navigation - Exact replica */}
                  <nav className="hidden space-x-8 lg:flex">
                    <span className="group relative text-sm font-medium text-slate-700 dark:text-slate-300">
                      About
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-600 to-pink-500"></span>
                    </span>
                    <span className="group relative text-sm font-medium text-slate-700 dark:text-slate-300">
                      Quantum Tuesdays
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-600 to-pink-500"></span>
                    </span>
                    <span className="group relative text-sm font-medium text-slate-700 dark:text-slate-300">
                      Entries
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-600 to-pink-500"></span>
                    </span>
                  </nav>

                  {/* Right Side Actions - Exact replica */}
                  <div className="flex items-center space-x-4">
                    {/* Theme Toggle */}
                    <div className="rounded-full p-2 text-slate-700 dark:text-slate-400">
                      <Sun className="h-5 w-5 text-amber-500" />
                    </div>
                    {/* Language Switcher */}
                    <div className="overflow-hidden rounded-full ring-2 ring-white transition-transform duration-200 dark:ring-slate-800">
                      <Image
                        src="/static/flags/de.svg"
                        alt="Deutsch"
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation Text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {t("Map Description")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/*
       * _______ ____  _____   ____
       * |__   __/ __ \|  __ \ / __ \
       *    | | | |  | | |  | | |  | |
       *    | | | |  | | |  | | |  | |
       *    | | | |__| | |__| | |__| |
       *    |_|  \____/|_____/ \____/
       *
       * TODO: Consider using a div 2 screenshot extension to capture
       *       the wiqi.info map and display it here for better
       *       visual representation and user experience.
       *
       * This would allow users to see the actual map layout
       * before interacting with the interactive version below.
       * Also i hate the scaling of the map tbh.
       */}

      {/* Quantum Map Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-96 w-full md:h-[500px] lg:h-[600px]"
          >
            <QuantumMap />
          </motion.div>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="relative z-10 bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {t("Instructions")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* WiQi Logo Location Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <p className="mb-8 text-center text-lg text-gray-700 dark:text-gray-300">
              {t("WiQi Logo Location")}
            </p>

            {/* Placeholder for WiQi Logo Screenshot */}
            <div className="mb-8 flex items-center justify-center rounded-lg bg-gray-200 p-8 dark:bg-gray-800">
              <div className="text-center">
                <span className="text-sm font-bold text-white">
                  <Image
                    src="/static/map/wiqi_icon_button_for_map.svg"
                    alt="Switch Map View"
                    width={64}
                    height={64}
                    className="drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-xl"
                  />
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partner Map Section */}
      <section className="relative z-10 bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <p className="mb-8 text-center text-lg text-gray-700 dark:text-gray-300">
              {t("Partner Map Description")
                .split("**")
                .map((part, index) =>
                  index % 2 === 1 ? (
                    <span key={index} className="font-bold">
                      {part}
                    </span>
                  ) : (
                    part
                  ),
                )}
            </p>
            {/*
                        <div className="mb-8 flex items-center justify-center rounded-lg bg-gray-200 p-8 dark:bg-gray-800">
                            <div className="text-center">
                                <div className="mb-4 grid grid-cols-3 gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded bg-blue-500">
                                        <span className="text-xs font-bold text-white">IQM</span>
                                    </div>
                                    <div className="flex h-16 w-16 items-center justify-center rounded bg-green-500">
                                        <span className="text-xs font-bold text-white">MCQST</span>
                                    </div>
                                    <div className="flex h-16 w-16 items-center justify-center rounded bg-purple-500">
                                        <span className="text-xs font-bold text-white">MPQ</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Screenshot placeholder: Partner map with logos
                                </p>
                            </div>
                        </div>*/}
          </motion.div>
        </div>
      </section>

      {/* Switch Maps Section */}
      {/*
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <p className="mb-8 text-center text-lg text-gray-700 dark:text-gray-300">
              {t("Switch Maps")
                .split("**")
                .map((part, index) =>
                  index % 2 === 1 ? (
                    <span key={index} className="font-bold">
                      {part}
                    </span>
                  ) : (
                    part
                  ),
                )}
            </p>

            <div className="mb-8 flex items-center justify-center rounded-lg bg-gray-200 p-8 dark:bg-gray-800">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-lg bg-black dark:bg-white">
                  <span className="text-2xl text-white dark:text-black">
                    <Atom />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      /*}

      {/* Closing Section */}
      <section className="relative z-10 bg-gradient-to-r from-purple-50 to-pink-50 py-16 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              {t("Closing")}
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
