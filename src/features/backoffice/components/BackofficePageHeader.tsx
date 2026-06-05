import type { ReactNode } from 'react';

export function BackofficePageHeader({ title, description, aside }: { title: string; description: string; aside?: ReactNode }) {
  return (
    <section className="page-header">
      <div>
        <h1>{title}</h1>
        <p className="muted">{description}</p>
      </div>
      {aside ? <div>{aside}</div> : null}
    </section>
  );
}
