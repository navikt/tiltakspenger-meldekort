import React, { useState } from 'react';
import style from './Steg3_Deltakelse.module.css';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Alert, BodyLong } from '@navikt/ds-react';
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

type SSRProps = {
    brukersMeldekort: Meldekort;
};

export const Steg3_Deltakelse = ({ brukersMeldekort }: SSRProps) => {
    const { navigate } = useRouting();
    const { meldekortUtfylling, setMeldekortSteg } = useMeldekortUtfylling();
    const [feil, setFeil] = useState<TekstId | null>(null);

    useInitMeldekortSteg(brukersMeldekort, 'deltatt');

    if (!meldekortUtfylling) return;

    const { harForMangeDagerBesvart, harIngenDagerBesvart } = antallDagerValidering(
        brukersMeldekort,
        meldekortUtfylling,
    );

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
                {feil && (
                    <Alert variant={'error'} className={style.varsel}>
                        <Tekst id={feil} />
                    </Alert>
                )}
                <MeldekortStegButtons
                    onNesteClick={() => {
                        if (harForMangeDagerBesvart) {
                            setFeil('forMangeDagerEnkel');
                            return false;
                        }
                        if (harIngenDagerBesvart) {
                            setFeil('ingenDagerFyltUt');
                            return false;
                        }
                        setFeil(null);
                        setMeldekortSteg('oppsummering');
                        navigate(getPathForMeldekortSteg('oppsummering', meldekortUtfylling.id));
                        return true;
                    }}
                    onForrigeClick={() => {
                        setMeldekortSteg('lønn');
                        navigate(getPath(siteRoutes.lønn));
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
