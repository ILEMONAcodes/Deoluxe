import { Suspense } from "react";
import { Catalogue } from "@/components/shop/catalogue";
import { catalogue } from "@/server/catalogue-preview";
export const metadata = { title: "Search" };
export default function Search() { return <Suspense fallback={<p className="container storefront-page">Loading search…</p>}><Catalogue pieces={catalogue} mode="search" /></Suspense>; }
