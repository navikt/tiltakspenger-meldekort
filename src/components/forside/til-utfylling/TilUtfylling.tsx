import { Button, Checkbox } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { useState } from 'react';

import style from './TilUtfylling.module.css';

export const TilUtfylling = () => {
    const [harBekreftet, setHarBekreftet] = useState(false);

    const nesteMeldekortId = 'asdf';

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
