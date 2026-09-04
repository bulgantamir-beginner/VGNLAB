"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AccountSettings({ currentEmail }: { currentEmail: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const body: Record<string, string> = { currentPassword };
    if (newEmail) body.newEmail = newEmail;
    if (newPassword) body.newPassword = newPassword;

    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed.");

      setStatus("success");
      setMessage("Account updated.");
      setCurrentPassword("");
      setNewEmail("");
      setNewPassword("");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Update failed.");
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} style={{ marginLeft: 8 }}>
        Account settings
      </button>
    );
  }

  return (
    <div style={{ border: "1px solid #444", padding: 16, marginTop: 16, maxWidth: 360 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>Update account ({currentEmail})</strong>
        <button onClick={() => setOpen(false)}>✕</button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
        <label style={{ fontSize: 13 }}>
          Current password (required)
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }}
          />
        </label>

        <label style={{ fontSize: 13 }}>
          New email (optional)
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder={currentEmail}
            style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }}
          />
        </label>

        <label style={{ fontSize: 13 }}>
          New password (optional, 8+ chars)
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ display: "block", width: "100%", padding: 8, marginTop: 4 }}
          />
        </label>

        {message && (
          <p style={{ fontSize: 13, color: status === "error" ? "#ff6b6b" : "#6bff8f" }}>
            {message}
          </p>
        )}

        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}
