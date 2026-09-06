/* Writes a copy of index.html that exposes the game's internals as window.__EF.
   The shipped file wraps everything in an IIFE, so a test can otherwise only
   see the DOM. Takes an output directory. */
const fs=require("fs"),path=require("path");
const out=process.argv[2];
if(!out){console.error("usage: node tools/debug-build.js <outdir>");process.exit(1);}
const src=path.join(__dirname,"..","index.html");
let s=fs.readFileSync(src,"utf8");
const hook="window.__EF={get B(){return B},get P(){return P},get S(){return S},"+
 "startStage,endBattle,BOONS,GEAR,RAR,HEROES,BOSSES,rollDrop,rollRarity,"+
 "buildPlayer,showBoons,finish,fit,SLOTS,GBY,itemStats,"+
 "mergeGroups,doMerge,addItem,saveNow,scale,xpNeed,plvNeed,offer,tierPool,rollTier};\n";
const i=s.lastIndexOf("load();");
if(i<0)throw new Error("anchor 'load();' not found in index.html");
s=s.slice(0,i)+hook+s.slice(i);
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,"index.debug.html"),s);
console.log("wrote "+path.join(out,"index.debug.html"));
