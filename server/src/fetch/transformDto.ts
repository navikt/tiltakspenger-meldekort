import { Meldekort } from '@common/typer/MeldekortBruker';
import { MeldekortBruker, MeldekortBrukerDTO } from '@common/typer/meldekort-bruker';
import { AlleMeldekortDTO, AlleMeldekortProps } from '@common/typer/alle-meldekort';

export const tilMeldekortUtfylling = (meldekortDto: Meldekort): Meldekort => {
    return meldekortDto;
};

export const tilMeldekortBruker = (dto: MeldekortBrukerDTO): MeldekortBruker => {
    return dto.harSak
        ? {
              harSak: true,
              arenaMeldekortStatus: dto.arenaMeldekortStatus,
              nesteMeldekort: dto.nesteMeldekort
                  ? tilMeldekortUtfylling(dto.nesteMeldekort)
                  : undefined,
              forrigeMeldekort: dto.forrigeMeldekort
                  ? tilMeldekortUtfylling(dto.forrigeMeldekort)
                  : undefined,
              harSoknadUnderBehandling: dto.harSoknadUnderBehandling,
          }
        : {
              harSak: false,
              arenaMeldekortStatus: dto.arenaMeldekortStatus,
          };
};

export const tilAlleMeldekortProps = (dto: AlleMeldekortDTO): AlleMeldekortProps => {
    return {
        meldekort: dto.meldekort.map(tilMeldekortUtfylling),
        arenaMeldekortStatus: dto.bruker.arenaMeldekortStatus,
    };
};
