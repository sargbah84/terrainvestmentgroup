# Terra Investment Group — terraliberia.com

Next.js 16 (App Router) + Tailwind CSS 4. Same stack as terramarketgroup.

```bash
npm install
cp .env.example .env.local   # fill in SeoJama + Mailgun keys
npm run dev                  # http://localhost:5184
npm run build && npm start
```

## Pages

| Route | Notes |
| --- | --- |
| `/` | Homepage — built from `ui/homepage.png` |
| `/about` | Story, mission & vision, values, journey, group companies |
| `/our-work`, `/our-work/[slug]` | Sector overview + 5 sector pages |
| `/impact` | Stats, programs, communities, photo gallery |
| `/team` | Full team, grouped |
| `/news`, `/news/[slug]` | Posts from the SeoJama headless API (revalidated hourly) |
| `/contact` | Form → `/api/contact` → Mailgun (honeypot + optional Turnstile). `?subject=Partnership` preselects the subject |

## Editing content

Almost all copy lives in **`src/lib/site.ts`**: nav, sectors, team, stats, communities,
gallery, ventures, and social links (empty URLs are hidden).

Design tokens (colors, font) are in `src/app/globals.css` under `@theme`.

## Images

`public/images/` — team headshots and field photos come from the original Terra site.
Stock photos (hero landscape, hero cocoa, sector cards for transportation / technology /
digital content, impact & CTA backgrounds) are CC0 / public domain from StockSnap and
Wikimedia Commons, 960–1024px wide. Swap in higher-resolution or your own photos with the
same filenames.

## News (SeoJama)

Set `SEOJAMA_WORKSPACE_ID` and `SEOJAMA_API_KEY` for the Terra Investment Group workspace.
Without them the News page shows a "No news yet" state. API client: `src/lib/news.ts`.
