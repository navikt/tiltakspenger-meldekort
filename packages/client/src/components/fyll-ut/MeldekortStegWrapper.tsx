import React, { useEffect, useRef } from 'react';
import { Heading, Stepper } from '@navikt/ds-react';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { STEG_REKKEFOLGE } from '@meldekort/common/typer/BrukersMeldekortUtfylling';
import { getPathForMeldekortSteg } from '@meldekort/common/siteRoutePaths';
import { useRouting } from '@routing/useRouting';
import { PageHeader } from '@components/page-header/PageHeader';
import { Undertekst } from '@components/page-header/Undertekst';
import { meldekortStegTilTekstId } from '@components/kalender/meldekortDagUtils';
import { useSpråk } from '@context/språk/useSpråk';
import { TidsstyrteMeldekortVarsler } from '@components/fyll-ut/varsler/TidsstyrteMeldekortVarsler';

import style from './MeldekortStegWrapper.module.css';

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

    if (!meldekortUtfylling) {
        return null;
    }

    const { id } = meldekortUtfylling;
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
                <>
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

                    <TidsstyrteMeldekortVarsler
                        meldekort={meldekortUtfylling}
                        className={style.varsler}
                    />
                </>
            )}

            <Heading level={'2'} size={'large'} className={style.stegTitle}>
                {getTekstForSpråk({ id: meldekortStegTilTekstId[meldekortSteg] })}
            </Heading>

            {children}
        </div>
    );
};
