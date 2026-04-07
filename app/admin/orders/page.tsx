"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "../auth";

interface Order {
  id: string;
  timestamp: string;
  firstName: string;
  lastName: string;
  company: string;
  depot: string;
  howHeard: string;
  phone: string;
  email: string;
  requirements: string;
  complimentarySelected: string[];
  paidSelected: string[];
}

export default function OrdersPage() {
  const { password } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/orders", { headers: { "x-admin-password": password } });
    if (res.ok) setOrders(await res.json());
  }, [password]);

  useEffect(() => { load(); }, [load]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-heading)", color: "var(--navy)", fontSize: "1.8rem" }}>Orders ({orders.length})</h1>
        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/admin" style={{ fontFamily: "var(--font-main)", fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: 1.5, color: "var(--navy)" }}>Products</Link>
          <Link href="/" style={{ fontFamily: "var(--font-main)", fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: 1.5, color: "var(--navy)" }}>Home</Link>
        </div>
      </div>

      {orders.length === 0 && <p style={{ color: "var(--text-light)", fontStyle: "italic" }}>No orders yet.</p>}

      {[...orders].reverse().map((order) => (
        <div key={order.id} style={{ background: "white", border: "1px solid var(--border)", borderRadius: 4, marginBottom: 8, overflow: "hidden" }}>
          <button
            onClick={() => setExpanded(expanded === order.id ? null : order.id)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 18px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-main)",
            }}
          >
            <span style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.9rem" }}>
              {order.firstName} {order.lastName} — {order.company}
            </span>
            <span style={{ color: "var(--text-light)", fontSize: "0.8rem" }}>
              {new Date(order.timestamp).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </span>
          </button>

          {expanded === order.id && (
            <div style={{ padding: "0 18px 18px", borderTop: "1px solid var(--border)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px", marginTop: 14, fontSize: "0.85rem" }}>
                <div><strong>Email:</strong> {order.email}</div>
                <div><strong>Phone:</strong> {order.phone || "—"}</div>
                <div><strong>Depot:</strong> {order.depot}</div>
                <div><strong>How heard:</strong> {order.howHeard || "—"}</div>
              </div>
              {order.requirements && (
                <div style={{ marginTop: 12, fontSize: "0.85rem" }}>
                  <strong>Requirements:</strong>
                  <p style={{ marginTop: 4, color: "var(--text-light)", whiteSpace: "pre-wrap" }}>{order.requirements}</p>
                </div>
              )}
              {order.complimentarySelected.length > 0 && (
                <div style={{ marginTop: 12, fontSize: "0.85rem" }}>
                  <strong>Complimentary items:</strong>
                  <ul style={{ marginTop: 4, paddingLeft: 20, color: "var(--text-light)" }}>
                    {order.complimentarySelected.map((id) => <li key={id}>{id}</li>)}
                  </ul>
                </div>
              )}
              {order.paidSelected.length > 0 && (
                <div style={{ marginTop: 12, fontSize: "0.85rem" }}>
                  <strong>Paid items:</strong>
                  <ul style={{ marginTop: 4, paddingLeft: 20, color: "var(--red)" }}>
                    {order.paidSelected.map((id) => <li key={id}>{id}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
