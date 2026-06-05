import type { ReactNode } from 'react';

export function BackofficeCard({ children }: { children: ReactNode }) {
  return <section className="card">{children}</section>;
}
