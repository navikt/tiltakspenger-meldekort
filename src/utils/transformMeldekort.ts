import { MeldekortUtfylling } from '@typer/meldekort-utfylling';
import { MeldekortInnsendingDto, MeldekortMottakDto } from '@typer/meldekort-dto';

export const tilMeldekortInnsending = (meldekort: MeldekortUtfylling): MeldekortInnsendingDto => {
    return {
        id: meldekort.id,
        meldekortDager: meldekort.meldekortDager.map((dag) => ({
            status: dag.status,
            dag: dag.dato,
        })),
    };
};

export const tilMeldekortUtfylling = (
    meldekortDto: MeldekortMottakDto
): MeldekortUtfylling => {
    return {
        id: meldekortDto.id,
        periode: {
            fraOgMed: meldekortDto.fraOgMed,
            tilOgMed: meldekortDto.tilOgMed,
        },
        status: meldekortDto.status,
        innsendt: meldekortDto.innsendt ?? null,
        meldekortDager: meldekortDto.dager.map((dag, index) => ({
            status: dag.status,
            dato: dag.dag,
            index,
        })),
    };
};
