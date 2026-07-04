#!/usr/bin/env node
// Build-script: indsætter src/content.html i src/template.html og genererer index.html.
// Siden er offentlig — der er ingen adgangskode eller kryptering.
//
// Brug:
//   node build.mjs   (eller npm run build)

import { readFile, writeFile } from 'node:fs/promises';

const content = await readFile('src/content.html', 'utf8');
const template = await readFile('src/template.html', 'utf8');

const html = template.replace('__CONTENT__', content);
await writeFile('index.html', html, 'utf8');
console.log('OK: index.html genereret (' + content.length + ' tegn indhold).');
