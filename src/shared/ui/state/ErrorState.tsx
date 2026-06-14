import type { ReactNode } from 'react';

export function ErrorState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="card"><strong>{title}</strong><p className="muted">{description}</p>{action}</div>;
}
