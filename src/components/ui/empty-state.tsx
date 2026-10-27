import { ButtonLink } from "./button";

export function EmptyState({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="empty-state"><h1>{title}</h1><div>{children}</div><ButtonLink href="/shop">Explore the collection</ButtonLink></section>;
}
