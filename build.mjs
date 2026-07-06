#!/usr/bin/env node
// Build-script: bygger forsiden og én underside pr. stilling ud fra src/template.html.
// Siden er offentlig — der er ingen adgangskode eller kryptering.
//
// Hver stilling kan have et `match`-objekt. Det giver en vejledende match-score
// (0-100) sammensat af fire vægtede kriterier: profil, karriereplan, løn og
// pendling. Scoren renderes som et panel øverst på stillingens underside, så det
// hurtigt kan prioriteres, hvilke stillinger der er værd at gå efter.
// Juster tal og begrundelser her — de er skøn og kan opdateres når som helst.
//
// Brug:
//   node build.mjs   (eller npm run build)

import { readFile, writeFile } from 'node:fs/promises';

// Vægtning af de fire kriterier (skal summe til 100).
const WEIGHTS = { profil: 35, karriere: 30, loen: 20, pendling: 15 };

const DIM_LABELS = {
  profil: 'Profilmatch',
  karriere: 'Karriereplan',
  loen: 'Løn og økonomi',
  pendling: 'Pendling',
};

const pages = [
  { src: 'src/content.html', out: 'index.html', title: 'Jobsøgning' },
  {
    src: 'src/jobs/vonsild.html',
    out: 'vonsild.html',
    title: 'Skoleleder · Vonsild Specialskole',
    match: {
      profil: {
        score: 82,
        note: 'Skolelederrolle i direkte forlængelse af din ledelsesbaggrund. Specialskolefeltet kræver særlig specialpædagogisk indsigt, men selve ledelsesopgaven er velkendt.',
      },
      karriere: {
        score: 70,
        note: 'Konsolidering på skolelederniveau frem for et skridt op til leder af ledere. Stærk faglig retning inden for specialområdet, mindre karrieremæssig progression.',
      },
      loen: {
        score: 78,
        note: 'Skolelederløn på specialskole ligger solidt og typisk med tillæg for specialområdet. Forventet nogenlunde på niveau med eller lidt over dit nuværende.',
      },
      pendling: {
        score: 75,
        note: 'Ca. 40 min og 50 km hver vej ad E45. Fin daglig pendling, men den længste af de aktuelle stillinger.',
      },
    },
  },
  {
    src: 'src/jobs/soenderborg.html',
    out: 'soenderborg.html',
    title: 'Ungecenterleder · Sønderborg',
    match: {
      profil: {
        score: 78,
        note: 'Ungecenterledelse rammer dit ledelses- og ungeområde godt. Bredere tværfagligt felt end en enkelt skole, hvilket kræver koordinering på tværs.',
      },
      karriere: {
        score: 85,
        note: 'Centerlederrolle med ledelse af ledere og et bredere ansvarsområde. Et tydeligt skridt op ad karrierestigen i den retning, du sigter mod.',
      },
      loen: {
        score: 80,
        note: 'Centerlederniveau i Sønderborg Kommune. Forventet over dit nuværende, med et ledelsesansvar der understøtter forhandling af tillæg.',
      },
      pendling: {
        score: 85,
        note: 'Ca. 35 min og 32 km hver vej ad rute 8/41. Uproblematisk daglig pendling og tættest på af de aktuelle stillinger.',
      },
    },
  },
];

