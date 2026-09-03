#!/usr/bin/env node
// Kvalitetstjek af kilderne. Fanger de fejl, der ellers først opdages,
// når ejeren læser en side og undrer sig.
//
// Tjekker:
//   1. Døde interne links og manglende opslags-PDF'er
//   2. Forældede ▶-markeringer, altså næste skridt med en dato, der er passeret
//   3. Personoplysninger, der er sluppet ud i den offentlige kilde
//   4. Sprogregler, tankestreg og semikolon i prosa (arkiverede citater undtaget)
//   5. Sider der ikke er med i build-listen
//
// Brug:  npm run tjek   (eller node tjek.mjs)
// Afslutter med kode 1, hvis der er fejl, og 0 ved rene sider eller kun advarsler.

import { readFile, readdir, access } from 'node:fs/promises';

const fejl = [];
const advarsler = [];
const MAANEDER = ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli',
  'august', 'september', 'oktober', 'november', 'december'];

const findes = async (p) => access(p).then(() => true).catch(() => false);

// Fjerner arkiverede opslags-citater og kode, så sprogreglerne kun rammer egen prosa.
function kunEgenProsa(html) {
  return html
    .replace(/<details class="qa">\s*<summary>Hele opslaget[\s\S]*?<\/details>/g, '')
    .replace(/<style>[\s\S]*?<\/style>/g, '')
    .replace(/<script>[\s\S]*?<\/script>/g, '')
    .replace(/<blockquote>[\s\S]*?<\/blockquote>/g, '')
    .replace(/ style="[^"]*"/g, '');
}

const jobsDir = 'src/jobs';
const filer = (await readdir(jobsDir)).filter((f) => f.endsWith('.html') && !f.startsWith('_'));
const build = await readFile('build.mjs', 'utf8');
const alleSider = ['src/content.html', ...filer.map((f) => `${jobsDir}/${f}`)];

for (const sti of alleSider) {
  const html = await readFile(sti, 'utf8');
  const navn = sti.replace('src/', '');

  // 1a. Interne links
  for (const m of html.matchAll(/href="([a-z0-9-]+\.html)/g)) {
    if (!(await findes(m[1]))) fejl.push(`${navn}: dødt link til ${m[1]}`);
  }
  // 1b. Opslags-PDF'er
  for (const m of html.matchAll(/href="(opslag\/[^"]+\.pdf)"/g)) {
    if (!(await findes(m[1]))) fejl.push(`${navn}: manglende PDF ${m[1]}`);
  }

  // 2. Forældede næste skridt. En ▶-linje med en dato, der er passeret.
  for (const m of html.matchAll(/<li class="st-next">([^<]*)</g)) {
    const tekst = m[1];
    const d = tekst.match(/(\d{1,2})\/(\d{1,2})\b/) ||
      tekst.match(/(\d{1,2})\.\s*(januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december)/i);
    if (!d) continue;
    const dag = +d[1];
    const maaned = isNaN(+d[2]) ? MAANEDER.indexOf(d[2].toLowerCase()) + 1 : +d[2];
    const dato = new Date(new Date().getFullYear(), maaned - 1, dag);
    const idag = new Date(); idag.setHours(0, 0, 0, 0);
    if (dato < idag) advarsler.push(`${navn}: næste skridt med passeret dato · "${tekst.trim()}"`);
  }

  // 3. Anonymitet. Siderne ligger i et offentligt repo, så rigtige personoplysninger
  //    og skolenavne skal blive i pladsholderne og i de private noter.
  const forbudt = [
    [/Emmerske/i, 'nuværende skoles navn'],
    [/Kløver-?Skolen/i, 'tidligere skoles navn'],
    [/Felsted Centralskole/i, 'tidligere skoles navn'],
    [/Høje Kolstrup/i, 'tidligere skoles navn'],
    [/Frueløkke/i, 'privatadresse'],
    [/\b29\s?92\s?31\s?01\b/, 'privat telefonnummer'],
    [/jgq@live\.dk/i, 'privat mailadresse'],
    [/1978-01-31|31[.\-/]01[.\-/]1978/, 'fødselsdato'],
  ];
  for (const [re, hvad] of forbudt) {
    if (re.test(html)) fejl.push(`${navn}: personoplysning i offentlig kilde · ${hvad}`);
  }

  // 4. Sprogregler i egen prosa
  const prosa = kunEgenProsa(html);
  if (/[—–]/.test(prosa)) {
    const eks = prosa.match(/.{0,40}[—–].{0,40}/)[0].replace(/\s+/g, ' ').trim();
    advarsler.push(`${navn}: tankestreg i prosa · "${eks}"`);
  }
  const semi = prosa.replace(/&[a-z]+;|&#\d+;/g, '').match(/[^>]{0,50};[^<]{0,50}/g);
  if (semi) advarsler.push(`${navn}: semikolon i prosa · "${semi[0].replace(/\s+/g, ' ').trim()}"`);

  // 5. Med i build-listen?
  if (sti !== 'src/content.html' && !build.includes(sti)) {
    fejl.push(`${navn}: siden er ikke med i pages-listen i build.mjs`);
  }
}

// Kalenderfilterets bogstaver skal matche dem, der faktisk bruges i events.
const events = await readFile('src/events.mjs', 'utf8');
const kalender = await readFile('src/jobs/kalender.html', 'utf8');
const brugte = new Set([...events.matchAll(/abbr: '([A-Z])'/g)].map((m) => m[1]));
const filtre = new Set([...kalender.matchAll(/value="([A-Z])"/g)].map((m) => m[1]));
for (const b of brugte) if (!filtre.has(b)) fejl.push(`kalender.html: bogstavet ${b} bruges i events, men mangler et flueben`);
for (const f of filtre) if (!brugte.has(f)) fejl.push(`kalender.html: fluebenet ${f} har ingen datoer i events`);

console.log(`Tjekkede ${alleSider.length} sider.\n`);
if (fejl.length) {
  console.log('FEJL, skal rettes:');
  fejl.forEach((f) => console.log('  ✗ ' + f));
  console.log('');
}
if (advarsler.length) {
  console.log('ADVARSLER, se efter:');
  advarsler.forEach((a) => console.log('  ! ' + a));
  console.log('');
}
if (!fejl.length && !advarsler.length) console.log('Alt rent. Ingen fejl og ingen advarsler.');
process.exit(fejl.length ? 1 : 0);
