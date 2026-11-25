// Fælles datakilde for alle datoer på siden.
// Både forsidens tidslinje, nedtællingen øverst og månedskalenderen
// (kalender.html) genereres af build.mjs ud fra denne ene liste, så en
// dato kun skal rettes ét sted.
//
// Felter pr. begivenhed:
//   start      ISO-dato (YYYY-MM-DD)
//   kind       frist | samtale | tiltraedelse (styrer farve i kalenderen)
//   abbr       kort bogstav-mærke i kalenderen der viser stillingen (tom = intet)
//   tag        pille-klasse på forsiden (tag--sendt, tag--samtale, ...)
//   tagLabel   teksten i pillen
//   heading    overskrift i tidslinjen
//   headingUrl gør overskriften til et link (udelad for ingen link)
//   desc       brødtekst i tidslinjen
//   calTitle   titel i .ics og som tooltip i kalenderen
//   calDesc    beskrivelse i .ics
//   calUrl     link lagt i .ics (udelad for ingen)
//   cdLabel    hvis sat, indgår datoen i nedtællingen med denne tekst

export const events = [
  {
    start: '2026-12-11',
    kind: 'frist',
    abbr: 'B',
    tag: 'frist',
    tagLabel: 'Reel deadline · løbende samtaler',
    heading: 'Beslut og send · Direktør, Bygma Aabenraa',
    headingUrl: 'bygma-aabenraa.html#fase-4',
    desc: 'Den formelle frist er 3. januar, men der holdes løbende samtaler, og den rette kandidat kan vælges før fristen. Julen gør uge 50 til den sidste uge, hvor en ansøgning bliver læst i tide. Beslutningsreglen ligger i fase 4.',
    calTitle: 'Sidste reelle frist: Direktør, Bygma Aabenraa',
    calDesc: 'Loebende samtaler, saa den formelle frist 3. januar er ikke den reelle. Beslut og send senest nu.',
    calUrl: 'bygma-aabenraa.html#fase-4',
    cdLabel: 'Beslut: Bygma Aabenraa',
  },
  {
    start: '2027-01-03',
    kind: 'frist',
    abbr: 'B',
    tag: 'frist',
    tagLabel: 'Formel frist',
    heading: 'Direktør · Bygma Aabenraa',
    headingUrl: 'bygma-aabenraa.html',
    desc: 'Formel ansøgningsfrist. Ansøgning sker udelukkende via Bygmas eget rekrutteringssystem.',
    calTitle: 'Ansøgningsfrist: Direktør · Bygma Aabenraa',
    calDesc: 'Formel frist. Ansoegning kun via Bygmas rekrutteringssystem.',
    calUrl: 'bygma-aabenraa.html',
  },
];
