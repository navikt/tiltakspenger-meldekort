# Tiltakspenger meldekort
Frontend for meldekort til bruker.

# 🚀 Komme i gang

For å starte appen i dev modus lokalt:
- Kopier `.env.local-template` til `.env.local` (sett verdi for `TOKEN_X_PRIVATE_JWK` fra wonderwall-meldekort container i meta-repo'et)
- Kjør `npm run dev`

## Lokalt oppsett for hele verdikjeden
Hele verdikjeden kan kjøres opp lokalt, med noen komponenter mocket ut. Dette er satt opp med docker-compose i [tiltakspenger-meta-repo](https://github.com/navikt/tiltakspenger).

Se på [denne siden](https://confluence.adeo.no/display/POAO/Ny+Utvikler+i+Tiltakspenger) for tips til lokalt oppsett av utviklingsmiljø.

---

## Lenke til dev-miljø

Appen kjører på [https://www.ansatt.dev.nav.no/tiltakspenger/meldekort](https://www.ansatt.dev.nav.no/tiltakspenger/meldekort). Deployes ved push til main eller manuelt med workflow_dispatch trigger.

## 📣 Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub

## For NAV-ansatte

Interne, tekniske henvendelser kan sendes via Slack i kanalen #tp-utvikling.
