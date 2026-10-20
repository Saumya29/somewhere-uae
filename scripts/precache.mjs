import {readdirSync,readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const files=['/','/manifest.webmanifest','/icon-192.png','/icon-512.png','/images/al-fahidi.jpg',...readdirSync('dist/assets').map(x=>'/assets/'+x)];
const hash=createHash('sha256').update(files.join('')+readFileSync('dist/index.html')).digest('hex').slice(0,12);
let sw=readFileSync('public/sw.js','utf8');
sw=sw.replace("const CACHE='somewhere-v1';",`const CACHE='somewhere-${hash}';`).replace("['/', '/manifest.webmanifest','/icon-192.png','/icon-512.png','/images/al-fahidi.jpg']",JSON.stringify(files));
writeFileSync('dist/sw.js',sw);
console.log(`Offline precache: ${files.length} files, ${hash}`);
