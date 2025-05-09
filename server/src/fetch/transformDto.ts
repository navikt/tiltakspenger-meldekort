import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling';
import { MeldekortTilBrukerDTO } from '@common/typer/meldekort-dto';
import { MeldekortBruker, MeldekortBrukerDTO } from '@common/typer/meldekort-bruker';

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
        status: meldekortDto.status,
    };
};

export const tilMeldekortBruker = (dto: MeldekortBrukerDTO): MeldekortBruker => {
    return dto.harSak
        ? {
              harSak: true,
              arenaMeldekortStatus: dto.arenaMeldekortStatus,
              nesteInnsending: dto.nesteInnsending ?? undefined,
              nesteMeldekort: dto.nesteMeldekort
                  ? tilMeldekortUtfylling(dto.nesteMeldekort)
                  : undefined,
              forrigeMeldekort: dto.sisteMeldekort
                  ? tilMeldekortUtfylling(dto.sisteMeldekort)
                  : undefined,
          }
        : {
              harSak: false,
              arenaMeldekortStatus: dto.arenaMeldekortStatus,
          };
};
