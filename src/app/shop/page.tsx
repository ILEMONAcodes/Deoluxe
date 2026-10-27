import { Suspense } from "react";
import { Catalogue } from "@/components/shop/catalogue";
import { catalogue } from "@/server/catalogue-preview";
export const metadata = { title: "The collection" };
export default function Shop() { return <Suspense fallback={<p className="container storefront-page">Loading the collection…</p>}><Catalogue pieces={catalogue} /></Suspense>; }
