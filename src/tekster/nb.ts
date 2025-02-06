import { TekstResolver } from '@tekster/utils.ts';

export const teksterNb = {
    neste: 'Neste',
    forrige: 'Forrige',
    lagre: 'Lagre',
    slett: 'Slett',
    avbryt: 'Avbryt',
    sendInn: 'Send inn',

    statusIkkeRegistrert: 'Ikke registrert',
    statusDeltatt: 'Deltatt',
    statusSyk: 'Syk',
    statusSyktBarn: 'Sykt barn eller syk barnepasser',
    statusGodkjentFravær: 'Fravær godkjent av Nav',
    statusIkkeGodkjentFravær: 'Annet fravær',

    ikkeRett: 'Ikke rett',

    forMangeDagerEnkel: "Du har fylt ut for mange dager",
    antallDagerRegistrert: ({ antall }: { antall: number }) =>
        `${antall} dag${antall === 1 ? '' : 'er'} fylt ut.`,
    forMangeDagerRegistrert: ({ antall, maks }: { antall: number; maks: number }) =>
        `Du har fylt ut ${antall} dager. Det er maks ${maks} dager med tiltak i denne perioden.`,

    sideTittel: 'Meldekort for tiltakspenger',

    forsideIngress: [
        'For å motta tiltakspenger må du være registrert på et tiltak hos Nav og sende meldekort hver 14. dag.',
        'På meldekortet må du registrere om du har deltatt på tiltaket, om du har vært syk, om ditt barn eller barnepasser har vært syk, eller om du har hatt ferie/fravær. Nav trenger dette for å beregne hvor mye du skal ha i tiltakspenger.',
    ],
    forsideTakk: 'Takk for at du er ærlig!',
    forsideOpplysninger: 'Det er viktig at du gir oss riktige opplysninger.',
    forsideBekrefter: 'Jeg bekrefter at jeg vil fylle ut meldekortet så riktig som jeg kan',
    forsideBekrefterFeil: 'Du må huke av for å gå videre',
    forsideSeOgEndre: 'Se og endre innsendte meldekort',
    forsideIngenMeldekort: 'Du har ingen meldekort til innsending.',

    deltattHjelpTittel: 'Slik fyller du ut meldekortet',
    deltattHjelpIngress:
        'For hver tiltaksdag i meldeperioden må du angi om du har deltatt eller ikke. Du kan ha rett til tiltakspenger ved enkelte fravær. Det er derfor viktig at du melder for alle avtalte tiltaksdager. Du skal ikke oppgi noe for dager som er utenfor tiltaket.',
    deltattHjelpLesMerHeader: 'Når skal du føre at du har deltatt?',
    deltattHjelpLesMerListe: [
        'Du skal krysse av for deltakelse hvis du har deltatt på tiltaket som avtalt.',
        'Du kan krysse av for deltakelse hvis dagen er en offentlig fridag og du ikke får deltatt fordi tiltaket er stengt.',
        'Hvis du har hatt lønn i avtalt tiltakstid den aktuelle dagen, for eksempel lønn fra tiltaksarrangør, har du ikke rett på tiltakspenger og må registrere fravær.',
    ],
    deltattHjelpLesMerTekst:
        'Hvis du ikke har deltatt på alle dagene i tiltaket som var avtalt, oppgir du at du har hatt fravær nederst på denne siden. Hva som var årsaken til fraværet kan du registrere på det neste skrittet i meldekortet.',
    deltattHjelpGuideTekst: "Ta kontakt med veilederen din hvis du er usikker på hva du skal føre på meldekortet.",

    deltattUkeHjelp: 'Kryss av for de dagene du deltok på tiltaket som avtalt',
    deltattDagPrefix: 'Har deltatt: ',
    deltattStegFraværSpørsmål: 'Har du hatt fravær fra tiltaket? (obligatorisk)',
    deltattStegFraværSpørsmålUndertekst: 'Hvis du har hatt fravær kan du registrere årsaken på det neste skrittet',
    deltattStegFraværJa: 'Ja, jeg har hatt fravær',
    deltattStegFraværNei: 'Nei, jeg har ikke hatt fravær',
    deltattStegFraværIkkeValgt: 'Du må velge et alternativ for å gå videre',

    fraværStegHeader:
        'Legg inn fravær når du skulle vært på tiltak, men ikke fikk deltatt hele eller deler av dagen',
    fraværStegIngress:
        'Velg hva slags fravær du hadde. Noen typer fravær gir rett til utbetaling, mens andre gjør det ikke. De dagene du ikke skulle vært på tiltaket trenger du ikke registrere.',

    fraværPanelRegistrer: 'Registrer fravær',
    fraværPanelEndre: 'Registrer fravær',

    fraværModalHeader: 'Hva vil du melde?',
    fraværModalSykIngress:
        'Du kan ha rett til tiltakspenger hvis du er for syk til å delta på tiltaksdagen. Ta kontakt med veilederen din for å sjekke hva slags dokumentasjon som kreves.',
    fraværModalSyktBarnIngress:
        'Du kan ha rett på tiltakspenger hvis du ikke kunne delta på tiltaksdagen fordi barnet ditt eller barnets barnepasser var syk. Ta kontakt med veilederen din for å sjekke hva slags dokumentasjon som kreves.',
    fraværModalAnnetGodkjentIngress: [
        'Du kan ha rett til tiltakspenger hvis du har gjennomført aktiviteter som er avtalt med og godkjent av veilederen din.',
        'Godkjente årsaker til fravær, som fortsatt gir deg tiltakspenger, er for eksempel jobbintervju, legetime eller alvorlig sykdom/begravelse i nærmeste familie.',
    ],

    fraværModalIkkeGodkjentIngress: [
        'Du har ikke rett på tiltakspenger hvis du har vært fraværende fra tiltaket, og fraværet ikke er godkjent av Nav.',
    ],

    bekreftStegCheckbox: 'Jeg bekrefter at disse opplysningene stemmer',
    bekreftStegIkkeSendtEnnå: 'Meldekortet er ikke sendt ennå!',

    kvittering:
        'Meldekortet ble sendt inn til Nav. Husk å ta kontakt med veileder hvis du har fravær som skal godkjennes.',
} as const satisfies Record<string, string | string[] | TekstResolver>;
