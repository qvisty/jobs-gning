#!/usr/bin/env node
// Build-script. Bygger forsiden og én underside pr. stilling ud fra src/template.html.
// Siderne har en klient-side adgangslås (SHA-256-hash i template.html, cookie i en time).
// Låsen stopper almindelige besøgende, men indholdet findes stadig i sidens kilde,
// så personlige oplysninger skal fortsat holdes ude af siderne.
//
// Brug:
//   node build.mjs   (eller npm run build)

import { readFile, writeFile } from 'node:fs/promises';

const pages = [
  { src: 'src/content.html', out: 'index.html', title: 'Jobsøgning' },
  { src: 'src/foerste-kontakt.html', out: 'foerste-kontakt.html', title: 'Første kontakt · standard' },
  { src: 'src/jobs/vonsild.html', out: 'vonsild.html', title: 'Skoleleder · Vonsild Specialskole' },
  { src: 'src/jobs/soenderborg.html', out: 'soenderborg.html', title: 'Ungecenterleder · Sønderborg' },
  { src: 'src/jobs/inspiration.html', out: 'inspiration.html', title: 'Inspiration · stillinger til genbrug' },
];

const template = await readFile('src/template.html', 'utf8');

for (const page of pages) {
  const content = await readFile(page.src, 'utf8');
  const html = template.replace('__TITLE__', page.title).replace('__CONTENT__', content);
  await writeFile(page.out, html, 'utf8');
  console.log('OK: ' + page.out + ' genereret (' + content.length + ' tegn indhold).');
}
