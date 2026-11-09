"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";

interface FooterProps {
  params: {
    locale: string;
  };
}

export default function Footer({ params }: FooterProps) {
  const pathname = usePathname();
  const t = useTranslations("Footer");
  const locale = params.locale; // fallback falls locale fehlt

  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-slate-200 bg-gradient-to-r from-slate-50 to-white pt-4 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Logo and Tagline */}
          <div className="max-w-sm">
            <div
              className="flex cursor-pointer items-center"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105">
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
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              {t("Slogan")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              {t("Navigation")}
            </h3>
            <ul className="mt-2 space-y-0 leading-tight">
              <li>
                <Link
                  href={`/${locale}/posts/quantum_tuesdays`}
                  className="text-[13px] text-slate-600 transition-colors hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
                >
                  {t("Quantum Tuesdays")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/posts/entries`}
                  className="text-[13px] text-slate-600 transition-colors hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
                >
                  {t("Entries")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/posts/alphabet`}
                  className="text-[13px] text-slate-600 transition-colors hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
                >
                  {t("Quantum Alphabet")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-[13px] text-slate-600 transition-colors hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
                >
                  {t("About Us")}
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@pushquantum.tech"
                  className="text-[13px] text-slate-600 transition-colors hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
                >
                  {t("Contact")}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mx-auto mt-8 max-w-4xl border-t border-slate-200 pt-6 dark:border-slate-800">
          <p className="text-center text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
            <a href="https://wiqi.info">WiQi</a> © {year} by{" "}
            Leart Zuka{" "}
            <span>
              is licensed under{" "}
              <Link
                href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                CC BY-NC-ND 4.0
              </Link>
            </span>
            <span className="ml-2 inline-flex items-center">
              <Image
                src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
                alt="CC"
                width={16}
                height={16}
                className="ml-1 h-4 w-4"
              />
              <Image
                src="https://mirrors.creativecommons.org/presskit/icons/by.svg"
                alt="BY"
                width={16}
                height={16}
                className="ml-1 h-4 w-4"
              />
              <Image
                src="https://mirrors.creativecommons.org/presskit/icons/nc.svg"
                alt="NC"
                width={16}
                height={16}
                className="ml-1 h-4 w-4"
              />
              <Image
                src="https://mirrors.creativecommons.org/presskit/icons/nd.svg"
                alt="ND"
                width={16}
                height={16}
                className="ml-1 h-4 w-4"
              />
            </span>{" "}
            <br /> Built with{" "}
            <span className="inline-block animate-pulse text-red-500 dark:text-red-400">
              <Heart className="inline h-4 w-4" />
            </span>{" "}
            by Humans for Humans
          </p>
        </div>
      </div>
    </footer>
  );
}
