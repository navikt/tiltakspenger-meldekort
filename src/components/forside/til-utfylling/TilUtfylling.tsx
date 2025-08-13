import { BodyLong, ConfirmationPanel } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { useState } from 'react';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { FlashingButton } from '@components/flashing-button/FlashingButton.tsx';
import { useRouting } from '@routing/useRouting.ts';
import { getPath, siteRoutes } from '@common/siteRoutes.ts';

import style from './TilUtfylling.module.css';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling.ts';
import { BrukersMeldekortUtfylling } from '@common/typer/BrukersMeldekortUtfylling';

type Props = {
    nesteMeldekort: BrukersMeldekortUtfylling;
};

export const TilUtfylling = ({ nesteMeldekort }: Props) => {
    const [harBekreftet, setHarBekreftet] = useState(false);
    const [visFeil, setVisFeil] = useState(false);
    const { setMeldekortSteg } = useMeldekortUtfylling();

    const { navigate } = useRouting();

    return (
        <>
            <BodyLong weight={'semibold'} size={'large'}>
                <Tekst id={'forsideTakk'} />
            </BodyLong>
            <TekstSegmenter id={'forsideOpplysninger'} spacing={true} />
            <ConfirmationPanel
                onChange={() => {
                    setVisFeil(false);
                    setHarBekreftet(!harBekreftet);
                }}
                checked={harBekreftet}
                value={harBekreftet}
                label={<Tekst id={'forsideBekrefter'} />}
                error={visFeil && <Tekst id={'forsideBekrefterFeil'} />}
            />
            <FlashingButton
                className={style.knapp}
                variant={'primary'}
                onClick={() => {
                    if (!harBekreftet) {
                        setVisFeil(true);
                        return false;
                    }
                    setMeldekortSteg('fravær');
                    navigate(getPath(siteRoutes.fravær, { meldekortId: nesteMeldekort.id }));
                    return true;
                }}
            >
                <Tekst id={'startUtfylling'} />
            </FlashingButton>
        </>
    );
};
