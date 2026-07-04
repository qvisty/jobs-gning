# jobs-gning

Offentlig **jobsøgnings-side** hostet på GitHub Pages.

Siden er statisk: indholdet i `src/content.html` bygges ind i `index.html`,
som GitHub Pages serverer direkte.

## Sådan ændrer du indholdet

1. Redigér `src/content.html`.
2. Byg siden igen:

   ```bash
   npm run build
   ```

   Dette regenererer `index.html`. Commit og push til `main`, så opdaterer
   GitHub Pages sig automatisk.

## Teknik

- `src/content.html` — sidens indhold (redigeres her).
- `src/template.html` — HTML-skal med styling.
- `build.mjs` — indsætter `content.html` i skabelonen og skriver `index.html`.
- `index.html` — genereret output, det GitHub Pages serverer.
