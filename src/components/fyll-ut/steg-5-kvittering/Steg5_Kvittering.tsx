import React, { useEffect } from 'react';
import style from './Steg5_Kvittering.module.css';
import { Alert } from '@navikt/ds-react';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling.ts';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper.tsx';
import { getPath, siteRoutes } from '@common/siteRoutes.ts';
import { Meldekort, MeldekortStatus } from '@common/typer/MeldekortBruker';

type SSRProps = {
    brukersMeldekort: Meldekort;
};

export const Steg5_Kvittering = ({ brukersMeldekort }: SSRProps) => {
    const { meldekortUtfylling, setMeldekortUtfylling, redirectHvisMeldekortErInnsendt } =
        useMeldekortUtfylling();

    useEffect(() => {
        redirectHvisMeldekortErInnsendt(brukersMeldekort, meldekortUtfylling, 'kvittering');
        // Oppdaterer lokal state etter utfylling sånn at en navigasjon tilbake rett etter innsending
        // vil føre til en redirect. Vi kan ikke oppdatere staten i samme komponent som gjør POST-kallet
        // for det vil føre til en umiddelbar redirect til forsiden.
        if (meldekortUtfylling && meldekortUtfylling?.status !== MeldekortStatus.INNSENDT) {
            setMeldekortUtfylling({ ...meldekortUtfylling, status: MeldekortStatus.INNSENDT });
        }
    }, [
        brukersMeldekort,
        meldekortUtfylling,
        redirectHvisMeldekortErInnsendt,
        setMeldekortUtfylling,
    ]);

    return (
        <MeldekortStegWrapper>
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
