import images from '@/config/images.json';
export type ImageName = keyof typeof images;
export function Picture({name,alt,priority=false,className='',sizes='(max-width: 767px) 100vw, 50vw'}:{name:ImageName;alt:string;priority?:boolean;className?:string;sizes?:string}) {
 const asset=images[name];
 return <picture className={`picture ${className}`} style={{backgroundImage:`url("${asset.blur}")`,backgroundSize:'cover'}}><source type="image/webp" srcSet={[640,960,1440,2000].map(w=>`/images/${name}-${w}.webp ${w}w`).join(', ')} sizes={sizes}/><img src={`/images/${name}-960.webp`} width={asset.width} height={asset.height} alt={alt} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async" /></picture>;
}
