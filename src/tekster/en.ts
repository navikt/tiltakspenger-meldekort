import { Periode } from '@common/typer/periode';
import { TekstResolver } from '@tekster/typer.ts';
import { formatterDato, getUkenummer } from '@utils/datetime';

export const teksterEn = {
    neste: 'Next step',
    startUtfylling: 'Start filling out',
    forrige: 'Previous step',
    lagre: 'Save',
    nullstill: 'Reset',
    avbryt: 'Cancel',
    avbrytEndring: 'Cancel changes',
    avbrytUtfylling: 'Cancel report',
    sendInn: 'Submit',

    statusIkkeBesvart: 'No report',
    statusDeltatt: 'Participated',
    statusDeltattMedLønn: 'Received pay',
    statusSyk: 'Sick',
    statusSyktBarn: 'Sick child or sick child carer',
    statusSterkeVelferdsgrunnerEllerJobbintervju: 'Strong welfare reasons or job interview',
    statusGodkjentFravær: 'Absence approved by Nav',
    statusAnnetFravær: 'Other absence',
    statusIkkeTiltaksdag: 'No employment scheme activity',
    statusIkkeRettTilTiltakspenger: 'Not entitled',

    ikkeRett: 'Not entitled',

    forMangeDagerEnkel: 'You have selected too many days',
    forFaDagerEnkel: 'You have selected too few days',
    ingenDagerFyltUt: 'You must select at least one day with absence, pay or participation.',
    antallDagerBesvart: ({ antall }: { antall: number }) =>
        `${antall} day${antall === 1 ? '' : 's'} reported.`,
    forMangeDagerBesvart: ({ maks }: { maks: number }) =>
        `Your decision specifies that you should participate in employment scheme activities on ${maks} days this period. Please make sure you have selected only the days you have participated, been absent or earned pay.`,
    forFaDagerBesvart: ({ maks }: { maks: number }) =>
        `Your decision specifies that you should participate in employment scheme activities on ${maks} days this period. Please make sure you have selected all of the days you have participated, been absent or earned pay.`,
    ingenDagerMedFravær:
        'You must select at least one day with absence, or select that you did not have any absence.',

    sideTittel: 'Employment status form for employment scheme benefits',
    forsideGuidePanelLenkeTekst:
        'Please contact Nav if you are not sure how to fill out the employment status form.',
    forsideIngress: [
        'To receive employment scheme benefits, all scheme participants must submit an employment status form every 14 days. We use this information to calculate your employment scheme benefits.',
        'We share the information you provide in the employment status form with other systems within Nav, because this information is relevant for the follow-up you receive from Nav.',
    ],
    forsideBekrefter:
        'I confirm that I will fill out the employment status form correctly, to the best of my ability',
    forsideBekrefterFeil: 'You must confirm to proceed',
    forsideSeOgEndre: 'See previous employment status form(s).',
    forsideIngenMeldekortSoknadUnderBehandling:
        'You have not received any employment status forms yet because Nav has not finished processing your application. ',
    forsideIngenMeldekort: 'You have no employment status forms ready for submission. ',
    forsideNesteMeldekort1: 'Your next employment status form can be submitted from ',
    forsideNesteMeldekort2: ' for the period ',
    forsideForrigeMeldekort1: 'Your previous submission was ',
    forsideForrigeMeldekort2: ' for the period ',
    forsideIkkeTiltakspenger:
        'No employment status forms found. If you received employment scheme benefits for periods earlier than the ones shown here, you can find those employment status forms in ',
    forsideHarArenaMeldekort:
        'You can find your employment status forms for employment scheme benefits in ',
    forsideArenaLenke: 'the previous (old) solution.',

    ukeMedNummer: ({ dato }: { dato: string }) => `Week ${getUkenummer(dato, 'en')}`,
    undertekstUker: ({ uke1, uke2 }: { uke1: number; uke2: number }) => `Week ${uke1} and ${uke2}`,
    undertekstDatoer: ({ fraOgMed, tilOgMed }: { fraOgMed: string; tilOgMed: string }) =>
        `${fraOgMed} to ${tilOgMed}`,

    deltattTittel: 'Attendance',
    deltattHjelpIngress:
        'Please select the days you participated in activities as agreed. You should select “participated” if the day was a public holiday and you did not participate because the employment scheme was closed.',
    deltattUkeHjelp: 'Please select the days you participated in activities.',
    deltattDagPrefix: 'Participated: ',
    fraværStegFraværSpørsmål:
        'Have you been sick or absent for other reasons on any of the days you were supposed to participate in employment scheme activities?',
    fraværHarHattFraværSvarJa: 'Yes, I have been sick or absent for other reasons',
    fraværHarHattFraværSvarNei: 'No, I have not been sick or absent for other reasons',
    fraværSpørsmålIkkeValgt: 'Select an absence option to continue.',
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

    fraværHjelpLesMerSterkeVelferdsgrunnerEllerJobbintervju:
        'When should you choose “strong welfare reasons or job interview”?',
    fraværHjelpLesMerSterkeVelferdsgrunnerEllerJobbintervjuListeStart: [
        'You should choose this option if Nav has approved your absence from the programme on this day due to:',
    ],
    fraværHjelpLesMerSterkeVelferdsgrunnerEllerJobbintervjuListeÅrsaker: [
        'a job interview',
        'appointments with public support services',
        'a funeral or memorial service for an immediate family member',
        'other strong welfare reasons',
    ],
    fraværHjelpLesMerSterkeVelferdsgrunnerEllerJobbintervjuListeSlutt: [
        'Only your Nav counsellor can approve the absence — not the programme provider.',
    ],

    fraværHjelpLesMerFraværAnnet: 'When do I select “other absence”?',
    fraværHjelpLesMerFraværAnnetListe: [
        'Please select “other absence” if you were absent for all or part of a day with employment scheme activities.',
        'Please select “other absence” if you do not attend the agreed programme or activity, or if you do not participate in other activities that have been agreed with Nav.',
        'Please select “other absence” if you worked instead of participating in employment scheme activities. For example: Your agreed employment scheme participation is from 09:00 to 15:00, and you worked from 09:00 to 10:00 instead of participating in employment scheme activities the entire day.',
        'Please select “other absence” if you took time off/went on holiday outside of the scheduled holiday periods for the employment scheme.',
        'Please select “other absence” if you are waiting for approval of your absence. You can always change your employment status form later after your Nav counsellor has approved your absence.',
    ],

    fraværUkeHjelp: 'Please select your type of absence',

    fraværPanelRegistrer: 'Select',
    fraværPanelRegistrerSR: ({ datoTekst }: { datoTekst: string }) =>
        `${datoTekst} - Select reason for absence`,
    fraværPanelValgRegistrertSR: ({
        datoTekst,
        valgtStatusTekst,
    }: {
        datoTekst: string;
        valgtStatusTekst: string;
    }) => `${datoTekst} - you have selected "${valgtStatusTekst}", click to change.`,
    fraværModalHeader: 'Reason for absence',
    fraværModalSykIngress: 'You were too sick to participate in the employment scheme activity.',
    fraværModalSyktBarnIngress:
        'You were unable to participate because your child or child carer was sick.',
    fraværModalSterkeVelferdsgrunnerEllerJobbintervjuIngress:
        'You have been absent from the programme due to strong welfare reasons or a job interview, and your Nav counsellor has approved the absence.',
    fraværModalAnnetGodkjentIngress:
        'You were absent from activities, and Nav has approved this absence.',
    fraværModalIkkeGodkjentIngress:
        'You were absent from activities all day or part of the day, and this absence has not been approved by Nav. You are not entitled to employment scheme benefits for this day.',
    lønnTittel: 'Pay',
    lønnHjelpLesMerTittel: 'When do I select "received pay"?',
    lønnInfoUndertittelLønn: 'Pay',
    lønnIngress:
        'If you are receiving pay (not employment scheme benefits) as part of your participation, answer “yes”. Then specify which days you are receiving pay for.',
    lønnHarMottattLønnSpørsmål:
        'Are you receiving pay (not employment scheme benefits) as part of your participation?',
    lønnHarMottattLønnSvarJa: 'Yes, I am receiving pay as part of my participation',
    lønnHarMottattLønnSvarNei: 'No, I am only receiving employment scheme benefits',
    lønnSpørsmålIkkeValgt: 'Select an option for pay to continue.',
    lønnUkeHjelp: 'Please select the days you are receiving pay for',
    lønnDagPrefix: 'Receiving pay: ',
    oppsummeringTittel: 'Summary',
    oppsummeringIngress:
        'Below is a summary of the information you reported on your employment status form this period. Please make sure it is correct before you submit the form. You can go back and correct any incorrect information.',
    oppsummeringBekrefter: 'I confirm that the above information is correct.',
    oppsummeringBekrefterFeil: 'You must confirm in order to submit the employment status form',
    oppsummeringIkkeSendtEnnå: 'You have not yet submitted the form.',
    oppsummeringIngenDagerMedFravær:
        'You have answered yes to the question about whether you have been sick or have been absent. You must provide a reason for absence for at least one day or change your answer to "No".',
    oppsummeringIngenDagerMedLønn:
        'You have answered yes to the question about whether you have received pay, but not selected any days with pay. You must select at least one day with pay or change your answer to "No".',
    oppsummeringInnsendingFeilet: [
        'Something went wrong when submitting the employment status form. You can try again.',
        'If the problem continues, please contact your counsellor.',
    ],

    kvitteringTittel: 'Summary',
    kvitteringTilbake: 'Back to the employment status form start page',
    kvittering: [
        'The employment status form was submitted to Nav. Don’t forget to contact your counsellor if you have absences that need approving.',
        'You will receive payment within 3 business days, provided you have submitted all the information we need to calculate and pay your employment scheme benefits. ' +
            'If some of the information you provided means we need additional documentation, it may take a little longer before you receive payment.',
    ],

    tilbakeTilOversiktForNyKorrigering: 'Return to the overview to start a new edit',

    // Innsendte
    innsendteTittel: 'Submitted employment status forms',
    innsendteHeading: 'Here are all your submitted employment status forms',
    ingenInnsendteMeldekort: 'You have no submitted employment status forms',
    innsendteTilbake: 'Back to the employment status form homepage',
    alleInnsendt: ({ dato }: { dato: string }) => `Submitted ${dato}`,
    ikkeInnsendt: 'Not submitted',
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
    }) => `Employment status form week ${uke1} - ${uke2} (${fraOgMed} - ${tilOgMed})`,
    endreMeldekort: 'Edit employment status form',
    tidligereMeldekortForPeriode:
        'See previous employment status forms that have been submitted for the same period',

    //InnsendteMeldekortForKjede
    meldekortForKjedeHeaderUndertekst: (args: { periode: Periode }) =>
        `Here you can see submitted employment status forms for the period ${formatterDato({ dato: args.periode.fraOgMed, locale: 'en' })} - ${formatterDato({ dato: args.periode.tilOgMed, locale: 'en' })}.`,
    ingenInnsendteMeldekortForPerioden: 'No submitted employment status forms for this period.',
    sisteInnsendteMeldekortForPerioden: 'Last submitted employment status form for the period',
    tidligereInnsendteMeldekortForPerioden:
        'Previously submitted employment status forms for the period',
    sideForInnsendteMeldekort: 'Return to submitted employment status forms page',
    tilbakeTilInnsendte: 'Return to submitted employment status forms',

    //Arena
    alleUkjentArenaMeldekort:
        'If you received employment scheme benefits for periods earlier than the ones shown here, you can find those employment status forms in ',
    alleHarArenaMeldekort: 'Employment status forms for previous periods can be found in ',
    alleArenaLenke: 'the previous (old) solution',
    korrigeringLønnHeader: 'When do I select "received pay"?',
    korrigeringLønnBeskrivelse:
        'If you receive pay (not employment scheme benefits) as part of your programme, choose "Received pay".',
    korrigeringSykdomHeader: 'When do I select “sick”?',
    korrigeringFraværHeader: 'When do I select absence?',
    korrigeringTittel: 'Edit employment status form ',
    korrigeringBeskrivelseIngress: 'How to edit your employment status form',
    korrigeringBeskrivelse:
        'Below, you can see what you previously registered in the employment status form. Update the selections on the days where the information is incorrect. After you submit the changes, they will be processed before any adjustments are made to your payment.',
    korrigeringOppdatertAlert:
        'Your employment status form has been updated - The employment status form now contains the latest information registered. Verify that this is correct, or change the selections on the days that were registered incorrectly.',
    korrigeringSendMeldekortet: 'Submit the employment status form',
    korrigeringDagIngenEndring: 'no change',
    korrigeringDagIkkeEndret: 'Not changed',
    korrigeringDagEndretFra: 'Changed from',

    korrigeringUtfyllingFeilStatusMerknad: 'Note: The following days are not counted:',
    korrigeringUtfyllingFeilForMange: ({ utfylt, maks }: { utfylt: number; maks: number }) =>
        `You have registered too many days (${utfylt}). The maximum number is ${maks} days.`,
    korrigeringUtfyllingFeilForFå: ({ utfylt, maks }: { utfylt: number; maks: number }) =>
        `You have registered too few days. Only ${utfylt} out of ${maks} days have been answered.`,
    korrigeringUtfyllingFeilIngenEndring: 'No changes have been registered.',
    korrigeringIkkeSendt: 'The employment status form has not been submitted.',
    korrigeringOppsummering: 'Summary of edited employment status form',
    korrigeringKvittering: 'The changes to the employment status form have been submitted.',
    korrigeringIngenEndringer: 'You have not made any changes to this employment status form. ',
    korrigeringIngenEndringerTilbake: 'Return to edit employment status form',

    juleferieInfo:
        'If your programme is closed due to the Christmas holidays, you must report “participated” for the days you were scheduled to attend the programme. 🎄🎅🤶',
} as const satisfies TeksterBaseRecord;

type TeksterBaseRecord = Record<string, string | string[] | TekstResolver>;
