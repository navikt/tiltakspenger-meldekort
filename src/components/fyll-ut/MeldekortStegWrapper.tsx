import React, { useEffect, useRef } from 'react';
import style from './MeldekortStegWrapper.module.css';
import { Heading, Stepper } from '@navikt/ds-react';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling.ts';
import { STEG_REKKEFOLGE } from '@common/typer/BrukersMeldekortUtfylling';
import { getPathForMeldekortSteg } from '@common/siteRoutePaths.ts';
import { useRouting } from '@routing/useRouting.ts';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Undertekst } from '@components/page-header/Undertekst.tsx';
import { meldekortStegTilTekstId } from '@components/kalender/dag-felles/dagFellesUtils.ts';

import { useSpråk } from '@context/språk/useSpråk.ts';

type Props = {
    children: React.ReactNode;
};

export const MeldekortStegWrapper = ({ children }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const { meldekortUtfylling, meldekortSteg, setMeldekortSteg, getUndertekster } =
        useMeldekortUtfylling();
    const { navigate } = useRouting();
    const { getTekstForSpråk } = useSpråk();

    useEffect(() => {
        scrollTo(0, 0);
        ref.current?.focus();
    }, []);

    if (!meldekortUtfylling) return null;
    const { id } = meldekortUtfylling || {};
    const undertekster = getUndertekster();

    return (
        <div ref={ref} tabIndex={-1} className={style.wrapper}>
            <PageHeader
                tekstId={'sideTittel'}
                underTekst={
                    <div className={style.undertekstWrapper}>
                        <Undertekst tekst={undertekster.ukerTekst} weight={'semibold'} />
                        <Undertekst tekst={undertekster.datoerTekst} />
                    </div>
                }
            />
            {meldekortSteg !== 'kvittering' && (
                <Stepper
                    aria-label={'Meldekort steg'}
                    activeStep={STEG_REKKEFOLGE.indexOf(meldekortSteg) + 1}
                    onStepChange={(value) => setMeldekortSteg(STEG_REKKEFOLGE[value - 1])}
                    orientation="horizontal"
                    className={style.stepper}
                >
                    <Stepper.Step
                        as="button"
                        onClick={() => navigate(getPathForMeldekortSteg('fravær', id))}
                    >
                        {getTekstForSpråk({ id: 'fraværTittel' })}
                    </Stepper.Step>
                    <Stepper.Step
                        as="button"
                        onClick={() => navigate(getPathForMeldekortSteg('lønn', id))}
                    >
                        {getTekstForSpråk({ id: 'lønnTittel' })}
                    </Stepper.Step>
                    <Stepper.Step
                        as="button"
                        onClick={() => navigate(getPathForMeldekortSteg('deltatt', id))}
                    >
                        {getTekstForSpråk({ id: 'deltattTittel' })}
                    </Stepper.Step>
                    <Stepper.Step
                        as="button"
                        onClick={() => navigate(getPathForMeldekortSteg('oppsummering', id))}
                    >
                        {getTekstForSpråk({ id: 'kvitteringTittel' })}
                    </Stepper.Step>
                </Stepper>
            )}
            <Heading level="2" size="large" className={style.stegTitle}>
                {getTekstForSpråk({ id: meldekortStegTilTekstId[meldekortSteg] })}
            </Heading>
            {children}
        </div>
    );
};
