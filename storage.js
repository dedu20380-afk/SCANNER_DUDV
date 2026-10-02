import fs from "node:fs/promises"; import path from "node:path";
const file=path.resolve("data/history.json");
async function ensure(){await fs.mkdir(path.dirname(file),{recursive:true});try{await fs.access(file)}catch{await fs.writeFile(file,"[]\n","utf8")}}
export async function loadHistory(){await ensure();try{const x=JSON.parse(await fs.readFile(file,"utf8"));return Array.isArray(x)?x:[]}catch{return []}}
export async function saveScan(x){const h=await loadHistory();h.unshift(x);await fs.writeFile(file,JSON.stringify(h.slice(0,100),null,2)+"\n","utf8")}
