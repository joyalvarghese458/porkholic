import sharp from 'sharp';
import {readFile, writeFile} from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const background = await sharp(await readFile(new URL('public/images/hero-farm-1440.webp', root)))
  .resize(1200, 630, {fit: 'cover'}).modulate({brightness: .6}).toBuffer();
// Keep every brand element inside the central 630px square used by small previews.
const card = Buffer.from('<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect x="320" y="50" width="560" height="530" rx="36" fill="#faf7f0"/><text x="600" y="550" text-anchor="middle" fill="#555e4f" font-family="sans-serif" font-size="21" letter-spacing="3">KOMBAI · THENI</text></svg>');
const logo = await sharp(await readFile(new URL('public/images/logo-transparent.webp', root)))
  .resize(480, 403, {fit: 'contain', background: {r: 0, g: 0, b: 0, alpha: 0}}).png().toBuffer();
const preview = await sharp(background).composite([{input: card}, {input: logo, left: 360, top: 94}])
  .jpeg({quality: 86, mozjpeg: true}).toBuffer();
await writeFile(new URL('public/share-preview-v2.jpg', root), preview);
console.log('Generated 1200×630 share image with a centered, square-safe logo.');
