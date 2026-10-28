"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";

export function MobileNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/products/")) return null;
  return <nav className="mobile-nav" aria-label="Mobile navigation">
    <Link prefetch={false} href="/"><Icon name="homeInverse" /><span>Home</span></Link>
    <Link prefetch={false} href="/shop" aria-current={pathname === "/shop" ? "page" : undefined}><Icon name="shopInverse" /><span>Shop</span></Link>
    <Link prefetch={false} href="/favourites"><Icon name="heartInverse" /><span>Saved</span></Link>
    <Link prefetch={false} href="/cart"><Icon name="bagInverse" /><span>Bag</span></Link>
  </nav>;
}
