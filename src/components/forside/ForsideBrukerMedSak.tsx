import { MeldekortBrukerMedSak } from '@common/typer/meldekort-bruker.ts';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling.ts';
import { useEffect } from 'react';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { IkkeKlarTilUtfylling } from '@components/forside/ikke-klar-til-utfylling/IkkeKlarTilUtfylling.tsx';
import { TilUtfylling } from '@components/forside/til-utfylling/TilUtfylling.tsx';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { getPath, siteRoutes } from '@common/siteRoutes.ts';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { MeldekortStatus } from '@common/typer/meldekort-utfylling.ts';

import style from './Forside.module.css';
import { GuidePanel } from '@navikt/ds-react';

type Props = {
    meldekortBruker: MeldekortBrukerMedSak;
};

export const ForsideBrukerMedSak = ({ meldekortBruker }: Props) => {
    const { nesteMeldekort } = meldekortBruker;

    const { setMeldekortUtfylling } = useMeldekortUtfylling();

    useEffect(() => {
        if (nesteMeldekort) {
            setMeldekortUtfylling(nesteMeldekort);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nesteMeldekort]);

    return (
        <>
            <GuidePanel className={style.guide}>
                <Tekst id={'deltattHjelpGuideTekst'} />
            </GuidePanel>
            <TekstSegmenter id={'forsideIngress'} spacing={true} />
            {nesteMeldekort?.status === MeldekortStatus.KAN_UTFYLLES ? (
                <TilUtfylling nesteMeldekort={nesteMeldekort} />
            ) : (
                <IkkeKlarTilUtfylling meldekortBruker={meldekortBruker} />
            )}
            <InternLenke path={getPath(siteRoutes.alle)} className={style.tidligere}>
                <Tekst id={'forsideSeOgEndre'} />
            </InternLenke>
        </>
    );
};
