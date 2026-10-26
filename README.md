# Tiltakspenger meldekort

Frontend for brukers innfylling av meldekort for tiltakspenger.

# 🚀 Komme i gang

For å starte appen lokalt:

- Logg inn på Github package registry. Bruk en PAT med navikt SSO auth og `read: packages` scope som passord.

```
pnpm login --registry=https://npm.pkg.github.com --auth-type=legacy
```

### Start i dev-modus:

- Kopier `.env-template` til `.env.development`
- Kjør `pnpm dev`

### Start i prod-modus:

- Kopier `.env-template` til `.env`
- Sett `NODE_ENV: production` i `.env`
- Kjør `pnpm build` + `pnpm start`

#### Med kun mock-data uten backend-kall:
Appen serveres i demo-modus på http://localhost:3050/tiltakspenger/meldekort/demo uten avhengigheter til andre tjenester.

Demoen har en periodevelger øverst på forsiden. Forhåndsvalgene jul, påske og sommer viser meldekortet med de
tidsstyrte informasjonsvarslene for ferie og helligdager, og med egen periode kan man velge en vilkårlig
innvilgelsesperiode — dager utenfor perioden vises da uten rett til tiltakspenger. Valget lagres i en cookie som
kun demo-mocken leser.
Cookien `tp-meldekort-demo-innvilgelse` kan også settes til `<fraOgMed>_<tilOgMed>_<antallDager>`, for eksempel `2026-10-12_2026-10-25_4`, for å simulere et vedtak med færre enn 10 dager per meldeperiode.

### Tester

`pnpm test` kjører Playwright-testene mot demo-modusen i Chrome, Safari og Firefox, og `tests/antall-dager.test.ts` i tillegg med mobilemulering av iPhone og Pixel.
Kjør `pnpm build` først, siden testene starter appen med `pnpm start`.

For å kjøre nettleserne i Linux slik som i CI, start Playwright-imaget som nettleserserver og la testene koble seg til det:

```
docker run --rm --init -p 3000:3000 mcr.microsoft.com/playwright:v1.63.0-noble /bin/sh -c "npx -y playwright@1.63.0 run-server --port 3000 --host 0.0.0.0"
PW_TEST_CONNECT_WS_ENDPOINT=ws://127.0.0.1:3000/ PW_TEST_CONNECT_EXPOSE_NETWORK='<loopback>' pnpm test tests/antall-dager.test.ts
```

Image-taggen må følge versjonen av `@playwright/test` i `package.json`.

#### Med integrasjon mot tiltakspenger-meldekort-api kjørende lokalt:
Dersom du setter `BRUK_LOKAL_FAKE_AUTH: true` benyttes fake auth mot meldekort-api. Sett `LOKAL_FNR: <fnr i din lokale mk-api db>` for å autentisere som bruker med valgt fnr.

Appen kan da nåes på http://localhost:3050/tiltakspenger/meldekort

### Lokalt oppsett for hele verdikjeden
Dersom du setter `BRUK_LOKAL_FAKE_AUTH: false` må hele verdikjeden med autentisering kjøres opp lokalt. Benytt da http://localhost:2223/tiltakspenger/meldekort for å nå appen via Wonderwall.

Hele verdikjeden kan kjøres opp lokalt, med noen komponenter mocket ut. Dette er satt opp med docker-compose
i [tiltakspenger-meta-repo](https://github.com/navikt/tiltakspenger).

Se på [denne siden](https://confluence.adeo.no/display/POAO/Ny+Utvikler+i+Tiltakspenger) for tips til lokalt oppsett av
utviklingsmiljø.

---

### pnpm how-to

Repoet bruker [pnpm](https://pnpm.io/) som package manager, pinnet via `packageManager`-feltet i `package.json`
og håndtert av [Corepack](https://nodejs.org/api/corepack.html) (som følger med Node.js).

- **Førstegangsoppsett:** kjør `corepack enable` én gang per maskin. Deretter laster Corepack ned og
  bruker akkurat den pnpm-versjonen som er pinnet i `package.json`, uten global installasjon. Slett node_modules
  og kjør `pnpm i` dersom du har node_modules fra npm.
- **Husky-hooks:** siden `.npmrc` har `ignore-scripts=true` kjøres ikke `prepare`-scriptet automatisk
  etter `pnpm install`. Kjør `pnpm run prepare` én gang etter første installasjon for å sette opp
  git-hookene.
- **Oppgradering av pnpm:** endre versjonen i `packageManager`-feltet i `package.json` og commit.
  Corepack plukker opp den nye versjonen automatisk hos alle utviklere og i CI.

---

## Lenke til dev-miljø

Appen kjører
på [https://www.ansatt.dev.nav.no/tiltakspenger/meldekort](https://www.ansatt.dev.nav.no/tiltakspenger/meldekort).
Deployes ved push til main eller manuelt med workflow_dispatch trigger.

## 📣 Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub

## For NAV-ansatte

Interne, tekniske henvendelser kan sendes via Slack i kanalen #tp-utvikling.
