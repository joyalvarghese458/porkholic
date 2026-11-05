import {chromium} from '@playwright/test';
import {createServer} from 'node:http';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {extname,resolve,sep} from 'node:path';
const out=resolve('out');const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.ico':'image/x-icon','.json':'application/json'};
const server=createServer(async(req,res)=>{try{let path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(path.endsWith('/'))path+='index.html';const file=resolve(out,'.'+path);if(!file.startsWith(out+sep))throw Error('Invalid path');const data=await readFile(file);res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream'});res.end(data);}catch{res.writeHead(404);res.end('Not found');}});
await new Promise(r=>server.listen(4173,'127.0.0.1',r));await mkdir('qa',{recursive:true});let browser;const results=[];
function check(value,message){if(!value)throw Error(message);results.push(message);}
try{browser=await chromium.launch({headless:true});const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [320,360,375,390,430,768,1024,1280,1536]){await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:4173');await page.waitForLoadState('networkidle');check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`No horizontal overflow at ${width}px`);}
for(const [width,height] of [[320,568],[360,800],[390,844],[430,932],[768,1024],[1440,900],[844,390]]){
 await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:4173');await page.emulateMedia({reducedMotion:'reduce'});
 for(let i=0;i<4;i++){
  await page.locator('.gallery-tile').nth(i).click();
  await page.locator('.lightbox img').evaluate(async img=>{await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));await img.decode();});
  check(await page.locator('.lightbox img').evaluate(img=>img.complete&&img.naturalWidth>0),`Image ${i+1} loads in viewer at ${width}x${height}`);
  const bounds=await page.locator('.lightbox').evaluate(d=>{const r=d.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,scroll:d.scrollHeight,client:d.clientHeight};});
  check(Math.abs(bounds.x+bounds.width/2-width/2)<2&&Math.abs(bounds.y+bounds.height/2-height/2)<2,`Image ${i+1} viewer centered at ${width}x${height}`);
  check(bounds.x>=0&&bounds.y>=0&&bounds.x+bounds.width<=width+1&&bounds.y+bounds.height<=height+1,`Image ${i+1} viewer fits ${width}x${height}`);
  check(bounds.scroll<=bounds.client+1,`Image ${i+1} viewer needs no scrolling at ${width}x${height}`);
  const photo=await page.locator('.lightbox .picture').boundingBox();check(photo&&photo.height>80&&Math.abs(photo.x+photo.width/2-width/2)<2,`Image ${i+1} photo centered at ${width}x${height}`);
  check(await page.locator('.lightbox .picture').evaluate(p=>getComputedStyle(p).backgroundImage==='none'),'Viewer has no blurred side bands');
  for(const button of await page.locator('.lightbox button').all()){const r=await button.boundingBox();check(r&&r.width>=44&&r.height>=44&&r.y>=0&&r.y+r.height<=height,`Viewer touch control fits ${width}x${height}`);}
  if(i===1)await page.screenshot({path:`qa/${width}x${height}-lightbox.png`});
  await page.getByRole('button',{name:'Close image viewer'}).click();
 }
 if(width<768){
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
  const header=await page.locator('.header').boundingBox(),heading=await page.locator('h1').boundingBox(),buttons=await page.locator('.hero .button-row').boundingBox(),cue=await page.locator('.hero-bottom').boundingBox();
  check(heading.y>=header.y+header.height,'Mobile hero heading clears navbar');check(buttons.y+buttons.height<=cue.y,'Mobile hero buttons clear scroll cue');
  await page.getByRole('button',{name:'Open navigation'}).click();await page.screenshot({path:`qa/${width}x${height}-menu.png`});
  check(await page.locator('#mobile-menu').evaluate(d=>d.scrollWidth<=d.clientWidth),'Mobile menu has no horizontal overflow');await page.keyboard.press('Escape');
 }
}
await page.emulateMedia({reducedMotion:'no-preference'});
for(const [width,height] of [[320,568],[360,800],[390,844],[1440,900]]){await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:4173');for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=600){await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(120);}await page.waitForTimeout(800);for(const selector of ['#home','#about','#farm','.immersive','#gallery','.enquiry','#contact','.footer']){await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(900);await page.locator(selector).screenshot({path:`qa/${width}-${selector.replace(/^[#.]/,'')}.png`,style:selector==='#home'?'':'.header,.quick-actions,.skip-link{visibility:hidden!important}'});}await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(800);await page.screenshot({path:`qa/${width}-full.png`,fullPage:true});}
await page.setViewportSize({width:360,height:800});await page.goto('http://127.0.0.1:4173');await page.getByRole('button',{name:'Open navigation'}).click();check(await page.locator('#mobile-menu').evaluate(d=>d.open),'Mobile menu opens');check(await page.locator('.quick-actions').isHidden(),'Sticky actions hidden while menu is open');for(let i=0;i<12;i++){await page.keyboard.press('Tab');check(await page.evaluate(()=>document.activeElement?.closest('#mobile-menu')!==null),'Menu focus stays trapped');}await page.keyboard.press('Escape');check(await page.getByRole('button',{name:'Open navigation'}).evaluate(b=>b===document.activeElement),'Menu returns focus after Escape');
await page.locator('.gallery-tile').first().click();check(await page.locator('.lightbox').evaluate(d=>d.open),'Lightbox opens');check(await page.locator('.quick-actions').isHidden(),'Sticky actions hidden while lightbox is open');await page.keyboard.press('ArrowRight');check((await page.locator('figcaption').textContent()).includes('2 / 4'),'Lightbox right arrow advances');await page.keyboard.press('ArrowLeft');check((await page.locator('figcaption').textContent()).includes('1 / 4'),'Lightbox left arrow returns');await page.keyboard.press('Escape');check(await page.locator('.gallery-tile').first().evaluate(b=>b===document.activeElement),'Lightbox returns focus');
const links=await page.locator('a').evaluateAll(anchors=>anchors.map(a=>a.getAttribute('href')));for(const href of links){check(!!href&&href!=='#',`Valid link: ${href}`);if(href.startsWith('#'))check(await page.locator(href).count()===1,`Anchor exists: ${href}`);if(href.startsWith('tel:'))check(/^tel:\+91\d{10}$/.test(href),`Valid telephone URI: ${href}`);if(href.includes('wa.me'))check(new URL(href).pathname==='/918943958007'&&new URL(href).searchParams.get('text')==='Hello PorkHolic, I would like to know more about your pig farm in Kombai, Theni.','WhatsApp recipient and message match');}
check(await page.locator('h1').count()===1,'Exactly one H1');check((await page.locator('html').getAttribute('lang'))==='en-IN','Document language is en-IN');check(await page.locator('img:not([alt])').count()===0,'Every image has an alt attribute');check(await page.locator('link[rel="preload"][as="image"]').count()===1,'Only hero image is preloaded');check(await page.locator('a[href="https://maps.app.goo.gl/peX2UPpzYLKWbSUj9"]').count()===1,'Map uses the supplied farm location');await page.emulateMedia({reducedMotion:'reduce'});check(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)==='auto','Reduced motion disables smooth scroll');check(errors.length===0,`No browser exceptions: ${errors.join(', ')}`);await writeFile('qa/results.json',JSON.stringify({passed:true,checks:results},null,2));console.log(`Passed ${results.length} checks. Screenshots: qa/`);
}finally{await browser?.close();await new Promise(r=>server.close(r));}
