const {chromium}=require("playwright");
const fs=require("fs");
const EXE=process.env.CHROME||undefined;
const SP=process.env.SP||require("os").tmpdir();
const SECONDS=+(process.env.SECONDS||120);
const SHOT=process.env.SHOT||"play";
(async()=>{
 const b=await chromium.launch({...(EXE?{executablePath:EXE}:{}),args:["--no-sandbox","--disable-gpu"]});
 const ctx=await b.newContext({viewport:{width:430,height:932},deviceScaleFactor:2});
 const page=await ctx.newPage();
 const errs=[];
 page.on("pageerror",e=>errs.push((e.stack||e.message).split("\n").slice(0,4).join(" | ")));
 page.on("console",m=>{if(m.type()==="error"&&!/ERR_CONNECTION/.test(m.text()))errs.push("console: "+m.text());});
 await page.goto("http://localhost:8100/index.debug.html",{waitUntil:"load"});
 await page.waitForTimeout(1500);
 await page.addScriptTag({path:__dirname+"/bot.js"});
 await page.evaluate(()=>{window.__EF.startStage(1);window.__BOT.on=true;});
 const timeline=[];
 let lastRoom=0, shots=0;
 const t0=Date.now();
 while((Date.now()-t0)/1000<SECONDS){
   await page.waitForTimeout(500);
   const st=await page.evaluate(()=>{
     const EF=window.__EF,B=EF.B,P=EF.P;
     return {on:B.on,room:B.room,rooms:B.rooms,type:B.roomType,
       enemies:B.enemies.length,hp:P?Math.round(P.hp):null,maxhp:P?Math.round(P.maxhp):null,
       lvl:P?P.level:null,pending:P?P.pending:null,boons:P?P.boons.length:0,
       gold:B.gold,kills:B.kills,
       eshots:B.eshots.length,shots:B.shots.length,orbs:B.orbs.length,
       clear:+B.clear.toFixed(2),
       boonOn:document.getElementById("oBoon").classList.contains("on"),
       endOn:document.getElementById("oEnd").classList.contains("on"),
       endTitle:document.getElementById("endTitle").textContent,
       endSub:document.getElementById("endSub").textContent};
   });
   if(st.room!==lastRoom){
     lastRoom=st.room;
     timeline.push({t:+((Date.now()-t0)/1000).toFixed(1),...st});
     if(shots<6&&st.room%3===1){await page.screenshot({path:`${SP}/${SHOT}-room${st.room}.png`});shots++;}
   }
   if(st.endOn){timeline.push({t:+((Date.now()-t0)/1000).toFixed(1),END:true,...st});
     await page.screenshot({path:`${SP}/${SHOT}-end.png`});break;}
 }
 const final=await page.evaluate(()=>{
   const EF=window.__EF,B=EF.B,P=EF.P;
   return {room:B.room,on:B.on,hp:P?Math.round(P.hp):null,maxhp:P?Math.round(P.maxhp):null,
     lvl:P?P.level:null,boons:P?P.boons.slice():[],pending:P?P.pending:null,
     xp:P?Math.round(P.xp):null,need:P?EF.xpNeed(P.level):null,
     botLog:window.__BOT.log.slice(-8),
     S:{stage:EF.S.stage,gold:EF.S.gold,inv:EF.S.inv.length}};
 });
 await page.screenshot({path:`${SP}/${SHOT}-final.png`});
 fs.writeFileSync(SP+"/"+SHOT+"-timeline.json",JSON.stringify({timeline,final,errs},null,1));
 console.log("ROOMS:",timeline.map(x=>x.room+(x.type&&x.type!=="normal"?"("+x.type+")":"")).join(" "));
 console.log("FINAL:",JSON.stringify(final,null,1));
 console.log("ERRORS:",errs.length,JSON.stringify([...new Set(errs)].slice(0,6),null,1));
 await b.close();
})();
