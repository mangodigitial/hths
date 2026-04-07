"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "./auth";

interface SocialGraphic { id: string; label: string; image: string; downloadUrl: string; }
interface CheckboxProduct { id: string; label: string; price?: string; image?: string; }
interface ProductsData { socialGraphics: SocialGraphic[]; complimentaryProducts: CheckboxProduct[]; paidProducts: CheckboxProduct[]; }

type Category = "socialGraphics" | "complimentaryProducts" | "paidProducts";

export default function AdminPage() {
  const { password, logout } = useAuth();
  const [products, setProducts] = useState<ProductsData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<Category>("socialGraphics");

  const load = useCallback(async () => {
    const res = await fetch("/api/products");
    setProducts(await res.json());
  }, []);

  useEffect(() => { load(); }, [load]);

  async function save(data: ProductsData) {
    setSaving(true);
    await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function removeItem(cat: Category, id: string) {
    if (!products) return;
    const updated = { ...products, [cat]: (products[cat] as { id: string }[]).filter((i) => i.id !== id) };
    setProducts(updated);
    save(updated);
  }

  function addItem(cat: Category) {
    if (!products) return;
    const id = Date.now().toString(36);
    const label = prompt("Enter label:");
    if (!label) return;

    if (cat === "socialGraphics") {
      const image = prompt("Image path (e.g. /images/social-graphics/new.jpg):", "/images/social-graphics/") || "";
      const item: SocialGraphic = { id, label, image, downloadUrl: image };
      setProducts({ ...products, socialGraphics: [...products.socialGraphics, item] });
      save({ ...products, socialGraphics: [...products.socialGraphics, item] });
    } else {
      const price = cat === "paidProducts" ? prompt("Price:") || undefined : undefined;
      const image = prompt("Image path (optional):") || undefined;
      const item: CheckboxProduct = { id, label, price, image };
      setProducts({ ...products, [cat]: [...(products[cat] as CheckboxProduct[]), item] });
      save({ ...products, [cat]: [...(products[cat] as CheckboxProduct[]), item] });
    }
  }

  // Drag and drop
  const dragItem = useRef<number | null>(null);
  const dragOver = useRef<number | null>(null);

  function handleDragStart(idx: number) { dragItem.current = idx; }
  function handleDragEnter(idx: number) { dragOver.current = idx; }

  function handleDragEnd() {
    if (!products || dragItem.current === null || dragOver.current === null) return;
    const list = [...(products[activeTab] as { id: string }[])];
    const [removed] = list.splice(dragItem.current, 1);
    list.splice(dragOver.current, 0, removed);
    const updated = { ...products, [activeTab]: list };
    setProducts(updated);
    save(updated);
    dragItem.current = null;
    dragOver.current = null;
  }

  if (!products) return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;

  const tabs: { key: Category; label: string }[] = [
    { key: "socialGraphics", label: "Social Media Graphics" },
    { key: "complimentaryProducts", label: "Complimentary Products" },
    { key: "paidProducts", label: "Paid Products" },
  ];

  const items = products[activeTab] as { id: string; label: string; price?: string; image?: string }[];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-heading)", color: "var(--navy)", fontSize: "1.8rem" }}>Admin Panel</h1>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/admin/orders" style={{ fontFamily: "var(--font-main)", fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: 1.5, color: "var(--navy)" }}>View Orders</Link>
          <Link href="/" style={{ fontFamily: "var(--font-main)", fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: 1.5, color: "var(--navy)" }}>Home</Link>
          <button onClick={logout} className="btn" style={{ fontSize: "0.7rem", padding: "6px 14px" }}>Logout</button>
        </div>
      </div>

      {saved && <div style={{ background: "#d4edda", color: "#155724", padding: "10px 16px", borderRadius: 4, marginBottom: 16, fontSize: "0.85rem" }}>Changes saved!</div>}

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 24, borderBottom: "2px solid var(--border)" }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            style={{
              padding: "10px 20px",
              fontFamily: "var(--font-main)",
              fontWeight: 700,
              fontSize: "0.78rem",
              textTransform: "uppercase",
              letterSpacing: 1,
              border: "none",
              background: activeTab === t.key ? "var(--navy)" : "transparent",
              color: activeTab === t.key ? "white" : "var(--navy)",
              cursor: "pointer",
              borderRadius: "4px 4px 0 0",
            }}
          >{t.label}</button>
        ))}
      </div>

      {/* Items list with drag-and-drop */}
      <div style={{ marginBottom: 20 }}>
        {items.map((item, idx) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragEnter={() => handleDragEnter(idx)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 14px",
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: 4,
              marginBottom: 4,
              cursor: "grab",
            }}
          >
            <span style={{ color: "var(--navy-muted)", fontSize: "1.1rem", userSelect: "none" }}>&#x2630;</span>
            {item.image && (
              <img src={item.image} alt="" style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 3 }} />
            )}
            <span style={{ flex: 1, fontFamily: "var(--font-main)", fontSize: "0.88rem", color: "var(--navy)" }}>
              {item.label}
              {item.price && <span style={{ color: "var(--red)", marginLeft: 8, fontWeight: 700 }}>{item.price}</span>}
            </span>
            <button
              onClick={() => removeItem(activeTab, item.id)}
              style={{
                background: "none",
                border: "1px solid var(--red)",
                color: "var(--red)",
                padding: "4px 10px",
                borderRadius: 3,
                cursor: "pointer",
                fontFamily: "var(--font-main)",
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >Remove</button>
          </div>
        ))}
      </div>

      <button
        onClick={() => addItem(activeTab)}
        className="btn"
        style={{ fontSize: "0.75rem" }}
        disabled={saving}
      >+ Add Item</button>
    </div>
  );
}
