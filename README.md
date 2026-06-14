# loyalty-web-backoffice

Next.js operational panel — backoffice UI for the loyalty platform.

Part of the **backoffice vertical**: **`web-backoffice`** → `bff-backoffice` → `core-backoffice` + `core-points`

---

## What it shows

A real-time operational dashboard for loyalty program operators:

- **Dashboard** — live KPIs from `core-points`: enrollments, logins, password changes, total points in circulation, lifetime accrued vs redeemed
- **Customer detail** — customer profile with real point balance and full transaction history audit trail
- **Source badge** — `live` / `mock` indicator so operators know when data is real

---

## Pages

| Route | Description |
|---|---|
| `/[locale]` | Operational dashboard with KPIs, queues, customer snapshots, recent point flows |
| `/[locale]/customers/:customerId` | Customer detail: profile + point balance + transaction history |
| `/[locale]/orders/:orderId` | Order snapshot |

Supports `es` (Spanish) and `en` (English) locales.

---

## Tech stack

- **Next.js 15** (App Router, Server Components)
- **TypeScript**
- i18n with locale routing (`/es/...`, `/en/...`)

---

## Running locally

```bash
cp .env.example .env.local
npm install
npm run dev
# → http://localhost:3008
```

### Environment variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3008` | HTTP listen port |
| `BFF_BACKOFFICE_BASE_URL` | `http://localhost:3003` | bff-backoffice URL |

---

## Part of loyalty-platform

See the [monorepo root](https://github.com/PabloJTechDev/loyalty-platform) for the full architecture, port map, and Docker Compose setup.
