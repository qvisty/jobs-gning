#!/usr/bin/env node
// Build-script. Bygger forsiden og én underside pr. stilling ud fra src/template.html.
// Datoer (tidslinje, nedtælling og månedskalender) genereres fra src/events.mjs,
// så en dato kun skal rettes ét sted.
// Siderne har en klient-side adgangslås (SHA-256-hash i template.html, cookie i en time).
// Låsen stopper almindelige besøgende, men indholdet findes stadig i sidens kilde,
// så personlige oplysninger skal fortsat holdes ude af siderne.
//
// Brug:
//   node build.mjs   (eller npm run build)

import { readFile, writeFile } from 'node:fs/promises';
import { events } from './src/events.mjs';

const pages = [
  { src: 'src/content.html', out: 'index.html', title: 'Jobsøgning' },
  { src: 'src/jobs/kalender.html', out: 'kalender.html', title: 'Kalender · vigtige datoer' },
  { src: 'src/jobs/vonsild.html', out: 'vonsild.html', title: 'Skoleleder · Vonsild Specialskole' },
  { src: 'src/jobs/soenderborg.html', out: 'soenderborg.html', title: 'Ungecenterleder · Sønderborg' },
  { src: 'src/jobs/inspiration.html', out: 'inspiration.html', title: 'Inspiration · stillinger til genbrug' },
];

const MON = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
const MAANED = ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august',
  'september', 'oktober', 'november', 'december'];
const UGEDAGE = ['man', 'tir', 'ons', 'tor', 'fre', 'lør', 'søn'];

function escAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
                  .replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Datoer sorteret stabilt efter dato (bevarer rækkefølgen inden for samme dag).
const sorted = events
  .map((e, i) => ({ e, i }))
  .sort((a, b) => (a.e.start < b.e.start ? -1 : a.e.start > b.e.start ? 1 : a.i - b.i))
  .map((x) => x.e);

const dayNum = (iso) => iso.slice(8, 10);
const monLabel = (iso) => MON[+iso.slice(5, 7) - 1] + ' ' + iso.slice(0, 4);

// Forsidens tidslinje.
function renderTimeline(evs) {
  const items = evs.map((ev) => {
    const attrs = [
      'data-cal-start="' + escAttr(ev.start) + '"',
      'data-cal-title="' + escAttr(ev.calTitle) + '"',
      'data-cal-desc="' + escAttr(ev.calDesc) + '"',
    ];
    if (ev.calUrl) attrs.push('data-cal-url="' + escAttr(ev.calUrl) + '"');
    const heading = ev.headingUrl
      ? '<a href="' + escAttr(ev.headingUrl) + '">' + escHtml(ev.heading) + '</a>'
      : escHtml(ev.heading);
    return '      <li class="event" ' + attrs.join(' ') + '>\n' +
      '        <div class="event-date"><span class="day">' + dayNum(ev.start) +
      '</span><span class="mon">' + monLabel(ev.start) + '</span></div>\n' +
      '        <div class="event-body">\n' +
      '          <span class="tag tag--' + ev.tag + '">' + escHtml(ev.tagLabel) + '</span>\n' +
      '          <h3>' + heading + '</h3>\n' +
      '          <p>' + escHtml(ev.desc) + '</p>\n' +
      '        </div>\n' +
      '      </li>';
  }).join('\n');
  const loebende =
    '      <li class="event">\n' +
    '        <div class="event-date"><span class="day">·</span><span class="mon">løbende</span></div>\n' +
    '        <div class="event-body">\n' +
    '          <span class="tag tag--opfoelgning">Opfølgning</span>\n' +
    '          <h3>Kontakt og netværk</h3>\n' +
    '          <p>Ring eller skriv til kontaktpersonen efter fristen. Notér aftaler og deadlines på stillingens underside.</p>\n' +
    '        </div>\n' +
    '      </li>';
  return '<ol class="timeline">\n' + items + '\n' + loebende + '\n    </ol>';
}

// Nedtælling øverst på forsiden (kun datoer med cdLabel).
function renderCountdown(evs) {
  const data = evs.filter((e) => e.cdLabel).map((e) => [e.start, e.cdLabel]);
  return JSON.stringify(data);
}

// Måneder der har mindst én begivenhed, i kronologisk rækkefølge.
function monthsWithEvents(evs) {
  const seen = new Map();
  evs.forEach((e) => {
    const y = +e.start.slice(0, 4);
    const m = +e.start.slice(5, 7);
    const key = y * 12 + (m - 1);
    if (!seen.has(key)) seen.set(key, { y, m });
  });
  return [...seen.values()].sort((a, b) => a.y - b.y || a.m - b.m);
}

function renderMonth({ y, m }, evs) {
  const offset = (new Date(y, m - 1, 1).getDay() + 6) % 7; // mandag-baseret
  const days = new Date(y, m, 0).getDate();
  const byDay = {};
  evs.forEach((e) => {
    if (+e.start.slice(0, 4) === y && +e.start.slice(5, 7) === m) {
      const d = +e.start.slice(8, 10);
      (byDay[d] = byDay[d] || []).push(e);
    }
  });

  let cells = UGEDAGE.map((w) => '<div class="kal-head">' + w + '</div>').join('');
  for (let i = 0; i < offset; i++) cells += '<div class="kal-cell kal-empty"></div>';
  for (let d = 1; d <= days; d++) {
    const evsD = byDay[d] || [];
    const chips = evsD.map((ev) => {
      const url = ev.headingUrl || ev.calUrl || 'index.html#kalender';
      const label = ev.kind === 'frist' ? 'Frist'
        : ev.kind === 'tiltraedelse' ? 'Tiltrædelse' : ev.tagLabel;
      const badge = ev.abbr
        ? '<span class="kal-chip-tag">' + escHtml(ev.abbr) + '</span>' : '';
      return '<a class="kal-chip kal-chip--' + ev.kind + '" href="' + escAttr(url) +
        '" title="' + escAttr(ev.calTitle) + '">' +
        badge + '<span class="kal-chip-lab">' + escHtml(label) + '</span></a>';
    }).join('');
    const has = evsD.length ? ' kal-has' : '';
    cells += '<div class="kal-cell' + has + '"><span class="kal-daynum">' + d + '</span>' + chips + '</div>';
  }

  return '<div class="kal-month">\n' +
    '  <h3 class="kal-title">' + MAANED[m - 1] + ' ' + y + '</h3>\n' +
    '  <div class="kal-grid">' + cells + '</div>\n' +
    '</div>';
}

function renderGrid(evs) {
  return monthsWithEvents(evs).map((mm) => renderMonth(mm, evs)).join('\n');
}

const template = await readFile('src/template.html', 'utf8');
const timeline = renderTimeline(sorted);
const countdown = renderCountdown(sorted);
const monthgrid = renderGrid(sorted);

for (const page of pages) {
  let content = await readFile(page.src, 'utf8');
  content = content
    .replace('__TIMELINE__', () => timeline)
    .replace('__COUNTDOWN__', () => countdown)
    .replace('__MONTHGRID__', () => monthgrid);
  const html = template
    .replace('__TITLE__', () => page.title)
    .replace('__CONTENT__', () => content);
  await writeFile(page.out, html, 'utf8');
  console.log('OK: ' + page.out + ' genereret (' + content.length + ' tegn indhold).');
}
