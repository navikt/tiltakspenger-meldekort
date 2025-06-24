import { MeldekortDagStatus, MeldekortUtfylling } from '@common/typer/meldekort-utfylling.ts';
import { dagStatusMedFravær } from '@components/kalender/dag-felles/dagFellesUtils.ts';

export const antallDagerValidering = (meldekortUtfylling: MeldekortUtfylling) => {
    const dager = meldekortUtfylling?.dager || [];
    const { IKKE_BESVART, DELTATT_UTEN_LØNN_I_TILTAKET } = MeldekortDagStatus;

    const antallDagerBesvart = dager?.filter((dag) => dag.status !== IKKE_BESVART).length;
    const harForMangeDagerBesvart = antallDagerBesvart > meldekortUtfylling?.maksAntallDager;
    const harIngenDagerBesvart = antallDagerBesvart === 0;
    const harIngenDagerMedDeltatt = dager?.filter(
        (dag) => dag.status !== DELTATT_UTEN_LØNN_I_TILTAKET
    );
    const harIngenDagerMedFravær = dager?.filter((dag) => dagStatusMedFravær.has(dag.status));
    const harIngenDagerMedLønn = dager?.filter(
        (dag) => dag.status !== MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET
    );

    return {
        antallDagerBesvart,
        harForMangeDagerBesvart,
        harIngenDagerBesvart,
        harIngenDagerMedDeltatt,
        harIngenDagerMedFravær,
        harIngenDagerMedLønn,
    };
};
