export function LoadingState({ title, description }: { title: string; description: string }) {
  return <div className="card"><strong>{title}</strong><p className="muted">{description}</p></div>;
}
