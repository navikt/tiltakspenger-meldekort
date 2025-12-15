import { MeldekortDag, MeldekortDagStatus } from '@common/typer/MeldekortBruker';

export const erKorrigerteDagerGyldig = (args: {
    dager: MeldekortDag[];
    antallDager: number;
    harMeldeperiodeForMeldekortDagerSomIkkeGirRett: boolean;
}) => {
    const antallGyldigeRegistrerteDager = hentGyldigeDagerFraMeldekortDager(args.dager).length;

    if (args.harMeldeperiodeForMeldekortDagerSomIkkeGirRett) {
        return antallGyldigeRegistrerteDager <= args.antallDager;
    } else {
        return antallGyldigeRegistrerteDager === args.antallDager;
    }
};

export const hentGyldigeDagerFraMeldekortDager = (dager: MeldekortDag[]) =>
    dager.filter(
        (dag) =>
            dag.status != MeldekortDagStatus.IKKE_BESVART &&
            dag.status != MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER &&
            dag.status != MeldekortDagStatus.IKKE_TILTAKSDAG,
    );
