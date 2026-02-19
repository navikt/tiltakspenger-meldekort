import React from 'react';
import { Tekst } from '@components/tekst/Tekst';
import style from './TekstMedLenke.module.css';
import { TekstId } from '@tekster/typer.ts';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { EksternLenke } from '@components/lenke/EksternLenke.tsx';

import { useSpråk } from '@context/språk/useSpråk.ts';

type Props = {
    tekst: TekstId;
    tekstLenke: TekstId;
    lenke: string;
    lenkeType?: 'intern' | 'ekstern';
};

export const TekstMedLenke = ({ tekst, tekstLenke, lenke, lenkeType }: Props) => {
    const { getTekstForSpråk, valgtSpråk } = useSpråk();
    return (
        <div className={style.wrapper}>
            <Tekst id={tekst} />
            {lenkeType === 'intern' ? (
                <InternLenke path={lenke} locale={valgtSpråk}>
                    {getTekstForSpråk({ id: tekstLenke })}
                </InternLenke>
            ) : (
                <EksternLenke href={lenke}>{getTekstForSpråk({ id: tekstLenke })}</EksternLenke>
            )}
        </div>
    );
};
