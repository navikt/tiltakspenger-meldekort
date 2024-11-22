import { MeldekortDagStatus } from '@typer/meldekort-utfylling';

export const teksterNb = {
    meldekortTittel: 'Meldekort for tiltakspenger',
    forsideIngress1:
        'For å motta tiltakspenger må du være registrert på et tiltak hos NAV og sende meldekort hver 14. dag.',
    forsideIngress2:
        'På meldekortet må du registrere om du har jobbet mens du var på tiltak, om du har vært syk, om ditt barn eller barnepasser har vært syk, om du har hatt ferie/fravær eller andre grunner til at du ikke har deltatt på tiltak/kurs/utdanning. NAV trenger dette for å beregne hvor mye du skal ha i tiltakspenger.',
    forsideIngress3: 'Husk at du også må sende meldekort mens du venter på svar på søknaden din.',
    forsideTakk: 'Takk for at du er ærlig!',
    forsideOpplysninger: 'Det er viktig at du gir oss riktige opplysninger.',
    forsideBekrefter: 'Jeg bekrefter at jeg vil fylle ut meldekortet så riktig som jeg kan',
    neste: 'Neste',
    seOgEndre: 'Se og endre innsendte meldekort',

    fyllUtTittel: 'Fyll ut meldekortet',
    fyllUtKlikkPåDato:
        'Klikk på datoen du skal melde for. Du kan velge mellom jobb, syk, ferie/fravær eller tiltak/kurs/utdanning.',
    fyllUtLesMerHeader: 'Les mer om hva som skal føres på meldekortet',

    bekreftTittel: 'Se over før du sender inn',
    bekreftTekst:
        'Se over meldekortet ditt og pass på at alt er riktig før du sender inn. Hvis du trenger å gjøre endringer, går du tilbake nederst på siden.',
    bekreftCheckbox: 'Jeg bekrefter at disse opplysningene stemmer',

    meldekortHvaVilDu: 'Hva vil du melde?',
    meldekortHarDeltatt: 'Har deltatt på tiltak',
    meldekortHarIkkeDeltatt: 'Har ikke deltatt på tiltak',

    ikkeRegistrert: 'Ikke registrert',

    [MeldekortDagStatus.FraværSyk]: 'Syk',
    [MeldekortDagStatus.FraværSyktBarn]: 'Sykt barn',
    [MeldekortDagStatus.FraværAnnet]: 'Annet godkjent fravær',
    [MeldekortDagStatus.IkkeDeltatt]: 'Ikke deltatt',

    sykIngress: 'Du har vært syk',
    syktBarnIngress: 'Du har hatt sykt barn eller syk barnepasser',
    annetFraværIngress: 'Du har annet fravær som er godkjent av Nav',
    ikkeDeltattIngress: 'Annet fravær som ikke er godkjent av Nav'
} as const;

export type TekstId = keyof typeof teksterNb;