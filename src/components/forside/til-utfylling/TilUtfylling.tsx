import { BodyLong, Button, Checkbox } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { useEffect, useState } from 'react';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { TekstParagrafer } from '@components/tekst/TekstParagrafer.tsx';

import style from './TilUtfylling.module.css';

type Props = {
    nesteMeldekortId: string;
};

export const TilUtfylling = ({ nesteMeldekortId }: Props) => {
    const [harBekreftet, setHarBekreftet] = useState(false);

    useEffect(() => {
        setHarBekreftet(false);
    }, []);

    return (
        <>
            <Tekst id={'forsideTakk'} as={BodyLong} weight={'semibold'} size={'large'} />
            <TekstParagrafer id={'forsideOpplysninger'} spacing={true} />
            <Checkbox onChange={() => setHarBekreftet(!harBekreftet)}>
                <Tekst id={'forsideBekrefter'} />
            </Checkbox>
            <Button
                className={style.knapp}
                variant={'primary'}
                as={InternLenke}
                path={`/${nesteMeldekortId}/fyll-ut`}
            >
                <Tekst id={'neste'} />
            </Button>
        </>
    );
};
