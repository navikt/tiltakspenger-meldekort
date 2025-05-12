import { MeldekortBrukerMedSak } from '@common/typer/meldekort-bruker.ts';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling.ts';
import { useEffect } from 'react';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { IkkeKlarTilUtfylling } from '@components/forside/ikke-klar-til-utfylling/IkkeKlarTilUtfylling.tsx';
import { TilUtfylling } from '@components/forside/til-utfylling/TilUtfylling.tsx';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { getPath, siteRoutes } from '@common/siteRoutes.ts';
import { Tekst } from '@components/tekst/Tekst.tsx';

import style from './Forside.module.css';

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
            <TekstSegmenter id={'forsideIngress'} spacing={true} />
            {nesteMeldekort ? (
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
