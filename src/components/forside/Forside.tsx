import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { MeldekortBruker } from '@common/typer/meldekort-bruker.ts';
import { ForsideBrukerMedSak } from '@components/forside/ForsideBrukerMedSak.tsx';
import { ForsideBrukerUtenSak } from '@components/forside/ForsideBrukerUtenSak.tsx';
import { DemoVarsel } from '@components/demo/DemoVarsel.tsx';

type Props = {
    meldekortBruker: MeldekortBruker;
};

export const Forside = ({ meldekortBruker }: Props) => {
    return (
        <>
            <DemoVarsel />
            <PageHeader tekstId={'sideTittel'} />
            {meldekortBruker.harSak ? (
                <ForsideBrukerMedSak meldekortBruker={meldekortBruker} />
            ) : (
                <ForsideBrukerUtenSak meldekortBruker={meldekortBruker} />
            )}
        </>
    );
};
