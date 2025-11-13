import React, { useState } from "react";

export default function AdminPanel({ agent, agentCode = "DEFAULT", baseURL, onUpdateSoldItems }) {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [itemNumber, setItemNumber] = useState("");
  const [saving, setSaving] = useState(false);

  // change this or use an env var in production
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "123456";

  const handleLogin = () => {
    if (password === adminPassword) {
      setIsAuthorized(true);
      setPassword("");
    } else {
      alert("Invalid password");
    }
  };

  const persistToServer = async (newSoldItems) => {
    if (!baseURL) {
      // fallback: just update UI
      onUpdateSoldItems(newSoldItems);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${baseURL}/api/agents/${agentCode}/soldItems`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ soldItems: newSoldItems }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server returned ${res.status}: ${text}`);
      }
      // update UI after successful save
      onUpdateSoldItems(newSoldItems);
    } catch (err) {
      console.error("Failed saving soldItems:", err);
      alert("Failed to save sold items to server. See console for details.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddSoldItem = () => {
    const num = parseInt(itemNumber, 10);
    if (!num || agent.soldItems.includes(num)) {
      setItemNumber("");
      return;
    }
    const newSold = [...agent.soldItems, num].sort((a, b) => a - b);
    persistToServer(newSold);
    setItemNumber("");
  };

  const handleRemoveSoldItem = (item) => {
    const newSold = agent.soldItems.filter((i) => i !== item);
    persistToServer(newSold);
  };

  if (!isAuthorized) {
    return (
      <div style={{ padding: "12px", maxWidth: "320px", margin: "0 auto" }}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <button onClick={handleLogin} style={{ width: "100%", padding: "8px" }}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "12px", marginBottom: "18px", background: "#fff", borderRadius: 8 }}>
      <h4 style={{ margin: "6px 0" }}>Admin Panel — {agentCode}</h4>

      <div style={{ marginBottom: 12 }}>
        <input
          type="number"
          value={itemNumber}
          onChange={(e) => setItemNumber(e.target.value)}
          placeholder="Image number to mark sold"
          style={{ padding: "8px", marginRight: "8px" }}
        />
        <button onClick={handleAddSoldItem} disabled={saving} style={{ padding: "8px" }}>
          {saving ? "Saving…" : "Mark Sold"}
        </button>
      </div>

      <div>
        <strong>Sold items:</strong>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
          {agent.soldItems.slice().sort((a,b)=>a-b).map((s) => (
            <div key={s} style={{ background: "#f1f1f1", padding: "6px 10px", borderRadius: 16, display: "flex", gap: 8, alignItems: "center" }}>
              <span>#{s}</span>
              <button onClick={() => handleRemoveSoldItem(s)} disabled={saving} style={{ border: "none", background: "transparent", color: "red", cursor: "pointer" }}>
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
