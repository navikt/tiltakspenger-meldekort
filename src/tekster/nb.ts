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
    statusGodkjentFravær: 'Fravær avtalt med Nav',
    statusIkkeGodkjentFravær: 'Annet fravær',

    sideTittel: 'Meldekort for tiltakspenger',

    forsideIngress1:
        'For å motta tiltakspenger må du være registrert på et tiltak hos Nav og sende meldekort hver 14. dag.',
    forsideIngress2:
        'På meldekortet må du registrere om du har deltatt på tiltaket, om du har vært syk, om ditt barn eller barnepasser har vært syk, eller om du har hatt ferie/fravær. Nav trenger dette for å beregne hvor mye du skal ha i tiltakspenger.',
    forsideIngress3: '',
    forsideTakk: 'Takk for at du er ærlig!',
    forsideOpplysninger: 'Det er viktig at du gir oss riktige opplysninger.',
    forsideBekrefter: 'Jeg bekrefter at jeg vil fylle ut meldekortet så riktig som jeg kan',
    forsideSeOgEndre: 'Se og endre innsendte meldekort',
    forsideIngenMeldekort: 'Du har ingen meldekort til innsending.',

    fyllUtTittel: 'Fyll ut meldekortet',
    fyllUtLesMerHeader: 'Les mer om hva som skal føres på meldekortet',

    deltattStegHeader: 'Velg de dagene du deltok på tiltaket som avtalt',
    deltattStegIngress: 'Hvis du har fravær fra tiltaket, kan du legge inn dette i neste steg.',
    deltattStegFraværSpørsmål: 'Har du hatt fravær fra tiltaket?',
    deltattStegFraværJa: 'Ja, jeg har hatt fravær',
    deltattStegFraværNei: 'Nei, jeg har ikke hatt fravær',

    fraværStegHeader: 'Legg inn fravær når du skulle vært på tiltak, men ikke fikk deltatt hele eller deler av dagen',
    fraværStegIngress:
        'Velg hva slags fravær du hadde. Noen typer fravær gir rett til utbetaling, mens andre gjør det ikke. De dagene du ikke skulle vært på tiltaket trenger du ikke registrere.',

    fraværPanelRegistrer: 'Registrer fravær',
    fraværPanelEndre: 'Registrer fravær',

    fraværModalHeader: 'Hva vil du melde?',
    fraværModalSykIngress:
        'Du kan ha rett til tiltakspenger hvis du er for syk til å delta på tiltaksdagen. Ta kontakt med veilederen din for å sjekke hva slags dokumentasjon som kreves.',
    fraværModalSyktBarnIngress:
        'Du kan ha rett på tiltakspenger hvis du ikke kunne delta på tiltaksdagen fordi barnet ditt eller barnets barnepasser var syk. Ta kontakt med veilederen din for å sjekke hva slags dokumentasjon som kreves.',
    fraværModalAnnetGodkjentIngress: 'Utgår inntil videre',
    fraværModalIkkeGodkjentIngress:
        'Du har ikke rett på tiltakspenger hvis du har vært helt eller delvis fraværende fra tiltaket, og fraværet ikke er avtalt med Nav. ' +
        'Du kan ha rett til tiltakspenger hvis du har gjennomført aktiviteter som er avtalt med veilederen din. For eksempel jobbintervju eller legetime. Ta kontakt med veilederen din for å sjekke om du har rett til utbetaling selv om du har hatt fravær.',

    bekreftStegCheckbox: 'Jeg bekrefter at disse opplysningene stemmer',
    bekreftStegIkkeSendtEnnå: 'Meldekortet er ikke sendt ennå!',
} as const;
