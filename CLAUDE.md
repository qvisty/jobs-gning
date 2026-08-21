# CLAUDE.md

Retningslinjer for Claude Code i dette repository.

## Workflow

- **Merge altid direkte til `main`.** Når en ændring er færdig og bygget,
  merges den til `main` uden at vente på godkendelse. Åbn PR som normalt
  (kladde), markér den klar, og squash-merge den med det samme.
- Kør `npm run build` efter ændringer i `src/`, og commit det genererede
  output (`index.html`, `vonsild.html`, `soenderborg.html`) sammen med kilden.
- **Status kurateres i kilden, aldrig i browseren.** Statuslisten
  øverst på hver stillingsside er det eneste sted, fremdrift vises.
  ✓ betyder gjort, ▶ er næste skridt, ○ er åbent, ✗ er afslag/fravalg.
  Claude opdaterer den ud fra samtalerne med ejeren, hver gang der sker
  noget (SMS sendt, opkald gennemført, ansøgning sendt, invitation,
  afslag osv.). Inde på siderne er der ingen afkrydsningstænkning.
  Lister er huskepunkter, og gennemført arbejde beskrives i datid,
  eventuelt som ✓-linjer i faserne. Kun de private noter gemmes i
  browseren.
- **Visualiseringer laves som grafisk facilitering.** Casebilleder og
  andre visuelle modeller tegnes i håndtegnet facilitator-stil efter
  kravene i `billeder/PROMPT.md` og med generatoren i
  `billeder/generator/` (se README dér). Altid parvis, en udfyldt og en
  blank med skriveplads, altid renderet og efterset før levering, og
  samlet i en A4-printpakke pr. stilling.
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

Stillinger, der er set men ikke søgt, eller søgt uden ansættelse,
arkiveres i `src/jobs/inspiration.html` med genbrugsformuleringer,
procesidéer og markedsindsigt. Arkiverede opslag gengives uændret som
eksterne citater og er undtaget tegnsætningsreglerne.
