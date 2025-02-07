# Tiltakspenger meldekort

Frontend for brukers innfylling av meldekort for tiltakspenger.

# 🚀 Komme i gang

For å starte appen lokalt:

- Logg inn på Github package registry. Bruk en PAT med navikt SSO auth og `read: packages` scope som passord.

```
npm login --registry=https://npm.pkg.github.com --auth-type=legacy
```

### Start i dev-modus:

- Kopier `.env-template` til `.env.development`
- Kjør `npm run dev`

### Start i prod-modus:

- Kopier `.env-template` til `.env`
- Sett `NODE_ENV: production` i `.env`
- Kjør `npm run start`

Appen serveres med mock-data på http://localhost:3050/tiltakspenger/meldekort/demo

Dersom du har satt opp hele verdikjeden (se under), benytt http://localhost:2223/tiltakspenger/meldekort

## Lokalt oppsett for hele verdikjeden

Hele verdikjeden kan kjøres opp lokalt, med noen komponenter mocket ut. Dette er satt opp med docker-compose
i [tiltakspenger-meta-repo](https://github.com/navikt/tiltakspenger).

Se på [denne siden](https://confluence.adeo.no/display/POAO/Ny+Utvikler+i+Tiltakspenger) for tips til lokalt oppsett av
utviklingsmiljø.

---

## Lenke til dev-miljø

Appen kjører
på [https://www.ansatt.dev.nav.no/tiltakspenger/meldekort](https://www.ansatt.dev.nav.no/tiltakspenger/meldekort).
Deployes ved push til main eller manuelt med workflow_dispatch trigger.

## 📣 Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub

## For NAV-ansatte

Interne, tekniske henvendelser kan sendes via Slack i kanalen #tp-utvikling.
