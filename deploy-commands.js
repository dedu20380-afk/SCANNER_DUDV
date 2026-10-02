import {REST,Routes} from "discord.js"; import {config,validateConfig} from "./config.js"; import {commands} from "./commands.js";
validateConfig(); const rest=new REST({version:"10"}).setToken(config.token);
await rest.put(config.guildId?Routes.applicationGuildCommands(config.clientId,config.guildId):Routes.applicationCommands(config.clientId),{body:commands});
console.log(config.guildId?"✅ Comandos registrados no servidor.":"✅ Comandos globais registrados.");
