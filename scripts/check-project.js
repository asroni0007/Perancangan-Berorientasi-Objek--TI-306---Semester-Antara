import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, extname } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const errors = [];

const jsFiles = [];
function walk(dir) {
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".git"].includes(name.name)) continue;
    const full = join(dir, name.name);
    if (name.isDirectory()) walk(full);
    else if (extname(name.name) === ".js") jsFiles.push(full);
  }
}
walk(root);

for (const file of jsFiles) {
  const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf-8" });
  if (result.status !== 0) errors.push(`Syntax JS gagal: ${file}\n${result.stderr}`);
}

for (const week of [4, 5, 6, 7, 9, 10, 11]) {
  const prefix = `week${String(week).padStart(2, "0")}`;
  const folder = readdirSync(root, { withFileTypes: true })
    .find((entry) => entry.isDirectory() && entry.name.startsWith(prefix));
  if (!folder) {
    errors.push(`Folder ${prefix} tidak ditemukan`);
    continue;
  }
  const diagramDir = join(root, folder.name, "diagrams");
  if (!existsSync(diagramDir)) {
    errors.push(`Folder diagram tidak ditemukan: ${diagramDir}`);
    continue;
  }
  const files = readdirSync(diagramDir);
  const mermaidFiles = files.filter((name) => name.endsWith(".mmd"));
  const plantUmlFiles = files.filter((name) => name.endsWith(".puml"));
  if (!mermaidFiles.length) errors.push(`${prefix}: tidak ada Mermaid`);
  if (!plantUmlFiles.length) errors.push(`${prefix}: tidak ada PlantUML`);

  for (const name of mermaidFiles) {
    const text = readFileSync(join(diagramDir, name), "utf-8").trim();
    if (!/^(flowchart|graph|classDiagram|sequenceDiagram|stateDiagram-v2)/.test(text)) {
      errors.push(`${prefix}: header Mermaid tidak dikenali pada ${name}`);
    }
  }
  for (const name of plantUmlFiles) {
    const text = readFileSync(join(diagramDir, name), "utf-8").trim();
    if (!text.startsWith("@startuml") || !text.endsWith("@enduml")) {
      errors.push(`${prefix}: pembungkus PlantUML tidak lengkap pada ${name}`);
    }
  }
}

for (const file of jsFiles) {
  const text = readFileSync(file, "utf-8");
  const suspicious = ["AK" + "IA", "sk" + "-"];
  if (suspicious.some((token) => text.includes(token)) && !file.endsWith("check-project.js")) {
    errors.push(`Potensi kredensial pada ${file}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n\n"));
  process.exit(1);
}

console.log(`OK: ${jsFiles.length} file JavaScript lolos syntax check.`);
console.log("OK: Diagram Mermaid/PlantUML memiliki struktur dasar yang valid.");
