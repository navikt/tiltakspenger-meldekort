import { MeldekortDag, MeldekortDagStatus } from '../../commonSrc/typer/MeldekortBruker';
import { MeldeperiodeForPeriodeResponse } from '../../commonSrc/typer/Meldeperiode';
import { nyMeldekortDag } from './MeldekortTestData';

export const nyMeldeperiodeForPeriodeResponse = ({
    meldeperiodeId = '12345',
    kjedeId = '67890',
    dager = [
        nyMeldekortDag({
            dag: '2023-01-01',
            status: MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET,
        }),
        nyMeldekortDag({
            dag: '2023-01-02',
            status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
        }),
        nyMeldekortDag({
            dag: '2023-01-03',
            status: MeldekortDagStatus.FRAVÆR_ANNET,
        }),
        nyMeldekortDag({
            dag: '2023-01-04',
            status: MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV,
        }),
        nyMeldekortDag({
            dag: '2023-01-05',
            status: MeldekortDagStatus.FRAVÆR_SYK,
        }),
        nyMeldekortDag({
            dag: '2023-01-06',
            status: MeldekortDagStatus.IKKE_BESVART,
        }),
        nyMeldekortDag({
            dag: '2023-01-07',
            status: MeldekortDagStatus.IKKE_BESVART,
        }),
        nyMeldekortDag({
            dag: '2023-01-08',
            status: MeldekortDagStatus.FRAVÆR_SYKT_BARN,
        }),
        nyMeldekortDag({
            dag: '2023-01-09',
            status: MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET,
        }),
        nyMeldekortDag({
            dag: '2023-01-10',
            status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
        }),
        nyMeldekortDag({
            dag: '2023-01-11',
            status: MeldekortDagStatus.FRAVÆR_ANNET,
        }),
        nyMeldekortDag({
            dag: '2023-01-12',
            status: MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV,
        }),
        nyMeldekortDag({
            dag: '2023-01-13',
            status: MeldekortDagStatus.IKKE_BESVART,
        }),
        nyMeldekortDag({
            dag: '2023-01-14',
            status: MeldekortDagStatus.IKKE_BESVART,
        }),
    ],
    periode = { fraOgMed: '2023-01-01', tilOgMed: '2023-01-14' },
    mottattTidspunktSisteMeldekort = '2023-01-15T12:00:00Z',
}: {
    meldeperiodeId?: string;
    kjedeId?: string;
    dager?: MeldekortDag[];
    periode?: { fraOgMed: string; tilOgMed: string };
    mottattTidspunktSisteMeldekort?: string;
}): MeldeperiodeForPeriodeResponse => ({
    meldeperiodeId,
    kjedeId,
    dager: dager,
    periode: {
        fraOgMed: periode.fraOgMed,
        tilOgMed: periode.tilOgMed,
    },
    mottattTidspunktSisteMeldekort,
});
