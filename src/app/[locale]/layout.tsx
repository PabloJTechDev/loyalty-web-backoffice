import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { BackofficeShell } from '@/shared/ui/BackofficeShell';
import { getDictionary } from '@pablojtech/loyalty-shared-web/i18n';
import { isLocale } from '@pablojtech/loyalty-shared-web/i18n';

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  return <BackofficeShell locale={locale} dictionary={dictionary}>{children}</BackofficeShell>;
}
