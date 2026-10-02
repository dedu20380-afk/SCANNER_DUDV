import fs from "node:fs/promises";
import path from "node:path";

const suspectsFile = path.resolve("config/suspects.json");

async function suspects() {
  return JSON.parse(await fs.readFile(suspectsFile, "utf8"));
}

const unique = (a) => [...new Set(a)];

function dates(t) {
  const r = [
    /\b\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}:\d{2})?\b/g,
    /\b\d{2}\/\d{2}\/\d{4}(?:[ T]\d{2}:\d{2}:\d{2})?\b/g,
  ];
  return unique(r.flatMap((x) => t.match(x) || [])).slice(0, 10);
}

function packages(t) {
  return unique(
    t.match(/\b[a-zA-Z_][a-zA-Z0-9_]*(?:\.[a-zA-Z_][a-zA-Z0-9_]*){2,}\b/g) || []
  ).slice(0, 100);
}

function interesting(t) {
  const k = /(process|package|command|cmd|shell|activity|shizuku|regedit|dumpstate|permission|su\b)/i;
  return t.split(/\r?\n/).filter((x) => k.test(x)).slice(0, 30);
}

export async function scanText(text, fileName = "log.txt") {
  const ss = await suspects();
  const findings = [];

  for (const s of ss) {
    const m = text.match(new RegExp(s.pattern, "gi")) || [];
    if (m.length) findings.push({ ...s, count: m.length });
  }

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    fileName,
    bytes: Buffer.byteLength(text),
    lines: text.split(/\r?\n/).length,
    findings,
    packagesFound: packages(text).length,
    packages: packages(text).slice(0, 30),
    dates: dates(text),
    interestingLines: interesting(text),
    status: findings.length
      ? "VESTÍGIOS ENCONTRADOS"
      : "NENHUM PADRÃO CONFIGURADO ENCONTRADO",
  };
}

export async function scanAttachment(a, max) {
  if (!/\.(txt|log|dump|json|xml|csv)$/i.test(a.name)) {
    throw new Error("Envie um arquivo de log de texto.");
  }

  if (a.size > max) {
    throw new Error("Arquivo maior que o limite configurado.");
  }

  const r = await fetch(a.url);

  if (!r.ok) {
    throw new Error("Não foi possível baixar o arquivo.");
  }

  const b = Buffer.from(await r.arrayBuffer());

  if (b.length > max) {
    throw new Error("Arquivo maior que o limite configurado.");
  }

  return scanText(b.toString("utf8"), a.name);
}