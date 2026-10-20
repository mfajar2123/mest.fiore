import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outputRoot = fileURLToPath(new URL('../dist/', import.meta.url));
const hashes = { script: new Set(), style: new Set() };

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
    } else if (entry.name.endsWith('.html')) {
      const html = await readFile(path, 'utf8');
      for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
        if (!/\bsrc\s*=/.test(match[1]) && match[2].trim()) hashes.script.add(hash(match[2]));
      }
      for (const match of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
        if (match[1].trim()) hashes.style.add(hash(match[1]));
      }
    }
  }
}

function hash(value) {
  return `'sha256-${createHash('sha256').update(value).digest('base64')}'`;
}

await walk(outputRoot);
const scriptHashes = [...hashes.script].join(' ');
const styleHashes = [...hashes.style].join(' ');
const headers = `/*\n  Content-Security-Policy: default-src 'self'; script-src 'self' ${scriptHashes}; style-src 'self' ${styleHashes}; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests\n  Strict-Transport-Security: max-age=31536000\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()\n  X-Frame-Options: DENY\n`;
await writeFile(join(outputRoot, '_headers'), headers, 'utf8');
console.log(`Wrote CSP with ${hashes.script.size} script and ${hashes.style.size} style hashes.`);
