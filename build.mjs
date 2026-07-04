#!/usr/bin/env node
// Build-script: bygger forsiden og én underside pr. stilling ud fra src/template.html.
// Siden er offentlig — der er ingen adgangskode eller kryptering.
//
// Brug:
//   node build.mjs   (eller npm run build)

import { readFile, writeFile } from 'node:fs/promises';

const pages = [
  { src: 'src/content.html', out: 'index.html', title: 'Jobsøgning' },
  { src: 'src/jobs/vonsild.html', out: 'vonsild.html', title: 'Skoleleder · Vonsild Specialskole' },
  { src: 'src/jobs/soenderborg.html', out: 'soenderborg.html', title: 'Ungecenterleder · Sønderborg' },
  // Runde 2 · samtale- og caseforberedelse pr. stilling
  { src: 'src/jobs/region-midtjylland.html', out: 'region-midtjylland.html', title: 'Leder · Porteføljestyring · Region Midtjylland' },
  { src: 'src/jobs/skovshoved.html', out: 'skovshoved.html', title: 'Skoleleder · Skovshoved Skole (Gentofte)' },
  { src: 'src/jobs/damagerskolen.html', out: 'damagerskolen.html', title: 'Skoleleder · Damagerskolen og Greve 10. klasse' },
  { src: 'src/jobs/saltum.html', out: 'saltum.html', title: 'Skoleleder · Saltum Skole (Jammerbugt)' },
  { src: 'src/jobs/randers.html', out: 'randers.html', title: 'Områdeleder · Skoleområdet · Randers Kommune' },
  // Runde 3 · tre nye lederstillinger, en pr. mål
  { src: 'src/jobs/frederiksberg.html', out: 'frederiksberg.html', title: 'Digitaliseringschef · Frederiksberg Kommune' },
  { src: 'src/jobs/koebenhavn-city.html', out: 'koebenhavn-city.html', title: 'Skoleleder · Copenhagen City School (København)' },
  { src: 'src/jobs/gribskov.html', out: 'gribskov.html', title: 'Centerchef · Dagtilbud og Skole · Gribskov Kommune' },
];

const template = await readFile('src/template.html', 'utf8');

for (const page of pages) {
  const content = await readFile(page.src, 'utf8');
  const html = template.replace('__TITLE__', page.title).replace('__CONTENT__', content);
  await writeFile(page.out, html, 'utf8');
  console.log('OK: ' + page.out + ' genereret (' + content.length + ' tegn indhold).');
}
