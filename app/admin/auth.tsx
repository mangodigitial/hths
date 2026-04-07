"use client";
import { useState, useEffect, createContext, useContext } from "react";

const AuthCtx = createContext<{ password: string; logout: () => void }>({ password: "", logout: () => {} });
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_pw");
    if (saved) {
      verify(saved).then((ok) => {
        if (ok) setPassword(saved);
        setChecking(false);
      });
    } else {
      setChecking(false);
    }
  }, []);

  async function verify(pw: string) {
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    return res.ok;
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const ok = await verify(input);
    if (ok) {
      sessionStorage.setItem("admin_pw", input);
      setPassword(input);
    } else {
      setError("Invalid password");
    }
  }

  function logout() {
    sessionStorage.removeItem("admin_pw");
    setPassword("");
  }

  if (checking) {
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}><p>Loading...</p></div>;
  }

  if (!password) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "var(--cream)" }}>
        <form onSubmit={handleLogin} style={{ background: "white", padding: 40, borderRadius: 8, boxShadow: "var(--shadow-md)", maxWidth: 400, width: "100%" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--navy)", marginBottom: 24, textAlign: "center" }}>Admin Login</h2>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter admin password"
            style={{ width: "100%", padding: "12px 16px", border: "1px solid var(--border)", borderRadius: 4, fontFamily: "var(--font-main)", fontSize: "0.95rem", marginBottom: 16 }}
            autoFocus
          />
          {error && <p style={{ color: "var(--red)", fontSize: "0.85rem", marginBottom: 12 }}>{error}</p>}
          <button type="submit" className="btn btn-filled" style={{ width: "100%" }}>Login</button>
        </form>
      </div>
    );
  }

  return <AuthCtx.Provider value={{ password, logout }}>{children}</AuthCtx.Provider>;
}
