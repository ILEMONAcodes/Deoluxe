"use client";
import { useEffect } from "react";
import { useShop } from "@/store/shop";

export function StoreHydration() {
  useEffect(() => { void useShop.persist.rehydrate(); }, []);
  const failed = useShop(s => s.storageFailed);
  return failed ? <p className="storage-notice" role="status">Browser storage is unavailable. Saved pieces will last for this visit only.</p> : null;
}
