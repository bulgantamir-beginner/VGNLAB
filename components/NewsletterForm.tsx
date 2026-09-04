"use client";

import { useState } from "react";

export default function NewsletterForm({
  className,
  placeholder,
  buttonLabel,
  source,
}: {
  className: string;
  placeholder: string;
  buttonLabel: string;
  source: "newsletter" | "footer";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      setStatus("success");
      setMessage("Thanks for subscribing!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div>
      <form className={className} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder={placeholder}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "..." : buttonLabel}
        </button>
      </form>
      {message && (
        <p
          style={{
            fontSize: "0.8rem",
            marginTop: "6px",
            color: status === "error" ? "#ff6b6b" : "inherit",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
