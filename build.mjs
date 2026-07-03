#!/usr/bin/env node
// Build-script: krypterer src/content.html med en adgangskode og genererer index.html.
// Krypteringen (PBKDF2-SHA256 -> AES-256-GCM) matcher decrypt-koden i src/template.html,
// som bruger browserens Web Crypto API. Password gemmes ALDRIG i output — kun ciphertext.
//
// Brug:
//   PAGE_PASSWORD="dinkode" node build.mjs
//   (eller npm run build, som sætter en default hvis PAGE_PASSWORD ikke er sat)

import { webcrypto as crypto } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

const ITERATIONS = 250000;
const password = process.env.PAGE_PASSWORD;

if (!password) {
  console.error('FEJL: sæt PAGE_PASSWORD, fx  PAGE_PASSWORD="minkode" node build.mjs');
  process.exit(1);
}

const enc = new TextEncoder();
const content = await readFile('src/content.html', 'utf8');
const template = await readFile('src/template.html', 'utf8');

const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));

const baseKey = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
  baseKey,
  { name: 'AES-GCM', length: 256 },
  false,
  ['encrypt']
);

const cipherBuf = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(content));

const b64 = (buf) => Buffer.from(buf).toString('base64');
const payload = JSON.stringify({
  v: 1,
  iterations: ITERATIONS,
  salt: b64(salt),
  iv: b64(iv),
  ct: b64(cipherBuf),
});

const html = template.replace('__ENCRYPTED_PAYLOAD__', payload);
await writeFile('index.html', html, 'utf8');
console.log('OK: index.html genereret (' + content.length + ' tegn indhold krypteret).');
