import { Button, Checkbox } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { useState } from 'react';

import style from './TilUtfylling.module.css';

type Props = {
    nesteMeldekortId: string;
};

export const TilUtfylling = ({ nesteMeldekortId }: Props) => {
    const [harBekreftet, setHarBekreftet] = useState(false);

    return (
        <>
            <Checkbox onChange={() => setHarBekreftet(!harBekreftet)}>
                <Tekst id={'forsideBekrefter'} />
            </Checkbox>
            <Button
                className={style.knapp}
                variant={'primary'}
                href={`/tiltakspenger/meldekort/periode/${nesteMeldekortId}/fyll-ut`}
                as={'a'}
                disabled={!harBekreftet}
            >
                <Tekst id={'neste'} />
            </Button>
        </>
    );
};
