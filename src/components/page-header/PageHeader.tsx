import { Heading } from '@navikt/ds-react';
import { Tekst } from '@/src/components/tekst/Tekst';

import style from './PageHeader.module.css';

export const PageHeader = () => {
    return (
        <div className={style.wrapper}>
            <Heading size={'xlarge'} className={style.header}>
                <Tekst id={'meldekortTittel'} />
            </Heading>
        </div>
    );
};
