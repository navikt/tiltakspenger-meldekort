import { TekstResolver } from '@tekster/typer.ts';

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

    forMangeDagerEnkel: 'Du har fylt ut for mange dager',
    ingenDagerDeltatt: 'Du må velge minst en dag med deltagelse, eller velge fravær',
    antallDagerRegistrert: ({ antall }: { antall: number }) =>
        `${antall} dag${antall === 1 ? '' : 'er'} fylt ut.`,
    forMangeDagerRegistrert: ({ antall, maks }: { antall: number; maks: number }) =>
        `Du har fylt ut ${antall} dager. Det er maks ${maks} dager med tiltak i denne perioden.`,
    ingenDagerMedFravær:
        'Du må velge minst en dag med fravær, eller gå tilbake og velge deltagelse.',

    sideTittel: 'Meldekort for tiltakspenger',

    forsideIngress: [
        'For å motta tiltakspenger må du delta på et tiltak hos Nav og sende meldekort hver 14. dag.',
        'På meldekortet må du registrere om du har deltatt på tiltaket, om du har vært syk, om ditt barn eller barnepasser har vært syk, eller om du har hatt ferie eller annet fravær. Nav trenger dette for å beregne hvor mye du skal ha i tiltakspenger.',
        'Vi deler informasjon fra meldekortet med andre systemer i Nav fordi informasjonen har betydning for oppfølgingen du får av Nav.',
    ],
    forsideTakk: 'Takk for at du er ærlig!',
    forsideOpplysninger: 'Det er viktig at du gir oss riktige opplysninger.',
    forsideBekrefter: 'Jeg bekrefter at jeg vil fylle ut meldekortet så riktig som jeg kan',
    forsideBekrefterFeil: 'Du må bekrefte for å gå videre',
    forsideSeOgEndre: 'Se og endre innsendte meldekort',
    forsideIngenMeldekort: 'Du har ingen meldekort til innsending.',
    forsideIkkeTiltakspenger: 'Du har ingen meldekort for tiltakspenger.',
    deltattTittel: 'Meldekort for tiltakspenger – deltakelse',
    deltattHjelpTittel: 'Slik fyller du ut meldekortet',
    deltattHjelpIngress:
        'For hver tiltaksdag i meldeperioden må du oppgi om du har deltatt eller ikke. Du kan ha rett til tiltakspenger ved noen typer fravær. Du skal ikke oppgi noe for dager som er utenfor tiltaket.',
    deltattHjelpLesMerHeader: 'Når skal du føre at du har deltatt?',
    deltattHjelpLesMerListe: [
        'Du skal krysse av for deltakelse hvis du har deltatt på tiltaket som avtalt.',
        'Hvis du har vært borte deler av tiltaksdagen, må du registrere dagen med fravær.',
        'Du kan krysse av for deltakelse hvis dagen er en offentlig fridag og du ikke får deltatt fordi tiltaket er stengt.',
        'Hvis du har hatt lønn i avtalt tiltakstid den aktuelle dagen, for eksempel lønn fra tiltaksarrangør, har du ikke rett på tiltakspenger og må registrere fravær.',
    ],
    deltattHjelpLesMerTekst:
        'Hvis du ikke har deltatt på alle dagene i tiltaket som var avtalt, oppgir du at du har hatt fravær nederst på denne siden. Hva som var årsaken til fraværet kan du registrere på det neste skrittet i meldekortet.',
    deltattHjelpGuideTekst:
        'Ta kontakt med veilederen din hvis du er usikker på hva du skal føre på meldekortet.',

    deltattUkeHjelp: 'Kryss av for de dagene du deltok på tiltaket.',
    deltattDagPrefix: 'Har deltatt: ',
    deltattStegFraværSpørsmål: 'Har du hatt fravær fra tiltaket? (obligatorisk)',
    deltattStegFraværSpørsmålUndertekst:
        'Hvis du har hatt fravær kan du registrere årsaken på det neste skrittet',
    deltattStegFraværJa: 'Ja, jeg har hatt fravær',
    deltattStegFraværNei: 'Nei, jeg har ikke hatt fravær',
    deltattStegFraværIkkeValgt: 'Du må velge et alternativ for å gå videre',
    fraværTittel: 'Meldekort for tiltakspenger – fravær',
    fraværHjelpTittel:
        'Legg inn fravær når du skulle vært på tiltak, men ikke fikk deltatt hele eller deler av dagen',
    fraværHjelpIngress:
        'Velg hva slags fravær du hadde. Noen typer fravær gir rett til utbetaling, mens andre gjør det ikke. De dagene du ikke skulle vært på tiltaket trenger du ikke registrere.',

    fraværHjelpLesMerSyk: 'Når skal du velge "syk"?',
    fraværHjelpLesMerSykListe: [
        'Du skal velge «syk» hvis du har vært for syk til å kunne delta på tiltaksdagen. Du kan ha rett til tiltakspenger når du er syk. Det er derfor viktig at du melder om dette.',
        'Du får utbetalt full stønad de 3 første dagene du er syk. Er du syk mer enn 3 dager, får du utbetalt 75 % av full stønad resten av arbeidsgiverperioden. En arbeidsgiverperiode er på til sammen 16 virkedager.',
        'Du må ha sykmelding fra lege for å ha rett på tiltakspenger i mer enn 3 dager.',
    ],

    fraværHjelpLesMerSyktBarn: 'Når skal du velge "sykt barn eller barnepasser"?',
    fraværHjelpLesMerSyktBarnListe: [
        'Du skal velge «sykt barn eller syk barnepasser» hvis du ikke kunne delta på tiltaksdagen fordi barnet ditt eller barnets barnepasser var syk.',
        'Det er de samme reglene som gjelder for sykt barn/barnepasser som ved egen sykdom. Det vil si at du har rett til full utbetaling de tre første dagene og 75 % resten av arbeidsgiverperioden.',
        'Du må sende legeerklæring for barnet ditt eller bekreftelse fra barnepasseren fra dag 4 for å ha rett på tiltakspenger i mer enn 3 dager.',
    ],

    fraværHjelpLesMerFraværGodkjent: 'Når skal du velge "fravær godkjent av Nav"?',
    fraværHjelpLesMerFraværGodkjentListeStart: [
        'Du kan ha rett til tiltakspenger selv om du har hatt fravær. Det gjelder hvis fraværet skyldes aktiviteter som du har avtalt med veilederen din.',
        'Godkjente årsaker til fravær, som fortsatt gir deg tiltakspenger, er for eksempel:',
    ],
    fraværHjelpLesMerFraværGodkjentListeÅrsaker: [
        'jobbintervju',
        'timeavtale i det offentlige hjelpeapparatet',
        'alvorlig sykdom/begravelse i nærmeste familie',
    ],
    fraværHjelpLesMerFraværGodkjentListeSlutt:
        'Ta kontakt med veilederen din for å dokumentere årsaken til fraværet og få det godkjent.',

    fraværHjelpLesMerFraværAnnet: 'Når skal du velge "annet fravær"?',
    fraværHjelpLesMerFraværAnnetListe: [
        'Du skal velge «annet fravær» hvis du har vært fraværende hele eller deler av den aktuelle tiltaksdagen.',
        'Du skal velge «annet fravær» hvis du har fått lønn for tiden du deltok i tiltaket den aktuelle dagen.',
        'Du skal velge «annet fravær» hvis du har fått fri/ferie utenom planlagt ferieperiode for tiltaket.',
    ],

    fraværUkeHjelp: 'Velg hva slags fravær du hadde',

    fraværPanelRegistrer: 'Velg',

    fraværModalHeader: 'Årsaken til fraværet',
    fraværModalBeskrivelse: 'Du kan ha rett til tiltakspenger selv om du ikke har deltatt',
    fraværModalSykIngress: 'Hvis du var for syk til å delta på tiltaksdagen.',
    fraværModalSyktBarnIngress:
        'Hvis du ikke kunne delta på tiltaksdagen fordi barnet ditt eller barnepasser var syk.',
    fraværModalAnnetGodkjentIngress:
        'Hvis du har gjennomført aktiviteter som er avtalt og godkjent av veilederen din.',
    fraværModalIkkeGodkjentIngress:
        'Hvis du ikke deltok på hele eller deler av tiltaksdagen, og fraværet ikke var godkjent av Nav, har du ikke rett på tiltakspenger.',

    sendInnTittel: 'Meldekort for tiltakspenger - send inn',
    sendInnBekrefter: 'Jeg bekrefter at disse opplysningene stemmer',
    sendInnBekrefterFeil: 'Du må bekrefte for å sende meldekortet',
    sendInnIkkeSendtEnnå: 'Meldekortet er ikke sendt inn.',
    sendInnInnsendingFeilet: [
        'Noe gikk galt ved innsending av meldekortet. Du kan prøve på nytt.',
        'Dersom problemet vedvarer, kontakt veilederen din.',
    ],

    kvitteringTittel: 'Meldekort for tiltakspenger - kvittering',
    kvitteringTilbake: 'Tilbake til startsiden for meldekort',
    kvittering:
        'Meldekortet ble sendt inn til Nav. Husk å ta kontakt med veileder hvis du har fravær som skal godkjennes.',
    alleTittel: 'Innsendte meldekort',
    alleHeading: 'Her er alle meldekortene dine',
    alleTilbake: 'Tilbake til startsiden for meldekort',
    alleInnsendt: ({ dato }: { dato: string }) => `Innsendt ${dato}`,
    alleIkkeInnsendt: 'Ikke innsendt',
    allePerMeldekortOverskrift: ({
        uke1,
        uke2,
        fraOgMed,
        tilOgMed,
    }: {
        uke1: number;
        uke2: number;
        fraOgMed: string;
        tilOgMed: string;
    }) => `Meldekort uke ${uke1} - ${uke2} (${fraOgMed} - ${tilOgMed})`,
} as const satisfies TeksterBaseRecord;

type TeksterBaseRecord = Record<string, string | string[] | TekstResolver>;
