"use client";
import Link from "next/link";
import { useShop } from "@/store/shop";
import { EmptyState } from "@/components/ui/empty-state";
import type { CataloguePiece } from "@/server/catalogue-preview";
export function SelectionPreview({ pieces }: { pieces: CataloguePiece[] }) {
  const selections = useShop(s => s.selections); const ready = useShop(s => s.hydrated); const remove = useShop(s => s.removeSelection);
  if (!ready) return <p className="container storefront-page" role="status">Loading your selections…</p>;
  if (!selections.length) return <EmptyState title="Your bag is waiting."><p>Find a piece that feels like you.</p></EmptyState>;
  return <section className="empty-state selection-preview"><h1>Your selected pieces.</h1><p>These are saved on this device for the storefront preview. The complete bag and checkout screens are the next build stage; no order has been placed.</p>{selections.map((selection, index) => { const piece = pieces.find(p => p.id === selection.id); return piece ? <div className="selection-row" key={`${selection.id}-${selection.size}-${selection.colour}`}><Link prefetch={false} href={`/products/${piece.id}`}><strong>{piece.name}</strong><br />{selection.colour} · {selection.size} · Quantity {selection.quantity}</Link><button className="text-button" onClick={() => remove(index)}>Remove</button></div> : null; })}<Link prefetch={false} className="button button--primary" href="/shop">Continue exploring</Link></section>;
}
