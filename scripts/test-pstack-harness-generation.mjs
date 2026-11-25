#!/usr/bin/env node

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const marketplace = JSON.parse(readFileSync(join(ROOT, ".claude-plugin", "marketplace.json"), "utf8"));
const plugin = marketplace.plugins.find(({ name }) => name === "pstack");
assert.equal(marketplace.name, "vietnamese-pstack");
assert.equal(plugin.source, "./harness/pstack/claude-code");
const sourcePlugin = JSON.parse(readFileSync(join(ROOT, "pstack", "plugin.json"), "utf8"));
assert.equal(sourcePlugin.name, plugin.name);
for (const path of ["pstack/README.md", "pstack/docs/guide/01-setup.md", "pstack/skills/poteto-help/SKILL.md"]) {
  const text = readFileSync(join(ROOT, path), "utf8");
  assert.match(text, /claude plugin marketplace add hanh9898\/vietnamese-pstack/, `${path} marketplace source`);
  assert.match(text, /claude plugin install --scope user pstack@vietnamese-pstack/, `${path} plugin scope`);
  assert.match(text, /claude plugin disable --scope user pstack@cursor-plugins/, `${path} upstream migration disable`);
  assert.match(text, /claude plugin uninstall --scope user pstack@cursor-plugins/, `${path} upstream migration uninstall`);
  assert.match(text, /thay `user` thành cùng phạm vi trong lệnh `disable`, `uninstall` ở trên/,
    `${path} migration scope guidance`);
  assert.doesNotMatch(text, /plugin marketplace add cursor\/plugins/, `${path} must use the Vietnamese marketplace`);
  assert.doesNotMatch(text, /plugin install pstack@cursor-plugins/, `${path} must not install upstream pstack`);
}
const potetoHelp = readFileSync(join(ROOT, "pstack/skills/poteto-help/SKILL.md"), "utf8");
assert.match(potetoHelp, /\/plugin marketplace add hanh9898\/vietnamese-pstack/);
assert.match(potetoHelp, /\/plugin install pstack@vietnamese-pstack/);

function frontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(match, "expected YAML frontmatter");
  return match[1];
}

function field(text, name) {
  return frontmatter(text).match(new RegExp(`^${name}:\\s*(.*?)\\s*$`, "m"))?.[1];
}

