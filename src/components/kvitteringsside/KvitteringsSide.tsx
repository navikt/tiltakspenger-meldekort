import { Alert } from '@navikt/ds-react';
import { Lenke } from '@components/lenke/Lenke';

import style from './KvitteringsSide.module.css'

export const KvitteringsSide = () => {
    return (
        <div>
            <Alert variant={'success'} className={style.kvittering}>
                {'Meldekortet ble sendt inn. Her kommer det en kvittering på innsendingen!'}
            </Alert>
            <Lenke href={'/'}>{'Tilbake'}</Lenke>
        </div>
    );
};
