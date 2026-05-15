import { MeldekortBrukerMedSak } from '@meldekort/common/typer/meldekort-bruker';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter';
import { IkkeKlarTilUtfylling } from '@components/forside/ikke-klar-til-utfylling/IkkeKlarTilUtfylling';
import { TilUtfylling } from '@components/forside/til-utfylling/TilUtfylling';
import { InternLenke } from '@components/lenke/InternLenke';
import { getPath, siteRoutePaths } from '@meldekort/common/siteRoutePaths';
import { Tekst } from '@components/tekst/Tekst';
import { GuidePanel } from '@navikt/ds-react';
import { MeldekortStatus } from '@meldekort/common/typer/MeldekortBruker';
import { EksternLenke } from '@components/lenke/EksternLenke';
import { useSpråk } from '@context/språk/useSpråk';

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
