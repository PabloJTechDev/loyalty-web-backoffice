import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { BackofficeShell } from '@/features/backoffice/components/BackofficeShell';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { isLocale } from '@/lib/i18n/config';

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  return <BackofficeShell locale={locale} dictionary={dictionary}>{children}</BackofficeShell>;
}
