# Help the High Street (HTHS)

A replica of [hths.co.uk](https://www.hths.co.uk) built with Next.js 14 for Vercel.

## Quick Start

```bash
npm install
npm run dev
```

## Deploy to Vercel

Push to GitHub → import at [vercel.com](https://vercel.com) → Deploy (zero config).

## Font Setup

The site uses **Futura PT** via Adobe Fonts (Typekit). To activate it:

1. Go to [fonts.adobe.com](https://fonts.adobe.com) and add Futura PT to a web project
2. Copy your kit ID from the embed code
3. In `app/layout.tsx`, replace `your-kit-id` with your actual kit ID:
   ```html
   <link rel="stylesheet" href="https://use.typekit.net/YOUR-KIT-ID.css" />
   ```

The fallback stack is `'Futura', 'Century Gothic', sans-serif`.

## Reordering Everything

All ordering is controlled from **`config/siteConfig.ts`**. Every array directly controls display order — move items up/down to reorder.

| What to reorder | Array to edit |
|---|---|
| Homepage sections | `homepageSections` |
| Nav menu | `navigation` |
| Homepage merchandise carousel | `merchandiseItems` |
| Social media graphics (order page) | `socialGraphics` |
| Free products checkboxes | `complimentaryProducts` |
| Paid products checkboxes | `paidProducts` |
| Social platforms (homepage) | `socialPlatforms` |
| Shop photos | `partnerShops` |
| Depot dropdown options | `localDepots` |

## Order Page Structure

The order page has three sections:

1. **Social Media Graphics** — downloadable assets with preview thumbnails and download links
2. **Complimentary Products** — checkbox list (posters, recipe cards, marketing packs)
3. **Paid Products** — checkbox list with prices

Below these is the order form with: requirements textarea, name fields, company, depot dropdown, how-heard dropdown, phone, and email.

## Adding Items

### Add a social media graphic
```ts
{ id: "summer-fb", label: "Summer - Facebook", image: "/images/social-graphics/summer-fb.jpg", downloadUrl: "/images/social-graphics/summer-fb.jpg" },
```

### Add a complimentary product
```ts
{ id: "new-poster", label: "New Poster (A3)" },
```

### Add a paid product
```ts
{ id: "new-item", label: "New Item", price: "£5.00" },
```

## Replacing Placeholder Images

Place real images in `public/images/` and update paths in `config/siteConfig.ts`.

## Project Structure

```
config/siteConfig.ts    ← ALL ordering and content config
app/
  layout.tsx            Root layout (Typekit link here)
  page.tsx              Homepage
  globals.css           All styles
  order/page.tsx        Order page (3 sections + form)
  customer-pack/page.tsx
  more-info/page.tsx
components/
  Navbar.tsx
  Sections.tsx          All homepage section components
public/images/          Replace placeholders with real images
```
