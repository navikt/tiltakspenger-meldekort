import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { MeldekortBruker } from '@common/typer/meldekort-bruker.ts';
import { ForsideBrukerMedSak } from '@components/forside/ForsideBrukerMedSak.tsx';
import { ForsideBrukerUtenSak } from '@components/forside/ForsideBrukerUtenSak.tsx';

type Props = {
    meldekortBruker: MeldekortBruker;
};

export const Forside = ({ meldekortBruker }: Props) => {
    return (
        <>
            <PageHeader tekstId={'sideTittel'} />
            {meldekortBruker.harSak ? (
                <ForsideBrukerMedSak meldekortBruker={meldekortBruker} />
            ) : (
                <ForsideBrukerUtenSak meldekortBruker={meldekortBruker} />
            )}
        </>
    );
};
