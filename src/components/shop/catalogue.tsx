"use client";
import { useId, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PreviewCard } from "@/components/product/preview-card";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal";
import { useShop } from "@/store/shop";
import type { CataloguePiece } from "@/server/catalogue-preview";

type Filters = { category: string; size: string; availability: string; max: string };
const blank: Filters = { category: "All", size: "", availability: "", max: "" };
const categories = ["All", "Caps", "Tees", "Sets", "Jackets"];
function FilterFields({ value, onChange }: { value: Filters; onChange: (next: Filters) => void }) {
  const group = useId();
  return <><fieldset><legend>Category</legend><div className="filter-options">{categories.map(category => <label key={category}><input type="radio" name={`category-${group}`} checked={value.category === category} onChange={() => onChange({ ...value, category })} />{category === "All" ? "All pieces" : category}</label>)}</div></fieldset>
    <fieldset><legend>Size</legend><div className="filter-options">{["S", "M", "L", "XL", "One Size"].map(size => <label key={size}><input type="checkbox" checked={value.size === size} onChange={() => onChange({ ...value, size: value.size === size ? "" : size })} />{size}</label>)}</div></fieldset>
    <fieldset><legend>Availability</legend><div className="filter-options">{[["preview", "Preview pieces"], ["sold-out", "Sold out"], ["concept", "Colour concepts"]].map(([status, label]) => <label key={status}><input type="checkbox" checked={value.availability === status} onChange={() => onChange({ ...value, availability: value.availability === status ? "" : status })} />{label}</label>)}</div></fieldset>
    <label className="field-label">Maximum price (₦)<input className="text-input" type="number" min="0" step="1000" placeholder="100,000" value={value.max} onChange={event => onChange({ ...value, max: event.target.value })} /></label></>;
}

