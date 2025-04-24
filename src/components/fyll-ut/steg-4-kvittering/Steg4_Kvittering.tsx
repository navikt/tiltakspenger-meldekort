import React, { useEffect } from 'react';
import style from './Steg4_Kvittering.module.css';
import { Alert } from '@navikt/ds-react';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling.ts';
import { Undertekst } from '@components/page-header/Undertekst.tsx';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper.tsx';
import { getPath, siteRoutes } from '@common/siteRoutes.ts';
import { MeldekortStatus, MeldekortUtfylling } from '@common/typer/meldekort-utfylling.ts';

type SSRProps = {
    meldekort: MeldekortUtfylling;
};

export const Steg4_Kvittering = ({ meldekort }: SSRProps) => {
    const {
        meldekortUtfylling,
        setMeldekortUtfylling,
        getUndertekster,
        redirectHvisFeilSteg,
        redirectHvisMeldekortErInnsendt,
    } = useMeldekortUtfylling();
    const undertekster = getUndertekster();

    useEffect(() => {
        redirectHvisMeldekortErInnsendt(meldekort, meldekortUtfylling, 'kvittering');
        // Oppdaterer lokal state etter utfylling sånn at en navigasjon tilbake rett etter innsending
        // vil føre til en redirect. Vi kan ikke oppdatere staten i samme komponent som gjør POST-kallet
        // for det vil føre til en umiddelbar redirect til forsiden.
        if (meldekortUtfylling && meldekortUtfylling?.status !== MeldekortStatus.INNSENDT) {
            setMeldekortUtfylling({ ...meldekortUtfylling, status: MeldekortStatus.INNSENDT });
        }
    }, [meldekort, meldekortUtfylling, redirectHvisMeldekortErInnsendt, setMeldekortUtfylling]);

    useEffect(() => {
        redirectHvisFeilSteg('kvittering');
    }, [redirectHvisFeilSteg]);

    return (
        <MeldekortStegWrapper>
            <PageHeader
                tekstId={'kvitteringTittel'}
                underTekst={
                    <div className={style.undertekstWrapper}>
                        <Undertekst tekst={undertekster.ukerTekst} weight={'semibold'} />
                        <Undertekst tekst={undertekster.datoerTekst} />
                    </div>
                }
            />
            <div>
                <Alert variant={'success'} className={style.kvittering}>
                    <TekstSegmenter id={'kvittering'} />
                </Alert>
                <InternLenke path={getPath(siteRoutes.forside)}>
                    <Tekst id={'kvitteringTilbake'} />
                </InternLenke>
            </div>
        </MeldekortStegWrapper>
    );
};
