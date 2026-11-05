# Transparent navbar logo variants

Built-in image_gen edit mode, November 5, 2026. Reference: the supplied original artwork, cropped only to remove blank outer margins (`public/images/logo-full.webp`). Original source remains `_assets/logo-supplied.png`.

Deliverables: `_assets/logo-transparent.png`; responsive website copies at `public/images/logo-transparent.webp`.

## Light-surface prompt

Use case: background-extraction. Edit target is the supplied PorkHolic logo. Remove ONLY the cream paper background, including the empty areas between letters and between mascot and wordmark, to genuine alpha transparency. Preserve the exact original pig mascot, pink shading, thick black outlines, smile, wordmark lettering, red Holic and registration mark, black Pork and PORK FARM descriptor and decorative lines. Keep entire artwork with tiny even transparent margin. No redesign, no new text, no shadows, no solid background. High resolution clean logo cutout.

## Dark-surface prompt

Use case: precise-object-edit and background-extraction. Edit target is the supplied PorkHolic logo. Produce a navbar-ready variant on genuine alpha transparency: completely remove all cream paper background, including all open gaps around the artwork and inside letter counters. Change ONLY the black word 'Pork', the black descriptor 'PORK FARM', and the thin decorative horizontal lines next to descriptor and beneath pig to warm white #FAF7F0 for legibility on dark backgrounds. Preserve original letter shapes exactly. Keep 'Holic' and registration symbol red. Keep pink pig mascot and all its black outlines, eyes, mouth and pink colors exactly unchanged. Preserve exact stacked composition and proportions of original logo, tiny even transparent margin. No extra text, no new branding, no shadows, no background rectangle.

## Dark-surface cleanup prompt

Clean up this logo cutout for production use. REMOVE ALL stray white and colored speckles, all cream paper residue, the ragged white patches between and around the wordmark and descriptor. The empty areas outside the pig, letters and clean decorative lines must be 100% transparent alpha with clean crisp antialiased edges, no dust, no flecks, no texture. Keep the exact pink pig artwork, warm white 'Pork', red 'Holic', warm white 'PORK FARM', red registration mark and white decorative lines. Keep same composition, no new elements, no solid background. Restore the pure clean smooth letter edges. Only genuine logo shapes should have nonzero opacity.

The light-surface cutout was selected for production. The generated white-lettered candidates left edge residue and were discarded. The final dark treatment uses the same clean transparent image with a clipped CSS white-lettering layer, preserving the original shapes without those artifacts.
