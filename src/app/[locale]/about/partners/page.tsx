"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ChevronLeft } from "lucide-react";
import {
  QuantumField,
  Section,
  Item,
  Heading,
  PARAGRAPH_CLASS,
  extLink,
} from "@/app/components/about/shared";

/** Translation-key prefix, logo and links for each partner, in display order. */
const PARTNERS = [
  {
    key: "mpq",
    logo: "/static/partners/mpq.png",
    href: "https://www.mpq.mpg.de/",
  },
  {
    key: "isi",
    logo: "/static/partners/fraunhofer-isi.svg",
    href: "https://www.isi.fraunhofer.de/en.html",
  },
  {
    key: "dm",
    logo: "/static/partners/deutsches-museum.svg",
    href: "https://www.deutsches-museum.de/",
    profiles:
      "https://www.deutsches-museum.de/forschung/forschungsinstitut/projekte/quantentraeume-modul-3/technologiesteckbriefe",
  },
  {
    key: "technoseum",
    logo: "/static/partners/technoseum.svg",
    href: "https://www.technoseum.de/",
  },
  {
    key: "pq",
    logo: "/static/partners/pushquantum.svg",
    href: "https://www.pushquantum.tech/",
  },
] as const;

export default function PartnersPage() {
  const t = useTranslations("Partners");
  const locale = useLocale();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-blue-100 text-slate-900 dark:from-slate-900 dark:to-indigo-950 dark:text-white">
      {/* Quantum-inspired decorative elements, as on the About page */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-300/20 via-white/0 to-transparent dark:from-indigo-900/20 dark:via-slate-900/0 dark:to-transparent"></div>
        <QuantumField />
      </div>

      {/* Hero */}
      <section className="relative z-10 px-4 pb-8 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href={`/${locale}/about#partners`}
            className="mb-10 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <ChevronLeft className="h-4 w-4" />
            {t("back")}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-4 bg-gradient-to-r from-slate-900 via-pink-800 to-indigo-800 bg-clip-text px-2 pb-3 pt-1 font-serif text-4xl font-bold leading-[1.15] tracking-tight text-transparent dark:from-white dark:via-pink-200 dark:to-indigo-200 md:text-5xl">
              {t("title")}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-700 dark:text-indigo-200 sm:text-xl">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      <main className="relative z-10 pb-24">
        <Section>
          <Item>
            <p className={PARAGRAPH_CLASS}>{t("intro")}</p>
          </Item>
        </Section>

        {PARTNERS.map((partner) => (
          <Section key={partner.key} id={partner.key}>
            <Item>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                {/* Logos are drawn for light backgrounds, so they sit on a
                    white card in both themes. */}
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex h-28 w-full shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 sm:w-56"
                >
                  <span className="relative h-full w-full">
                    <Image
                      src={partner.logo}
                      alt={t(`${partner.key} alt`)}
                      fill
                      unoptimized
                      sizes="224px"
                      className="object-contain"
                    />
                  </span>
                </a>
                <div>
                  <h2 className="mb-3 font-serif text-2xl font-bold text-slate-900 dark:text-white lg:text-3xl">
                    {t(`${partner.key} name`)}
                  </h2>
                  <p className={PARAGRAPH_CLASS}>
                    {t.rich(`${partner.key} text`, {
                      link: extLink(partner.href),
                      profiles: extLink(
                        "profiles" in partner ? partner.profiles : partner.href,
                      ),
                    })}
                  </p>
                </div>
              </div>
            </Item>
          </Section>
        ))}

        <Section id="together">
          <Item>
            <Heading>{t("closing heading")}</Heading>
          </Item>
          <Item>
            <p className={PARAGRAPH_CLASS}>{t("closing text")}</p>
          </Item>
        </Section>
      </main>
    </div>
  );
}
