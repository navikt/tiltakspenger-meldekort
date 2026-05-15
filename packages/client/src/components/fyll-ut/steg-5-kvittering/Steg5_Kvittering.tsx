import { useEffect } from 'react';
import style from './Steg5_Kvittering.module.css';
import { Alert, VStack } from '@navikt/ds-react';
import { InternLenke } from '@components/lenke/InternLenke';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter';
import { Tekst } from '@components/tekst/Tekst';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper';
import { getPath, siteRoutePaths } from '@meldekort/common/siteRoutePaths';
import { Meldekort, MeldekortStatus } from '@meldekort/common/typer/MeldekortBruker';
import useScript from '@components/fyll-ut/steg-5-kvittering/useScript';
import { useSpråk } from '@context/språk/useSpråk';

type SSRProps = {
    brukersMeldekort: Meldekort;
};

export const Steg5_Kvittering = ({ brukersMeldekort }: SSRProps) => {
    useScript(true); // UX Signals script for brukertesting
    const { meldekortUtfylling, setMeldekortUtfylling, redirectHvisMeldekortErInnsendt } =
        useMeldekortUtfylling();
    const { valgtSpråk } = useSpråk();

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
            <VStack gap="space-32">
                <div>
                    <Alert variant={'success'} className={style.kvittering}>
                        <TekstSegmenter id={'kvittering'} spacing={true} />
                    </Alert>
                    <InternLenke path={getPath(siteRoutePaths.forside)} locale={valgtSpråk}>
                        <Tekst id={'kvitteringTilbake'} />
                    </InternLenke>
                </div>
                <div
                    data-uxsignals-embed="panel-3cy829slo4"
                    style={{ paddingTop: '1rem', maxWidth: '620px' }}
                />
            </VStack>
        </MeldekortStegWrapper>
    );
};
