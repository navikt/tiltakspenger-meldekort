import React from 'react';
import { Heading } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';

import style from './PageHeader.module.css';

type Props = {
    underTekst?: React.ReactNode;
}

export const PageHeader = ({underTekst}: Props) => {
    return (
        <div className={style.wrapper}>
            <Heading size={'xlarge'} className={style.header}>
                <Tekst id={'sideTittel'} />
            </Heading>
            {underTekst}
            <div className={style.separator} />
        </div>
    );
};
