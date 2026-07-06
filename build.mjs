#!/usr/bin/env node
// Build-script: bygger forsiden og én underside pr. stilling ud fra src/template.html.
// Siden er offentlig — der er ingen adgangskode eller kryptering.
//
// Brug:
//   node build.mjs   (eller npm run build)

import { readFile, writeFile } from 'node:fs/promises';

const pages = [
  { src: 'src/content.html', out: 'index.html', title: 'Jobsøgning' },
  { src: 'src/foerste-kontakt.html', out: 'foerste-kontakt.html', title: 'Første kontakt · standard' },
  { src: 'src/jobs/vonsild.html', out: 'vonsild.html', title: 'Skoleleder · Vonsild Specialskole' },
  { src: 'src/jobs/soenderborg.html', out: 'soenderborg.html', title: 'Ungecenterleder · Sønderborg' },
];

const template = await readFile('src/template.html', 'utf8');

for (const page of pages) {
  const content = await readFile(page.src, 'utf8');
  const html = template.replace('__TITLE__', page.title).replace('__CONTENT__', content);
  await writeFile(page.out, html, 'utf8');
  console.log('OK: ' + page.out + ' genereret (' + content.length + ' tegn indhold).');
}
