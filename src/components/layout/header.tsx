"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "./brand";
import { Icon } from "@/components/ui/icon";

export function Header() {
  const pathname = usePathname();
  const title = pathname.startsWith("/products/") ? "Product details" : ({ "/shop": "Shop", "/search": "Search", "/favourites": "Favourites", "/cart": "Your bag" } as Record<string, string>)[pathname];
  return <header className="site-header">
    <div className="desktop-header">
      <nav aria-label="Main navigation" className="desktop-links">
        {["Shop", "Caps", "Tees", "Sets", "Drops"].map(label => <Link prefetch={false} key={label} href={label === "Drops" ? "/#drops" : label === "Shop" ? "/shop" : `/shop?category=${label}`}>{label}</Link>)}
      </nav>
      <Link prefetch={false} href="/" className="brand-link" aria-label="Deoluxe home"><Brand /></Link>
      <nav className="header-actions" aria-label="Your Deoluxe">
        <Link prefetch={false} href="/search" className="icon-button" aria-label="Search Deoluxe"><Icon name="search" /></Link>
        <Link prefetch={false} href="/favourites" className="icon-button" aria-label="Favourites"><Icon name="navigationHeart" /></Link>
        <Link prefetch={false} href="/cart" className="icon-button" aria-label="Your bag"><Icon name="bag" /></Link>
        <Link prefetch={false} href="/info" className="icon-button" aria-label="About and contact"><Icon name="user" /></Link>
      </nav>
    </div>
    <div className="mobile-header">
      {title ? <><Link prefetch={false} href={pathname.startsWith("/products/") ? "/shop" : "/"} className="icon-button" aria-label="Back"><Icon name="back" /></Link><p className="mobile-page-title">{title}</p><Link prefetch={false} href="/favourites" className="icon-button" aria-label="Favourites"><Icon name="navigationHeart" /></Link></> : <><Link prefetch={false} href="/" className="brand-link" aria-label="Deoluxe home"><Brand /></Link>
      <div className="brand-title"><span>DEOLUXE</span><small>WEAR THE STATEMENT</small></div>
      <Link prefetch={false} href="/search" className="icon-button" aria-label="Search Deoluxe"><Icon name="search" /></Link></>}
      <Link prefetch={false} href="/cart" className="icon-button" aria-label="Your bag"><Icon name="bag" /></Link>
    </div>
  </header>;
}
