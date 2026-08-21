# Generator · grafisk facilitering

Værktøjet bag casebillederne på stillingssiderne. Bruges igen, når en ny
stilling skal have visuelle modeller, samme stil, samme arbejdsgang.

## Stilen (fastlagt sammen med ejeren)

Håndtegnet grafisk facilitering, IKKE tændstikmænd og IKKE polerede
konsulentdiagrammer. Figurer med ovale hoveder og luft ned til bløde
klokkeformede kroppe, buede arme, små smil og grå skyggeblobber.
Sort tusch (#1f2937), gul markerfarve (#fde68a) som eneste accent,
hvid baggrund, håndskriftsfont (Patrick Hand, indlejret som base64 så
den virker overalt inkl. print), let wobble-filter på stregerne.
Kravspecifikationen og kvalitetskontrol-listen står i ../PROMPT.md.

## Filerne

- `sketch.py` · biblioteket. canvas, T (tekst), marker (gul overstregning),
  stick (figur, poser: stand/open/point/walk), group3, bubble (tale/tanke),
  box, banner (vimpelbanner), arrow, flag, skrivelinjer (stiplede linjer
  til blanke udgaver, standard 44 px afstand ≈ 11 mm på A4) og hjerte/lup/
  værktøj-ikoner i case234.py.
- `case1.py`, `case234.py` · eksempler på fire færdige modeller.
  100-dages-vejen (faseplan), kvalitetshjulet (cirkel), domænemodellen
  (tre ovaler) og hjemtagelses-broen (bro med piller). Hver laves i en
  udfyldt og en blank udgave (blank=True giver skrivelinjer).
- `patrickhand.ttf` · håndskriftsfonten, indlejres automatisk.

## Arbejdsgangen ved en ny stilling

1. Vælg model pr. case-gæt. Vej/tidslinje, hjul, zoner eller bro dækker
   det meste, ellers tegnes en ny med biblioteket.
2. Kør scriptet fra repo-roden. `python3 billeder/generator/caseX.py`
   skriver SVG-par til `billeder/`.
3. Render og SE på resultatet før levering.
   `chromium --headless --no-sandbox --screenshot=... --window-size=1200,675 file://.../fil.svg`
   Tjek kollisioner, læseretning og skriveplads, og kør PROMPT.md-listen.
4. Byg print-pakken. HTML med én side pr. SVG og
   `@page { size: A4 landscape; margin: 6mm }`, print til PDF med
   chromium `--print-to-pdf`, gem som `billeder/casepakke-<stilling>.pdf`.
5. Indsæt på stillingssiden som billedpar (udfyldt + blank) med klasserne
   `billedpar`/`casebillede`, og link print-pakken i casesektionen.

## Varme-laget (efter research i faget, august 2026)

Teknikker hentet fra bikablo-metoden og sketchnote-miljøet, indarbejdet
i biblioteket.

- **Grå dybde.** Slagskygger på bobler/bokse/bannere, skyggeblob under
  figurer og en grå sideskygge inde i figurkroppen. Lyskilden er
  konsekvent fra venstre, skygger falder nederst til højre.
- **To afdæmpede accentfarver, aldrig flere.** Gul marker (#fde68a) til
  overstregning og highlights, varm orange (#f2a25c) til hjerter, flag
  og nummer-badges. Alt andet er sort streg og gråt.
- **Lettering-hierarki.** Overskrifter bruger `titel()` med gul marker
  og en lys håndskygge bag bogstaverne, undertekster er mindre og uden
  effekter.
- **Nummer-badges.** `badge(x, y, n)` giver orange cirkler med hvide
  tal til trin og stationer, så læserækkefølgen er tydelig uden tekst.
- **Glimt.** `glimt(x, y)` sætter små firtakkede funkler ved mål og
  højdepunkter, to til tre pr. ark, aldrig flere.

Kilder. bikablo.com (metoden og det visuelle ordforråd), Sacha Chuas
sketchnote-lektioner om farve, JetPens' guide til sketchnoting og
Sketch Academys farveråd (2-3 farver, gråt til skygge, én varm accent).

Kanonisk 16:9-flade er 1200 x 675. Filerne er ren Python uden
afhængigheder ud over standardbiblioteket.
