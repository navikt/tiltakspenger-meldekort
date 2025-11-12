import { MeldekortDag, MeldekortDagStatus } from '../../commonSrc/typer/MeldekortBruker';
import { nyMeldekortDag } from './MeldekortTestData';
import { MeldekortKorrigeringTilUtfylling } from '../../commonSrc/typer/KorrigerMeldekort';

export const nyMeldekortKorrigeringTilUtfylling = ({
    meldeperiodeId = '12345',
    kjedeId = '67890',
    dager = [
        nyMeldekortDag({
            dag: '2023-01-02',
            status: MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET,
        }),
        nyMeldekortDag({
            dag: '2023-01-03',
            status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
        }),
        nyMeldekortDag({
            dag: '2023-01-04',
            status: MeldekortDagStatus.FRAVÆR_ANNET,
        }),
        nyMeldekortDag({
            dag: '2023-01-05',
            status: MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV,
        }),
        nyMeldekortDag({
            dag: '2023-01-06',
            status: MeldekortDagStatus.FRAVÆR_SYK,
        }),
        nyMeldekortDag({
            dag: '2023-01-07',
            status: MeldekortDagStatus.IKKE_BESVART,
        }),
        nyMeldekortDag({
            dag: '2023-01-08',
            status: MeldekortDagStatus.IKKE_BESVART,
        }),
        nyMeldekortDag({
            dag: '2023-01-09',
            status: MeldekortDagStatus.FRAVÆR_SYKT_BARN,
        }),
        nyMeldekortDag({
            dag: '2023-01-10',
            status: MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET,
        }),
        nyMeldekortDag({
            dag: '2023-01-11',
            status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
        }),
        nyMeldekortDag({
            dag: '2023-01-12',
            status: MeldekortDagStatus.FRAVÆR_ANNET,
        }),
        nyMeldekortDag({
            dag: '2023-01-13',
            status: MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV,
        }),
        nyMeldekortDag({
            dag: '2023-01-14',
            status: MeldekortDagStatus.IKKE_BESVART,
        }),
        nyMeldekortDag({
            dag: '2023-01-15',
            status: MeldekortDagStatus.IKKE_BESVART,
        }),
    ],
    periode = { fraOgMed: '2023-01-02', tilOgMed: '2023-01-15' },
    mottattTidspunktSisteMeldekort = '2023-01-15T12:00:00Z',
    maksAntallDagerForPeriode = 10,
}: {
    meldeperiodeId?: string;
    kjedeId?: string;
    dager?: MeldekortDag[];
    periode?: { fraOgMed: string; tilOgMed: string };
    mottattTidspunktSisteMeldekort?: string;
    maksAntallDagerForPeriode?: number;
}): MeldekortKorrigeringTilUtfylling => ({
    meldeperiodeId,
    kjedeId,
    dager: dager,
    periode: {
        fraOgMed: periode.fraOgMed,
        tilOgMed: periode.tilOgMed,
    },
    mottattTidspunktSisteMeldekort,
    maksAntallDagerForPeriode,
});
