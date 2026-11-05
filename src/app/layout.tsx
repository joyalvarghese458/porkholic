import type {Metadata,Viewport} from 'next';
import {Fraunces,Manrope} from 'next/font/google';
import {SITE_URL} from '@/config/site';
import '@/styles/globals.css';
const display=Fraunces({subsets:['latin'],variable:'--font-display',display:'swap',style:['normal','italic'],adjustFontFallback:true});
const body=Manrope({subsets:['latin'],variable:'--font-body',display:'swap',adjustFontFallback:true});
const title='PorkHolic | Pig Farm in Kombai, Theni, Tamil Nadu';
const description='Discover PorkHolic, a pig farm in Theni. Get in touch with our pig farm in Kombai for enquiries about PorkHolic and pig farming in Tamil Nadu.';
export const metadata:Metadata={metadataBase:new URL(SITE_URL),title,description,alternates:{canonical:'/'},openGraph:{title,description,url:SITE_URL,type:'website',locale:'en_IN',siteName:'PorkHolic',images:[{url:'/og-image.jpg',width:1200,height:630,alt:'PorkHolic Pig Farm — Kombai, Theni'}]},twitter:{card:'summary_large_image',title,description,images:['/og-image.jpg']}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#780E25'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-IN" className={`${display.variable} ${body.variable}`}><head><link rel="preload" as="image" type="image/webp" imageSrcSet={[640,960,1440,2000].map(w=>`/images/hero-farm-${w}.webp ${w}w`).join(', ')} imageSizes="100vw"/></head><body>{children}</body></html>;}
