import Link from "next/link";
import { Brand } from "./brand";

export function Footer() {
  return <footer className="site-footer"><div className="footer-inner">
    <div className="footer-brand"><Brand inverse size="large" /><p>Wear the statement.</p><a href="https://www.instagram.com/deolaluxury/" target="_blank" rel="noreferrer">@deolaluxury</a></div>
    <div><h2>Explore</h2>{["Shop", "Caps", "Tees", "Sets"].map(text => <Link prefetch={false} href={text === "Shop" ? "/shop" : `/shop?category=${text}`} key={text}>{text}</Link>)}</div>
    <div><h2>Help</h2><Link prefetch={false} href="/info">Contact Deoluxe</Link><Link prefetch={false} href="/#drops">New drops</Link></div>
    <div><h2>Deoluxe</h2><Link prefetch={false} href="/info">About</Link><a href="https://www.instagram.com/deolaluxury/" target="_blank" rel="noreferrer">Instagram</a></div>
  </div></footer>;
}
