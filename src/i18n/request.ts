/*
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    Next.js Internationalization Request Configuration         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 *
 * WHY: Moved from `src/i18n.ts` to follow next-intl v3.14+ conventions,
 *      centralizes message loading and locale validation, part of 404 fix solution.
 *
 * BEFORE: Configuration was in `src/i18n.ts` with getRequestConfig directly exported,
 *         causing poor 404 handling.
 *
 * HOW: Referenced in next.config.mjs via createNextIntlPlugin, automatically called
 *      by next-intl for every request to load translations and validate locales.
 *
 * MAINTAIN: Update import paths if translation files move, add locale validation logic,
 *           keep lightweight (runs on every request), sync with routing.ts config.
 */

import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // next-intl ≥3.22: read the locale from `requestLocale` and return it
  const locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !routing.locales.includes(locale as any)) notFound();

  return {
    locale,
    messages: (await import(`../../public/static/locales/${locale}/hello.json`))
      .default,
  };
});
