"use client";
import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Sections";
import { localDepots, howHeardOptions } from "@/config/siteConfig";

interface SocialGraphic {
  id: string;
  label: string;
  image: string;
  downloadUrl: string;
}
interface CheckboxProduct {
  id: string;
  label: string;
  price?: string;
  image?: string;
}
interface ProductsData {
  socialGraphics: SocialGraphic[];
  complimentaryProducts: CheckboxProduct[];
  paidProducts: CheckboxProduct[];
}

export default function OrderPage() {
  const [products, setProducts] = useState<ProductsData | null>(null);
  const [selectedFree, setSelectedFree] = useState<Set<string>>(new Set());
  const [selectedPaid, setSelectedPaid] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/products").then((r) => r.json()).then(setProducts);
  }, []);

  const toggleItem = (
    set: Set<string>,
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
    id: string
  ) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setter(next);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const body = {
      requirements: formData.get("requirements"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      company: formData.get("company"),
      depot: formData.get("depot"),
      howHeard: formData.get("howHeard"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      complimentarySelected: Array.from(selectedFree),
      paidSelected: Array.from(selectedPaid),
    };
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSubmitting(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="order-page">
          <div className="form-success">
            <h3>Thank you for your order!</h3>
            <p>We have received your request and will be in contact to finalise your order.</p>
            <Link href="/" className="btn" style={{ marginTop: 16 }}>Back to Home</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!products) {
    return (
      <>
        <Navbar />
        <div className="order-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
          <p style={{ marginTop: 120 }}>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="order-page">
        {/* ─── HERO ─────────────────────────────── */}
        <section className="hero" style={{ alignItems: "center" }}>
          <div className="hero-text">
            <h1>Order<br />Merchandise</h1>
          </div>
          <div className="hero-image">
            <img src="/images/hero-butcher.jpg" alt="Order Merchandise" />
          </div>
        </section>

        {/* ─── BLUE BANNER ──────────────────────── */}
        <div className="blue-banner">
          <h2>Our range of in-store merchandise is perfect to give to your customers, so they know<br />why it&apos;s important to shop with you!</h2>
          <div className="chevron-down">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><polyline points="6,12 16,22 26,12" stroke="white" strokeWidth="2" fill="none" /></svg>
          </div>
        </div>

        {/* ─── SOCIAL MEDIA GRAPHICS ────────────── */}
        <div className="order-section order-section-white">
          <h3 className="order-section-title">Social Media Graphics</h3>
          <div className="smg-grid">
            {products.socialGraphics.map((g) => (
              <div key={g.id} className="smg-card">
                <div className="smg-card-label">{g.label}</div>
                <div className="smg-card-preview">
                  <img src={g.image} alt={g.label} />
                </div>
                <a href={g.downloadUrl} download className="smg-download">Download</a>
              </div>
            ))}
          </div>
        </div>

        {/* ─── COMPLIMENTARY MERCHANDISE ─────────── */}
        <div className="order-section order-section-white">
          <h3 className="order-section-title">Complimentary Merchandise</h3>
          <div className="smg-grid">
            {products.complimentaryProducts.filter((p) => p.image).map((p) => (
              <div key={p.id} className="smg-card">
                <div className="smg-card-label">{p.label}</div>
                <div className="smg-card-preview">
                  <img src={p.image} alt={p.label} />
                </div>
                <span style={{ color: "var(--red)", fontWeight: 700, fontSize: "0.85rem", fontFamily: "var(--font-main)" }}>FREE</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── PAID PRODUCTS ────────────────────── */}
        <div className="order-section order-section-white">
          <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
            <div style={{ borderTop: "1px solid var(--border)", marginBottom: 32 }} />
          </div>
          <h3 className="order-section-title">Paid Products</h3>
          <div className="smg-grid">
            {products.paidProducts.map((p) => (
              <div key={p.id} className="smg-card">
                <div className="smg-card-label">{p.label}</div>
                {p.image && (
                  <div className="smg-card-preview">
                    <img src={p.image} alt={p.label} />
                  </div>
                )}
                <span style={{ color: "var(--red)", fontWeight: 700, fontSize: "0.85rem", fontFamily: "var(--font-main)" }}>{p.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── ORDER FORM ────────────────────────── */}
        <form onSubmit={handleSubmit}>
          <div className="order-form-wrap">
            <div className="order-form-inner">
              <h3 style={{ textAlign: "center", color: "var(--navy)", fontSize: "clamp(1rem, 2.5vw, 1.3rem)", marginBottom: 24, fontFamily: "var(--font-heading)" }}>
                Prices include delivery. Select which products you are interested in below and we will be in contact to finalise your order.
              </h3>

              {/* Complimentary checkboxes */}
              <h4 className="order-section-title" style={{ marginBottom: 16 }}>Complimentary Products</h4>
              <div className="checkbox-grid" style={{ marginBottom: 32 }}>
                {products.complimentaryProducts.map((item) => (
                  <label key={item.id} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={selectedFree.has(item.id)}
                      onChange={() => toggleItem(selectedFree, setSelectedFree, item.id)}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>

              <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", margin: "24px 0" }} />

              {/* Paid checkboxes */}
              <h4 className="order-section-title" style={{ marginBottom: 16 }}>Paid Products</h4>
              <div className="checkbox-grid" style={{ marginBottom: 32 }}>
                {products.paidProducts.map((item) => (
                  <label key={item.id} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={selectedPaid.has(item.id)}
                      onChange={() => toggleItem(selectedPaid, setSelectedPaid, item.id)}
                    />
                    <span>
                      {item.label}
                      {item.price && <span className="checkbox-item-price"> — {item.price}</span>}
                    </span>
                  </label>
                ))}
              </div>

              <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)", margin: "24px 0" }} />

              {/* Form fields */}
              <div className="of-full">
                <textarea name="requirements" placeholder="Enter any specific requirements here" />
              </div>
              <div className="of-row">
                <input type="text" name="firstName" placeholder="First Name" required />
                <input type="text" name="lastName" placeholder="Last Name" required />
              </div>
              <div className="of-full">
                <input type="text" name="company" placeholder="Company Name" required />
              </div>
              <div className="of-row">
                <select name="depot" required defaultValue="">
                  {localDepots.map((d, i) => (
                    <option key={d} value={i === 0 ? "" : d} disabled={i === 0}>{d}</option>
                  ))}
                </select>
                <select name="howHeard" defaultValue="">
                  {howHeardOptions.map((o, i) => (
                    <option key={o} value={i === 0 ? "" : o} disabled={i === 0}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="of-row">
                <input type="tel" name="phone" placeholder="Phone Number" />
                <input type="email" name="email" placeholder="Email Address" required />
              </div>
              <div className="of-submit">
                <button type="submit" className="btn btn-filled" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Order"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
