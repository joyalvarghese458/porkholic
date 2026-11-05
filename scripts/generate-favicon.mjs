import sharp from 'sharp';
import {readFile, writeFile} from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const source = await readFile(new URL('_assets/favicon-pig.png', root));
const background = {r: 0, g: 0, b: 0, alpha: 0};
const master = await sharp(source).trim().resize(480, 480, {fit: 'contain', background})
  .extend({top: 16, bottom: 16, left: 16, right: 16, background}).png().toBuffer();

for (const [path, size] of [['src/app/icon.png', 192], ['src/app/apple-icon.png', 180], ['public/favicon-32.png', 32]]) {
  await writeFile(new URL(path, root), await sharp(master).resize(size, size).png().toBuffer());
}

// An ICO directory with individual PNG frames keeps each browser size sharp.
const sizes = [16, 32, 48, 64];
const frames = await Promise.all(sizes.map(size => sharp(master).resize(size, size).png().toBuffer()));
const directory = Buffer.alloc(6 + 16 * sizes.length);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
frames.forEach((frame, index) => {
  const entry = 6 + index * 16;
  directory[entry] = sizes[index];
  directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(frame.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
});
await writeFile(new URL('src/app/favicon.ico', root), Buffer.concat([directory, ...frames]));
console.log('Pig-face favicon generated at 16, 32, 48, 64, 180 and 192px.');
