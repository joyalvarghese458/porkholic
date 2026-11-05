'use client';
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
export function Reveal({children,delay=0,className=''}:{children:ReactNode;delay?:number;className?:string}){const reduced=useReducedMotion();return <motion.div className={className} initial={reduced?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:reduced?0:.7,delay:reduced?0:delay,ease:[.22,1,.36,1]}}>{children}</motion.div>;}
