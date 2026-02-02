import { ConfirmationPanel } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import React, { useEffect, useState } from 'react';
import { FlashingButton } from '@components/flashing-button/FlashingButton.tsx';
import { useRouting } from '@routing/useRouting.ts';
import { getPath, siteRoutePaths } from '@common/siteRoutePaths.ts';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling.ts';
import { Meldekort } from '@common/typer/MeldekortBruker.ts';

import style from './TilUtfylling.module.css';

type Props = {
    nesteMeldekort: Meldekort;
};

export const TilUtfylling = ({ nesteMeldekort }: Props) => {
    const [harBekreftet, setHarBekreftet] = useState(false);
    const [visFeil, setVisFeil] = useState(false);
    const { setMeldekortSteg, setMeldekortUtfylling } = useMeldekortUtfylling();

    const { navigate } = useRouting();

    useEffect(() => {
        setMeldekortUtfylling(nesteMeldekort);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nesteMeldekort]);

    return (
        <>
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
                    navigate(getPath(siteRoutePaths.fravær, { meldekortId: nesteMeldekort.id }));
                    return true;
                }}
            >
                <Tekst id={'startUtfylling'} />
            </FlashingButton>
        </>
    );
};
