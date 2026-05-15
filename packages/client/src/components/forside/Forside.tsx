import { PageHeader } from '@components/page-header/PageHeader';
import { MeldekortBruker } from '@meldekort/common/typer/meldekort-bruker';
import { ForsideBrukerMedSak } from '@components/forside/ForsideBrukerMedSak';
import { ForsideBrukerUtenSak } from '@components/forside/ForsideBrukerUtenSak';
import { DemoVarsel } from '@components/demo/DemoVarsel';

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
