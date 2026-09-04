import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/auth";
import AdminProductActions from "./AdminProductActions";
import LogoutButton from "./LogoutButton";
import AccountSettings from "./AccountSettings";

// Reachable only by ADMIN — enforced by middleware.ts.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const session = token ? await verifySession(token) : null;

  const products = await prisma.product.findMany({
    include: { swatches: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Admin — Products</h1>
        <div>
          {session && <AccountSettings currentEmail={session.email} />}
          <LogoutButton />
        </div>
      </div>

      <p style={{ opacity: 0.7, margin: "24px 0" }}>
        {products.length} product{products.length === 1 ? "" : "s"} in the database. Changes here
        write directly to Postgres — the homepage reflects them on next load.
      </p>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #444" }}>
            <th style={{ padding: 8 }}>Title</th>
            <th style={{ padding: 8 }}>Section</th>
            <th style={{ padding: 8 }}>Price</th>
            <th style={{ padding: 8 }}>Swatches</th>
            <th style={{ padding: 8 }}></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid #2a2a2a" }}>
              <td style={{ padding: 8 }}>{p.title}</td>
              <td style={{ padding: 8 }}>{p.section}</td>
              <td style={{ padding: 8 }}>{p.newPrice}</td>
              <td style={{ padding: 8 }}>{p.swatches.length}</td>
              <td style={{ padding: 8 }}>
                <AdminProductActions productId={p.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ marginTop: 24, fontSize: 13, opacity: 0.6 }}>
        Full create/edit forms live behind <code>/api/admin/products</code> (POST/PUT/DELETE) —
        wire up a form here or call it from an internal tool/Postman while the UI is still minimal.
      </p>
    </div>
  );
}
