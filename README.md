Repairs & Maintenance Management System
A Next.js catalog site for selling shoes, with WhatsApp-based order checkout — no backend, no database, no payment gateway.

---

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS v4
- **Data:** Local JSON file (`src/data/shoes.json`)
- **Cart Storage:** Browser `localStorage`
- **Checkout:** WhatsApp deep links (`wa.me`)
- **Hosting:** Vercel (free tier)
- **Version Control:** Git + GitHub

---

## Live Demo

🔗 https://shoe-store-indol.vercel.app

Note: Orders are submitted via WhatsApp. Click **Checkout via WhatsApp** in the cart to send an itemized order message to the merchant.

---

## Local Setup

1. Clone repo
   ```bash
   git clone https://github.com/nayidah36-pixel/shoe-store.git
   cd shoe-store
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Run the dev server
   ```bash
   npm run dev
   ```
4. Access via `http://localhost:3000`

---

## Configuration

**WhatsApp number** — update in two places (international format, no `+`, no spaces):

- `src/lib/whatsapp.ts` → `const WHATSAPP_NUMBER = '254712345678';`
- `src/app/page.tsx` → `merchantPhoneNumber="254712345678"`

**Currency rate** — `src/lib/whatsapp.ts` → `const KES_RATE = 130;`

---

## Features

- Browse shoes by category (Men, Women, Kids, Sports, Boots)
- Live search across product names and brands
- Filter by gender, category, brand, price
- Size picker modal before adding to cart
- Cart persists across page refreshes and browser sessions
- One-tap WhatsApp checkout with itemized order details

---

## Project Structure

```
shoe-store/
├── public/images/shoes/      # Product photos
├── src/
│   ├── app/                  # Pages + layout
│   ├── components/           # Header, Hero, BestSellers, CartDrawer, etc.
│   ├── data/shoes.json       # Product catalog
│   ├── lib/whatsapp.ts       # WhatsApp message builder
│   └── types/shoe.ts         # TypeScript types
├── package.json
└── README.md
```

Save the matching photo in `public/images/shoes/` using the same `id` as the filename (lowercase, dashes, no spaces).

---

## Deployment

Pushes to `main` auto-deploy to Vercel in ~60 seconds.

```bash
git add .
git commit -m "Update catalog"
git push
```

No environment variables are required.

---

## Troubleshooting

- **Image broken on live site but works locally** → filename case mismatch (Linux is case-sensitive)
- **Cart empties on refresh** → ensure `cartHydrated` flag is present in `page.tsx`
- **WhatsApp opens with no message** → check `WHATSAPP_NUMBER` format (no `+`, no spaces)
- **Build fails on Vercel but passes locally** → run `npm run build` locally first

---

## License

Private project. All rights reserved.