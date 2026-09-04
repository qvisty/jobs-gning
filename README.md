# Jobsøgning

> Et personligt jobsøgnings-værktøj: en GitHub Pages-side (offentlig, men adgangskodebeskyttet), der samler CV, tidligere ansøgninger og skræddersyet hjælp til hver fase af en konkret jobsøgning.

> **Status i Paperclip:** `planned` (tidlig implementering i gang) · **Repo:** [github.com/qvisty/jobs-gning](https://github.com/qvisty/jobs-gning) · Del af ClipCores portefølje af personlige, værdiskabende værktøjer.

---

## Formål og vision

Formålet er at give ejeren optimal, konkret hjælp til jobsøgning ét sted. Siden skal være offentligt tilgængelig (så den er nem at finde og åbne), men beskyttet med adgangskode, så indholdet ikke kan læses af andre.

Ideen: I Paperclip lægges CV, tidligere ansøgninger og andet relevant ind. Når en spændende stilling dukker op, registreres jobbet, og der genereres skræddersyet hjælp til hver fase af jobsøgningen:

- Hjælp forud for første kontakt (sms el.lign.)
- Telefonisk kontakt (taleseddel, strategi, gode spørgsmål)
- Ansøgning
- Forberedelse til samtale(r)
- Case-hjælp (forbered sandsynlige cases)
- Løn-udspil og løn-forhandling
- God opstart

Dertil: vurdering af match med profil og karriereplan samt forventet løn — og mere, der skaber værdi.

## Slutmål (Definition of Done)

- En kørende GitHub Pages-side med adgangskodebeskyttelse.
- Mulighed for at tilføje jobs og få genereret fase-opdelt hjælp pr. job.
- Konkret værdi i en rigtig jobsøgning: bedre ansøgninger, samtaler og forhandlinger.

## Nuværende status

- **Fase:** Planlagt, tidlig implementering
- **Prioritet:** low
- **Hvor langt er vi:** Der er et statisk site-skelet på plads: en forside ([`index.html`](https://github.com/qvisty/jobs-gning/blob/main/index.html)), en build-pipeline ([`build.mjs`](https://github.com/qvisty/jobs-gning/blob/main/build.mjs)), en HTML-skabelon ([`src/template.html`](https://github.com/qvisty/jobs-gning/blob/main/src/template.html)) og de første job-sider (bl.a. Sønderborg og Vonsild) genereret fra skabelonen. `.nojekyll` er sat, så GitHub Pages serverer filerne direkte.
- **Seneste milepæl:** Opstart-modul med 30-60-90-dages plan tilføjet skabelonen.

## Planlægning og faser

- ✅ **Fase 1 — Statisk skelet:** Skabelon, build-script og første job-sider.
- 🔧 **Fase 2 — Fase-hjælp pr. job:** Indhold til hver jobsøgningsfase (kontakt, ansøgning, samtale, løn, opstart).
- ⬜ **Fase 3 — Adgangskodebeskyttelse:** Offentlig side, men beskyttet indhold.
- ⬜ **Fase 4 — CV/profil-integration:** Match-vurdering mod profil og karriereplan.

## Mangler på kort sigt (næste skridt)

- [ ] Implementér adgangskodebeskyttelse af den offentlige Pages-side.
- [ ] Færdiggør fase-skabelonerne (taleseddel, samtaleforberedelse, case-hjælp, løn-forhandling).
- [ ] Gør det let at tilføje et nyt job og generere dets side via build-scriptet.

## Mangler på lang sigt (roadmap)

- [ ] Integrér CV og tidligere ansøgninger som datagrundlag for genereret hjælp.
- [ ] Automatisk match-vurdering (profil, karriereplan, forventet løn).
- [ ] Udvid med flere værdiskabende faser efter behov.

## Teknik og opsætning

- **Stak:** Statisk site (HTML) genereret med et Node-baseret build-script (`build.mjs`).
- **Hosting:** GitHub Pages (`.nojekyll` sat).
- **Struktur:** `src/template.html` som skabelon, `src/jobs/*.html` som per-job-indhold, `src/content.html` som fælles indhold; build genererer de færdige sider i roden.

```bash
# Byg siderne lokalt
npm install       # hvis package.json har afhængigheder
node build.mjs    # genererer index.html + job-sider
```

## Links

- **GitHub-repo:** [github.com/qvisty/jobs-gning](https://github.com/qvisty/jobs-gning)
- **Build-script:** [`build.mjs`](https://github.com/qvisty/jobs-gning/blob/main/build.mjs)
- **Skabelon:** [`src/template.html`](https://github.com/qvisty/jobs-gning/blob/main/src/template.html)
- **README-standard:** [CLIA-4052](/CLIA/issues/CLIA-4052)

---
_Sidst opdateret: 2026-09-04 · Vedligeholdes som del af [CLIA-4052](/CLIA/issues/CLIA-4052)._
