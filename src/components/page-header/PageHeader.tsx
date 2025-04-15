import React, { useEffect } from 'react';
import { Heading } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';

import style from './PageHeader.module.css';
import { getTekst } from '@tekster/tekster.ts';
import { TekstId } from '@tekster/typer.ts';

type Props = {
    tekstId: TekstId;
    underTekst?: React.ReactNode;
};

export const PageHeader = ({ tekstId, underTekst }: Props) => {
    useEffect(() => {
        document.title = `${getTekst({ id: tekstId })} - nav.no`;
    }, [tekstId]);

    return (
        <div className={style.wrapper}>
            <Heading size={'xlarge'} className={style.header}>
                <Tekst id={tekstId} />
            </Heading>
            {underTekst}
            <div className={style.separator} />
        </div>
    );
};
