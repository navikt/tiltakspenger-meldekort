import React, { useEffect, useState } from 'react';
import style from './Steg3_Deltakelse.module.css';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Alert, BodyLong, BodyShort } from '@navikt/ds-react';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { Tekst } from '@components/tekst/Tekst';
import { antallDagerValidering } from '@utils/utfyllingValidering.ts';
import { DagerUtfyltTeller } from '@components/fyll-ut/dager-utfylt-teller/DagerUtfyltTeller.tsx';

import { TekstId } from '@tekster/typer.ts';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper.tsx';
import { useRouting } from '@routing/useRouting.ts';
import { getPath, getPathForMeldekortSteg, siteRoutes } from '@common/siteRoutes.ts';
import { MeldekortStegButtons } from '@components/fyll-ut/MeldekortStegButtons.tsx';
import { useInitMeldekortSteg } from '@components/fyll-ut/useInitMeldekortSteg.tsx';
import { Meldekort } from '@common/typer/MeldekortBruker';
import { InternLenke } from '@components/lenke/InternLenke';

type SSRProps = {
    brukersMeldekort: Meldekort;
};

export const Steg3_Deltakelse = ({ brukersMeldekort }: SSRProps) => {
    const { meldekortUtfylling } = useMeldekortUtfylling();

    useInitMeldekortSteg(brukersMeldekort, 'deltatt');

    if (!meldekortUtfylling) return <MeldekortEksistererIkke />;

    return (
        <DeltagelsUtfylling
            brukersMeldekort={brukersMeldekort}
            meldekortUtfylling={meldekortUtfylling}
        />
    );
};

const MeldekortEksistererIkke = () => {
    return (
        <div>
            <Alert variant={'error'}>
                <InternLenke path={getPath(siteRoutes.forside)}>
                    En feil har skjedd. Tilbake til forsiden
                </InternLenke>
            </Alert>
        </div>
    );
};

const DeltagelsUtfylling = ({
    brukersMeldekort,
    meldekortUtfylling,
}: SSRProps & { meldekortUtfylling: Meldekort }) => {
    const { navigate } = useRouting();
    const { setMeldekortSteg, setVisValideringsfeil } = useMeldekortUtfylling();

    const { harForMangeDagerBesvart, harIngenDagerBesvart, harForFaDagerBesvart } =
        antallDagerValidering(brukersMeldekort, meldekortUtfylling);

    return (
        <MeldekortStegWrapper>
            <BodyLong>
                <Tekst id={'deltattHjelpIngress'} />
            </BodyLong>
            <Kalender meldekort={meldekortUtfylling} steg={'deltatt'} />
            <DagerUtfyltTeller
                brukersMeldekort={brukersMeldekort}
                meldekortUtfylling={meldekortUtfylling}
                className={style.teller}
            />

            <div className={style.knapperOgVarsel}>
                <MeldekortStegButtons
                    onNesteClick={() => {
                        if (
                            harForFaDagerBesvart ||
                            harIngenDagerBesvart ||
                            harForMangeDagerBesvart
                        ) {
                            setVisValideringsfeil(true);
                        }

                        setMeldekortSteg('oppsummering');
                        navigate(getPathForMeldekortSteg('oppsummering', meldekortUtfylling.id));
                        return true;
                    }}
                    onForrigeClick={() => {
                        setMeldekortSteg('lønn');
                        navigate(getPathForMeldekortSteg('lønn', meldekortUtfylling.id));
                    }}
                    onAvbrytClick={() => {
                        setMeldekortSteg('fravær');
                        navigate(getPath(siteRoutes.forside));
                    }}
                />
            </div>
        </MeldekortStegWrapper>
    );
};
