import { MeldekortDagStatus } from '@common/typer/MeldekortBruker';
import { MeldeperiodeForPeriodeResponse } from '@common/typer/Meldeperiode';

export const harDagerSomIkkeGirRett = (m: MeldeperiodeForPeriodeResponse) =>
    m.dager.some((dag) => dag.status === MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER);
