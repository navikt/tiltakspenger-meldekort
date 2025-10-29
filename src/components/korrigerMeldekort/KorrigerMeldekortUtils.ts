import { MeldekortDag, MeldekortDagStatus } from '@common/typer/MeldekortBruker';
import { getTekst } from '@tekster/tekster.ts';

export const korrigerMeldekortStatusTextMapper = (status: MeldekortDagStatus): string => {
    switch (status) {
        case MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET:
            return getTekst({ id: 'statusDeltattMedLønn' });
        case MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET:
            return getTekst({ id: 'statusDeltatt' });
        case MeldekortDagStatus.FRAVÆR_SYK:
            return getTekst({ id: 'statusSyk' });
        case MeldekortDagStatus.FRAVÆR_SYKT_BARN:
            return getTekst({ id: 'statusSyktBarn' });
        case MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV:
            return getTekst({ id: 'statusGodkjentFravær' });
        case MeldekortDagStatus.FRAVÆR_ANNET:
            return getTekst({ id: 'statusAnnetFravær' });
        case MeldekortDagStatus.IKKE_BESVART:
            return getTekst({ id: 'statusIkkeBesvart' });
        case MeldekortDagStatus.IKKE_TILTAKSDAG:
            return getTekst({ id: 'statusIkkeTiltaksdag' });
        case MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER:
            return getTekst({ id: 'ikkeRett' });
    }
};

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
