"use client";
import { Icon } from "@/components/ui/icon";
import { useShop } from "@/store/shop";

export function FavouriteButton({ id, name, full = false }: { id: string; name: string; full?: boolean }) {
  const saved = useShop(s => s.favourites.includes(id));
  const toggle = useShop(s => s.toggleFavourite);
  const ready = useShop(s => s.hydrated);
  return <button type="button" disabled={!ready} className={full ? "button button--secondary" : `product-heart ${saved ? "is-saved" : ""}`} aria-label={full ? undefined : `${saved ? "Remove" : "Save"} ${name} ${saved ? "from" : "to"} favourites`} aria-pressed={saved} onClick={() => toggle(id)}>
    {full ? saved ? "Saved to favourites" : "Save to favourites" : <Icon name="heart" />}
  </button>;
}
