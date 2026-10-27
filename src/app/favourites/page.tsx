import { Suspense } from "react";
import { Catalogue } from "@/components/shop/catalogue";
import { catalogue } from "@/server/catalogue-preview";
export const metadata = { title: "Favourites" };
export default function Favourites() { return <Suspense fallback={<p className="container storefront-page">Loading saved pieces…</p>}><Catalogue pieces={catalogue} mode="saved" /></Suspense>; }
