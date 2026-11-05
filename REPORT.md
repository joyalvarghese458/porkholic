# Delivery report

Updated November 5, 2026.

The navbar, mobile menu, and footer display the complete supplied PorkHolic logo image, including its original wordmark and descriptor. No separate typed brand name is added. The source is preserved at `_assets/logo-supplied.png`, with transparent variants at `public/images/logo-transparent.webp`. The navbar overlays the hero with warm-white lettering, then switches to black lettering on the light scrolled navbar. The cream logo background was removed; CSS recolors just the wordmark and descriptor on dark backgrounds, keeping the pig artwork and red lettering.

Five photorealistic AI-generated farm images replace the illustrated placeholders. Original PNGs are in `_assets/`; responsive WebP variants and blur previews are generated into `public/images/`. The website displays the images without generation notices. Exact prompts and tool details are in `_assets/IMAGE-PROMPTS.md`.

Verification: image optimization, TypeScript, and the production static build passed. Browser QA results and desktop/mobile section screenshots are stored in `qa/`.

Responsive alignment update: centered the gallery dialog explicitly, removed blurred image side bands, and sized the viewer and controls to fit portrait and landscape viewports. Improved mobile hero spacing, menu sizing, gallery tiles, contact button alignment, and narrow-screen About imagery. Browser QA covers every gallery image at seven viewport sizes, including 320 × 568 and 844 × 390, plus section screenshots and interaction checks.

The refreshed static export is in `out/`. This is a local project; no hosting account or production deployment was configured. Domain configuration remains described in README.md.
