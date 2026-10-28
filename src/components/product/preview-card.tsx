import Image from "next/image";
import Link from "next/link";
import { FavouriteButton } from "./favourite-button";
import { formatNaira } from "@/lib/money";
import type { PreviewPiece } from "@/server/catalogue-preview";

export function PreviewCard({ piece }: { piece: PreviewPiece }) {
  return <article className={`product-card ${piece.status === "concept" ? "product-card--concept" : ""}`}>
    <div className="product-image">
      <Link prefetch={false} href={`/products/${piece.id}`} aria-label={`View ${piece.name} — ${piece.colour}`}><Image src={`/images/products/${piece.image}.webp`} alt={piece.alt} fill sizes="(min-width: 1280px) 297px, (min-width: 1024px) 25vw, (min-width: 640px) 30vw, 45vw" className={piece.fit === "contain" ? "object-contain" : "object-cover"} /></Link>
      <FavouriteButton id={piece.id} name={`${piece.name} ${piece.colour}`} />
    </div>
    <div className="product-copy"><h3><Link prefetch={false} href={`/products/${piece.id}`}>{piece.name}</Link></h3><p>{piece.colour}{piece.status === "sold-out" ? " · Sold out" : ""}</p>
      <p className="product-price">{piece.status === "concept" ? "Colour concept" : piece.priceKobo !== null ? formatNaira(piece.priceKobo) : "Price pending"}</p>
    </div>
  </article>;
}
