import { MeldekortDagStatus } from '@typer/meldekort-utfylling';

import style from './dagFelles.module.css';

export const meldekortStatusTilStyle: Record<MeldekortDagStatus, string> = {
    [MeldekortDagStatus.Deltatt]: style.deltatt,
    [MeldekortDagStatus.FraværSyk]: style.syk,
    [MeldekortDagStatus.FraværSyktBarn]: style.syktBarn,
    [MeldekortDagStatus.FraværAnnet]: style.annet,
    [MeldekortDagStatus.IkkeDeltatt]: style.ikkeDeltatt,
};
