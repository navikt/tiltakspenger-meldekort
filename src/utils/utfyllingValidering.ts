import { Meldekort, MeldekortDagStatus } from '@common/typer/MeldekortBruker';

import { dagStatusMedFravær } from '@components/kalender/dag-felles/dagFellesUtils.ts';

export const antallDagerValidering = (
    brukersMeldekort: Meldekort,
    meldekortUtfylling: Meldekort,
) => {
    const dager = meldekortUtfylling?.dager || [];
    const { IKKE_RETT_TIL_TILTAKSPENGER, IKKE_BESVART, DELTATT_MED_LØNN_I_TILTAKET } =
        MeldekortDagStatus;

    const antallDagerBesvart = dager?.filter(
        (dag) => dag.status !== IKKE_BESVART && dag.status !== IKKE_RETT_TIL_TILTAKSPENGER,
    ).length;

    const alleDagerGirRett =
        dager.filter((dag) => dag.status === MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER)
            .length < 1;

    const harForMangeDagerBesvart = antallDagerBesvart > brukersMeldekort?.maksAntallDager;
    const harForFaDagerBesvart =
        antallDagerBesvart < brukersMeldekort?.maksAntallDager && alleDagerGirRett;
    const harIngenDagerBesvart = antallDagerBesvart === 0;
    const harIngenDagerMedFravær =
        dager?.filter((dag) => dagStatusMedFravær.has(dag.status)).length === 0;
    const harIngenDagerMedLønn =
        dager?.filter((dag) => dag.status === DELTATT_MED_LØNN_I_TILTAKET).length === 0;

    return {
        antallDagerBesvart,
        harForMangeDagerBesvart,
        harIngenDagerBesvart,
        harIngenDagerMedFravær,
        harIngenDagerMedLønn,
        harForFaDagerBesvart,
    };
};
