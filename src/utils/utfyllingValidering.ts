import {
    MeldekortDagStatus,
    MeldekortUtfylling,
} from '../../commonSrc/typer/meldekort-utfylling.ts';
import { dagStatusMedFravær } from '@components/kalender/dag-felles/dagFellesUtils.ts';

export const antallDagerValidering = (meldekortUtfylling: MeldekortUtfylling) => {
    const antallDagerRegistrert = meldekortUtfylling.dager.filter(
        (dag) => dag.status !== MeldekortDagStatus.IkkeRegistrert
    ).length;

    const harForMangeDagerRegistrert = antallDagerRegistrert > meldekortUtfylling.maksAntallDager;

    const harIngenDagerRegistrert = antallDagerRegistrert === 0;

    const harIngenDagerMedDeltatt = meldekortUtfylling.dager.filter(
        (dag) => dag.status !== MeldekortDagStatus.Deltatt
    );

    const harIngenDagerMedFravær = meldekortUtfylling.dager.filter((dag) =>
        dagStatusMedFravær.has(dag.status)
    );

    return {
        antallDagerRegistrert,
        harForMangeDagerRegistrert,
        harIngenDagerRegistrert,
        harIngenDagerMedDeltatt,
        harIngenDagerMedFravær,
    };
};
