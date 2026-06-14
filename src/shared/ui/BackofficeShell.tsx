import type { ReactNode } from 'react';
import Link from 'next/link';
import type { Dictionary } from '@pablojtech/loyalty-shared-web/i18n';
import type { Locale } from '@pablojtech/loyalty-shared-web/i18n';

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
