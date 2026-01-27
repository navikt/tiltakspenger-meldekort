import { Heading, ReadMore } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { getTekster } from '@tekster/tekster.ts';

import style from './FraværHjelp.module.css';
import { useValgtSpråk } from '@context/SpråkvelgerContext.tsx';

export const FraværHjelp = () => {
    const { valgtSpråk } = useValgtSpråk();

    return (
        <>
            <Heading size={'medium'} level={'2'} className={style.header}>
                <Tekst id={'fraværHjelpTittel'} />
            </Heading>
            <TekstSegmenter id={'fraværHjelpIngress'} locale={valgtSpråk} />
            <ReadMore
                header={getTekster({ id: 'fraværHjelpLesMerSyk', locale: valgtSpråk })}
                className={style.lesMer}
            >
                <ul>
                    {getTekster({ id: 'fraværHjelpLesMerSykListe', locale: valgtSpråk }).map(
                        (tekst) => (
                            <li key={tekst}>{tekst}</li>
                        ),
                    )}
                </ul>
            </ReadMore>
            <ReadMore
                header={getTekster({ id: 'fraværHjelpLesMerSyktBarn', locale: valgtSpråk })}
                className={style.lesMer}
            >
                <ul>
                    {getTekster({ id: 'fraværHjelpLesMerSyktBarnListe', locale: valgtSpråk }).map(
                        (tekst) => (
                            <li key={tekst}>{tekst}</li>
                        ),
                    )}
                </ul>
            </ReadMore>
            <ReadMore
                header={getTekster({ id: 'fraværHjelpLesMerFraværGodkjent', locale: valgtSpråk })}
                className={style.lesMer}
            >
                <ul>
                    {getTekster({
                        id: 'fraværHjelpLesMerFraværGodkjentListeStart',
                        locale: valgtSpråk,
                    }).map((tekst) => (
                        <li key={tekst}>{tekst}</li>
                    ))}
                    <ul>
                        {getTekster({
                            id: 'fraværHjelpLesMerFraværGodkjentListeÅrsaker',
                            locale: valgtSpråk,
                        }).map((tekst) => (
                            <li key={tekst}>{tekst}</li>
                        ))}
                    </ul>
                    {getTekster({
                        id: 'fraværHjelpLesMerFraværGodkjentListeSlutt',
                        locale: valgtSpråk,
                    }).map((tekst) => (
                        <li key={tekst}>{tekst}</li>
                    ))}
                </ul>
            </ReadMore>
            <ReadMore
                header={getTekster({ id: 'fraværHjelpLesMerFraværAnnet', locale: valgtSpråk })}
                className={style.lesMer}
            >
                <ul>
                    {getTekster({
                        id: 'fraværHjelpLesMerFraværAnnetListe',
                        locale: valgtSpråk,
                    }).map((tekst) => (
                        <li key={tekst}>{tekst}</li>
                    ))}
                </ul>
            </ReadMore>
        </>
    );
};
