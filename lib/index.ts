#!/usr/bin/env node
import { execSync } from "child_process";
import { mkdir, writeFile } from "fs/promises";
import { join, basename } from "path";

async function createProject() {
  const [path] = process.argv.slice(2);
  if (!path) {
    console.log("Please provide a path to the project");
    process.exit(1);
  }

  console.log("Creating TypeScript project ⏳");
  await mkdir(path, { recursive: true });
  let result = execSync("npx gitignore node", { cwd: path }).toString();
  console.log(result);
  result = execSync("npm init -y", { cwd: path }).toString();
  console.log(result);
  result = execSync("npm i -D typescript", { cwd: path }).toString();
  console.log(result);
  result = execSync(
    'npx tsc --init -t "esnext" --outDir "./build" --rootDir "./src"',
    {
      cwd: path,
    }
  ).toString();

  console.log(result);

  await mkdir(join(path, "src"), { recursive: true });
  await writeFile(join(path, "src", "index.ts"), `console.log("Hello World");`);
  await writeFile(join(path, "README.md"), `## ${basename(path)}`);

  console.log("Project created ✅");
}

createProject();
