import { Alert } from '@navikt/ds-react';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { PageHeader } from '@components/page-header/PageHeader.tsx';

import style from './Steg4_Kvittering.module.css';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling.ts';
import { Undertekst } from '@components/page-header/Undertekst.tsx';
import React, { useEffect, useRef } from 'react';

export const Steg4_Kvittering = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { getUndertekster } = useMeldekortUtfylling();
    const undertekster = getUndertekster();

    useEffect(() => {
        scrollTo(0, 0);
        ref.current?.focus();
    }, []);

    return (
        <div ref={ref} tabIndex={-1} className={style.wrapper}>
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
        </div>
    );
};
