import { MeldekortDagStatus, MeldekortUtfylling } from '@common/typer/meldekort-utfylling.ts';
import { dagStatusMedFravær } from '@components/kalender/dag-felles/dagFellesUtils.ts';

export const antallDagerValidering = (meldekortUtfylling: MeldekortUtfylling) => {
    const dager = meldekortUtfylling?.dager || [];
    const { IKKE_REGISTRERT, DELTATT_UTEN_LØNN_I_TILTAKET } = MeldekortDagStatus;

    const antallDagerRegistrert = dager?.filter((dag) => dag.status !== IKKE_REGISTRERT).length;
    const harForMangeDagerRegistrert = antallDagerRegistrert > meldekortUtfylling?.maksAntallDager;
    const harIngenDagerRegistrert = antallDagerRegistrert === 0;
    const harIngenDagerMedDeltatt = dager?.filter(
        (dag) => dag.status !== DELTATT_UTEN_LØNN_I_TILTAKET
    );
    const harIngenDagerMedFravær = dager?.filter((dag) => dagStatusMedFravær.has(dag.status));

    return {
        antallDagerRegistrert,
        harForMangeDagerRegistrert,
        harIngenDagerRegistrert,
        harIngenDagerMedDeltatt,
        harIngenDagerMedFravær,
    };
};
