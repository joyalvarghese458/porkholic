# PorkHolic

A frontend-only, one-page pig farm website. Next.js App Router, strict TypeScript, Tailwind, Motion and Lucide. Static export; no backend, forms, analytics or API routes. Prepared locally for Vercel; no hosting account has been configured.

## Development

```powershell
cd C:\Users\mariy\OneDrive\Documents\VSCODE\porkholic
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` produces the deployable `out/` directory. Commit package-lock.json and use `npm ci` for reproducible builds.

## Images

The navbar, mobile menu and footer use the complete supplied logo artwork, with no separate typed brand name. The latest original is preserved in `_assets/logo-supplied.png`; transparent logo variants are used from `public/images/logo-transparent.webp`. CSS changes only the black wordmark and descriptor to white on dark backgrounds, retaining the red wordmark and pink mascot. Browser and application icons use a simplified pig-face asset for clarity at small sizes. Its source and generation details are in `_assets/FAVICON-PROMPT.md`.

All five farm images are photorealistic AI-generated visuals, not photographs of PorkHolic. Originals live in `_assets/`, with responsive WebP versions in `public/images/`. Generation details and prompts are recorded in `_assets/IMAGE-PROMPTS.md`.

Run `npm run images` after replacing originals to regenerate WebP variants, blur previews, icons and the social preview.

## Configuration

Edit `src/config/site.ts` for phone numbers, Instagram and Facebook URLs (empty and hidden by default),. Use only confirmed business details.

Set `NEXT_PUBLIC_SITE_URL=https://your-confirmed-domain.example` in `.env.local` for local builds and Vercel environment settings for deployment. The default `https://example.com` is a configuration placeholder, **not a claimed PorkHolic domain**. Set it before publishing so canonical, Open Graph, sitemap, robots and JSON-LD use the actual domain. Public environment variables are embedded at build time; rebuild after changing them.

## Vercel

1. Push this directory to your Git repository and import it in Vercel, selecting `porkholic` as the root if using a monorepo.
2. Use Next.js detection, install `npm ci`, build `npm run build`, output directory `out`. No server is required.
3. Set NEXT_PUBLIC_SITE_URL to the final production origin and deploy.
4. Add the custom domain under Project Settings → Domains, follow the displayed DNS instructions, then rebuild with the final URL.

The committed optimized assets are ready to build. After changing source images, run `npm run images` and commit both originals and outputs before deploying.

## Verification

```powershell
npm run images
npm run lint
npx tsc --noEmit
npm run build
npx playwright install chromium
npm run qa
```

QA serves `out/` temporarily on port 4173. It checks overflow at 320, 360, 375, 390, 430, 768, 1024, 1280 and 1536px; navigation focus trapping and Escape; gallery arrows and focus return; sticky controls; anchors, telephone/WhatsApp/map destinations; image preload; heading count; and reduced motion. Screenshots of every major section at 360×800 and 1440×900 are saved in `qa/`, along with full-page screenshots and results.json. These checks validate link destinations; they do not place calls or send messages.

Fonts are served locally in the export via next/font; a first build needs access to Google Fonts to obtain Fraunces and Manrope. No external font requests occur when visitors use the site.
