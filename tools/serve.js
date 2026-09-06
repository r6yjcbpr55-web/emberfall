const http=require("http"),fs=require("fs"),path=require("path");
const root=process.argv[2],port=+process.argv[3]||8099;
const CHARSET=process.env.CHARSET==="1";
http.createServer((q,r)=>{
  let f=q.url.split("?")[0];if(f==="/")f="/index.debug.html";
  fs.readFile(path.join(root,f),(e,d)=>{
    if(e){r.writeHead(404);r.end("nf");return;}
    r.writeHead(200,{"Content-Type":"text/html"+(CHARSET?"; charset=utf-8":"")});
    r.end(d);
  });
}).listen(port,()=>console.log("up:"+port+" charset="+CHARSET));
