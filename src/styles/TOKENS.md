PorkHolic design tokens

- Original logo red: approximately #C80010; sampled with an RGB histogram, with raw sampling evidence in public/images/color-sampling.json.
- Burgundy: #780E25, a darker UI derivative of the original red for legible buttons and large surfaces. The original logo pixels remain unchanged.
- Brand black: #080808, near-black from the logo.
- Ivory: #FAF7F0. Sage: #78836B (small accents only). Ink: #292C25. Muted: #63675D. Border: #DEDCD2.
- All tokens are exposed in globals.css through Tailwind @theme and in src/config/site.ts.
- Type: Fraunces display, Manrope body, next/font with swap and adjusted fallback.
- Layout: max 1240px; section padding clamp(72px, 10vw, 140px); 8px base spacing; 24–32px image corners, pill buttons.
- Motion: 700ms, [0.22, 1, 0.36, 1], 24px vertical reveal, 75ms stagger. Reduced motion disables animation and smooth scrolling.

Source logo is opaque. Dark placement uses its original ivory background as a badge; no recolored or artificially transparent version is produced. The site uses an unchanged mascot crop to omit the source registration mark and conflicting descriptor. The full original is retained in _assets/logo.png.
