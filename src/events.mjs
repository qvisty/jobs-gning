// Fælles datakilde for alle datoer på siden.
// Både forsidens tidslinje, nedtællingen øverst og månedskalenderen
// (kalender.html) genereres af build.mjs ud fra denne ene liste, så en
// dato kun skal rettes ét sted.
//
// Felter pr. begivenhed:
//   start      ISO-dato (YYYY-MM-DD)
//   kind       frist | samtale | tiltraedelse (styrer farve i kalenderen)
//   short      kort stednavn vist i kalendergitteret (tom = intet)
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
    start: '2026-08-11',
    kind: 'frist',
    short: 'Vonsild',
    tag: 'sendt',
    tagLabel: '✓ Sendt 11. juli',
    heading: 'Skoleleder · Vonsild Specialskole',
    headingUrl: 'vonsild.html',
    desc: 'Kolding Kommune. Ansøgning og CV er sendt 11. juli 2026, en måned før fristen.',
    calTitle: 'Ansøgningsfrist: Skoleleder · Vonsild Specialskole',
    calDesc: 'Kolding Kommune. Ansøgning og CV er sendt 11. juli 2026, en måned før fristen.',
    calUrl: 'vonsild.html',
  },
  {
    start: '2026-08-11',
    kind: 'frist',
    short: 'Sønderborg',
    tag: 'sendt',
    tagLabel: '✓ Sendt 7. juli',
    heading: 'Ungecenterleder · Sønderborg Kommune',
    headingUrl: 'soenderborg.html',
    desc: 'Ansøgning og CV er sendt 7. juli 2026, i god tid før fristen.',
    calTitle: 'Ansøgningsfrist: Ungecenterleder · Sønderborg',
    calDesc: 'Ansøgning og CV er sendt 7. juli 2026, i god tid før fristen.',
    calUrl: 'soenderborg.html',
  },
  {
    start: '2026-08-19',
    kind: 'samtale',
    short: 'Sønderborg',
    tag: 'samtale',
    tagLabel: '1. samtale',
    heading: 'Ungecenterleder · Sønderborg',
    headingUrl: 'soenderborg.html',
    desc: 'Første samtale med case på ungeområdet.',
    calTitle: '1. samtale: Ungecenterleder · Sønderborg',
    calDesc: 'Første samtale med case på ungeområdet.',
    calUrl: 'soenderborg.html',
    cdLabel: '1. samtale: Sønderborg og Vonsild',
  },
  {
    start: '2026-08-19',
    kind: 'samtale',
    short: 'Vonsild',
    tag: 'samtale',
    tagLabel: '1. samtale',
    heading: 'Skoleleder · Vonsild',
    headingUrl: 'vonsild.html',
    desc: 'Motivation, ledelsessyn og værdimatch.',
    calTitle: '1. samtale: Skoleleder · Vonsild',
    calDesc: 'Motivation, ledelsessyn og værdimatch.',
    calUrl: 'vonsild.html',
  },
  {
    start: '2026-08-24',
    kind: 'samtale',
    short: 'Sønderborg',
    tag: 'samtale',
    tagLabel: '2. samtale',
    heading: 'Ungecenterleder · Sønderborg',
    headingUrl: 'soenderborg.html',
    desc: 'Anden samtale med Garuda-profil. Udfyld spørgeskemaet i forvejen.',
    calTitle: '2. samtale: Ungecenterleder · Sønderborg',
    calDesc: 'Anden samtale med Garuda-profil. Udfyld spørgeskemaet i forvejen.',
    calUrl: 'soenderborg.html',
    cdLabel: '2. samtale: Sønderborg (Garuda)',
  },
  {
    start: '2026-08-25',
    kind: 'samtale',
    short: 'Vonsild',
    tag: 'samtale',
    tagLabel: '2. samtale',
    heading: 'Skoleleder · Vonsild',
    headingUrl: 'vonsild.html',
    desc: 'Case og ofte personprofiltest.',
    calTitle: '2. samtale: Skoleleder · Vonsild',
    calDesc: 'Case og ofte personprofiltest.',
    calUrl: 'vonsild.html',
    cdLabel: '2. samtale: Vonsild (case)',
  },
  {
    start: '2026-10-01',
    kind: 'tiltraedelse',
    short: '',
    tag: 'tiltraedelse',
    tagLabel: 'Tiltrædelse',
    heading: 'Forventet opstart',
    desc: 'Forventet startdato for begge stillinger. Vonsild Specialskole bliver selvstændig pr. 1. januar 2027.',
    calTitle: 'Forventet tiltrædelse (begge stillinger)',
    calDesc: 'Forventet startdato for begge stillinger. Vonsild Specialskole bliver selvstændig pr. 1. januar 2027.',
    cdLabel: 'Forventet tiltrædelse',
  },
];
