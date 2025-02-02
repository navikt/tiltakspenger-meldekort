import { Alert } from '@navikt/ds-react';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { TekstParagrafer } from '@components/tekst/TekstParagrafer';

import style from './KvitteringsSide.module.css';

export const KvitteringsSide = () => {
    return (
        <div>
            <Alert variant={'success'} className={style.kvittering}>
                <TekstParagrafer id={'kvittering'} />
            </Alert>
            <InternLenke path={'/'}>{'Tilbake'}</InternLenke>
        </div>
    );
};
