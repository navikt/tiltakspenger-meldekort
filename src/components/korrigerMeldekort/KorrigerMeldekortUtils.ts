import { MeldekortDag, MeldekortDagStatus } from '@common/typer/meldekort-utfylling';

export interface KorrigertMeldekortDag {
    dato: string;
    status: KorrigerMeldekortStatus;
    harRett: boolean;
}

export enum KorrigerMeldekortStatus {
    DELTATT = 'DELTATT',
    MOTTAT_LØNN = 'MOTTAT_LØNN',
    SYK = 'SYK',
    SYK_BARN_ELLER_SYK_BARNEPASSER = 'SYK_BARN_ELLER_SYK_BARNEPASSER',
    FRAVÆR_GODKJENT_AV_NAV = 'FRAVÆR_GODKJENT_AV_NAV',
    ANNET_FRAVÆR = 'ANNET_FRAVÆR',
    IKKE_TILTAKSDAG = 'IKKE_TILTAKSDAG',
}

export const korrigerMeldekortStatusTextMapper = (status: KorrigerMeldekortStatus): string => {
    switch (status) {
        case KorrigerMeldekortStatus.MOTTAT_LØNN:
            return 'Mottatt lønn';
        case KorrigerMeldekortStatus.DELTATT:
            return 'Deltatt';
        case KorrigerMeldekortStatus.SYK:
            return 'Syk';
        case KorrigerMeldekortStatus.SYK_BARN_ELLER_SYK_BARNEPASSER:
            return 'Syk barn eller syk barnepasser';
        case KorrigerMeldekortStatus.FRAVÆR_GODKJENT_AV_NAV:
            return 'Fravær godkjent av Nav';
        case KorrigerMeldekortStatus.ANNET_FRAVÆR:
            return 'Annet fravær';
        case KorrigerMeldekortStatus.IKKE_TILTAKSDAG:
            return 'Ikke tiltaksdag';
        default:
            return 'Ukjent status';
    }
};

export const mapUtfylltMeldekortDagerTilKorrigerteDager = (
    dager: MeldekortDag[],
): KorrigertMeldekortDag[] =>
    dager.map((dag) => ({
        dato: dag.dato,
        status: meldekortDagStatusTilKorrigerMeldekortStatus(dag.status),
        harRett: dag.harRett,
    }));

const meldekortDagStatusTilKorrigerMeldekortStatus = (
    status: MeldekortDagStatus,
): KorrigerMeldekortStatus => {
    switch (status) {
        case MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET:
            return KorrigerMeldekortStatus.MOTTAT_LØNN;
        case MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET:
            return KorrigerMeldekortStatus.DELTATT;
        case MeldekortDagStatus.FRAVÆR_SYK:
            return KorrigerMeldekortStatus.SYK;
        case MeldekortDagStatus.FRAVÆR_SYKT_BARN:
            return KorrigerMeldekortStatus.SYK_BARN_ELLER_SYK_BARNEPASSER;
        case MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV:
            return KorrigerMeldekortStatus.FRAVÆR_GODKJENT_AV_NAV;
        case MeldekortDagStatus.FRAVÆR_ANNET:
            return KorrigerMeldekortStatus.ANNET_FRAVÆR;
        //TODO - Hva skal denne mappes fra/til?
        case MeldekortDagStatus.IKKE_BESVART:
            return KorrigerMeldekortStatus.IKKE_TILTAKSDAG;
        default:
            throw new Error(`Ukjent status: ${status}`);
    }
};
