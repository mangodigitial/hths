"use client";
import { useRef } from "react";
import Link from "next/link";
import { siteMeta, merchandiseItems, socialPlatforms, partnerShops } from "@/config/siteConfig";

export function WelcomeSection() {
  return (
    <section id="welcome" className="hero">
      <div className="hero-text"><h1>Welcome<br />to Help the<br />High Street</h1></div>
      <div className="hero-image"><img src={siteMeta.heroImage} alt="Help the High Street" /></div>
    </section>
  );
}

export function BlueBanner() {
  return (
    <div className="blue-banner">
      <h2>A helping hand in<br />challenging times</h2>
      <p>The campaign sets out to support you and ensure your customers always shop with you.</p>
      <div className="chevron-down">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><polyline points="8,15 20,27 32,15" stroke="white" strokeWidth="2.5" fill="none" /></svg>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <h2 className="section-title">Order your<br />customer pack</h2>
        <div style={{ height: 32 }} />
        <div className="pack-image"><img src={siteMeta.marketingPackImage} alt="Marketing Pack" /></div>
        <p className="pack-text">The Help the High Street marketing pack provides ideas and support to help ensure your customers understand why it is important to always shop on the high street and shop with you.</p>
        <div className="pack-features">
          <div className="pack-feature">
            <strong>Social Media</strong>
            <p>How to guides on using Mailchimp, Facebook and Instagram. We appreciate some businesses do already use these platforms, but if you do not, these are worth considering as a way to promote yours.</p>
          </div>
          <div className="pack-feature">
            <strong>Website Service</strong>
            <p>We can offer you a website from which to promote your business and sell online. If you do not already have a website, this service provides you with the means to have one put in place quickly through us.</p>
          </div>
          <div className="pack-feature">
            <strong>Sign Up Postcards</strong>
            <p>If you are thinking about using Mailchimp as a way of emailing out to your customers with your latest news, then build your email list by using our sign up postcards! We can supply you with a set, each individually numbered. Once a customer has completed their details, we will enter them into a draw to win a holiday to the Caribbean! You can order your set of postcards from us free of charge!</p>
          </div>
          <div className="pack-feature">
            <strong>Reusable Containers</strong>
            <p>We can offer you sets of reusable containers to give to your customers. These are perfect for containing purchases, and your customers can bring them back each time they visit to use for their next purchase.</p>
          </div>
          <div className="pack-feature">
            <strong>In-Store Merchandise</strong>
            <p>In-store merchandise &ndash; we have a selection of items you can purchase from us to use in your shop and to give away to your customers. For more details click here.</p>
          </div>
          <div className="pack-feature">
            <strong>Window Stickers</strong>
            <p>Our window stickers keep the message alive, so why not order one from us to pop in your shop window?</p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}><Link href="/order" className="btn">Get Yours</Link></div>
      </div>
    </section>
  );
}

export function SocialSection() {
  return (
    <section id="social" className="section social-section">
      <div className="section-inner">
        <h2 className="section-title">Let us help you get social</h2>
        <div style={{ height: 36 }} />
        <div className="social-grid">
          {socialPlatforms.map((p) => (
            <div key={p.id} className="social-item">
              <div className="social-icon"><img src={p.icon} alt={p.title} /></div>
              <h4>{p.title}</h4>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 8 }}><Link href="/order" className="btn">More Info</Link></div>
      </div>
    </section>
  );
}

export function MerchandiseSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => { trackRef.current?.scrollBy({ left: d * 220, behavior: "smooth" }); };
  return (
    <section id="merchandise" className="section">
      <div className="section-inner">
        <h2 className="section-title">Merchandise</h2>
        <p className="section-subtitle">Our range of in-store merchandise is perfect to give to your customers, so they know why it&apos;s important to shop with you!</p>
        <div className="merch-carousel">
          <button className="carousel-btn carousel-prev" onClick={() => scroll(-1)} aria-label="Previous">&#8249;</button>
          <div className="merch-track" ref={trackRef}>
            {merchandiseItems.map((item) => (
              <div key={item.id} className="merch-card">
                <div className="merch-card-label">{item.title}</div>
                <img src={item.image} alt={item.title} />
              </div>
            ))}
          </div>
          <button className="carousel-btn carousel-next" onClick={() => scroll(1)} aria-label="Next">&#8250;</button>
        </div>
        <div style={{ textAlign: "center" }}><Link href="/order" className="btn">Order Now</Link></div>
      </div>
    </section>
  );
}

export function WebSection() {
  return (
    <section id="web" className="section shop-section">
      <div className="section-inner">
        <h2 className="section-title">Your own online shop</h2>
        <div style={{ height: 32 }} />
        <div className="shop-grid">
          <div className="shop-text">
            <h3>Let your customers order via your own online shop.</h3>
            <h3>Customers can choose exact weight or quantities of their products.</h3>
            <h3>When they checkout you can offer them a choice of preferred collection date and time or even delivery if you wish.</h3>
          </div>
          <div className="shop-image"><img src={siteMeta.laptopImage} alt="Online Shop Preview" /></div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="section contact-section">
      <div className="section-inner">
        <h2 className="section-title">I&apos;d like some help!</h2>
        <p className="section-subtitle" style={{ fontStyle: "italic" }}>Send us your contact details and we&apos;ll get to work on helping you and your business straight away.</p>
        <div className="contact-form-row">
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Business Name" />
          <input type="email" placeholder="Email" />
        </div>
        <div style={{ textAlign: "center" }}><button className="btn btn-peach">Submit</button></div>
      </div>
    </section>
  );
}

export function ShopGallery() {
  return (
    <div className="shop-photos">
      {partnerShops.map((s) => <img key={s.name} src={s.image} alt={s.name} />)}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo"><img src={siteMeta.logoWhite} alt={siteMeta.title} /></div>
      <h3>Contact Us</h3>
      <p><a href={`mailto:${siteMeta.contactEmail}`}>{siteMeta.contactEmail}</a></p>
    </footer>
  );
}
