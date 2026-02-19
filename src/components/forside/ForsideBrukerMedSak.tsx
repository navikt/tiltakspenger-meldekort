import { MeldekortBrukerMedSak } from '@common/typer/meldekort-bruker.ts';
import React from 'react';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { IkkeKlarTilUtfylling } from '@components/forside/ikke-klar-til-utfylling/IkkeKlarTilUtfylling.tsx';
import { TilUtfylling } from '@components/forside/til-utfylling/TilUtfylling.tsx';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { getPath, siteRoutePaths } from '@common/siteRoutePaths.ts';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { GuidePanel } from '@navikt/ds-react';
import { MeldekortStatus } from '@common/typer/MeldekortBruker';
import { EksternLenke } from '@components/lenke/EksternLenke.tsx';
import { useSpråk } from '@context/språk/useSpråk.ts';

import style from './Forside.module.css';

type Props = {
    meldekortBruker: MeldekortBrukerMedSak;
};

export const ForsideBrukerMedSak = ({ meldekortBruker }: Props) => {
    const { nesteMeldekort } = meldekortBruker;
    const { getTekstForSpråk, valgtSpråk } = useSpråk();

    return (
        <>
            <GuidePanel className={style.guide}>
                <EksternLenke href={'https://www.nav.no/kontaktoss'}>
                    {getTekstForSpråk({ id: 'forsideGuidePanelLenkeTekst' })}
                </EksternLenke>
            </GuidePanel>

            <TekstSegmenter id={'forsideIngress'} spacing={true} />
            {nesteMeldekort?.status === MeldekortStatus.KAN_UTFYLLES ? (
                <TilUtfylling nesteMeldekort={nesteMeldekort} />
            ) : (
                <IkkeKlarTilUtfylling meldekortBruker={meldekortBruker} />
            )}
            <InternLenke
                path={getPath(siteRoutePaths.innsendte)}
                locale={valgtSpråk}
                className={style.tidligere}
            >
                <Tekst id={'forsideSeOgEndre'} />
            </InternLenke>
        </>
    );
};
