import { MeldekortBrukerMedSak } from '@common/typer/meldekort-bruker.ts';
import React from 'react';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { IkkeKlarTilUtfylling } from '@components/forside/ikke-klar-til-utfylling/IkkeKlarTilUtfylling.tsx';
import { TilUtfylling } from '@components/forside/til-utfylling/TilUtfylling.tsx';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { getPath, siteRoutes } from '@common/siteRoutes.ts';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { GuidePanel } from '@navikt/ds-react';
import { MeldekortStatus } from '@common/typer/MeldekortBruker';
import { EksternLenke } from '@components/lenke/EksternLenke.tsx';
import { getTekst } from '@tekster/tekster.ts';

import style from './Forside.module.css';

type Props = {
    meldekortBruker: MeldekortBrukerMedSak;
};

export const ForsideBrukerMedSak = ({ meldekortBruker }: Props) => {
    const { nesteMeldekort } = meldekortBruker;

    return (
        <>
            <GuidePanel className={style.guide}>
                <EksternLenke href={'https://www.nav.no/kontaktoss'}>
                    {getTekst({ id: 'forsideGuidePanelLenkeTekst' })}
                </EksternLenke>
            </GuidePanel>

            <TekstSegmenter id={'forsideIngress'} spacing={true} />
            {nesteMeldekort?.status === MeldekortStatus.KAN_UTFYLLES ? (
                <TilUtfylling nesteMeldekort={nesteMeldekort} />
            ) : (
                <IkkeKlarTilUtfylling meldekortBruker={meldekortBruker} />
            )}
            <InternLenke path={getPath(siteRoutes.innsendte)} className={style.tidligere}>
                <Tekst id={'forsideSeOgEndre'} />
            </InternLenke>
        </>
    );
};
