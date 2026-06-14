// Re-exported from @pablojtech/loyalty-shared-web – required by the shared
// package to resolve its own internal @/shared/i18n/config path alias.
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
