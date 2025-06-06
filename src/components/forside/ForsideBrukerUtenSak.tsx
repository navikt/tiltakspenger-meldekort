import { Alert, Link } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { ArenaMeldekortStatus, MeldekortBrukerUtenSak } from '@common/typer/meldekort-bruker.ts';
import { appConfig } from '@common/appConfig.ts';

const { arenaUrl } = appConfig;

type Props = {
    meldekortBruker: MeldekortBrukerUtenSak;
};

export const ForsideBrukerUtenSak = ({ meldekortBruker }: Props) => {
    const { arenaMeldekortStatus } = meldekortBruker;

    return (
        <Alert variant={'info'} contentMaxWidth={false}>
            <Tekst
                id={
                    arenaMeldekortStatus === ArenaMeldekortStatus.HAR_MELDEKORT
                        ? /* Denne vises ikke i prod - skal redirecte til arena-meldekort dersom brukeren har meldekort der og ikke har sak hos oss */
                          'forsideHarArenaMeldekort'
                        : 'forsideIkkeTiltakspenger'
                }
            />
            <Link href={arenaUrl} inlineText={true}>
                <Tekst id={'forsideArenaLenke'} />
            </Link>
        </Alert>
    );
};
