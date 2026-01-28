import { Heading, ReadMore } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';

import style from './FraværHjelp.module.css';

import { useSpråk } from '@context/språk/useSpråk.ts';

export const FraværHjelp = () => {
    const { getTeksterForSpråk } = useSpråk();

    return (
        <>
            <Heading size={'medium'} level={'2'} className={style.header}>
                <Tekst id={'fraværHjelpTittel'} />
            </Heading>
            <TekstSegmenter id={'fraværHjelpIngress'} />
            <ReadMore
                header={getTeksterForSpråk({ id: 'fraværHjelpLesMerSyk' })}
                className={style.lesMer}
            >
                <ul>
                    {getTeksterForSpråk({ id: 'fraværHjelpLesMerSykListe' }).map((tekst) => (
                        <li key={tekst}>{tekst}</li>
                    ))}
                </ul>
            </ReadMore>
            <ReadMore
                header={getTeksterForSpråk({ id: 'fraværHjelpLesMerSyktBarn' })}
                className={style.lesMer}
            >
                <ul>
                    {getTeksterForSpråk({ id: 'fraværHjelpLesMerSyktBarnListe' }).map((tekst) => (
                        <li key={tekst}>{tekst}</li>
                    ))}
                </ul>
            </ReadMore>
            <ReadMore
                header={getTeksterForSpråk({ id: 'fraværHjelpLesMerFraværGodkjent' })}
                className={style.lesMer}
            >
                <ul>
                    {getTeksterForSpråk({
                        id: 'fraværHjelpLesMerFraværGodkjentListeStart',
                    }).map((tekst) => (
                        <li key={tekst}>{tekst}</li>
                    ))}
                    <ul>
                        {getTeksterForSpråk({
                            id: 'fraværHjelpLesMerFraværGodkjentListeÅrsaker',
                        }).map((tekst) => (
                            <li key={tekst}>{tekst}</li>
                        ))}
                    </ul>
                    {getTeksterForSpråk({
                        id: 'fraværHjelpLesMerFraværGodkjentListeSlutt',
                    }).map((tekst) => (
                        <li key={tekst}>{tekst}</li>
                    ))}
                </ul>
            </ReadMore>
            <ReadMore
                header={getTeksterForSpråk({ id: 'fraværHjelpLesMerFraværAnnet' })}
                className={style.lesMer}
            >
                <ul>
                    {getTeksterForSpråk({
                        id: 'fraværHjelpLesMerFraværAnnetListe',
                    }).map((tekst) => (
                        <li key={tekst}>{tekst}</li>
                    ))}
                </ul>
            </ReadMore>
        </>
    );
};
