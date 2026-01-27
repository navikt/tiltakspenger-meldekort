import { Periode } from '@common/typer/periode';
import { TekstResolver } from '@tekster/typer.ts';
import { formatterDato, getUkenummer } from '@utils/datetime';

export const teksterEn = {
    neste: 'Next step',
    startUtfylling: 'Start filling out',
    forrige: 'Previous step',
    lagre: 'Save',
    slett: 'Slett',
    nullstill: 'Reset',
    avbryt: 'Cancel',
    avbrytEndring: 'Avbryt endring',
    avbrytUtfylling: 'Cancel report',
    sendInn: 'Send inn',

    statusIkkeBesvart: 'No report',
    statusDeltatt: 'Deltok',
    statusDeltattMedLønn: 'Mottatt lønn',
    statusSyk: 'Sick',
    statusSyktBarn: 'Sick child or sick child carer',
    statusGodkjentFravær: 'Absence approved by Nav',
    statusAnnetFravær: 'Other absence',
    statusIkkeTiltaksdag: 'Ikke tiltaksdag',
    statusIkkeRettTilTiltakspenger: 'Ikke rett',

    ikkeRett: 'Ikke rett',

    forMangeDagerEnkel: 'Du har fylt ut for mange dager',
    forFaDagerEnkel: 'Du har fylt ut for få dager',
    ingenDagerFyltUt: 'Du må fylle ut minst én dag med fravær, lønn eller deltagelse.',
    antallDagerBesvart: ({ antall }: { antall: number }) =>
        `${antall} day${antall === 1 ? '' : 's'} reported.`,
    forMangeDagerBesvart: ({ maks }: { maks: number }) =>
        `Du har vedtak om tiltakspenger for ${maks} dager i perioden. Sjekk at du bare har ført opp dager du faktisk har deltatt, hatt fravær eller fått lønn.`,
    forFaDagerBesvart: ({ maks }: { maks: number }) =>
        `Du har vedtak om tiltakspenger for ${maks} dager i perioden. Sjekk at du har ført opp alle dagene du har deltatt, hatt fravær eller fått lønn.`,
    ingenDagerMedFravær:
        'Du må velge minst en dag med fravær, eller velge at du ikke har hatt fravær.',

    sideTittel: 'Employment status form for employment scheme benefits',
    forsideGuidePanelLenkeTekst:
        'Please contact Nav if you are not sure how to fill out the employment status form.',
    forsideIngress: [
        'To receive employment scheme benefits, all scheme participants must submit an employment status form every 14 days. We use this information to calculate your employment scheme benefits.',
        'We share the information you provide in the employment status form with other systems within Nav, because this information is relevant for the follow-up you receive from Nav.',
    ],
    forsideBekrefter:
        'I confirm that I will fill out the employment status form correctly, to the best of my ability',
    forsideBekrefterFeil: 'Du må bekrefte for å gå videre',
    forsideSeOgEndre: 'See previous employment status form(s).',
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

    ukeMedNummer: ({ dato }: { dato: string }) => `Week ${getUkenummer(dato)}`,
    undertekstUker: ({ uke1, uke2 }: { uke1: number; uke2: number }) => `Week ${uke1} and ${uke2}`,
    undertekstDatoer: ({ fraOgMed, tilOgMed }: { fraOgMed: string; tilOgMed: string }) =>
        `${fraOgMed} to ${tilOgMed}`,

    deltattTittel: 'Oppmøte',
    deltattHjelpTittel: 'Slik fyller du ut meldekortet',
    deltattHjelpIngress:
        'Kryss av for de dagene du har deltatt på tiltaket som avtalt. Kryss også av for «deltok» hvis dagen er en offentlig fridag og du ikke får deltatt fordi tiltaket er stengt.',
    deltattUkeHjelp: 'Kryss av for de dagene du deltok på tiltaket.',
    deltattDagPrefix: 'Deltok: ',
    fraværHjelpLesMer:
        'Du må informere oss dersom du har vært syk eller hatt annet fravær i perioden du var satt opp på tiltak.',
    fraværStegFraværSpørsmål:
        'Have you been sick or absent for other reasons on any of the days you were supposed to participate in employment scheme activities?',
    fraværHarHattFraværSvarJa: 'Yes, I have been sick or absent for other reasons',
    fraværHarHattFraværSvarNei: 'No, I have not been sick or absent for other reasons',
    fraværSpørsmålIkkeValgt: 'Velg et fraværsalternativ for å fortsette.',
    fraværTittel: 'Absence',
    fraværIngress:
        'If you have not been sick or absent for other reasons this period, please answer “no”. If you have been sick or absent for other reasons for an entire day or part of a day with employment scheme activities, please answer “yes”. Then specify which days you were absent, as well as the type of absence.',
    fraværHjelpTittel: 'How to specify your absence',
    fraværHjelpIngress: [
        'Some types of absence mean you are entitled to employment scheme benefits even if you did not participate. Please select the day(s) you were absent, as well as the type of absence.',
    ],
    fraværHjelpLesMerSyk: 'When do I select “sick”?',
    fraværHjelpLesMerSykListe: [
        'Please select “sick” if you were too sick to participate in the employment scheme activity. You may be entitled to employment scheme benefits when you are sick. It is therefore very important that you specify this on the form.',
        'You will be paid the full benefit for the first 3 days you are sick. If you are sick more than 3 days, you will receive 75 percent of the full benefit payment for the rest of the employer liability period. An employer liability period is a total of 16 business days.',
        'You need a medical certificate in order to be entitled to employment scheme benefits beyond 3 days.',
    ],

    fraværHjelpLesMerSyktBarn: 'When do I select “sick child or child carer”?',
    fraværHjelpLesMerSyktBarnListe: [
        'Please select “Sick child or child carer” if you were unable to participate because your child or your child carer was sick.',
        'The same rules apply when your child or child carer is sick as when you are sick. This means you are entitled to full payment for the first three days and then 75 percent for the rest of the employer liability period.',
        'You must submit a medical certificate for your child or a certificate from your child carer from day 4 in order to be entitled to employment scheme benefits beyond 3 days.',
    ],

    fraværHjelpLesMerFraværGodkjent: 'When do I select “absence approved by Nav”?',
    fraværHjelpLesMerFraværGodkjentListeStart: [
        'You may be entitled to employment scheme benefits even if you have been absent. This applies if your absence is due to activities you have agreed with your Nav counsellor.',
        'Approved reasons for absence, where you will still be entitled to employment scheme benefits, include:',
    ],
    fraværHjelpLesMerFraværGodkjentListeÅrsaker: [
        'job interviews',
        'appointment in the public health care service',
        'serious illness/burial/funeral service of close family member',
    ],
    fraværHjelpLesMerFraværGodkjentListeSlutt: [
        'Only your Nav counsellor can approve your absence – the scheme organiser cannot.',
        'Please contact your Nav counsellor if you are not sure if your absence has been approved.',
    ],
    fraværHjelpLesMerFraværAnnet: 'When do I select “other absence”?',
    fraværHjelpLesMerFraværAnnetListe: [
        'Please select “other absence” if you were absent for all or part of a day with employment scheme activities.',
        'Please select “other absence” if you worked instead of participating in employment scheme activities. For example: Your agreed employment scheme participation is from 09:00 to 15:00, and you worked from 09:00 to 10:00 instead of participating in employment scheme activities the entire day.',
        'Please select “other absence” if you took time off/went on holiday outside of the scheduled holiday periods for the employment scheme.',
        'Please select “other absence” if you are waiting for approval of your absence. You can always change your employment status form later after your Nav counsellor has approved your absence.',
    ],

    fraværUkeHjelp: 'Please select your type of absence',

    fraværPanelRegistrer: 'Select',
    fraværPanelRegistrerSR: ({ datoTekst }: { datoTekst: string }) =>
        `${datoTekst} - Velg årsak til fravær`,
    fraværPanelValgRegistrertSR: ({
        datoTekst,
        valgtStatusTekst,
    }: {
        datoTekst: string;
        valgtStatusTekst: string;
    }) => `${datoTekst} - du har valgt "${valgtStatusTekst}", trykk for å endre.`,
    fraværModalHeader: 'Reason for absence',
    fraværModalSykIngress: 'You were too sick to participate in the employment scheme activity.',
    fraværModalSyktBarnIngress:
        'You were unable to participate because your child or child carer was sick.',
    fraværModalAnnetGodkjentIngress:
        'You were absent from activities, and Nav has approved this absence.',
    fraværModalIkkeGodkjentIngress:
        'You were absent from activities all day or part of the day, and this absence has not been approved by Nav. You are not entitled to employment scheme benefits for this day.',
    lønnTittel: 'Pay',
    lønnHjelpLesMerTittel: 'Når skal du registrere lønn?',
    lønnInfoUndertittelLønn: 'Pay',
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
        `Her ser du innsendte meldekort for perioden ${formatterDato({ dato: args.periode.fraOgMed })} - ${formatterDato({ dato: args.periode.tilOgMed })}.`,
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
} as const satisfies TeksterBaseRecord;

type TeksterBaseRecord = Record<string, string | string[] | TekstResolver>;
