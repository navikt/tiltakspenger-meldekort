import { Alert } from '@navikt/ds-react';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { PageHeader } from '@components/page-header/PageHeader.tsx';

import style from './Steg4_Kvittering.module.css';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling.ts';
import { Undertekst } from '@components/page-header/Undertekst.tsx';
import React from 'react';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper.tsx';

export const Steg4_Kvittering = () => {
    const { getUndertekster } = useMeldekortUtfylling();
    const undertekster = getUndertekster();

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
                <InternLenke path={'/'}>
                    <Tekst id={'kvitteringTilbake'} />
                </InternLenke>
            </div>
        </MeldekortStegWrapper>
    );
};
