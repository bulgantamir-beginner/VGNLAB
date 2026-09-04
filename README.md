# VGN Gaming Peripherals — Next.js App

Next.js (App Router) + TypeScript storefront backed by PostgreSQL via Prisma,
with custom JWT-based auth and an admin area for managing the product catalog.

## Setup (you already have Postgres + an initial migration applied)

```bash
npm install
```

Update `.env`:
- Fix `DATABASE_URL` — it currently points at a database literally named
  `DATABASE` with password `1234`. Create a real database (e.g. `vgn`) and
  use a real password before deploying anywhere.
- Set a real `JWT_SECRET` (`openssl rand -base64 32`).
- Set `ADMIN_BOOTSTRAP_SECRET` to any random string (used once, see below).

Then apply the new schema changes (adds `User` table + converts `section`
from plain text to a real `ProductSection` enum):

```bash
npm run db:generate
npx prisma migrate dev
```

Prisma will ask for a migration name — anything like `add_auth_and_enums`
works. It will detect the existing data matches the enum values already, so
the column conversion should apply cleanly.

Re-seed if you want the starter catalog reloaded (this wipes and reloads
`Product`/`Swatch`, not `User`/`NewsletterSubscriber`):

```bash
npm run db:seed
```

## Creating your admin account

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@company.com","password":"a-strong-password","adminSecret":"<ADMIN_BOOTSTRAP_SECRET from .env>"}'
```

(Port is `3001` — see `server.js`. Adjust if you changed `PORT`.)

This logs you in immediately and marks the account `ADMIN`. After this,
**remove or rotate `ADMIN_BOOTSTRAP_SECRET`** in `.env` — it's a setup-only
bypass, not something that should stay valid in production.

Then visit `/admin` to manage products, or `/login` to sign back in later.

```bash
npm run dev
```

## Architecture — where things live

- **Products are database-backed, not hardcoded.** `app/page.tsx` is a
  Server Component that queries Postgres directly via `lib/products.ts` on
  every request (`export const dynamic = "force-dynamic"`). `lib/data.ts`
  is only ever read by `prisma/seed.ts` — it seeds the DB once and is not
  touched at runtime by the site itself.
- **Auth:** `lib/auth.ts` (bcrypt password hashing, JWT sign/verify via
  `jose` — Edge-compatible) + `app/api/auth/{register,login,logout,me}`.
- **Route guards:**
  - `middleware.ts` at the project root centrally protects `/admin/*` and
    `/api/admin/*` — redirects to `/login` for pages, returns 403 for API
    calls. This is the single place that enforces "must be an admin"
    rather than repeating the check in every route file.
  - `lib/api-guards.ts` — per-route guards (rate limiting, zod body
    validation, `requireAuth`/`requireAdmin` helpers for use inside
    individual handlers) applied to `/api/newsletter`, `/api/products`,
    and the auth routes.
- **Admin CRUD:** `app/api/admin/products/route.ts` (list/create) and
  `app/api/admin/products/[id]/route.ts` (get/update/delete), reachable
  only by an authenticated `ADMIN` session. `app/admin/page.tsx` is a
  minimal dashboard on top of it (list + delete; POST/PUT via the API
  directly for now).
- **Security headers:** set globally via `headers()` in `next.config.js`
  (X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy,
  Permissions-Policy) — the Next-native equivalent of Express's `helmet`,
  applying whether you run `server.js` or plain `next start`, since
  `server.js` just delegates every request to Next's own handler.
- **`server.js`:** custom Node server — request logging + graceful Prisma
  disconnect on shutdown. `npm run dev` / `start` use it by default;
  `npm run dev:next` / `start:next` run plain Next.js if you'd rather not.

## Database commands

```bash
npm run db:studio     # visual DB browser at http://localhost:5555
npm run db:seed       # re-seed / reset the product catalog (edit lib/data.ts first)
npm run db:migrate    # apply schema changes after editing prisma/schema.prisma
```

## Deployment checklist

- [ ] `DATABASE_URL` points at a real production Postgres database (not
      one named "DATABASE" with password "1234") — add `?sslmode=require`
      if your host needs it (Neon, Supabase, RDS, etc.)
- [ ] `JWT_SECRET` is a real random 32+ character value, different from dev
- [ ] `ADMIN_BOOTSTRAP_SECRET` is rotated/removed after the first admin
      account is created
- [ ] `.env` is not committed (already covered by `.gitignore`)
- [ ] `npx prisma migrate deploy` has been run against production (use
      `deploy`, not `dev`, in CI/production — it doesn't prompt and
      doesn't try to reset anything)
- [ ] `npm run db:seed` run once against production if you want the
      starter catalog there, otherwise manage products via `/admin`
- [ ] Product images referenced in `lib/data.ts` / the DB exist under
      `/public/images` or are swapped for real hosted URLs
