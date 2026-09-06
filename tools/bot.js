// Autopilot injected into the page. Plays "stand still to shoot, move to dodge".
window.__BOT={on:false,log:[],held:new Set(),lastRoom:0,stuck:0};
(function(){
 const K={n:"w",s:"s",e:"d",w:"a"};
 function press(k,down){
   const ev=new KeyboardEvent(down?"keydown":"keyup",{key:k,bubbles:true});
   window.dispatchEvent(ev);
 }
 function setDir(dx,dy){
   const want=new Set();
   if(dy<-0.3)want.add("w"); if(dy>0.3)want.add("s");
   if(dx<-0.3)want.add("a"); if(dx>0.3)want.add("d");
   for(const k of Array.from(window.__BOT.held))if(!want.has(k)){press(k,false);window.__BOT.held.delete(k);}
   for(const k of want)if(!window.__BOT.held.has(k)){press(k,true);window.__BOT.held.add(k);}
 }
 function release(){setDir(0,0);}
 const W=390,TOP=42;
 function tick(){
   const EF=window.__EF,B=EF.B,P=EF.P;
   if(!window.__BOT.on)return;
   // boon overlay: pick the first offered boon once it is selectable
   const ob=document.getElementById("oBoon");
   if(ob.classList.contains("on")){
     release();
     const r=ob.querySelector(".boon.ready");
     if(r){window.__BOT.log.push({t:Date.now(),ev:"boon",text:r.innerText.replace(/\n/g," ")});r.click();}
     return;
   }
   if(document.getElementById("oEnd").classList.contains("on")){release();return;}
   if(!B.on||!P||B.paused){release();return;}
   const hgt=parseFloat(document.getElementById("app").style.height)||845;
   // threat vector: enemies and live enemy shots push us away
   let fx=0,fy=0,threat=0;
   for(const e of B.enemies){
     if(e.dead)continue;
     const dx=P.x-e.x,dy=P.y-e.y,d=Math.hypot(dx,dy)||1;
     const danger=e.r+P.r+ (e.kind==="boss"?110:78);
     if(d<danger){const w=(danger-d)/danger;fx+=dx/d*w;fy+=dy/d*w;threat+=w;}
   }
   for(const s of B.eshots){
     const dx=P.x-s.x,dy=P.y-s.y,d=Math.hypot(dx,dy)||1;
     if(d<66){const w=(66-d)/66*1.4;fx+=dx/d*w;fy+=dy/d*w;threat+=w;}
   }
   for(const t of B.tels){
     const dx=P.x-t.x,dy=P.y-t.y,d=Math.hypot(dx,dy)||1;
     if(d<t.r+26){const w=1.6;fx+=dx/d*w;fy+=dy/d*w;threat+=w;}
   }
   // hazards
   for(const h of B.haz){
     let hx=h.x,hy=h.y,rr=h.r||0;
     if(h.w){hx=h.x+h.w/2;hy=h.y+h.hgt/2;rr=Math.max(h.w,h.hgt)/2;}
     const dx=P.x-hx,dy=P.y-hy,d=Math.hypot(dx,dy)||1;
     if(d<rr+34){const w=1.2;fx+=dx/d*w;fy+=dy/d*w;threat+=w;}
   }
   // stay off the walls
   const M=46;
   if(P.x<M)fx+=1; if(P.x>W-M)fx-=1;
   if(P.y<TOP+M)fy+=1; if(P.y>hgt-M)fy-=1;
   // sanctuary: walk into the angel to claim the gift
   if(B.angel&&!B.angel.taken&&threat<0.05){
     const dx=B.angel.x-P.x,dy=B.angel.y-P.y,m=Math.hypot(dx,dy)||1;
     setDir(dx/m,dy/m);return;
   }
   if(threat>0.05){
     // circle-strafe rather than backing straight into a wall
     const m=Math.hypot(fx,fy)||1; let ax=fx/m, ay=fy/m;
     const tx=-ay, ty=ax;
     const side=(P.x<W/2)?1:-1;
     ax=ax*0.72+tx*side*0.55; ay=ay*0.72+ty*side*0.55;
     const m2=Math.hypot(ax,ay)||1; setDir(ax/m2,ay/m2);
   }
   else {
     // no threat: hoover up orbs, otherwise hold still and shoot
     let tgt=null,bd=1e9;
     for(const o of B.orbs){const d=Math.hypot(o.x-P.x,o.y-P.y);if(d<bd){bd=d;tgt=o;}}
     if(tgt&&bd>26&&B.enemies.length===0){
       const dx=tgt.x-P.x,dy=tgt.y-P.y,m=Math.hypot(dx,dy)||1;setDir(dx/m,dy/m);
     } else release();
   }
 }
 setInterval(tick,16);
})();
