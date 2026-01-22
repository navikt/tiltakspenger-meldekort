import { MeldekortDag, MeldekortDagStatus } from '@common/typer/MeldekortBruker.ts';
import { MeldekortKorrigeringTilUtfylling } from '@common/typer/KorrigerMeldekort.ts';

export enum KorrigerMeldekortFeil {
    ForMangeDager = 'ForMangeDager',
    ForFåDager = 'ForFåDager',
    IngenEndring = 'IngenEndring',
}

export type KorrigerMeldekortValideringResultat = {
    feil: Set<KorrigerMeldekortFeil>;
    antallUtfylt: number;
    maksAntallUtfylt: number;
};

export const validerMeldekortKorrigering = (
    korrigerteDager: MeldekortDag[],
    tilUtfylling: MeldekortKorrigeringTilUtfylling,
): KorrigerMeldekortValideringResultat => {
    const { maksAntallDagerForPeriode } = tilUtfylling;

    const feil = new Set<KorrigerMeldekortFeil>();

    const antallGyldigeRegistrerteDager = hentGyldigeDagerFraMeldekortDager(korrigerteDager).length;

    if (antallGyldigeRegistrerteDager > maksAntallDagerForPeriode) {
        feil.add(KorrigerMeldekortFeil.ForMangeDager);
    } else if (
        !harDagerSomIkkeGirRett(tilUtfylling) &&
        antallGyldigeRegistrerteDager !== maksAntallDagerForPeriode
    ) {
        feil.add(KorrigerMeldekortFeil.ForFåDager);
    }

    if (!korrigeringHarEndringer(korrigerteDager, tilUtfylling.dager)) {
        feil.add(KorrigerMeldekortFeil.IngenEndring);
    }

    return {
        feil: feil,
        antallUtfylt: antallGyldigeRegistrerteDager,
        maksAntallUtfylt: maksAntallDagerForPeriode,
    };
};

const hentGyldigeDagerFraMeldekortDager = (dager: MeldekortDag[]) =>
    dager.filter(
        (dag) =>
            dag.status != MeldekortDagStatus.IKKE_BESVART &&
            dag.status != MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER &&
            dag.status != MeldekortDagStatus.IKKE_TILTAKSDAG,
    );

const korrigeringHarEndringer = (
    korrigerteDager: MeldekortDag[],
    opprinneligeDager: MeldekortDag[],
): boolean => {
    return korrigerteDager.some(
        (korrigertDag, index) => korrigertDag.status !== opprinneligeDager[index].status,
    );
};

const harDagerSomIkkeGirRett = (m: MeldekortKorrigeringTilUtfylling) =>
    m.dager.some((dag) => dag.status === MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER);
