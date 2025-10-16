import { Meldekort } from '@common/typer/MeldekortBruker';
import { MeldekortBruker, MeldekortBrukerDTO } from '@common/typer/meldekort-bruker';
import { InnsendteMeldekortDTO, InnsendteMeldekortProps } from '@common/typer/alle-meldekort';

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
              kanSendeInnHelgForMeldekort: dto.kanSendeInnHelgForMeldekort,
          }
        : {
              harSak: false,
              arenaMeldekortStatus: dto.arenaMeldekortStatus,
          };
};

export const tilInnsendteMeldekortProps = (dto: InnsendteMeldekortDTO): InnsendteMeldekortProps => {
    return {
        meldekort: dto.meldekort.map(tilMeldekortUtfylling),
        arenaMeldekortStatus: dto.bruker.arenaMeldekortStatus,
        kanSendeInnHelgForMeldekort: dto.bruker.harSak
            ? dto.bruker.kanSendeInnHelgForMeldekort
            : false,
    };
};
