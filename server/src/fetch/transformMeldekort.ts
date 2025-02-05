import { MeldekortUtfylling } from '@client/typer/meldekort-utfylling';
import { MeldekortTilBrukerDTO } from '@client/typer/meldekort-dto';

export const tilMeldekortUtfylling = (
    meldekortDto: MeldekortTilBrukerDTO
): MeldekortUtfylling => {
    return {
        id: meldekortDto.id,
        periode: {
            fraOgMed: meldekortDto.fraOgMed,
            tilOgMed: meldekortDto.tilOgMed,
        },
        maksAntallDager: meldekortDto.maksAntallDager,
        innsendt: meldekortDto.innsendt ?? null,
        dager: meldekortDto.dager.map((dag, index) => ({
            status: dag.status,
            dato: dag.dag,
            harRett: dag.harRett,
            index,
        })),
    };
};
