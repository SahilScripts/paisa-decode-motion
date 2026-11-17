import {bundle} from '@remotion/bundler';
import {selectComposition,renderMedia,renderStill} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const out=path.join(here,'output');fs.mkdirSync(out,{recursive:true});
const serveUrl=await bundle({entryPoint:path.join(here,'index.tsx'),publicDir:path.join(here,'public')});
const composition=await selectComposition({serveUrl,id:'ChaiEconomics'});
try {
  if(process.argv.includes('--stills')){
    for(const second of [0,1,3,5.7,8,10.5,13,16,18.8,21.5,24,26.2,29.5]){
      await renderStill({serveUrl,composition,frame:Math.round(second*60),output:path.join(out,`still-${second}.png`),scale:0.65});
    }
  } else {
    await renderMedia({serveUrl,composition,codec:'h264',crf:18,pixelFormat:'yuv420p',audioCodec:'aac',
      outputLocation:path.join(out,'chai-demo-30s.mp4'),concurrency:4,
      onProgress:({progress})=>{const p=Math.floor(progress*100);if(p%10===0 && p!==globalThis.lastProgress){console.log(`${p}%`);globalThis.lastProgress=p;}}});
    console.log(path.join(out,'chai-demo-30s.mp4'));
  }
} finally {fs.rmSync(serveUrl,{recursive:true,force:true});}
