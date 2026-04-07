import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Sections";
import Link from "next/link";

export default function CustomerPackPage() {
  return (
    <>
      <Navbar />
      <div className="order-page">
        <Link href="/" className="back-link">&larr; Back to Home</Link>
        <div className="order-hero">
          <h1>Customer Pack</h1>
          <p>Our free customer pack is designed to help your business thrive on the high street.</p>
        </div>
        <div className="order-section order-section-peach">
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <h3 className="order-section-title">What&apos;s Included</h3>
            <div className="checkbox-grid" style={{ gridTemplateColumns: "1fr" }}>
              {["Social media how-to guides (Facebook, Instagram, Mailchimp)","Sign-up postcards for building your mailing list","Window sticker for your shop front","Information on our website service","Details on reusable containers for customers","In-store merchandise options"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
                  <span style={{ color: "var(--navy)", fontSize: "0.9rem" }}>• {item}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 32 }}><Link href="/order" className="btn">Order Your Pack</Link></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
