import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/product-detail";
import { catalogue, findPiece } from "@/server/catalogue-preview";

export function generateStaticParams() { return catalogue.map(p => ({ slug: p.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const piece = findPiece(slug); return { title: piece ? `${piece.name} — ${piece.colour}` : "Piece not found" }; }
export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const piece = findPiece(slug); if (!piece) notFound();
  return <ProductDetail key={piece.id} piece={piece} related={catalogue.filter(p => p.status !== "concept")} />;
}
