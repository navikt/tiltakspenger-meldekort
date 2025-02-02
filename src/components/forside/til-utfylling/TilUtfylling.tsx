import { Button, Checkbox } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { useEffect, useState } from 'react';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { classNames } from '@utils/classNames.ts';

import style from './TilUtfylling.module.css';

type Props = {
    nesteMeldekortId: string;
};

export const TilUtfylling = ({ nesteMeldekortId }: Props) => {
    const [harBekreftet, setHarBekreftet] = useState(false);

    useEffect(() => {
        setHarBekreftet(false);
    }, [])

    return (
        <>
            <Checkbox onChange={() => setHarBekreftet(!harBekreftet)}>
                <Tekst id={'forsideBekrefter'} />
            </Checkbox>
            <Button
                className={classNames(style.knapp)}
                variant={'primary'}
                as={InternLenke}
                disabled={!harBekreftet}
                path={`/${nesteMeldekortId}/fyll-ut`}
            >
                <Tekst id={'neste'} />
            </Button>
        </>
    );
};
