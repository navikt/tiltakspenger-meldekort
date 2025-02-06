import { BodyLong, Button, Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { useState } from 'react';
import { TekstParagrafer } from '@components/tekst/TekstParagrafer.tsx';
import { TekstId } from '@tekster/utils';
import { useNavigate } from '@routing/useNavigate.ts';

import style from './TilUtfylling.module.css';

type Props = {
    nesteMeldekortId: string;
};

export const TilUtfylling = ({ nesteMeldekortId }: Props) => {
    const [harBekreftet, setHarBekreftet] = useState(false);
    const [feilTekstId, setFeilTekstId] = useState<TekstId | null>(null);

    const navigate = useNavigate()

    return (
        <>
            <Tekst id={'forsideTakk'} as={BodyLong} weight={'semibold'} size={'large'} />
            <TekstParagrafer id={'forsideOpplysninger'} spacing={true} />
            <CheckboxGroup
                legend={''}
                hideLegend={true}
                error={feilTekstId && <Tekst id={feilTekstId} />}
            >
                <Checkbox
                    onChange={() => {
                        setFeilTekstId(null);
                        setHarBekreftet(!harBekreftet);
                    }}
                    value={harBekreftet}
                >
                    <Tekst id={'forsideBekrefter'} />
                </Checkbox>
            </CheckboxGroup>
            <Button
                className={style.knapp}
                variant={'primary'}
                onClick={() => {
                    if (!harBekreftet) {
                        setFeilTekstId('forsideBekrefterFeil');
                        return;
                    }
                    navigate(`/${nesteMeldekortId}/fyll-ut`);
                }}
            >
                <Tekst id={'neste'} />
            </Button>
        </>
    );
};
