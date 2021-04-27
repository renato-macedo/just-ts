#!/usr/bin/env node
import { execSync } from 'child_process'
import { mkdir, writeFile } from 'fs/promises'
import { join, basename } from 'path'

async function createProject() {
  const [path] = process.argv.slice(2)
  if (!path) {
    console.log('Please provide a path to the project')
    process.exit(1)
  }

  console.log('Creating TypeScript project ⏳')
  await mkdir(path, { recursive: true })
  execSync('npx gitignore node', { cwd: path })
  execSync('npm init -y', { cwd: path })
  execSync('npx tsc --init -t "esnext" --outDir "./build" --rootDir "./src"', {
    cwd: path,
  })

  await mkdir(join(path, 'src'), { recursive: true })
  await writeFile(join(path, 'src', 'index.ts'), `console.log("Hello World");`)
  await writeFile(join(path, 'README.md'), `## ${basename(path)}`)

  console.log('Project created ✅')
}

createProject()
