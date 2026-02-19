import { Periode } from '@common/typer/periode';
import { TekstResolver } from '@tekster/typer.ts';
import { formatterDato, getUkenummer } from '@utils/datetime';

export const teksterNb = {
    neste: 'Neste steg',
    startUtfylling: 'Start utfylling',
    forrige: 'Forrige steg',
    lagre: 'Lagre',
    nullstill: 'Nullstill',
    avbryt: 'Avbryt',
    avbrytEndring: 'Avbryt endring',
    avbrytUtfylling: 'Avbryt utfylling',
    sendInn: 'Send inn',

    statusIkkeBesvart: 'Ikke besvart',
    statusDeltatt: 'Deltok',
    statusDeltattMedLønn: 'Mottatt lønn',
    statusSyk: 'Syk',
    statusSyktBarn: 'Sykt barn eller syk barnepasser',
    statusSterkeVelferdsgrunnerEllerJobbintervju: 'Sterke velferdsgrunner eller jobbintervju',
    statusGodkjentFravær: 'Fravær godkjent av Nav',
    statusAnnetFravær: 'Annet fravær',
    statusIkkeTiltaksdag: 'Ikke tiltaksdag',
    statusIkkeRettTilTiltakspenger: 'Ikke rett',

    ikkeRett: 'Ikke rett',

    forMangeDagerEnkel: 'Du har fylt ut for mange dager',
    forFaDagerEnkel: 'Du har fylt ut for få dager',
    ingenDagerFyltUt: 'Du må fylle ut minst én dag med fravær, lønn eller deltagelse.',
    antallDagerBesvart: ({ antall }: { antall: number }) =>
        `${antall} dag${antall === 1 ? '' : 'er'} fylt ut.`,
    forMangeDagerBesvart: ({ maks }: { maks: number }) =>
        `Du har vedtak om tiltakspenger for ${maks} dager i perioden. Sjekk at du bare har ført opp dager du faktisk har deltatt, hatt fravær eller fått lønn.`,
    forFaDagerBesvart: ({ maks }: { maks: number }) =>
        `Du har vedtak om tiltakspenger for ${maks} dager i perioden. Sjekk at du har ført opp alle dagene du har deltatt, hatt fravær eller fått lønn.`,
    ingenDagerMedFravær:
        'Du må velge minst en dag med fravær, eller velge at du ikke har hatt fravær.',

    sideTittel: 'Meldekort for tiltakspenger',
    forsideGuidePanelLenkeTekst:
        'Ta kontakt med Nav hvis du er usikker på hvordan du skal fylle inn meldekortet.',
    forsideIngress: [
        'For å få utbetalt tiltakspenger må du som deltar på tiltak hos Nav, sende meldekort hver 14. dag. Vi bruker informasjonen til å regne ut hvor mye du skal ha utbetalt i tiltakspenger.',
        'Vi deler informasjon fra meldekortet med andre systemer i Nav fordi informasjonen har betydning for oppfølgingen du får av Nav.',
    ],
    forsideBekrefter: 'Jeg bekrefter at jeg vil fylle ut meldekortet så riktig som jeg kan',
    forsideBekrefterFeil: 'Du må bekrefte for å gå videre',
    forsideSeOgEndre: 'Se meldekort du har sendt inn tidligere.',
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

    ukeMedNummer: ({ dato }: { dato: string }) => `Uke ${getUkenummer(dato, 'nb')}`,
    undertekstUker: ({ uke1, uke2 }: { uke1: number; uke2: number }) => `Uke ${uke1} og ${uke2}`,
    undertekstDatoer: ({ fraOgMed, tilOgMed }: { fraOgMed: string; tilOgMed: string }) =>
        `${fraOgMed} til ${tilOgMed}`,

    deltattTittel: 'Oppmøte',
    deltattHjelpIngress:
        'Kryss av for de dagene du har deltatt på tiltaket som avtalt. Kryss også av for «deltok» hvis dagen er en offentlig fridag og du ikke får deltatt fordi tiltaket er stengt.',
    deltattUkeHjelp: 'Kryss av for de dagene du deltok på tiltaket.',
    deltattDagPrefix: 'Deltok: ',
    fraværStegFraværSpørsmål:
        'Har du vært syk eller hatt annet fravær noen av dagene du skulle vært på tiltaket?',
    fraværHarHattFraværSvarJa: 'Ja, jeg har vært syk eller hatt annet fravær',
    fraværHarHattFraværSvarNei: 'Nei, jeg har ikke vært syk eller hatt annet fravær',
    fraværSpørsmålIkkeValgt: 'Velg et fraværsalternativ for å fortsette.',
    fraværTittel: 'Fravær',
    fraværIngress:
        'Hvis du ikke har vært syk eller hatt annet fravær fra tiltaket i denne perioden, svarer du «nei». Hvis du har vært syk eller hatt annet fravær hele eller deler av dager, svarer du «ja». Deretter oppgir du hvilke dager det gjelder, og hvilken type fravær du har hatt.',
    fraværHjelpTittel: 'Slik fyller du ut fravær',
    fraværHjelpIngress: [
        'Noen typer fravær gir til rett til tiltakspenger selv om du ikke har deltatt på tiltaket. Kryss av for hvilke dager det gjelder, og hvilken type fravær du har hatt.',
    ],
    fraværHjelpLesMerSyk: 'Når skal du velge "syk"?',
    fraværHjelpLesMerSykListe: [
        'Du skal velge «syk» hvis du har vært for syk til å kunne delta på tiltaksdagen. Du kan ha rett til tiltakspenger når du er syk. Det er derfor viktig at du melder om dette.',
        'Du får utbetalt full stønad de 3 første dagene du er syk. Er du syk mer enn 3 dager, får du utbetalt 75 prosent av full stønad resten av arbeidsgiverperioden. En arbeidsgiverperiode er på til sammen 16 virkedager.',
        'Du må ha sykmelding for å ha rett til tiltakspenger i mer enn 3 dager.',
    ],

    fraværHjelpLesMerSyktBarn: 'Når skal du velge "sykt barn eller barnepasser"?',
    fraværHjelpLesMerSyktBarnListe: [
        'Du skal velge «sykt barn eller syk barnepasser» hvis du ikke kunne delta på tiltaksdagen fordi barnet ditt eller barnets barnepasser var syk.',
        'Det er de samme reglene som gjelder for sykt barn/barnepasser som ved egen sykdom. Det vil si at du har rett til full utbetaling de tre første dagene og 75 prosent resten av arbeidsgiverperioden.',
        'Du må sende legeerklæring for barnet ditt eller bekreftelse fra barnepasseren fra dag 4 for å ha rett til tiltakspenger i mer enn 3 dager.',
    ],

    fraværHjelpLesMerSterkeVelferdsgrunnerEllerJobbintervju:
        'Når skal du velge "sterke velferdsgrunner eller jobbintervju"?',
    fraværHjelpLesMerSterkeVelferdsgrunnerEllerJobbintervjuListeStart: [
        'Du skal velge dette alternativet hvis Nav har godkjent at du har fravær fra tiltaket denne dagen på grunn av:',
    ],
    fraværHjelpLesMerSterkeVelferdsgrunnerEllerJobbintervjuListeÅrsaker: [
        'jobbintervju',
        'timeavtaler i det offentlige hjelpeapparatet',
        'begravelse eller bisettelse i den nærmeste familien din',
        'andre sterke velferdsgrunner',
    ],
    fraværHjelpLesMerSterkeVelferdsgrunnerEllerJobbintervjuListeSlutt: [
        'Det er kun Nav-veilederen din som kan godkjenne fraværet, ikke tiltaksarrangøren.',
    ],

    fraværHjelpLesMerFraværAnnet: 'Når skal du velge "annet fravær"?',
    fraværHjelpLesMerFraværAnnetListe: [
        'Du skal velge «annet fravær» hvis du har vært fraværende hele eller deler av den aktuelle tiltaksdagen.',
        'Du skal velge «annet fravær» hvis du ikke møter opp til avtalt tiltak eller aktivitet, eller ikke gjennomfører andre aktiviteter som er avtalt med Nav.',
        'Du skal velge «annet fravær» hvis du har arbeidet i stedet for å delta på tiltaket. For eksempel: Du har avtalt tiltakstid 09-15 og arbeidet fra 09-10 i stedet for å delta hele den avtalte tiden på tiltaket.',
        'Du skal velge «annet fravær» hvis du har hatt fri/ferie utenom planlagt ferieperiode for tiltaket.',
        'Du skal velge «annet fravær» hvis du venter på godkjenning av fravær. Du kan endre meldekortet senere når fraværet er godkjent av Nav-veilederen din.',
    ],

    fraværUkeHjelp: 'Velg hva slags fravær du har hatt',

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
    fraværModalSykIngress: 'Du var for syk til å delta på tiltaksdagen.',
    fraværModalSyktBarnIngress:
        'Du kunne ikke delta på tiltaksdagen fordi barnet ditt eller barnepasseren var syk.',
    fraværModalSterkeVelferdsgrunnerEllerJobbintervjuIngress:
        'Du har hatt fravær fra tiltaket på grunn av sterke velferdsgrunner eller jobbintervju og Nav-veilederen har godkjent fraværet.',
    fraværModalAnnetGodkjentIngress:
        'Du har hatt fravær fra tiltaket, og Nav har godkjent dette fraværet.',
    fraværModalIkkeGodkjentIngress:
        'Du har vært borte hele eller deler av tiltaksdagen, og fraværet er ikke godkjent av Nav. Dette gir ikke rett til tiltakspenger.',
    lønnTittel: 'Lønn',
    lønnHjelpLesMerTittel: 'Når skal du registrere lønn?',
    lønnInfoUndertittelLønn: 'Lønn',
    lønnIngress:
        'Hvis du får lønn (ikke tiltakspenger) som en del av tiltaket ditt, svarer du “ja”. Deretter oppgir du hvilke dager det gjelder.',
    lønnHarMottattLønnSpørsmål: 'Mottar du lønn (ikke tiltakspenger) som en del av tiltaket?',
    lønnHarMottattLønnSvarJa: 'Ja, jeg mottar lønn som en del av tiltaket',
    lønnHarMottattLønnSvarNei: 'Nei, jeg skal bare motta tiltakspenger',
    lønnSpørsmålIkkeValgt: 'Velg et lønnsalternativ for å fortsette.',
    lønnUkeHjelp: 'Kryss av for de dagene du mottar lønn',
    lønnDagPrefix: 'Mottar lønn: ',
    oppsummeringTittel: 'Oppsummering',
    oppsummeringIngress:
        'Her er en oppsummering av det du har fylt ut i meldekortet for denne perioden. Sjekk at det er korrekt før du sender inn. Du kan gå tilbake og rette opp hvis noe er feil.',
    oppsummeringBekrefter: 'Jeg bekrefter at disse opplysningene stemmer',
    oppsummeringBekrefterFeil: 'Du må bekrefte for å sende meldekortet',
    oppsummeringIkkeSendtEnnå: 'Meldekortet er ikke sendt inn.',
    oppsummeringIngenDagerMedFravær:
        'Du har svart ja på spørsmålet om du har vært syk eller har hatt fravær. Du må oppgi en fraværsgrunn for minst en dag eller endre svaret ditt til "Nei".',
    oppsummeringIngenDagerMedLønn:
        'Du har svart ja på spørsmålet om du har mottatt lønn, men ikke sjekket av noen dager med lønn. Du må krysse av for minst en dag med lønn eller endre svaret ditt til "Nei".',
    oppsummeringInnsendingFeilet: [
        'Noe gikk galt ved innsending av meldekortet. Du kan prøve på nytt.',
        'Dersom problemet vedvarer, kontakt veilederen din.',
    ],

    kvitteringTittel: 'Oppsummering',
    kvitteringTilbake: 'Tilbake til startsiden for meldekort',
    kvittering: [
        'Meldekortet ble sendt inn til Nav. Husk å ta kontakt med veileder hvis du har fravær som skal godkjennes.',
        'Du får pengene innen tre virkedager hvis vi har fått all informasjonen vi trenger for å beregne og betale ut tiltakspenger. ' +
            'Hvis du har gitt svar som gjør at vi trenger dokumentasjon, kan det ta litt lengre tid før du får pengene.',
    ],

    tilbakeTilOversiktForNyKorrigering: 'Gå tilbake til oversikten for å starte en ny korrigering',

    // Innsendte
    innsendteTittel: 'Innsendte meldekort',
    innsendteHeading: 'Her er alle innsendte meldekortene dine',
    ingenInnsendteMeldekort: 'Du har ingen innsendte meldekort',
    innsendteTilbake: 'Tilbake til startsiden for meldekort',
    alleInnsendt: ({ dato }: { dato: string }) => `Innsendt ${dato}`,
    ikkeInnsendt: 'Ikke innsendt',
    innsendtMeldekortAccordionHeader: ({
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
    endreMeldekort: 'Endre meldekort',
    tidligereMeldekortForPeriode:
        'Se tidligere meldekort som har blitt sendt inn for samme perioden',

    //InnsendteMeldekortForKjede
    meldekortForKjedeHeaderUndertekst: (args: { periode: Periode }) =>
        `Her ser du innsendte meldekort for perioden ${formatterDato({ dato: args.periode.fraOgMed, locale: 'nb' })} - ${formatterDato({ dato: args.periode.tilOgMed, locale: 'nb' })}.`,
    ingenInnsendteMeldekortForPerioden: 'Ingen innsendte meldekort for denne perioden.',
    sisteInnsendteMeldekortForPerioden: 'Siste innsendte meldekort for perioden',
    tidligereInnsendteMeldekortForPerioden: 'Tidligere innsendte meldekort for perioden',
    sideForInnsendteMeldekort: 'Tilbake til side for innsendte meldekort',
    tilbakeTilInnsendte: 'Tilbake til innsendte meldekort',

    //Arena
    alleUkjentArenaMeldekort:
        'Dersom du fikk tiltakspenger i perioder før de som vises her, finner du meldekortene i den ',
    alleHarArenaMeldekort: 'Meldekort fra tidligere perioder finner du i den ',
    alleArenaLenke: 'gamle løsningen for meldekort',
    korrigeringLønnHeader: 'Når skal jeg velge mottatt lønn?',
    korrigeringLønnBeskrivelse:
        'Hvis du får lønn (ikke tiltakspenger) som en del av tiltaket ditt velger du "Lønn".',
    korrigeringSykdomHeader: 'Når skal jeg velge sykdom?',
    korrigeringFraværHeader: 'Når skal jeg velge fravær?',
    korrigeringTittel: 'Endre meldekort',
    korrigeringBeskrivelseIngress: 'Slik endrer du meldekortet',
    korrigeringBeskrivelse:
        'Nedenfor ser du hva du har tidligere registrert i meldekortet. Endre valgene på de dagene som er feilregistrert. Etter du har sendt inn endringen vil endringen saksbehandles før det eventuelt blir endringer i utbetalingen din.',
    korrigeringOppdatertAlert:
        'Meldekortet ditt har blitt oppdatert - Meldekortet inneholder nå de seneste opplysningene registrert. Verifiser at disse er korrekt, eller endre valgene på de dagene som er feilregistrert.',
    korrigeringSendMeldekortet: 'Send meldekortet',
    korrigeringDagIngenEndring: 'ingen endring',
    korrigeringDagIkkeEndret: 'Ikke endret',
    korrigeringDagEndretFra: 'Endret fra',

    korrigeringUtfyllingFeilStatusMerknad: 'Merk: Følgende dager blir ikke regnet med:',
    korrigeringUtfyllingFeilForMange: ({ utfylt, maks }: { utfylt: number; maks: number }) =>
        `Du har registrert for mange dager (${utfylt}). Maks antall er ${maks} dager.`,
    korrigeringUtfyllingFeilForFå: ({ utfylt, maks }: { utfylt: number; maks: number }) =>
        `Du har registrert for få dager. Kun ${utfylt} av ${maks} dager besvart`,
    korrigeringUtfyllingFeilIngenEndring: 'Ingen endringer er registrert.',
    korrigeringIkkeSendt: 'Meldekortet er ikke sendt inn.',
    korrigeringOppsummering: 'Oppsummering av endret meldekort',
    korrigeringKvittering: 'Endringer på meldekortet er sendt inn.',
    korrigeringIngenEndringer: 'Du har ikke gjort noen endringer på dette meldekortet. ',
    korrigeringIngenEndringerTilbake: 'Gå tilbake til korrigering av meldekortet',

    juleferieInfo:
        'Dersom tiltaket ditt er stengt på grunn av juleferie skal du melde «deltok» på dagene du skulle vært i tiltak. 🎄🎅🤶',
} as const satisfies TeksterBaseRecord;

type TeksterBaseRecord = Record<string, string | string[] | TekstResolver>;
