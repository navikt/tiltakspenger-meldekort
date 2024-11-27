import { MeldekortStatus, MeldekortUtfylling } from '@typer/meldekort-utfylling';
import { MeldekortInnsendingDto, MeldekortTilUtfyllingDto } from '@typer/meldekort-dto';

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
    meldekortDto: MeldekortTilUtfyllingDto
): MeldekortUtfylling => {
    return {
        id: meldekortDto.id,
        periode: {
            fraOgMed: meldekortDto.fraOgMed,
            tilOgMed: meldekortDto.tilOgMed,
        },
        status: MeldekortStatus.TilUtfylling,
        meldekortDager: meldekortDto.meldekortDager.map((dag, index) => ({
            status: dag.status,
            dato: dag.dag,
            index,
        })),
    };
};
