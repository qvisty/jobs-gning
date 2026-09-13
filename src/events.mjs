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
    start: '2026-09-11',
    kind: 'samtale',
    abbr: 'H',
    tag: 'samtale',
    tagLabel: 'Besøg · kl. 13',
    heading: 'Besøg på Hærvejsskolen · konstitueret skoleleder',
    headingUrl: 'haervejsskolen.html#fase-3',
    desc: 'Aftalt besøg fredag kl. 13 hos den konstituerede skoleleder. Huskelisten ligger i fase 3, indtrykkene skrives ind i fase 4 samme dag.',
    calTitle: 'Besøg: Hærvejsskolen, konstitueret skoleleder (kl. 13)',
    calDesc: 'Aftalt besøg på skolen. Skovbrynet 2, Rødekro. Huskelisten ligger i fase 3 på Hærvejsskole-siden.',
    calUrl: 'haervejsskolen.html#fase-3',
    cdLabel: 'Besøg: Hærvejsskolen (kl. 13)',
  },
  {
    start: '2026-10-02',
    kind: 'frist',
    abbr: 'H',
    tag: 'frist',
    tagLabel: 'Frist · overvejes',
    heading: 'Skoleleder · Hærvejsskolen (Rødekro)',
    headingUrl: 'haervejsskolen.html',
    desc: 'Aabenraa Kommune. Søges parallelt med Jels, alle formelle krav er opfyldt. Send ansøgning, CV og bilag senest fredag den 2. oktober.',
    calTitle: 'Ansøgningsfrist: Skoleleder · Hærvejsskolen',
    calDesc: 'Send ansøgning, CV og bilag senest fredag den 2. oktober.',
    calUrl: 'haervejsskolen.html',
  },
  {
    start: '2026-10-20',
    kind: 'samtale',
    abbr: 'H',
    tag: 'samtale',
    tagLabel: '1. samtale · kl. 16',
    heading: 'Skoleleder · Hærvejsskolen',
    headingUrl: 'haervejsskolen.html',
    desc: 'Første samtalerunde tirsdag den 20. oktober fra kl. 16.',
    calTitle: '1. samtale: Skoleleder · Hærvejsskolen (kl. 16)',
    calDesc: 'Første samtalerunde fra kl. 16.',
    calUrl: 'haervejsskolen.html',
  },
  {
    start: '2026-10-21',
    kind: 'samtale',
    abbr: 'H',
    tag: 'samtale',
    tagLabel: 'Personprofil · 24 timer',
    heading: 'Personprofil-link · Hærvejsskolen',
    headingUrl: 'haervejsskolen.html',
    desc: 'Går jeg videre, kommer spørgeskemaet til personprofilen, udfyldes senest torsdag den 22. kl. 8.00. Reservér aftenen den 21. Tilbagemeldingssamtale fredag den 23.',
    calTitle: 'Personprofil-skema: Hærvejsskolen (frist 22/10 kl. 8)',
    calDesc: 'Spørgeskema til personprofil, udfyldes senest torsdag den 22. oktober kl. 8.00. Tilbagemeldingssamtale fredag den 23.',
    calUrl: 'haervejsskolen.html',
  },
  {
    start: '2026-10-28',
    kind: 'samtale',
    abbr: 'H',
    tag: 'samtale',
    tagLabel: '2. samtale · efter 18.30',
    heading: 'Skoleleder · Hærvejsskolen',
    headingUrl: 'haervejsskolen.html',
    desc: 'Anden samtalerunde onsdag den 28. oktober efter kl. 18.30, med tilbagemelding på personprofilen.',
    calTitle: '2. samtale: Skoleleder · Hærvejsskolen (efter 18.30)',
    calDesc: 'Anden samtalerunde efter kl. 18.30.',
    calUrl: 'haervejsskolen.html',
  },
  {
    start: '2026-12-01',
    kind: 'tiltraedelse',
    abbr: 'H',
    tag: 'tiltraedelse',
    tagLabel: 'Tiltrædelse',
    heading: 'Tiltrædelse · Hærvejsskolen',
    headingUrl: 'haervejsskolen.html',
    desc: 'Forventet tiltrædelse 1. december 2026.',
    calTitle: 'Tiltrædelse (forventet): Skoleleder · Hærvejsskolen',
    calDesc: 'Forventet tiltrædelse 1. december 2026.',
    calUrl: 'haervejsskolen.html',
  },
];
