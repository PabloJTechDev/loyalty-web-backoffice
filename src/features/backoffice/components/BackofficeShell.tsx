import type { ReactNode } from 'react';
import Link from 'next/link';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';

export function BackofficeShell({ children, locale, dictionary }: { children: ReactNode; locale: Locale; dictionary: Dictionary }) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container app-header__inner">
          <div>
            <strong>{dictionary.common.brand}</strong>
            <div className="muted">Ops, support and operational visibility</div>
          </div>
          <nav className="top-nav">
            <Link href={`/${locale}`}>{dictionary.common.dashboard}</Link>
          </nav>
        </div>
      </header>
      <main className="container app-content">{children}</main>
    </div>
  );
}
