import { MeldekortDagStatus } from '@typer/meldekort-utfylling';

import style from './dagFellesStyle.module.css';

const meldekortStatusTilStyle: Record<MeldekortDagStatus, string> = {
    [MeldekortDagStatus.Deltatt]: style.deltatt,
    [MeldekortDagStatus.FraværSyk]: style.syk,
    [MeldekortDagStatus.FraværSyktBarn]: style.syktBarn,
    [MeldekortDagStatus.FraværAnnet]: style.annet,
    [MeldekortDagStatus.IkkeDeltatt]: style.ikkeDeltatt,
};

export const getMeldekortDagStatusStyle = (status: MeldekortDagStatus | null) => {
    return status ? meldekortStatusTilStyle[status] : style.ikkeRegistrert;
};
