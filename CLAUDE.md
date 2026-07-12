# CLAUDE.md

Retningslinjer for Claude Code i dette repository.

## Workflow

- **Merge altid direkte til `main`.** Når en ændring er færdig og bygget,
  merges den til `main` uden at vente på godkendelse. Åbn PR som normalt
  (kladde), markér den klar, og squash-merge den med det samme.
- Kør `npm run build` efter ændringer i `src/`, og commit det genererede
  output (`index.html`, `vonsild.html`, `soenderborg.html`) sammen med kilden.
- **Fang dikteringsfejl.** Ejeren dikterer ofte sine beskeder, så vær
  opmærksom på sandsynlige fejldikteringer, især navne og fagtermer, der
  ligner hinanden. Tjek mod det, der allerede står i materialet, ret til
  den sandsynlige mening, og nævn altid eksplicit, hvad der blev antaget
  rettet. Eksempler fra tidligere er "Annie" → René, "TRAP" → KRAP og
  "fleksjob" → fritidsjob.

## Sprog og tegnsætning

Gælder al tekst, der skrives til ejeren eller til siderne.

- **Ingen tankestreg (emdash) og ingen semikolon.** Undgå helst også
  kolon. Brug punktum og komma i stedet, og del hellere en lang sætning
  op i to.
- **Brug kun almindelig bindestreg, hvor retskrivningen kræver den**,
  fx i sammensætninger som "KRAP-fundament" og "e-mail". Aldrig som
  stilistisk indskud eller erstatning for tankestreg.
- Allerede afsendt materiale (fx arkiverede ansøgninger i fase 5) rettes
  ikke bagudrettet. Det skal fortsat matche det, der faktisk blev sendt.

## Om projektet

Jobsøgnings-side på GitHub Pages. Kilderne ligger i `src/`
(`src/content.html` = forside, `src/jobs/*.html` = undersider), og
`build.mjs` genererer HTML-filerne i roden ud fra `src/template.html`.
Siderne har en klient-side adgangslås (hash i `src/template.html`,
cookie i en time). Låsen stopper almindelige besøgende, men indholdet
findes stadig i sidens kilde og i det offentlige repo. Undersiderne
skal derfor fortsat være anonymiserede med pladsholdere ([DIT NAVN]
osv.).
