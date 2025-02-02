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

    sideTittel: 'Meldekort for tiltakspenger',

    forsideIngress: [
        'For å motta tiltakspenger må du være registrert på et tiltak hos Nav og sende meldekort hver 14. dag.',
        'På meldekortet må du registrere om du har deltatt på tiltaket, om du har vært syk, om ditt barn eller barnepasser har vært syk, eller om du har hatt ferie/fravær. Nav trenger dette for å beregne hvor mye du skal ha i tiltakspenger.',
    ],
    forsideTakk: 'Takk for at du er ærlig!',
    forsideOpplysninger: 'Det er viktig at du gir oss riktige opplysninger.',
    forsideBekrefter: 'Jeg bekrefter at jeg vil fylle ut meldekortet så riktig som jeg kan',
    forsideSeOgEndre: 'Se og endre innsendte meldekort',
    forsideIngenMeldekort: 'Du har ingen meldekort til innsending.',

    fyllUtTittel: 'Fyll ut meldekortet',
    fyllUtLesMerHeader: 'Les mer om hva som skal føres på meldekortet',

    deltattStegHeader: 'Kryss av for de dagene du deltok på tiltaket som avtalt',
    deltattStegIngress: 'Hvis du har fravær fra tiltaket, kan du legge inn dette i neste steg.',
    deltattDagPrefix: 'Har deltatt: ',
    deltattStegFraværSpørsmål: 'Har du hatt fravær fra tiltaket?',
    deltattStegFraværJa: 'Ja, jeg har hatt fravær',
    deltattStegFraværNei: 'Nei, jeg har ikke hatt fravær',

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
    fraværModalAnnetGodkjentIngress: ['Du kan ha rett til tiltakspenger hvis du har gjennomført aktiviteter som er avtalt med og godkjent av veilederen din.',
      'Godkjente årsaker til fravær, som fortsatt gir deg tiltakspenger, er for eksempel jobbintervju, legetime eller alvorlig sykdom/begravelse i nærmeste familie.',
        ],
        
    fraværModalIkkeGodkjentIngress: [
        'Du har ikke rett på tiltakspenger hvis du har vært fraværende fra tiltaket, og fraværet ikke er godkjent av Nav.',
    ],

    bekreftStegCheckbox: 'Jeg bekrefter at disse opplysningene stemmer',
    bekreftStegIkkeSendtEnnå: 'Meldekortet er ikke sendt ennå!',

    kvittering: 'Meldekortet ble sendt inn til Nav. Husk å ta kontakt med veileder hvis du har fravær som skal godkjennes.'
} as const satisfies Record<string, string | string[]>;
