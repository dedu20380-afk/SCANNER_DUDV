import "dotenv/config";
export const config={token:process.env.DISCORD_TOKEN||"",clientId:process.env.CLIENT_ID||"",guildId:process.env.GUILD_ID||"",ownerIds:(process.env.OWNER_IDS||"").split(",").map(x=>x.trim()).filter(Boolean),maxFileBytes:Number(process.env.MAX_FILE_BYTES||10485760),scannerName:process.env.SCANNER_NAME||"Scanner Android FrancaX"};
export function validateConfig(){const m=[];if(!config.token)m.push("DISCORD_TOKEN");if(!config.clientId)m.push("CLIENT_ID");if(m.length)throw new Error("Variáveis ausentes no .env: "+m.join(", "));}
