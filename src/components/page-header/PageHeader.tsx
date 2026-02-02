import React, { useEffect } from 'react';
import { Heading } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { TekstId } from '@tekster/typer.ts';

import style from './PageHeader.module.css';

import { useSpråk } from '@context/språk/useSpråk.ts';

type Props = {
    tekstId: TekstId;
    underTekst?: React.ReactNode;
};

export const PageHeader = ({ tekstId, underTekst }: Props) => {
    const { getTekstForSpråk } = useSpråk();

    useEffect(() => {
        document.title = `${getTekstForSpråk({ id: tekstId })} - nav.no`;
    }, [tekstId, getTekstForSpråk]);

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
