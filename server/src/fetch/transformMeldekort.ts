import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling';
import { MeldekortTilBrukerDTO } from '@common/typer/meldekort-dto';

export const tilMeldekortUtfylling = (meldekortDto: MeldekortTilBrukerDTO): MeldekortUtfylling => {
    return {
        id: meldekortDto.id,
        periode: {
            fraOgMed: meldekortDto.fraOgMed,
            tilOgMed: meldekortDto.tilOgMed,
        },
        uke1: meldekortDto.uke1,
        uke2: meldekortDto.uke2,
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
