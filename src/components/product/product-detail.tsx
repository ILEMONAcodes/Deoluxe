"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FavouriteButton } from "./favourite-button";
import { PreviewCard } from "./preview-card";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal";
import { formatNaira } from "@/lib/money";
import { useShop } from "@/store/shop";
import type { CataloguePiece } from "@/server/catalogue-preview";

export function ProductDetail({ piece, related }: { piece: CataloguePiece; related: CataloguePiece[] }) {
  const [index, setIndex] = useState(Math.max(0, piece.gallery.findIndex(image => image.image === piece.image)));
  const [size, setSize] = useState(piece.sizes.length === 1 ? piece.sizes[0] : "");
  const [modal, setModal] = useState<"size" | "notify" | "added" | "zoom" | null>(null);
  const [message, setMessage] = useState("");
  const add = useShop(s => s.addSelection); const ready = useShop(s => s.hydrated);
  const photo = piece.gallery[index];
  const colours = [...new Set(piece.gallery.map(image => image.colour))];
  const concept = piece.status === "concept"; const soldOut = piece.status === "sold-out";
  function selectPhoto(next: number) { setIndex(next); setMessage(""); }
  function primary() {
    if (soldOut) { setModal("notify"); return; }
    if (concept) return;
    if (!size) { setMessage("Select your size to continue."); document.getElementById("size-options")?.focus(); return; }
    const selected = related.find(p => p.name === piece.name && p.colour === photo.colour) ?? piece;
    add({ id: selected.id, colour: photo.colour, size }); setModal("added");
  }
  const actionLabel = concept ? "Colour concept · not for sale" : soldOut ? "Notify me" : "Add to bag";
  return <div className="container product-page">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/shop">Shop</Link><span>/</span><span>{piece.name}</span></nav>
    <div className="product-layout">
      <section className="gallery" aria-label="Product gallery"><button className={`gallery-main ${piece.fit === "cover" ? "gallery-cover" : ""}`} onClick={() => setModal("zoom")} aria-label={`Enlarge ${photo.colour} product photo`}><Image src={`/images/products/${photo.image}.webp`} alt={photo.alt} fill sizes="(min-width: 1024px) 580px, (min-width: 640px) 95vw, 90vw" preload className={piece.fit === "cover" ? "object-cover" : "object-contain"} /></button>
        {soldOut ? <p className="sold-out-notice">SOLD OUT · Join the waitlist</p> : <div className="gallery-pagination"><span>{String(index + 1).padStart(2, "0")} / {String(piece.gallery.length).padStart(2, "0")}</span><div>{piece.gallery.map((image, i) => <button key={`${image.image}-${i}`} type="button" aria-label={`Show photo ${i + 1}`} aria-pressed={index === i} onClick={() => selectPhoto(i)}>{index === i ? "•" : "○"}</button>)}</div></div>}
        <div className="gallery-thumbnails">{piece.gallery.map((image, i) => <button key={`${image.image}-${i}`} aria-label={`Show ${image.colour} photo ${i + 1}`} aria-pressed={index === i} onClick={() => selectPhoto(i)}><Image src={`/images/products/${image.image}.webp`} alt={image.alt} fill sizes="84px" className="object-contain" /></button>)}</div>
      </section>
      <section className="product-information" aria-labelledby="product-name"><p className="eyebrow">{concept ? "DEOLUXE / COLOUR STUDY" : piece.category === "Caps" ? "THE STATEMENT CAP" : piece.name === "BlackBoy Set" ? "THE BLACKBOY EDIT" : `THE ${piece.name.toUpperCase()} EDIT`}</p><h1 id="product-name">{piece.name}</h1><p className="detail-price">{concept ? "Colour concept" : piece.priceKobo !== null ? formatNaira(piece.priceKobo) : "Price pending confirmation"}</p><p className="detail-description">{piece.description}</p>
        <div className="chip-row" role="group" aria-label="Choose colour">{colours.map(colour => <button key={colour} className={`chip ${photo.colour === colour ? "chip--selected" : ""}`} aria-pressed={photo.colour === colour} onClick={() => selectPhoto(piece.gallery.findIndex(image => image.colour === colour))}>{colour === "Black / cream" ? "Black" : colour}</button>)}</div>
        {!concept && <><div className="size-heading"><span>{piece.category === "Caps" ? "Fit" : "Select your size"}</span>{piece.category !== "Caps" && <button type="button" className="text-button" onClick={() => setModal("size")}>Size guide</button>}</div><div id="size-options" tabIndex={-1} className="chip-row size-options" role="group" aria-label="Choose size" aria-describedby={message ? "size-error" : undefined}>{piece.sizes.map(value => <button key={value} type="button" className={`chip ${size === value ? "chip--selected" : ""}`} aria-pressed={size === value} onClick={() => { setSize(value); setMessage(""); }}>{value}</button>)}</div></>}
        {message && <p id="size-error" className="form-error" role="alert">{message}</p>}
        <button type="button" className="button button--primary product-primary" disabled={concept || !ready} onClick={primary}>{actionLabel}</button><FavouriteButton id={piece.id} name={piece.name} full />
        <p className="delivery-note">Delivery across Nigeria<br />Lagos ₦3,000 · Abuja ₦4,500 · Others ₦6,000</p>
        <details><summary>Product details</summary><p>{piece.description}</p><p>Garment composition, care instructions and exact measurements await confirmation.</p></details><details><summary>Delivery &amp; returns</summary><p>Preview delivery fees: Lagos ₦3,000, Abuja ₦4,500, other states ₦6,000. Delivery timelines and returns policy await Deoluxe confirmation.</p></details>
        <p className="preview-disclosure">{concept ? "Proposed colourway. No price or stock assigned." : "Design preview · price, sizes and current stock await confirmation. Bag selections are saved on this device; no purchase is placed."}</p>
      </section>
    </div>
    <section className="related-products"><h2>You may also like</h2><div className="product-grid">{related.filter(p => p.id !== piece.id && p.status !== "concept").slice(0, 4).map(p => <PreviewCard piece={p} key={p.id} />)}</div></section>
    <div className="product-purchase-bar"><span>{concept ? "Concept" : soldOut ? "Sold out" : piece.priceKobo !== null ? formatNaira(piece.priceKobo) : "Price pending"}</span><button type="button" disabled={concept || !ready} className="button button--primary" onClick={primary}>{actionLabel}</button></div>
    {modal && <Modal title={modal === "size" ? "Find your size" : modal === "notify" ? "First to know" : modal === "zoom" ? "Product photo" : "Added to your preview bag"} onClose={() => setModal(null)}>
      {modal === "size" && <><Icon name="sizeGrid" /><h2>Find your size.</h2><p>Measurements and fit notes will be confirmed by Deoluxe.</p><table className="size-table"><thead><tr><th>Size</th><th>Chest</th><th>Length</th></tr></thead><tbody>{piece.sizes.map(s => <tr key={s}><td>{s}</td><td>Pending</td><td>Pending</td></tr>)}</tbody></table><p className="preview-disclosure">PLACEHOLDER — official garment measurements</p><button className="button button--primary" onClick={() => setModal(null)}>Back to product</button></>}
      {modal === "zoom" && <><div className="zoom-photo"><Image src={`/images/products/${photo.image}.webp`} alt={photo.alt} fill sizes="90vw" className="object-contain" /></div><p>{photo.colour} · {index + 1} / {piece.gallery.length}</p><div className="chip-row">{piece.gallery.map((image, i) => <button className="chip" key={`${image.image}-${i}`} aria-label={`Enlarged photo ${i + 1}`} aria-pressed={index === i} onClick={() => selectPhoto(i)}>{i + 1}</button>)}</div></>}
      {modal === "added" && <><h2>A good choice.</h2><p>{piece.name} · {photo.colour} · {size} has been added to your preview bag.</p><p className="preview-disclosure">A device-local selection only. Prices and availability will need confirmation before checkout.</p><Link className="button button--primary" href="/cart" onClick={() => setModal(null)}>View selections</Link><button className="button button--secondary" onClick={() => setModal(null)}>Keep exploring</button></>}
      {modal === "notify" && <><Icon name="emptyHeart" /><h2>First to know.</h2><p>Leave your email or WhatsApp number. We’ll let you know when this piece returns.</p><div className="notify-image"><Image src={`/images/products/${photo.image}.webp`} alt={photo.alt} fill sizes="250px" className="object-contain" /></div><form className="notify-form" onSubmit={event => { event.preventDefault(); setMessage("Waitlist signup is not connected yet. No request was sent. Contact Deoluxe on Instagram for availability."); }}><label className="field-label">Email or WhatsApp<input className="text-input" required name="contact" maxLength={120} placeholder="you@example.com or 0800…" /></label><label className="consent-label"><input type="checkbox" required /> I agree to receive updates about this item.</label><p className="preview-disclosure">Preview only — waitlist signup is not connected yet.</p>{message && <p role="status">{message}</p>}<button className="button button--primary" type="submit">Notify me</button></form><a className="text-button" href="https://www.instagram.com/deolaluxury/" target="_blank" rel="noreferrer">Contact @deolaluxury</a></>}
    </Modal>}
  </div>;
}
