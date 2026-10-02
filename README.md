# Scanner Android FrancaX — v2

Bot Discord pronto para analisar logs Android como texto.

## Comandos
- `/scan arquivo` — analisa `.txt`, `.log`, `.dump`, `.json`, `.xml` ou `.csv`
- `/historico` — últimas análises
- `/suspeitos listar`
- `/suspeitos adicionar`
- `/suspeitos remover`

Padrões iniciais:
- `com.painel.regedit`
- `moe.shizuku.privileged.api`

## Instalação
1. Instale Node.js 20+.
2. Rode `npm install`.
3. Copie `.env.example` para `.env`.
4. Coloque o token do bot em `DISCORD_TOKEN`.
5. Mantenha `CLIENT_ID=1555689926836752424`.
6. Opcionalmente coloque o ID do servidor em `GUILD_ID` para testes rápidos.
7. Rode `npm run deploy`.
8. Rode `npm start`.

## Render
Build Command: `npm install`
Start Command: `npm start`

Variáveis no Render: `DISCORD_TOKEN`, `CLIENT_ID`, `GUILD_ID`, `OWNER_IDS`, `MAX_FILE_BYTES`, `SCANNER_NAME`.

O scanner apenas lê os arquivos como texto; não executa comandos encontrados nos logs.

Nunca publique o token do bot.
