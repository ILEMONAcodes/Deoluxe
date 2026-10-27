import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { PreviewCard } from "@/components/product/preview-card";
import { colourConcepts, rotation } from "@/server/catalogue-preview";

export default function Home() {
  return <div className="home container">
    <section className="intro" aria-labelledby="home-title">
      <div className="mobile-intro"><p className="eyebrow">The everyday edit</p><h1 id="home-title">Wear the statement.</h1></div>
      <div className="hero">
        <div className="hero-copy"><p className="eyebrow">Deoluxe / The everyday edit</p><h1>Wear the<br />statement.</h1><p>Made for the way you move.<br />Discover pieces with presence.</p><ButtonLink href="#collection" variant="secondary">Explore the collection</ButtonLink></div>
        <div className="hero-image"><Image src="/images/editorial/campaign.webp" alt="Four models in blue, black and forest-green Deoluxe sets holding maroon Deoluxe shopping bags" fill sizes="(min-width: 1280px) 730px, (min-width: 1024px) 55vw, 100vw" preload className="object-cover" /></div>
        <div className="hero-caption"><div><h2>The Velvet Aura edit</h2><p>Confidence in every detail.</p></div><a href="#collection" aria-label="Explore the Velvet Aura edit">→</a></div>
      </div>
      <div className="campaign-note"><p className="eyebrow">01 / The Velvet Aura edit</p><p>Distinct textures. Unmistakably Deoluxe.</p></div>
    </section>
    <nav className="category-pills" aria-label="Browse categories">{["All", "Caps", "Tees", "Sets", "Jackets", "Accessories"].map((label, i) => <a href={i === 1 || i === 2 ? "#colour-studies" : "#collection"} key={label} className={`chip ${i === 0 ? "chip--selected" : ""}`}>{label}</a>)}</nav>
    <section id="collection" className="collection-section" aria-labelledby="rotation-title"><div className="section-title"><h2 id="rotation-title">The current rotation</h2><a href="#colour-studies">View all</a></div><div className="product-grid">{rotation.map(piece => <PreviewCard key={piece.id} piece={piece} />)}</div></section>
    <section id="colour-studies" className="collection-section" aria-labelledby="colour-title"><div className="section-heading"><h2 id="colour-title">A different shade.</h2><p>New colour studies · proposed colourways</p></div><div className="product-grid">{colourConcepts.map(piece => <PreviewCard key={piece.id} piece={piece} />)}</div></section>
    <section id="drops" className="drop-banner"><h2>Good things don’t stay.</h2><p>Get the next drop before it’s gone.</p><ButtonLink href="https://www.instagram.com/deolaluxury/" target="_blank" rel="noreferrer" variant="secondary">Keep me in the loop</ButtonLink></section>
    <section className="editorial-section" aria-labelledby="editorial-title"><div className="section-title"><h2 id="editorial-title">Worn your way</h2><a href="#collection">Explore</a></div><div className="editorial-grid"><div className="editorial-image"><Image src="/images/editorial/studio.webp" alt="Two men in a music studio, one wearing the Deoluxe BlackBoy graphic tee" fill sizes="(min-width: 1280px) 588px, (min-width: 1024px) 45vw, 100vw" className="object-cover" /></div><div className="editorial-copy"><h3>After hours.<br />All Deoluxe.</h3><p>BlackBoy Set — styled in the studio.</p><ButtonLink href="#collection">Shop the look</ButtonLink></div></div></section>
  </div>;
}
