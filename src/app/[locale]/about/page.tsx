"use client";

import type { ReactNode } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

// Quantum particle animation component
const QuantumParticle = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      className="absolute h-2 w-2 rounded-full bg-pink-500/50"
      initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.5, 0.5, 1.2, 0],
        x: [null, Math.random() * 200 - 100],
        y: [null, Math.random() * 200 - 100],
        opacity: [0, 0.8, 0.2, 0.9, 0],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        delay: delay,
        ease: "easeInOut",
      }}
    />
  );
};

// Quantum field background
const QuantumField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-90">
      {Array.from({ length: 20 }).map((_, i) => (
        <QuantumParticle key={i} delay={i * 0.4} />
      ))}
    </div>
  );
};

// Animation variants — matching the posts pages so the site reveals alike
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

const LINK_CLASS =
  "font-medium text-pink-700 underline decoration-pink-700/40 underline-offset-2 transition-colors hover:text-pink-900 hover:decoration-pink-900 dark:text-pink-300 dark:decoration-pink-300/40 dark:hover:text-pink-200";

/** Renders an <a> for a rich-text tag pointing at an external site. */
const extLink =
  (href: string) =>
  (chunks: ReactNode): ReactNode => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={LINK_CLASS}
    >
      {chunks}
    </a>
  );

/** Renders a next/link for a rich-text tag pointing inside the site. */
const inLink =
  (href: string) =>
  (chunks: ReactNode): ReactNode => (
    <Link href={href} className={LINK_CLASS}>
      {chunks}
    </Link>
  );

/**
 * A section whose children reveal one after another the first time it
 * scrolls into view. Wrap each chunk in <Item> to put it in the sequence.
 */
function Section({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <motion.section
      id={id}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8"
    >
      {children}
    </motion.section>
  );
}

/** One chunk in a section's reveal sequence. */
function Item({ children }: { children: ReactNode }) {
  return <motion.div variants={itemVariants}>{children}</motion.div>;
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-6 font-serif text-3xl font-bold text-slate-900 dark:text-white lg:text-4xl">
      {children}
    </h2>
  );
}

const PARAGRAPH_CLASS =
  "text-lg leading-relaxed text-slate-700 dark:text-indigo-100";

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
                  tuesdays: inLink(`/${locale}/posts/quantum_tuesdays`),
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