// Bestem match-niveau (label og farve) ud fra den samlede score.
function tier(total) {
  if (total >= 80) return { label: 'Stærkt match', col: '#34d399' };
  if (total >= 65) return { label: 'Godt match', col: '#6366f1' };
  if (total >= 50) return { label: 'Muligt match', col: '#fbbf24' };
  return { label: 'Svagt match', col: '#f87171' };
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Vægtet samlet score (0-100) ud fra de fire kriterier.
function matchTotal(match) {
  const keys = Object.keys(WEIGHTS);
  let total = 0;
  for (const k of keys) total += (match[k]?.score || 0) * WEIGHTS[k];
  return Math.round(total / 100);
}

// Beregn vægtet samlet score og byg HTML-panelet til en stilling.
function buildMatchPanel(match) {
  const keys = Object.keys(WEIGHTS);
  const total = matchTotal(match);
  const t = tier(total);

  const weightText = keys
    .map((k) => DIM_LABELS[k] + ' ' + WEIGHTS[k] + ' %')
    .join(' · ');

  const dims = keys
    .map((k) => {
      const d = match[k] || { score: 0, note: '' };
      const score = Math.max(0, Math.min(100, d.score || 0));
      return (
        '        <li class="md">\n' +
        '          <div class="md-top"><span class="md-label">' + esc(DIM_LABELS[k]) +
        '</span><span class="md-weight">vægt ' + WEIGHTS[k] + ' %</span>' +
        '<span class="md-score">' + score + '</span></div>\n' +
        '          <div class="md-track"><div class="md-fill" style="width:' + score + '%"></div></div>\n' +
        '          <p class="md-note">' + esc(d.note || '') + '</p>\n' +
        '        </li>'
      );
    })
    .join('\n');

  return (
    '  <section class="card matchscore" id="match" aria-label="Match-score for stillingen">\n' +
    '    <div class="match-head">\n' +
    '      <div class="match-gauge" style="--val:' + total + ';--col:' + t.col + '" role="img" aria-label="Match-score ' + total + ' ud af 100">\n' +
    '        <span class="match-inner"><span class="match-num">' + total + '</span><span class="match-max">/100</span></span>\n' +
    '      </div>\n' +
    '      <div class="match-verdict">\n' +
    '        <h2>🎯 Match-score: ' + esc(t.label) + '</h2>\n' +
    '        <p>Vejledende samlet vurdering af, hvor godt stillingen passer til din profil, karriereplan, forventet løn og pendling. Brug den til at prioritere, hvad der er værd at gå efter.</p>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <ul class="match-dims">\n' +
    dims + '\n' +
    '    </ul>\n' +
    '    <p class="match-foot">Vægtning: ' + esc(weightText) + '. Scoren er et skøn og kan justeres i build.mjs.</p>\n' +
    '  </section>\n'
  );
}

// Samlede scorer pr. underside — bruges til badges på forsiden.
const totals = {};
for (const page of pages) {
  if (page.match) totals[page.out] = { total: matchTotal(page.match), tier: tier(matchTotal(page.match)) };
}

// Udfyld tomme match-badges på forsiden (<span class="tag tag--match" data-match-for="X">).
function fillBadges(content) {
  return content.replace(
    /<span class="tag tag--match" data-match-for="([^"]+)"><\/span>/g,
    (whole, out) => {
      const info = totals[out];
      if (!info) return '';
      return (
        '<span class="tag tag--match" title="Vejledende match-score" ' +
        'style="border-color:' + info.tier.col + ';color:' + info.tier.col + '">Match ' +
        info.total + '</span>'
      );
    }
  );
}

const template = await readFile('src/template.html', 'utf8');

for (const page of pages) {
  let content = await readFile(page.src, 'utf8');

  // Indsæt match-panelet lige efter stillingens header (kun på undersider med match-data).
  if (page.match) {
    const panel = buildMatchPanel(page.match);
    const marker = '</header>';
    const idx = content.indexOf(marker);
    if (idx !== -1) {
      const at = idx + marker.length;
      content = content.slice(0, at) + '\n\n' + panel + content.slice(at);
    } else {
      content = panel + content;
    }
  }

  // Forsiden (og andre sider uden match) får badges udfyldt fra totals.
  content = fillBadges(content);

  const html = template.replace('__TITLE__', page.title).replace('__CONTENT__', content);
  await writeFile(page.out, html, 'utf8');
  console.log('OK: ' + page.out + ' genereret (' + content.length + ' tegn indhold).');
}
