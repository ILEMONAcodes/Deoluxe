/** Design-review fixtures only; checkout must use authoritative database prices. */
export type PreviewPiece = {
  id: string;
  name: string;
  colour: string;
  image: string;
  alt: string;
  fit: "contain" | "cover";
  priceKobo: number | null;
  status: "preview" | "sold-out" | "concept";
};

export type CataloguePiece = PreviewPiece & {
  category: "Caps" | "Tees" | "Sets";
  sizes: string[];
  gallery: { image: string; alt: string; colour: string }[];
  description: string;
};

export const rotation: PreviewPiece[] = [
  { id: "blackboy-black", name: "BlackBoy Set", colour: "Black", image: "tee-black", alt: "Black Deoluxe graphic tee with turquoise lettering and a masked figure print", fit: "contain", priceKobo: 3500000, status: "preview" },
  { id: "velvet-green", name: "Velvet Aura Set", colour: "Forest green", image: "velvet", alt: "Model wearing a forest-green Deoluxe zip-up two-piece set", fit: "cover", priceKobo: 6500000, status: "preview" },
  { id: "blackboy-white", name: "BlackBoy Set", colour: "White", image: "tee-white", alt: "White Deoluxe tee with the signature colourful masked figure artwork", fit: "contain", priceKobo: 3500000, status: "preview" },
  { id: "statement-black", name: "F#CKING DEOLUXE", colour: "Black / cream", image: "cap-black", alt: "Black trucker cap with cream F#CKING DEOLUXE lettering and printed mesh panels", fit: "contain", priceKobo: null, status: "sold-out" },
];

export const colourConcepts: PreviewPiece[] = [
  { id: "cap-maroon", name: "Statement cap", colour: "Wine maroon", image: "cap-maroon", alt: "Proposed wine-maroon Deoluxe trucker cap with cream raised lettering", fit: "contain", priceKobo: null, status: "concept" },
  { id: "cap-navy", name: "Statement cap", colour: "Midnight navy", image: "cap-navy", alt: "Proposed midnight-navy Deoluxe trucker cap with cream raised lettering", fit: "contain", priceKobo: null, status: "concept" },
  { id: "tee-ivory", name: "Graphic tee", colour: "Warm ivory", image: "tee-ivory", alt: "Proposed warm-ivory graphic tee with the original Deoluxe masked figure artwork", fit: "contain", priceKobo: null, status: "concept" },
  { id: "tee-forest", name: "Graphic tee", colour: "Forest green", image: "tee-forest", alt: "Proposed forest-green graphic tee with the original Deoluxe masked figure artwork", fit: "contain", priceKobo: null, status: "concept" },
];

const originals: PreviewPiece[] = [...rotation,
  { ...rotation[0], id: "blackboy-red", colour: "Red", image: "tee-red", alt: "Red Deoluxe graphic tee with white lettering and masked figure artwork" },
  { id: "eclipse-grey", name: "Eclipse Set", colour: "Washed charcoal", image: "eclipse", alt: "Model wearing a washed-charcoal Deoluxe monogram tee", fit: "cover", priceKobo: 3500000, status: "preview" },
  { ...rotation[3], id: "statement-green", colour: "Brown / green", image: "cap-green", alt: "Brown and green Deoluxe trucker cap with cream brim" },
];

export const catalogue: CataloguePiece[] = [...colourConcepts, ...originals].map(piece => {
  const category = piece.image.startsWith("cap-") ? "Caps" : piece.image.startsWith("velvet") || piece.image === "eclipse" ? "Sets" : "Tees";
  let gallery = [{ image: piece.image, alt: piece.alt, colour: piece.colour }];
  if (piece.id.startsWith("blackboy-")) gallery = originals.filter(p => p.id.startsWith("blackboy-")).map(p => ({ image: p.image, alt: p.alt, colour: p.colour }));
  if (piece.image === "velvet") gallery.push({ image: "velvet-detail", alt: "Close-up of forest-green Deoluxe set texture and embroidered branding", colour: piece.colour });
  if (piece.image === "eclipse") gallery.push({ image: "eclipse-back", alt: "Additional view of the charcoal Deoluxe Eclipse Set", colour: piece.colour });
  if (piece.id.startsWith("statement-")) gallery = originals.filter(p => p.id.startsWith("statement-")).map(p => ({ image: p.image, alt: p.alt, colour: p.colour }));
  return { ...piece, category, sizes: category === "Caps" ? ["One Size"] : ["S", "M", "L", "XL"], gallery,
    description: piece.status === "concept" ? "An authorised colour study of the Deoluxe original. Proposed colourway; not available to purchase." : category === "Caps" ? "A cap that speaks for itself." : piece.id.startsWith("blackboy-") ? "A graphic statement in black, white or red. Wear it your way." : "Distinct textures. Unmistakably Deoluxe." };
});

export function findPiece(slug: string) { return catalogue.find(piece => piece.id === slug); }
