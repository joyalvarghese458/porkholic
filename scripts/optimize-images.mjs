import sharp from 'sharp';
import { mkdir, readdir, writeFile, readFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const assets = new URL('_assets/', root), dest = new URL('public/images/', root);
await mkdir(dest,{recursive:true}); await mkdir(new URL('src/config/',root),{recursive:true});
const files = await readdir(assets);
const logoFile = files.includes('logo-supplied.png') ? 'logo-supplied.png' : files.find(f=>/^logo\.(png|jpg|jpeg|webp)$/i.test(f));
if(!logoFile) throw new Error('A real logo is required in _assets/logo.*');
const logo = new URL(logoFile,assets);
// Use the complete original artwork for branding and a mascot crop for small icons.
const logoBuffer = await readFile(logo);
// Preserve the supplied lettering and mascot together; trim only blank outer margin.
await sharp(logoBuffer).extract({left:75,top:130,width:1120,height:940}).resize(560).webp({lossless:true}).toFile(new URL('logo-full.webp',dest).pathname.replace(/^\/(\w:)/,'$1'));
// Transparent light/dark variants preserve alpha and share the original aspect ratio.
for (const name of ['logo-transparent']) {
 if (files.includes(`${name}.png`)) await sharp(await readFile(new URL(`${name}.png`,assets))).trim().resize(560,470,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).webp({lossless:true}).toFile(new URL(`${name}.webp`,dest).pathname.replace(/^\/(\w:)/,'$1'));
}
const mascot = await sharp(logoBuffer).extract({left:240,top:140,width:750,height:600}).png().toBuffer();
await sharp(mascot).resize(400).webp({lossless:true}).toFile(new URL('logo.webp',dest).pathname.replace(/^\/(\w:)/,'$1'));
await import('./generate-favicon.mjs');
const {data,info}=await sharp(logoBuffer).removeAlpha().raw().toBuffer({resolveWithObject:true});const buckets={},darkBuckets={};
for(let i=0;i<data.length;i+=info.channels){const [r,g,b]=[data[i],data[i+1],data[i+2]];if(r>100&&r>g*2&&r>b*1.5){const key=[r,g,b].map(v=>Math.round(v/8)*8).join(',');buckets[key]=(buckets[key]||0)+1;}}
const dominant=Object.entries(buckets).sort((a,b)=>b[1]-a[1])[0];
for(let i=0;i<data.length;i+=info.channels){const rgb=[data[i],data[i+1],data[i+2]];if(rgb.every(v=>v<30)){const key=rgb.map(v=>Math.round(v/8)*8).join(',');darkBuckets[key]=(darkBuckets[key]||0)+1;}}
await writeFile(new URL('color-sampling.json',dest),JSON.stringify({method:'8-step RGB histogram of red and dark pixels in original logo',dominantRed:dominant,darkSamples:Object.entries(darkBuckets).sort((a,b)=>b[1]-a[1]).slice(0,3),black:'#080808',burgundy:'red-derived darkened UI token #780e25'},null,2));
const specs={'hero-farm':[2000,1250],'about-farm':[1440,1800],'farm-piglets':[1440,1080],'farm-environment':[2000,1250],'farm-detail':[1440,1440]};const manifest={};
for(const [index,[name,[width,height]]] of Object.entries(specs).entries()){
 let file=files.find(f=>f.startsWith(name+'.')&&/\.(png|jpe?g|webp)$/i.test(f));const placeholder=!file;
 if(!file){
  const palettes=[['#9ba890','#62775d','#3c5543'],['#c4bda5','#8d9b7e','#5b7156'],['#c1b8a4','#a69a7a','#768168'],['#a5b49c','#7c9272','#4e694e'],['#c6b69a','#a49778','#697e5e']][index];
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice"><rect width="1600" height="1000" fill="${palettes[0]}"/><circle cx="1200" cy="190" r="100" fill="#e4d9b9"/><path d="M0 510 Q300 200 650 500 T1600 400 V1000 H0Z" fill="${palettes[1]}"/><path d="M0 720 Q450 390 900 640 T1600 580 V1000 H0Z" fill="${palettes[2]}"/><path d="M850 650 Q630 800 1050 1000 H1430 Q830 810 1000 650" fill="#c7b99a" opacity=".6"/><g fill="#303f31" opacity=".6"><path d="M120 720V370h17v350zM50 450l80-240 80 240zM40 540l90-240 90 240z"/><path d="M1400 710V380h15v330zM1330 440l78-230 80 230zM1310 540l98-240 100 240z"/></g><g stroke="#e1d5b7" stroke-width="9" opacity=".5"><path d="M0 820H630M0 860H630M80 790v120M240 790v120M400 790v120M560 790v120"/></g></svg>`;
  file=name+'.png';await sharp(Buffer.from(svg)).png().toFile(new URL(file,assets).pathname.replace(/^\/(\w:)/,'$1'));await writeFile(new URL(name+'.placeholder',assets),'NEEDS REPLACEMENT: neutral illustrative placeholder.');
 }
 const isPlaceholder=placeholder||files.includes(name+'.placeholder');const input=new URL(file,assets);
 const inputBuffer = await readFile(input);
 for(const w of [640,960,1440,2000])await sharp(inputBuffer).resize(w,Math.round(height/width*w),{fit:'cover'}).webp({quality:80}).toFile(new URL(`${name}-${w}.webp`,dest).pathname.replace(/^\/(\w:)/,'$1'));
 const blur=await sharp(inputBuffer).resize(24).webp({quality:35}).toBuffer();
 manifest[name]={width,height,placeholder:isPlaceholder,blur:`data:image/webp;base64,${blur.toString('base64')}`};
}
await writeFile(new URL('src/config/images.json',root),JSON.stringify(manifest,null,2));
await import('./generate-share-image.mjs');
console.log('Images optimized; image manifest records any remaining placeholders.');