const skills = readdirSync(join(ROOT, "pstack", "skills"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(join(ROOT, "pstack", "skills", entry.name, "SKILL.md")))
  .map((entry) => ({
    name: entry.name,
    disableModelInvocation: field(readFileSync(join(ROOT, "pstack", "skills", entry.name, "SKILL.md"), "utf8"), "disable-model-invocation") === "true",
  }));
const disabledSkills = skills.filter(({ disableModelInvocation }) => disableModelInvocation);
const modelInvokableSkills = skills.filter(({ disableModelInvocation }) => !disableModelInvocation);
assert.ok(disabledSkills.length > 0);
assert.ok(modelInvokableSkills.length > 0);
assert.ok(disabledSkills.some(({ name }) => name === "poteto-mode"));
assert.ok(modelInvokableSkills.some(({ name }) => name === "setup-pstack"));

const adapter = readFileSync(join(ROOT, "pstack", "docs", "harness", "claude-code.md"), "utf8");
function tableCell(label) {
  const row = adapter.split("\n").find((line) => line.startsWith(`| ${label} |`));
  assert.ok(row, `missing adapter table row: ${label}`);
  return row.split("|")[2].trim();
}

const internalInvocation = tableCell("Chạy một skill pstack khác trong công việc hiện tại");
assert.match(internalInvocation, /disable-model-invocation: true/);
assert.match(internalInvocation, /không gọi nó bằng `Skill`/);
assert.match(internalInvocation, /`Read`.*`\$\{CLAUDE_PLUGIN_ROOT\}\/skills\/<name>\/SKILL\.md`/);
assert.match(internalInvocation, /Chỉ dùng `Skill`.*khi skill cho phép model gọi/);
assert.match(internalInvocation, /Nếu tool hoặc skill không có, dùng `Read` làm phương án dự phòng/);

const userInvocation = tableCell("Bảo người dùng chạy một skill pstack");
assert.match(userInvocation, /`\/pstack:<name>`/);
assert.match(userInvocation, /ngăn Claude tự gọi skill, không ngăn người dùng gọi bằng lệnh slash/);

const fixture = mkdtempSync(join(tmpdir(), "vietnamese-pstack-generation-"));
try {
  cpSync(join(ROOT, "pstack"), join(fixture, "pstack"), {
    recursive: true,
    filter: (path) => basename(path) !== "node_modules",
  });
  mkdirSync(join(fixture, "scripts"), { recursive: true });
  cpSync(join(ROOT, "scripts", "generate-pstack-harness-trees.mjs"), join(fixture, "scripts", "generate-pstack-harness-trees.mjs"));
  mkdirSync(join(fixture, ".claude-plugin"), { recursive: true });
  cpSync(join(ROOT, ".claude-plugin", "marketplace.json"), join(fixture, ".claude-plugin", "marketplace.json"));
  assert.equal(existsSync(join(fixture, "harness")), false);

  const sourceAgentPath = join(fixture, "pstack", "agents", "poteto-agent.md");
  const sourceAgent = readFileSync(sourceAgentPath, "utf8");
  const fableAgent = sourceAgent.replace(/^model: claude-[^\r\n]+$/m, "model: claude-fable-5-2-high");
  assert.notEqual(fableAgent, sourceAgent);
  writeFileSync(sourceAgentPath, `${fableAgent}\n\nExample values:\n\n\`\`\`yaml\nmodel: claude-opus-5-5-high-fast\nis_background: false\n\`\`\`\n`);
  writeFileSync(join(fixture, "pstack", "agents", "metadata-free.md"), [
    "---",
    "name: metadata-free",
    "description: Example agent without model metadata",
    "---",
    "",
    "Example values:",
    "model: claude-opus-5-5-high-fast",
    "is_background: true",
    "",
  ].join("\n"));

  const generated = spawnSync(process.execPath, [join(fixture, "scripts", "generate-pstack-harness-trees.mjs")], {
    cwd: fixture,
    encoding: "utf8",
  });
  assert.equal(generated.status, 0, `${generated.stdout}${generated.stderr}`);

  const generatedPlugin = join(fixture, plugin.source, ".claude-plugin", "plugin.json");
  const generatedPluginManifest = JSON.parse(readFileSync(generatedPlugin, "utf8"));
  assert.equal(generatedPluginManifest.name, plugin.name);
  assert.equal(generatedPluginManifest.version, sourcePlugin.version);
  const generatedAgent = readFileSync(join(fixture, plugin.source, "agents", "poteto-agent.md"), "utf8");
  assert.equal(field(generatedAgent, "model"), "fable");
  assert.equal(field(generatedAgent, "effort"), "high");
  assert.equal(field(generatedAgent, "background"), "true");
  assert.equal(field(generatedAgent, "is_background"), undefined);
  assert.match(generatedAgent, /```yaml\nmodel: claude-opus-5-5-high-fast\nis_background: false\n```/);
  const metadataFreeAgent = readFileSync(join(fixture, plugin.source, "agents", "metadata-free.md"), "utf8");
  assert.equal(field(metadataFreeAgent, "model"), undefined);
  assert.equal(field(metadataFreeAgent, "effort"), undefined);
  assert.equal(field(metadataFreeAgent, "background"), undefined);
  assert.equal(field(metadataFreeAgent, "is_background"), undefined);
  assert.match(metadataFreeAgent, /model: claude-opus-5-5-high-fast\nis_background: true/);
} finally {
  rmSync(fixture, { recursive: true, force: true });
}

console.log("Claude Code marketplace, installation docs, plugin version, disabled skill routing, and generated agent metadata checks passed.");
