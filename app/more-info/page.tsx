import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Sections";
import Link from "next/link";

export default function MoreInfoPage() {
  return (
    <>
      <Navbar />
      <div className="order-page">
        <Link href="/" className="back-link">&larr; Back to Home</Link>
        <div className="order-hero">
          <h1>More Information</h1>
          <p>Find out how we can help you grow your business and engage with your customers.</p>
        </div>
        <div className="order-section order-section-white">
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <h3 className="order-section-title">Social Media Support</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div><strong style={{ color: "var(--navy)", fontFamily: "var(--font-main)", textTransform: "uppercase", fontSize: "0.82rem", letterSpacing: "0.5px" }}>Facebook</strong><p style={{ fontSize: "0.88rem", color: "var(--text-light)", marginTop: 4 }}>Learn how to create a business page, post engaging content, run promotions and interact with your customers.</p></div>
              <div><strong style={{ color: "var(--navy)", fontFamily: "var(--font-main)", textTransform: "uppercase", fontSize: "0.82rem", letterSpacing: "0.5px" }}>Instagram</strong><p style={{ fontSize: "0.88rem", color: "var(--text-light)", marginTop: 4 }}>Showcase your products with beautiful photos, use Stories to share behind-the-scenes content, and build a following.</p></div>
              <div><strong style={{ color: "var(--navy)", fontFamily: "var(--font-main)", textTransform: "uppercase", fontSize: "0.82rem", letterSpacing: "0.5px" }}>Mailchimp</strong><p style={{ fontSize: "0.88rem", color: "var(--text-light)", marginTop: 4 }}>Set up email campaigns to keep your customers informed about new products, special offers and events.</p></div>
            </div>
          </div>
        </div>
        <div className="order-section order-section-peach">
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <h3 className="order-section-title">Your Own Online Shop</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Customers choose exact weight or quantities","Preferred collection date and time selection","Optional delivery service","Easy to manage product listings","Mobile-friendly design"].map((f) => (
                <p key={f} style={{ fontSize: "0.88rem", color: "var(--navy)" }}>• {f}</p>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 28 }}><Link href="/#contact" className="btn">Get in Touch</Link></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
