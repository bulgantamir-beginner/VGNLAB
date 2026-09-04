import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <h2>404 - Page Not Found</h2>
      <p style={{ margin: "16px 0" }}>The page you are looking for does not exist.</p>
      <Link href="/" style={{ textDecoration: "underline" }}>
        Return Home
      </Link>
    </div>
  );
}