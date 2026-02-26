import {
    Meldekort,
    MeldekortDag,
    MeldekortDagStatus,
    MeldekortStatus,
} from '../../commonSrc/typer/MeldekortBruker';
import { Nullable } from '../../commonSrc/typer/Nullable';
import { MeldekortMedSisteMeldeperiode } from '../../commonSrc/typer/alle-meldekort';

export const nyMeldekortDag = ({
    dag = '2023-01-02',
    status = MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
}: {
    dag: string;
    status?: MeldekortDagStatus;
}): MeldekortDag => ({
    dag,
    status,
});

export const nyMeldekortDagerForPeriode = ({
    fraOgMed = '2023-01-02',
    tilOgMed = '2023-01-15',
}: {
    fraOgMed?: string;
    tilOgMed?: string;
}): MeldekortDag[] => {
    const start = new Date(fraOgMed);
    const end = new Date(tilOgMed);

    const dager: MeldekortDag[] = [];
    let current = new Date(start);

    while (current <= end) {
        const dag = current.toISOString().slice(0, 10); // YYYY-MM-DD
        dager.push(
            nyMeldekortDag({
                dag,
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
        );
        current.setDate(current.getDate() + 1);
    }

    return dager;
};

export const nyUtfylltMeldekort = ({
    id = '12345',
    meldeperiodeId = '12345',
    kjedeId = '67890',
    versjon = 1,
    kanSendes = null,
    periode = { fraOgMed: '2023-01-02', tilOgMed: '2023-01-15' },
    uke1 = 1,
    uke2 = 2,
    maksAntallDager = 10,
    innsendt = '2023-01-15T12:00:00Z',
    status = MeldekortStatus.INNSENDT,
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
            status: MeldekortDagStatus.FRAVÆR_STERKE_VELFERDSGRUNNER_ELLER_JOBBINTERVJU,
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
            status: MeldekortDagStatus.FRAVÆR_STERKE_VELFERDSGRUNNER_ELLER_JOBBINTERVJU,
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
}: {
    id?: string;
    meldeperiodeId?: string;
    kjedeId?: string;
    versjon?: number;
    periode?: { fraOgMed: string; tilOgMed: string };
    uke1?: number;
    uke2?: number;
    maksAntallDager?: number;
    innsendt?: Nullable<string>;
    dager?: MeldekortDag[];
    status?: MeldekortStatus;
    kanSendes?: Nullable<string>;
}): Meldekort => ({
    id,
    meldeperiodeId: meldeperiodeId,
    kjedeId: kjedeId,
    versjon: versjon,
    fraOgMed: periode.fraOgMed,
    tilOgMed: periode.tilOgMed,
    uke1,
    uke2,
    maksAntallDager,
    innsendt,
    kanSendes: kanSendes,
    dager,
    status,
});

export const nyUtfylltMeldekortMedSisteMeldeperiode = (
    meldekort: Meldekort,
): MeldekortMedSisteMeldeperiode => ({
    meldekort: meldekort,
    sisteMeldeperiode: {
        meldeperiodeId: meldekort.meldeperiodeId,
        kjedeId: meldekort.kjedeId,
        periode: {
            fraOgMed: meldekort.fraOgMed,
            tilOgMed: meldekort.tilOgMed,
        },
        maksAntallDagerForPeriode: meldekort.maksAntallDager,
    },
});
