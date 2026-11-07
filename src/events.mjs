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
];
