"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Selection = { id: string; size: string; colour: string; quantity: number };
type ShopState = {
  favourites: string[];
  selections: Selection[];
  hydrated: boolean;
  storageFailed: boolean;
  toggleFavourite: (id: string) => void;
  addSelection: (selection: Omit<Selection, "quantity">) => void;
  removeSelection: (index: number) => void;
};
const validId = (id: unknown): id is string => typeof id === "string" && /^[a-z0-9-]{1,80}$/.test(id);
function readPersisted(value: unknown): Pick<ShopState, "favourites" | "selections"> {
  const data = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const favourites = Array.isArray(data.favourites) ? [...new Set(data.favourites.filter(validId))].slice(0, 100) : [];
  const selections: Selection[] = [];
  if (Array.isArray(data.selections)) for (const item of data.selections.slice(0, 100)) {
    if (!item || typeof item !== "object") continue;
    const s = item as Record<string, unknown>;
    if (validId(s.id) && typeof s.size === "string" && s.size.length < 20 && typeof s.colour === "string" && s.colour.length < 80 && typeof s.quantity === "number" && Number.isInteger(s.quantity) && s.quantity > 0 && s.quantity <= 10) selections.push(s as Selection);
  }
  return { favourites, selections };
}
export const useShop = create<ShopState>()(persist((set) => ({
  favourites: [], selections: [], hydrated: false, storageFailed: false,
  toggleFavourite: id => set(state => ({ favourites: state.favourites.includes(id) ? state.favourites.filter(saved => saved !== id) : [...state.favourites, id] })),
  addSelection: selection => set(state => {
    const index = state.selections.findIndex(s => s.id === selection.id && s.size === selection.size && s.colour === selection.colour);
    return { selections: index < 0 ? [...state.selections, { ...selection, quantity: 1 }] : state.selections.map((s, i) => i === index ? { ...s, quantity: Math.min(10, s.quantity + 1) } : s) };
  }),
  removeSelection: index => set(state => ({ selections: state.selections.filter((_, i) => i !== index) })),
}), {
  name: "deoluxe-shop-v1", version: 1, skipHydration: true,
  partialize: state => ({ favourites: state.favourites, selections: state.selections }),
  merge: (persisted, current) => ({ ...current, ...readPersisted(persisted) }),
  onRehydrateStorage: () => (_state, error) => { useShop.setState({ hydrated: true, storageFailed: Boolean(error) }); },
}));
