import React from 'react';
import { getTekst } from '@tekster/tekster.ts';
import { Tekst } from '@components/tekst/Tekst';
import style from './TekstMedLenke.module.css';
import { TekstId } from '@tekster/typer.ts';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { EksternLenke } from '@components/lenke/EksternLenke.tsx';
import { useValgtSpråk } from '@context/SpråkvelgerContext.tsx';

type Props = {
    tekst: TekstId;
    tekstLenke: TekstId;
    lenke: string;
    lenkeType?: 'intern' | 'ekstern';
};

export const TekstMedLenke = ({ tekst, tekstLenke, lenke, lenkeType }: Props) => {
    const { valgtSpråk } = useValgtSpråk();
    return (
        <div className={style.wrapper}>
            <Tekst id={tekst} />
            {lenkeType === 'intern' ? (
                <InternLenke path={lenke}>
                    {getTekst({ id: tekstLenke, locale: valgtSpråk })}
                </InternLenke>
            ) : (
                <EksternLenke href={lenke}>
                    {getTekst({ id: tekstLenke, locale: valgtSpråk })}
                </EksternLenke>
            )}
        </div>
    );
};
