import { MeldekortDagStatus } from '@common/typer/meldekort-utfylling';

export const korrigerMeldekortStatusTextMapper = (status: MeldekortDagStatus): string => {
    switch (status) {
        case MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET:
            return 'Mottatt lønn';
        case MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET:
            return 'Deltatt';
        case MeldekortDagStatus.FRAVÆR_SYK:
            return 'Syk';
        case MeldekortDagStatus.FRAVÆR_SYKT_BARN:
            return 'Syk barn eller syk barnepasser';
        case MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV:
            return 'Fravær godkjent av Nav';
        case MeldekortDagStatus.FRAVÆR_ANNET:
            return 'Annet fravær';
        case MeldekortDagStatus.IKKE_BESVART:
            return 'Ikke tiltaksdag';
    }
};
