"use client";
import { useState } from "react";
import { navigation, siteMeta } from "@/config/siteConfig";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/"><img src={siteMeta.logo} alt={siteMeta.title} className="nav-logo" /></Link>
        <button className={`mobile-toggle ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          <span /><span /><span />
        </button>
        <ul className={`nav-links ${open ? "open" : ""}`}>
          {navigation.map((item) => (
            <li key={item.label}>
              {item.href.startsWith("/") ? (
                <Link href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
              ) : (
                <a href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
