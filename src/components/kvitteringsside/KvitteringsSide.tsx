import { Alert } from '@navikt/ds-react';
import { Lenke } from '@components/lenke/Lenke';
import { TekstParagrafer } from '@components/tekst/TekstParagrafer';

import style from './KvitteringsSide.module.css';

export const KvitteringsSide = () => {
    return (
        <div>
            <Alert variant={'success'} className={style.kvittering}>
                <TekstParagrafer id={'kvittering'} />
            </Alert>
            <Lenke href={'/'}>{'Tilbake'}</Lenke>
        </div>
    );
};
