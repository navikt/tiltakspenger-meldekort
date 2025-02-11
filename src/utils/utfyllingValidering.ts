import {
    MeldekortDagStatus,
    MeldekortUtfylling,
} from '../../commonSrc/typer/meldekort-utfylling.ts';

export const antallDagerValidering = (meldekortUtfylling: MeldekortUtfylling) => {
    const antallDagerRegistrert = meldekortUtfylling.dager.filter(
        (dag) => dag.status !== MeldekortDagStatus.IkkeRegistrert
    ).length;

    const harForMangeDagerRegistrert = antallDagerRegistrert > meldekortUtfylling.maksAntallDager;

    return {
        antallDagerRegistrert,
        harForMangeDagerRegistrert,
    };
};