export function Catalogue({ pieces, mode = "shop" }: { pieces: CataloguePiece[]; mode?: "shop" | "saved" | "search" }) {
  const params = useSearchParams(); const router = useRouter(); const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const favourites = useShop(s => s.favourites); const hydrated = useShop(s => s.hydrated);
  const [showFilters, setShowFilters] = useState(false);
  const [draft, setDraft] = useState<Filters>(blank);
  const query = params.get("q") ?? "";
  const filters: Filters = { category: params.get("category") ?? "All", size: params.get("size") ?? "", availability: params.get("availability") ?? "", max: params.get("max") ?? "" };
  const sort = params.get("sort") ?? "newest";
  function update(updates: Record<string, string>) {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(updates)) { if (!value || value === "All" || value === "newest") next.delete(key); else next.set(key, value); }
    startTransition(() => router.replace(`${pathname}${next.size ? `?${next}` : ""}`, { scroll: false }));
  }
  const base = mode === "saved" ? pieces.filter(p => favourites.includes(p.id)) : pieces;
  const filtered = base.filter(p => {
    const search = `${p.name} ${p.colour} ${p.category}`.toLowerCase();
    return query.toLowerCase().trim().split(/\s+/).every(word => search.includes(word)) && (filters.category === "All" || p.category === filters.category) && (!filters.size || p.sizes.includes(filters.size)) && (!filters.availability || p.status === filters.availability) && (!filters.max || (p.priceKobo !== null && p.priceKobo <= Number(filters.max) * 100));
  });
  if (sort === "price-low" || sort === "price-high") filtered.sort((a, b) => a.priceKobo === null ? b.priceKobo === null ? 0 : 1 : b.priceKobo === null ? -1 : (a.priceKobo - b.priceKobo) * (sort === "price-low" ? 1 : -1));
  if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
  const concepts = filtered.filter(p => p.status === "concept"); const originals = filtered.filter(p => p.status !== "concept");
  const clear = () => startTransition(() => router.replace(pathname, { scroll: false }));
  if (mode === "saved" && !hydrated) return <div className="container storefront-page" role="status">Loading your saved pieces…</div>;
  if (mode === "saved" && !base.length) return <section className="empty-state storefront-empty"><Icon name="emptyHeart" /><h1>Keep a little inspiration.</h1><p>Tap the heart on any piece to save it here.</p><Link prefetch={false} className="button button--primary" href="/shop">Explore the collection</Link></section>;
  return <div className={`container storefront-page ${mode === "saved" ? "saved-page" : ""}`}>
    <div className="page-heading"><h1>{mode === "shop" ? "The collection." : mode === "saved" ? "Your saved pieces." : "Find your statement."}</h1>{mode !== "search" && <p>{mode === "saved" ? "Keep your favourites close." : "Pieces with presence. Find your next statement."}</p>}</div>
    <div className={`catalogue-search ${mode === "search" ? "catalogue-search--full" : ""}`}><form role="search" onSubmit={event => { event.preventDefault(); const data = new FormData(event.currentTarget); update({ q: String(data.get("q") ?? "") }); }}><input key={query} className="text-input" name="q" type="search" aria-label="Search pieces" placeholder={mode === "search" ? "Search caps, tees, sets…" : "Search Deoluxe"} defaultValue={query} /><button className="icon-button search-submit" type="submit" aria-label="Search"><Icon name="search" /></button></form>{mode !== "search" && <button className="icon-button" aria-label="Open filters" onClick={() => { setDraft(filters); setShowFilters(true); }}><Icon name="filter" /></button>}</div>
    {mode === "search" && !query && <div className="search-suggestions"><p>EXPLORE DEOLUXE</p><div className="chip-row">{["BlackBoy", "Caps", "Velvet"].map(q => <button type="button" className="chip" key={q} onClick={() => update({ q })}>{q}</button>)}</div></div>}
    {mode !== "search" && <nav className="category-pills catalogue-categories" aria-label="Product categories">{categories.map(category => <button type="button" key={category} className={`chip ${filters.category === category ? "chip--selected" : ""}`} aria-pressed={filters.category === category} onClick={() => update({ category })}>{category}</button>)}</nav>}
    <div className={`catalogue-layout ${mode === "shop" ? "with-sidebar" : ""}`}>
      {mode === "shop" && <aside className="filter-sidebar" aria-label="Filter collection"><h2>Filter by</h2><FilterFields value={filters} onChange={next => update(next)} /><button className="text-button" onClick={clear}>Reset filters</button></aside>}
      <div className="catalogue-results" aria-busy={pending}>
        <div className="results-toolbar"><p aria-live="polite">{mode === "search" && !query ? "You might like" : `${filtered.length} ${mode === "saved" ? "saved pieces" : "pieces"}${mode === "shop" && concepts.length ? " including colour studies" : ""}`}</p><label>Sort: <select aria-label="Sort pieces" value={sort} onChange={e => update({ sort: e.target.value })}><option value="newest">Newest ↓</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name A–Z</option></select></label></div>
        {!filtered.length ? <section className="empty-state storefront-empty"><Icon name="emptySearch" /><h2>Nothing here yet.</h2><p>Try another search or clear your filters.</p><button className="button button--primary" onClick={clear}>Clear filters</button></section> : <>
          {mode === "shop" && concepts.length > 0 && <section className="concept-results"><div className="section-heading"><h2>A different shade.</h2><p>New colour studies · proposed colourways</p></div><div className="product-grid concept-grid">{concepts.map(piece => <PreviewCard key={piece.id} piece={piece} />)}</div></section>}
          <div className="product-grid catalogue-grid">{(mode === "shop" ? originals : mode === "search" && !query ? pieces.filter(p => ["blackboy-black", "velvet-green", "blackboy-white", "statement-black"].includes(p.id)).sort((a,b) => ["blackboy-black", "velvet-green", "blackboy-white", "statement-black"].indexOf(a.id) - ["blackboy-black", "velvet-green", "blackboy-white", "statement-black"].indexOf(b.id)) : filtered).map(piece => <PreviewCard key={piece.id} piece={piece} />)}</div>
          <p className="catalogue-end">{mode === "search" && !query ? <Link prefetch={false} href="/shop">View the collection →</Link> : "You’ve seen every piece in this edit."}</p>
        </>}
        <p className="preview-disclosure">Design preview · prices and stock await Deoluxe confirmation. Colour concepts are not for sale.</p>
      </div>
    </div>
    {showFilters && <Modal title="Find your fit" onClose={() => setShowFilters(false)}><Icon name="filter" /><h2>Find your fit.</h2><p>Filter the collection.</p><FilterFields value={draft} onChange={setDraft} /><button className="button button--primary" onClick={() => { update(draft); setShowFilters(false); }}>Show pieces</button><button className="button button--secondary" onClick={() => setDraft(blank)}>Reset filters</button></Modal>}
  </div>;
}
