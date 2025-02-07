import { BodyLong, Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { useState } from 'react';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { useNavigate } from '@routing/useNavigate.ts';
import { FlashingButton } from '@components/betinget-knapp/FlashingButton.tsx';

import style from './TilUtfylling.module.css';

type Props = {
    nesteMeldekortId: string;
};

export const TilUtfylling = ({ nesteMeldekortId }: Props) => {
    const [harBekreftet, setHarBekreftet] = useState(false);
    const [visFeil, setVisFeil] = useState(false);

    const navigate = useNavigate();

    return (
        <>
            <BodyLong weight={'semibold'} size={'large'}>
                <Tekst id={'forsideTakk'} />
            </BodyLong>
            <TekstSegmenter id={'forsideOpplysninger'} spacing={true} />
            <CheckboxGroup
                legend={''}
                hideLegend={true}
                error={visFeil && <Tekst id={'forsideBekrefterFeil'} />}
            >
                <Checkbox
                    onChange={() => {
                        setVisFeil(false);
                        setHarBekreftet(!harBekreftet);
                    }}
                    value={harBekreftet}
                >
                    <Tekst id={'forsideBekrefter'} />
                </Checkbox>
            </CheckboxGroup>
            <FlashingButton
                className={style.knapp}
                variant={'primary'}
                onClick={() => {
                    if (!harBekreftet) {
                        setVisFeil(true);
                        return false;
                    }
                    navigate(`/${nesteMeldekortId}/fyll-ut`);
                    return true;
                }}
            >
                <Tekst id={'neste'} />
            </FlashingButton>
        </>
    );
};
