import { redirect } from 'next/navigation';
import { defaultLocale } from '@pablojtech/loyalty-shared-web/i18n';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
