import Image from "next/image";

const icons = {
  back: ["back", 24], filter: ["filter", 24], emptyHeart: ["empty-heart", 40], emptySearch: ["empty-search", 40], sizeGrid: ["size-grid", 40],
  navigationHeart: ["desktop-heart", 24],
  search: ["mobile-search", 24], bag: ["mobile-bag", 24], heart: ["mobile-heart", 22],
  user: ["desktop-user", 24], homeInverse: ["mobile-home", 20],
  shopInverse: ["mobile-grid", 20], heartInverse: ["mobile-heart1", 20], bagInverse: ["mobile-bag1", 20],
} as const;

export function Icon({ name }: { name: keyof typeof icons }) {
  const [file, size] = icons[name];
  return <Image src={`/icons/ui/${file}.svg`} width={size} height={size} alt="" aria-hidden="true" unoptimized />;
}
