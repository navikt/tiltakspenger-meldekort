import { MeldekortUtfylling } from '@client/typer/meldekort-utfylling';
import { MeldekortMottakDto } from '@client/typer/meldekort-dto';

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
