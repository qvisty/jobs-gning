# jobs-gning

Offentlig **jobsøgnings-side** hostet på GitHub Pages.

Strukturen er en anonymiseret forside med kalender og klikbare stillinger,
plus én underside pr. stilling med hele forløbet i faser: research, SMS-udkast,
telefonsamtale, ansøgning, samtaleforberedelse (inkl. STAR-, domæne- og
4D-forberedelsesmodeller) og lønforhandling.

## Sådan ændrer du indholdet

1. Redigér forsiden i `src/content.html` eller en stilling i `src/jobs/`.
2. Byg siderne igen:

   ```bash
   npm run build
   ```

   Dette regenererer `index.html` og undersiderne. Commit og push til `main`,
   så opdaterer GitHub Pages sig automatisk.

## Teknik

- `src/content.html` — forsiden (anonymiseret: kalender + klikbare stillinger).
- `src/jobs/vonsild.html` — underside: Skoleleder · Vonsild Specialskole.
- `src/jobs/soenderborg.html` — underside: Ungecenterleder · Sønderborg.
- `src/template.html` — fælles HTML-skal med styling og tjekliste-script
  (flueben gemmes i browserens localStorage).
- `build.mjs` — bygger alle sider ud fra skabelonen.
- `index.html`, `vonsild.html`, `soenderborg.html` — genereret output, som
  GitHub Pages serverer.

## Ny stilling

Kopiér `src/jobs/_skabelon.html` til `src/jobs/<navn>.html`, udfyld
pladsholderne, giv tjeklister og noter et unikt præfiks (erstat `jobX-`),
tilføj siden i `pages`-listen i `build.mjs`, og link til den fra forsiden.

Undersiderne er anonymiserede: personlige data står som pladsholdere
([DIT NAVN] osv.) og indsættes kun i den version, der faktisk sendes.
Flueben og noter gemmes lokalt i browserens localStorage.
