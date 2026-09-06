// Virtual clock: keeps dt at a steady 1/60s while letting frames run as fast
// as the CPU allows, so a 50-room stage finishes in minutes not half an hour.
(function(){
 let vt=0;const STEP=1000/60;
 const realNow=performance.now.bind(performance);
 performance.now=function(){return vt;};
 const queue=[];let id=1;const map=new Map();
 window.requestAnimationFrame=function(cb){const i=id++;map.set(i,cb);queue.push(i);schedule();return i;};
 window.cancelAnimationFrame=function(i){map.delete(i);};
 const mc=new MessageChannel();let pending=false;
 mc.port1.onmessage=function(){
   pending=false;
   const batch=queue.splice(0,queue.length);
   vt+=STEP;
   for(const i of batch){const cb=map.get(i);if(cb){map.delete(i);try{cb(vt);}catch(e){console.error("rAF",e);}}}
   if(queue.length)schedule();
 };
 function schedule(){if(!pending){pending=true;mc.port2.postMessage(0);}}
 window.__CLOCK={now:()=>vt,real:realNow};
})();
