import {
    Meldekort,
    MeldekortDag,
    MeldekortDagStatus,
    MeldekortStatus,
} from '../../packages/common/src/typer/MeldekortBruker';
import { MeldekortMedSisteMeldeperiode } from '../../packages/common/src/typer/alle-meldekort';

const { DELTATT_UTEN_LØNN_I_TILTAKET, DELTATT_MED_LØNN_I_TILTAKET, IKKE_BESVART } =
    MeldekortDagStatus;

/**
 * Lager én dag per status, med påfølgende datoer fra og med `fraOgMed` (YYYY-MM-DD)
 */
export const lagDager = (fraOgMed: string, statuser: MeldekortDagStatus[]): MeldekortDag[] => {
    const start = new Date(`${fraOgMed}T00:00:00Z`);

    return statuser.map((status, index) => {
        const dato = new Date(start);
        dato.setUTCDate(start.getUTCDate() + index);
        return { dag: dato.toISOString().slice(0, 10), status };
    });
};

const toUkerMed = (status: MeldekortDagStatus) => Array<MeldekortDagStatus>(14).fill(status);

const utfylteStatuser: MeldekortDagStatus[] = [
    DELTATT_MED_LØNN_I_TILTAKET,
    DELTATT_UTEN_LØNN_I_TILTAKET,
    MeldekortDagStatus.FRAVÆR_ANNET,
    MeldekortDagStatus.FRAVÆR_STERKE_VELFERDSGRUNNER_ELLER_JOBBINTERVJU,
    MeldekortDagStatus.FRAVÆR_SYK,
    IKKE_BESVART,
    IKKE_BESVART,
    MeldekortDagStatus.FRAVÆR_SYKT_BARN,
    DELTATT_MED_LØNN_I_TILTAKET,
    DELTATT_UTEN_LØNN_I_TILTAKET,
    MeldekortDagStatus.FRAVÆR_ANNET,
    MeldekortDagStatus.FRAVÆR_STERKE_VELFERDSGRUNNER_ELLER_JOBBINTERVJU,
    IKKE_BESVART,
    IKKE_BESVART,
];

/**
 * Et innsendt meldekort for 2. - 15. januar 2023 (uke 1 - 2)
 */
export const nyUtfylltMeldekort = (overrides: Partial<Meldekort> = {}): Meldekort => {
    const fraOgMed = overrides.fraOgMed ?? '2023-01-02';

    return {
        id: '12345',
        meldeperiodeId: '12345',
        kjedeId: '67890',
        versjon: 1,
        fraOgMed,
        tilOgMed: '2023-01-15',
        uke1: 1,
        uke2: 2,
        maksAntallDager: 10,
        innsendt: '2023-01-15T12:00:00Z',
        kanSendes: null,
        status: MeldekortStatus.INNSENDT,
        dager: lagDager(fraOgMed, utfylteStatuser),
        ...overrides,
    };
};

/**
 * Et meldekort som kan fylles ut for 6. - 19. januar 2025 (uke 2 - 3), der ingen dager er besvart
 */
export const nyMeldekortTilUtfylling = (overrides: Partial<Meldekort> = {}): Meldekort =>
    nyUtfylltMeldekort({
        id: 'meldekort_til_utfylling',
        meldeperiodeId: 'meldeperiode_til_utfylling',
        kjedeId: 'kjede_til_utfylling',
        fraOgMed: '2025-01-06',
        tilOgMed: '2025-01-19',
        uke1: 2,
        uke2: 3,
        innsendt: null,
        kanSendes: '2025-01-17',
        status: MeldekortStatus.KAN_UTFYLLES,
        dager: lagDager('2025-01-06', toUkerMed(IKKE_BESVART)),
        ...overrides,
    });

export const nyUtfylltMeldekortMedSisteMeldeperiode = (
    meldekort: Meldekort,
): MeldekortMedSisteMeldeperiode => ({
    meldekort,
    sisteMeldeperiode: {
        meldeperiodeId: meldekort.meldeperiodeId,
        kjedeId: meldekort.kjedeId,
        periode: { fraOgMed: meldekort.fraOgMed, tilOgMed: meldekort.tilOgMed },
        maksAntallDagerForPeriode: meldekort.maksAntallDager,
    },
});
