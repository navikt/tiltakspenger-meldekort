import { Heading } from '@navikt/ds-react';

import style from './PageHeader.module.css';

export const PageHeader = () => {
    return (
        <div className={style.wrapper}>
            <Heading size={'xlarge'} className={style.header}>
                {'Meldekort for tiltakspenger'}
            </Heading>
        </div>
    );
};
