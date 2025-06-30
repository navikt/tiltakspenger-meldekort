import { TekstResolver } from '@tekster/typer.ts';

export const teksterNb = {
    neste: 'Neste steg',
    startUtfylling: 'Start utfylling',
    forrige: 'Forrige steg',
    lagre: 'Lagre',
    slett: 'Slett',
    avbryt: 'Avbryt utfylling',
    sendInn: 'Send inn',

    statusIkkeBesvart: 'Ikke besvart',
    statusDeltatt: 'Deltatt',
    statusDeltattMedLønn: 'Mottok lønn',
    statusSyk: 'Syk',
    statusSyktBarn: 'Sykt barn eller syk barnepasser',
    statusGodkjentFravær: 'Fravær godkjent av Nav',
    statusAnnetFravær: 'Annet fravær',
    statusIkkeTiltaksdag: 'Ikke tiltaksdag',

    ikkeRett: 'Ikke rett',

    forMangeDagerEnkel: 'Du har fylt ut for mange dager',
    ingenDagerDeltatt: 'Du må velge minst én dag med deltagelse, eller velge fravær',
    antallDagerBesvart: ({ antall }: { antall: number }) =>
        `${antall} dag${antall === 1 ? '' : 'er'} fylt ut.`,
    forMangeDagerBesvart: ({ antall, maks }: { antall: number; maks: number }) =>
        `Du har fylt ut ${antall} dager. Det er maks ${maks} dager med tiltak i denne perioden.`,
    ingenDagerMedFravær:
        'Du må velge minst en dag med fravær, eller velge at du ikke har hatt fravær.',

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
    forsideSeOgEndre: 'Se tidligere innsendte meldekort',
    forsideIngenMeldekortSoknadUnderBehandling:
        'Du har ikke fått noen meldekort enda fordi Nav ikke er ferdig med å behandle søknaden din. ',
    forsideIngenMeldekort: 'Du har ingen meldekort klare til innsending. ',
    forsideNesteMeldekort1: 'Ditt neste meldekort kan sendes inn fra ',
    forsideNesteMeldekort2: ' for perioden ',
    forsideForrigeMeldekort1: 'Din forrige innsending var ',
    forsideForrigeMeldekort2: ' for perioden ',
    forsideIkkeTiltakspenger:
        'Fant ingen meldekort for tiltakspenger. Dersom du tidligere har mottatt tiltakspenger, finner du meldekortene dine i ',
    forsideHarArenaMeldekort: 'Du kan finne meldekortene dine for tiltakspenger i ',
    forsideArenaLenke: 'den gamle løsningen for meldekort.',
    undertekstUker: ({ uke1, uke2 }: { uke1: number; uke2: number }) => `Uke ${uke1} og ${uke2}`,
    undertekstDatoer: ({ fraOgMed, tilOgMed }: { fraOgMed: string; tilOgMed: string }) =>
        `${fraOgMed} til ${tilOgMed}`,
    deltattTittel: 'Meldekort for tiltakspenger – deltakelse',
    deltattHjelpTittel: 'Slik fyller du ut meldekortet',
    deltattHjelpIngress:
        'For hver tiltaksdag i meldeperioden må du oppgi om du har deltatt eller ikke. Du kan ha rett til tiltakspenger ved noen typer fravær. Du skal ikke oppgi noe for dager som er utenfor tiltaket.',
    deltattHjelpLesMerHeader: 'Når skal du føre at du har deltatt?',
    deltattHjelpLesMerListe: [
        'Du skal krysse av for deltakelse hvis du har deltatt på tiltaket som avtalt.',
        'Hvis du har vært borte deler av tiltaksdagen, må du registrere dagen med fravær.',
        'Du kan krysse av for deltakelse hvis dagen er en offentlig fridag og du ikke får deltatt fordi tiltaket er stengt.',
        'Hvis du har hatt lønn i avtalt tiltakstid den aktuelle dagen, for eksempel lønn fra tiltaksarrangør, har du ikke rett til tiltakspenger og må at du har mottatt lønn.',
    ],
    deltattHjelpLesMerTekst:
        'Hvis du ikke har deltatt på alle dagene i tiltaket som var avtalt, oppgir du at du har hatt fravær på steget "Fravær".',
    deltattHjelpGuideTekst:
        'Ta kontakt med veilederen din hvis du er usikker på hva du skal føre på meldekortet.',

    deltattUkeHjelp: 'Kryss av for de dagene du deltok på tiltaket.',
    deltattDagPrefix: 'Har deltatt: ',
    fraværHjelpLesMer:
        'Du må informere oss dersom du har vært syk eller hatt annet fravær i perioden du var satt opp på tiltak.',
    fraværStegFraværSpørsmål:
        'Har du vært syk eller hatt annet fravær fra tiltaket? (obligatorisk)',
    fraværSpørsmålUndertekst:
        'Hvis du har hatt fravær kan du registrere årsaken på det neste skrittet',
    fraværHarHattFraværSvarJa: 'Ja, jeg har vært syk eller hatt annet fravær',
    fraværHarHattFraværSvarNei: 'Nei, jeg har ikke vært syk eller hatt annet fravær',
    fraværSpørsmålIkkeValgt: 'Du må velge et alternativ for å gå videre',
    fraværTittel: 'Meldekort for tiltakspenger – fravær',
    fraværHjelpTittel:
        'Legg inn fravær når du skulle vært på tiltak, men ikke fikk deltatt hele eller deler av dagen',
    fraværHjelpIngress:
        'Velg hva slags fravær du hadde. Noen typer fravær gir rett til utbetaling, mens andre gjør det ikke. De dagene du ikke skulle vært på tiltaket trenger du ikke registrere.',

    fraværHjelpLesMerSyk: 'Når skal du velge "syk"?',
    fraværHjelpLesMerSykListe: [
        'Du skal velge «syk» hvis du har vært for syk til å kunne delta på tiltaksdagen. Du kan ha rett til tiltakspenger når du er syk. Det er derfor viktig at du melder om dette.',
        'Du får utbetalt full stønad de 3 første dagene du er syk. Er du syk mer enn 3 dager, får du utbetalt 75 % av full stønad resten av arbeidsgiverperioden. En arbeidsgiverperiode er på til sammen 16 virkedager.',
        'Du må ha sykmelding fra lege for å ha rett til tiltakspenger i mer enn 3 dager.',
    ],

    fraværHjelpLesMerSyktBarn: 'Når skal du velge "sykt barn eller barnepasser"?',
    fraværHjelpLesMerSyktBarnListe: [
        'Du skal velge «sykt barn eller syk barnepasser» hvis du ikke kunne delta på tiltaksdagen fordi barnet ditt eller barnets barnepasser var syk.',
        'Det er de samme reglene som gjelder for sykt barn/barnepasser som ved egen sykdom. Det vil si at du har rett til full utbetaling de tre første dagene og 75 % resten av arbeidsgiverperioden.',
        'Du må sende legeerklæring for barnet ditt eller bekreftelse fra barnepasseren fra dag 4 for å ha rett til tiltakspenger i mer enn 3 dager.',
    ],

    fraværHjelpLesMerFraværGodkjent: 'Når skal du velge "fravær godkjent av Nav"?',
    fraværHjelpLesMerFraværGodkjentListeStart: [
        'Du kan ha rett til tiltakspenger selv om du har hatt fravær. Det gjelder hvis fraværet skyldes aktiviteter som du har avtalt med Nav-veilederen din.',
        'Godkjente årsaker til fravær, som fortsatt gir deg tiltakspenger, er for eksempel:',
    ],
    fraværHjelpLesMerFraværGodkjentListeÅrsaker: [
        'jobbintervju',
        'timeavtale i det offentlige hjelpeapparatet',
        'alvorlig sykdom/begravelse i nærmeste familie',
    ],
    fraværHjelpLesMerFraværGodkjentListeSlutt:
        'Du skal bare velge denne hvis fraværet faktisk er godkjent av Nav-veilederen din. Ta kontakt med Nav-veilederen din hvis du er i tvil.',

    fraværHjelpLesMerFraværAnnet: 'Når skal du velge "annet fravær"?',
    fraværHjelpLesMerFraværAnnetListe: [
        'Du skal velge «annet fravær» hvis du har vært fraværende hele eller deler av den aktuelle tiltaksdagen.',
        'Du skal velge «annet fravær» hvis du har fått lønn for tiden du deltok i tiltaket den aktuelle dagen.',
        'Du skal velge «annet fravær» hvis du har hatt fri/ferie utenom planlagt ferieperiode for tiltaket.',
        'Du skal velge «annet fravær» hvis du venter på godkjenning av fravær. Du kan endre meldekortet senere når fraværet er godkjent av Nav-veilederen din. ',
    ],

    fraværUkeHjelp: 'Velg hva slags fravær du hadde',

    fraværPanelRegistrer: 'Velg',
    fraværPanelRegistrerSR: ({ datoTekst }: { datoTekst: string }) =>
        `${datoTekst} - Velg årsak til fravær`,
    fraværPanelValgRegistrertSR: ({
        datoTekst,
        valgtStatusTekst,
    }: {
        datoTekst: string;
        valgtStatusTekst: string;
    }) => `${datoTekst} - du har valgt "${valgtStatusTekst}", trykk for å endre.`,
    fraværModalHeader: 'Årsaken til fraværet',
    fraværModalBeskrivelse: 'Du kan ha rett til tiltakspenger selv om du ikke har deltatt',
    fraværModalSykIngress: 'Hvis du var for syk til å delta på tiltaksdagen.',
    fraværModalSyktBarnIngress:
        'Hvis du ikke kunne delta på tiltaksdagen fordi barnet ditt eller barnepasser var syk.',
    fraværModalAnnetGodkjentIngress:
        'Hvis du har hatt fravær fra tiltaket og Nav har godkjent dette fraværet.',
    fraværModalIkkeGodkjentIngress:
        'Hvis du ikke deltok på hele eller deler av tiltaksdagen, og fraværet ikke var godkjent av Nav, har du ikke rett til tiltakspenger.',
    lønnTittel: 'Meldekort for tiltakspenger – lønn',
    lønnHjelpLesMer:
        'Du må informere oss dersom du har mottatt lønn i perioden du var satt opp på tiltak.',
    lønnHarMottattLønnSpørsmål:
        'Har du mottatt lønn i tidsrommet du var satt opp på tiltaket? (obligatorisk)',
    lønnHarMottattLønnSvarJa: 'Ja, jeg har mottatt lønn i tidsrommet jeg var på tiltak',
    lønnHarMottattLønnSvarNei: 'Nei, jeg har ikke mottatt lønn i tidsrommet jeg var på tiltak',
    lønnSpørsmålIkkeValgt: 'Du må velge et alternativ for å gå videre',
    lønnUkeHjelp: 'Kryss av for de dagene du mottok lønn',
    lønnDagPrefix: 'Mottok lønn: ',
    sendInnTittel: 'Meldekort for tiltakspenger - send inn',
    sendInnBekrefter: 'Jeg bekrefter at disse opplysningene stemmer',
    sendInnBekrefterFeil: 'Du må bekrefte for å sende meldekortet',
    sendInnIkkeSendtEnnå: 'Meldekortet er ikke sendt inn.',
    sendInnIngenDagerMedFravær:
        'Du har svart ja på spørsmålet om du har vært syk eller har hatt fravær. Du må oppgi en fraværsgrunn for minst en dag eller endre svaret ditt til "Nei".',
    sendInnIngenDagerMedLønn:
        'Du har svart ja på spørsmålet om du har mottatt lønn, men ikke sjekket av noen dager med lønn. Du må krysse av for minst en dag med lønn eller endre svaret ditt til "Nei".',
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
    alleUkjentArenaMeldekort:
        'Dersom du fikk tiltakspenger i perioder før de som vises her, finner du meldekortene i den ',
    alleHarArenaMeldekort: 'Meldekort fra tidligere perioder finner du i den ',
    alleArenaLenke: 'gamle løsningen for meldekort',
} as const satisfies TeksterBaseRecord;

type TeksterBaseRecord = Record<string, string | string[] | TekstResolver>;
