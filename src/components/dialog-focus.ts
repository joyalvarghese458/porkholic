import type {KeyboardEvent} from 'react';
export function trapDialogFocus(event:KeyboardEvent<HTMLDialogElement>){
 if(event.key!=='Tab')return;
 const nodes=event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]');
 const first=nodes[0],last=nodes[nodes.length-1];
 if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
 else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
}
