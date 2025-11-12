import { MeldekortDagStatus } from '@common/typer/MeldekortBruker';

import { MeldekortTilKorrigeringUtfylling } from '@common/typer/KorrigerMeldekort.ts';

export const harDagerSomIkkeGirRett = (m: MeldekortTilKorrigeringUtfylling) =>
    m.dager.some((dag) => dag.status === MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER);
