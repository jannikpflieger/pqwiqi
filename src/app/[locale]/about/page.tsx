"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  QuantumField,
  Section,
  Item,
  Heading,
  PARAGRAPH_CLASS,
  LINK_CLASS,
  extLink,
  inLink,
} from "@/app/components/about/shared";

export default function AboutPage() {
  const t = useTranslations("About Us");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  /**
   * A slow outward pulse for the decorative rings. The three rings share one
   * cycle and are offset by `delay`, innermost first, so they read as a
   * single ripple travelling outward rather than three separate throbs.
   * Returns nothing when the visitor asks for reduced motion.
   */
  const ripple = (delay: number) =>
    reduceMotion
      ? {}
      : {
          animate: { scale: [1, 1.12, 1], opacity: [0.3, 1, 0.3] },
          transition: {
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            delay,
            ease: "easeInOut" as const,
          },
        };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-blue-100 text-slate-900 dark:from-slate-900 dark:to-indigo-950 dark:text-white">
      {/* Quantum-inspired decorative elements */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-300/20 via-white/0 to-transparent dark:from-indigo-900/20 dark:via-slate-900/0 dark:to-transparent"></div>
        <QuantumField />
      </div>

      {/* Hero — py-20 with no minimum height, matching the posts pages */}
      <section className="relative z-10 overflow-hidden px-4 py-28 text-center sm:px-6 lg:px-8">
        {/*
          Decorative orbit. Sized as a square whose side is a share of the
          hero's own height, so the circles always sit inside the section
          instead of being clipped by it.
        */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square h-[86%] -translate-x-1/2 -translate-y-1/2 opacity-50">
          <motion.div
            className="absolute inset-0 m-auto h-[40%] w-[40%] rounded-full border border-blue-600/40 dark:border-blue-300/50"
            {...ripple(0)}
          />
          <motion.div
            className="absolute inset-0 m-auto h-[70%] w-[70%] rounded-full border border-indigo-600/40 dark:border-indigo-300/50"
            {...ripple(0.6)}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-pink-600/40 dark:border-pink-300/50"
            {...ripple(1.2)}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-4xl"
        >
          <h1 className="mb-4 bg-gradient-to-r from-slate-900 via-pink-800 to-indigo-800 bg-clip-text px-2 pb-3 pt-1 font-serif text-4xl font-bold leading-[1.15] tracking-tight text-transparent dark:from-white dark:via-pink-200 dark:to-indigo-200 md:text-6xl">
            {t("motivation title")}
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-slate-700 dark:text-indigo-200 sm:text-xl">
            {t("motivation subtitle")}
          </p>
        </motion.div>
      </section>

      <main className="relative z-10 pb-24">
        {/* 1. What is WiQi? */}
        <Section id="what-is-wiqi">
          <Item>
            <Heading>{t("s1 heading")}</Heading>
          </Item>
          <div className="space-y-5">
            <Item>
              <p className={PARAGRAPH_CLASS}>{t("s1 p1")}</p>
            </Item>
            <Item>
              <p className={PARAGRAPH_CLASS}>{t("s1 p2")}</p>
            </Item>
            <Item>
              <p className={PARAGRAPH_CLASS}>{t("s1 p3")}</p>
            </Item>
            <Item>
              <p className={PARAGRAPH_CLASS}>
                {t.rich("s1 p4", {
                  entries: inLink(`/${locale}/posts/entries`),
                  tuesdays: inLink(`/${locale}/posts/entries`),
                  alphabet: inLink(`/${locale}/posts/alphabet`),
                  i: (chunks) => <em>{chunks}</em>,
                })}
              </p>
            </Item>
          </div>
        </Section>

        {/* 2. Part of Quanten(t)räume */}
        <Section id="quantentraeume">
          <Item>
            <Heading>{t("s2 heading")}</Heading>
          </Item>
          <div className="space-y-5">
            <Item>
              <p className={PARAGRAPH_CLASS}>
                {t.rich("s2 p1", {
                  qtr: inLink(`/${locale}/quantum-map`),
                  bmftr: extLink("https://www.bmftr.bund.de/"),
                })}
              </p>
            </Item>
            <Item>
              <p className={PARAGRAPH_CLASS}>{t("s2 p2")}</p>
            </Item>
            <Item>
              <ol className="ml-6 list-decimal space-y-3 marker:font-semibold marker:text-pink-700 dark:marker:text-pink-300">
                <li className={PARAGRAPH_CLASS}>{t("s2 goal1")}</li>
                <li className={PARAGRAPH_CLASS}>{t("s2 goal2")}</li>
                <li className={PARAGRAPH_CLASS}>{t("s2 goal3")}</li>
              </ol>
            </Item>
            <Item>
              <p className={PARAGRAPH_CLASS}>{t("s2 p3")}</p>
            </Item>
            <Item>
              <p className={PARAGRAPH_CLASS}>{t("s2 p4")}</p>
            </Item>
          </div>
        </Section>

        {/* 3. Our partners in Quanten(t)räume */}
        <Section id="partners">
          <Item>
            <Heading>{t("s3 heading")}</Heading>
          </Item>
          <div className="space-y-5">
            <Item>
              <p className={PARAGRAPH_CLASS}>
                {t.rich("s3 p1", {
                  dm: extLink(
                    "https://www.deutsches-museum.de/forschung/forschungsinstitut/projekte/detailseite/quantentraeume",
                  ),
                })}
              </p>
            </Item>
            <Item>
              <ul className="ml-6 list-disc space-y-2 marker:text-pink-700 dark:marker:text-pink-300">
                <li className={PARAGRAPH_CLASS}>
                  <a
                    href="https://www.mpq.mpg.de/photonlab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CLASS}
                  >
                    {t("s3 partner1")}
                  </a>
                </li>
                <li className={PARAGRAPH_CLASS}>
                  <a
                    href="https://www.isi.fraunhofer.de/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CLASS}
                  >
                    {t("s3 partner2")}
                  </a>
                </li>
                <li className={PARAGRAPH_CLASS}>
                  <a
                    href="https://www.technoseum.de/quantentraeume/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CLASS}
                  >
                    {t("s3 partner3")}
                  </a>
                </li>
                <li className={PARAGRAPH_CLASS}>
                  <a
                    href="https://www.pushquantum.tech/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CLASS}
                  >
                    {t("s3 partner4")}
                  </a>
                </li>
              </ul>
            </Item>
            <Item>
              <p className={PARAGRAPH_CLASS}>
                {t.rich("s3 p2", {
                  mcqst: extLink("https://www.mcqst.de/"),
                  iqm: extLink("https://www.iqm.tech/"),
                  mqv: extLink("https://www.munich-quantum-valley.de/"),
                })}
              </p>
            </Item>
            <Item>
              <Link
                href={`/${locale}/about/partners`}
                className="group inline-flex items-center gap-2 rounded-full bg-pink-700 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-pink-800 dark:bg-pink-500 dark:text-slate-950 dark:hover:bg-pink-400"
              >
                {t("s3 learn more")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Item>
          </div>
        </Section>

        {/* 4. About PushQuantum */}
        <Section id="pushquantum">
          <Item>
            <Heading>{t("s4 heading")}</Heading>
          </Item>
          <div className="space-y-5">
            <Item>
              <p className={PARAGRAPH_CLASS}>{t("s4 p1")}</p>
            </Item>
            <Item>
              <p className={PARAGRAPH_CLASS}>{t("s4 p2")}</p>
            </Item>
            <Item>
              <p className={PARAGRAPH_CLASS}>{t("s4 p3")}</p>
            </Item>
          </div>
        </Section>
      </main>
    </div>
  );
}
