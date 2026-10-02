import {SlashCommandBuilder,PermissionFlagsBits} from "discord.js";
export const commands=[
new SlashCommandBuilder().setName("scan").setDescription("Analisa um arquivo de log Android.").addAttachmentOption(o=>o.setName("arquivo").setDescription("Arquivo de log").setRequired(true)),
new SlashCommandBuilder().setName("historico").setDescription("Mostra as últimas análises.").setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
new SlashCommandBuilder().setName("suspeitos").setDescription("Gerencia padrões.").addSubcommand(s=>s.setName("listar").setDescription("Lista padrões.")).addSubcommand(s=>s.setName("adicionar").setDescription("Adiciona padrão.").addStringOption(o=>o.setName("nome").setDescription("Nome").setRequired(true)).addStringOption(o=>o.setName("padrao").setDescription("Regex").setRequired(true)).addStringOption(o=>o.setName("severidade").setDescription("Nível").setRequired(true).addChoices({name:"ALTO",value:"ALTO"},{name:"MÉDIO",value:"MÉDIO"},{name:"BAIXO",value:"BAIXO"}))).addSubcommand(s=>s.setName("remover").setDescription("Remove padrão.").addStringOption(o=>o.setName("nome").setDescription("Nome exato").setRequired(true)))
].map(x=>x.toJSON());
