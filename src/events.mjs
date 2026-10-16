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
    start: '2026-11-04',
    kind: 'frist',
    abbr: 'D',
    tag: 'frist',
    tagLabel: 'Frist · overvejes',
    heading: 'Skoleleder · Dybbøl-Skolen (Sønderborg)',
    headingUrl: 'dybboel-skolen.html',
    desc: 'Sønderborg Kommune. Skolelederspor nummer to, beslutningen tages med Hærvejsskolens svar i hånden. Send ansøgning senest onsdag den 4. november.',
    calTitle: 'Ansøgningsfrist: Skoleleder · Dybbøl-Skolen',
    calDesc: 'Send ansøgning senest onsdag den 4. november.',
    calUrl: 'dybboel-skolen.html',
  },
  {
    start: '2026-11-16',
    kind: 'samtale',
    abbr: 'D',
    tag: 'samtale',
    tagLabel: '1. samtale · case på dagen',
    heading: 'Skoleleder · Dybbøl-Skolen',
    headingUrl: 'dybboel-skolen.html',
    desc: 'Første samtalerunde. Casen udleveres på dagen og skal forholdes til inden selve samtalen.',
    calTitle: '1. samtale: Skoleleder · Dybbøl-Skolen (case)',
    calDesc: 'Første samtalerunde med case på dagen inden samtalen.',
    calUrl: 'dybboel-skolen.html',
  },
  {
    start: '2026-11-23',
    kind: 'samtale',
    abbr: 'D',
    tag: 'samtale',
    tagLabel: '2. samtale · Garuda',
    heading: 'Skoleleder · Dybbøl-Skolen',
    headingUrl: 'dybboel-skolen.html',
    desc: 'Anden samtalerunde. Garuda-profil gennemføres forud for samtalen.',
    calTitle: '2. samtale: Skoleleder · Dybbøl-Skolen (Garuda)',
    calDesc: 'Anden samtalerunde. Garuda-profil gennemføres forud.',
    calUrl: 'dybboel-skolen.html',
  },
  {
    start: '2027-01-01',
    kind: 'tiltraedelse',
    abbr: 'D',
    tag: 'tiltraedelse',
    tagLabel: 'Tiltrædelse',
    heading: 'Skoleleder · Dybbøl-Skolen',
    headingUrl: 'dybboel-skolen.html',
    desc: 'Forventet tiltrædelse 1. januar 2027.',
    calTitle: 'Tiltrædelse: Skoleleder · Dybbøl-Skolen',
    calDesc: 'Forventet tiltrædelse 1. januar 2027.',
    calUrl: 'dybboel-skolen.html',
  },
  {
    start: '2026-10-19',
    kind: 'samtale',
    abbr: 'D',
    tag: 'samtale',
    tagLabel: 'Rundvisning · kl. 15',
    heading: 'Rundvisning på Dybbøl-Skolen',
    headingUrl: 'dybboel-skolen.html#fase-3',
    desc: 'Aftalt rundvisning med den konstituerede skoleleder mandag kl. 15 til 16. Dagen før Hærvejsskolens 1. samtale, så den forberedelse skal være færdig i weekenden.',
    calTitle: 'Rundvisning: Dybbøl-Skolen (kl. 15 til 16)',
    calDesc: 'Rundvisning med den konstituerede skoleleder. Huskelisten ligger i fase 3 på Dybbøl-siden.',
    calUrl: 'dybboel-skolen.html#fase-3',
    cdLabel: 'Rundvisning: Dybbøl-Skolen (kl. 15)',
  },
  {
    start: '2026-10-30',
    kind: 'frist',
    abbr: 'D',
    tag: 'frist',
    tagLabel: 'Send ansøgningen · fem dage før frist',
    heading: 'Send ansøgningen · Dybbøl-Skolen',
    headingUrl: 'dybboel-skolen.html#fase-5',
    desc: 'Planlagt afsendelse, fem dage før fristen den 4. november. Tidligt med vilje, fordi det er et skolelederspor. Vent ikke på Hærvejsskolens svar, en ansøgning kan trækkes, en frist kan ikke genåbnes.',
    calTitle: 'Send ansøgning: Skoleleder, Dybbøl-Skolen',
    calDesc: 'Planlagt afsendelse fem dage før fristen. Udkastet ligger i fase 5 på Dybbøl-siden.',
    calUrl: 'dybboel-skolen.html#fase-5',
    cdLabel: 'Send ansøgning: Dybbøl-Skolen',
  },
];
