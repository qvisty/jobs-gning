# CLAUDE.md

Retningslinjer for Claude Code i dette repository.

## Workflow

- **Merge altid direkte til `main`.** Når en ændring er færdig og bygget,
  merges den til `main` uden at vente på godkendelse. Åbn PR som normalt
  (kladde), markér den klar, og squash-merge den med det samme.
- Kør `npm run build` efter ændringer i `src/`, og commit det genererede
  output (`index.html`, `vonsild.html`, `soenderborg.html`) sammen med kilden.

## Om projektet

Offentlig jobsøgnings-side på GitHub Pages. Kilderne ligger i `src/`
(`src/content.html` = forside, `src/jobs/*.html` = undersider), og
`build.mjs` genererer HTML-filerne i roden ud fra `src/template.html`.
Undersiderne er anonymiserede med pladsholdere ([DIT NAVN] osv.).
