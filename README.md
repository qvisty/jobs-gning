# jobs-gning

Adgangskodebeskyttet **jobsøgnings-side** hostet på GitHub Pages.

Siden er offentligt tilgængelig (statisk GitHub Pages), men selve indholdet er
**krypteret i browseren** med AES-256-GCM. Nøglen udledes fra adgangskoden med
PBKDF2-SHA256 (250.000 iterationer). Uden den korrekte adgangskode kan indholdet
ikke læses — heller ikke ved at kigge i sidens kildekode. Adgangskoden gemmes
aldrig i repoet; kun den krypterede tekst (`index.html`).

## Sådan ændrer du indholdet

1. Redigér `src/content.html` (det er dette der ligger bag adgangskoden).
2. Byg siden igen med en adgangskode:

   ```bash
   PAGE_PASSWORD="din-nye-kode" npm run build
   ```

   Dette regenererer `index.html`. Commit og push til `main`, så opdaterer
   GitHub Pages sig automatisk.

## Sådan skifter du adgangskode

Kør blot build igen med en ny `PAGE_PASSWORD` og commit `index.html`:

```bash
PAGE_PASSWORD="ny-kode" npm run build
```

## Teknik

- `src/content.html` — det beskyttede indhold (klartekst, redigeres her).
- `src/template.html` — HTML-skal med adgangskode-UI og dekrypteringslogik (Web Crypto).
- `build.mjs` — krypterer `content.html` og indsætter det i `index.html`.
- `index.html` — genereret output, det GitHub Pages serverer.

> Bemærk: Client-side kryptering beskytter indholdet mod almindelig visning, men
> egner sig ikke til stærkt fortrolige data. Det er fint til at holde en personlig
> jobsøgnings-side privat bag en delt kode.
