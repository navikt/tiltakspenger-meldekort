import { Heading, ReadMore } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { getTekster } from '@tekster/utils.ts';

import style from './FraværHjelp.module.css';

export const FraværHjelp = () => {
    return (
        <>
            <Heading size={'small'} level={'2'} className={style.header}>
                <Tekst id={'fraværHjelpTittel'} />
            </Heading>
            <TekstSegmenter id={'fraværHjelpIngress'} />
            <ReadMore
                header={getTekster({ id: 'fraværHjelpLesMerSyk' })}
                className={style.lesMer}
            >
                <ul>
                    {getTekster({ id: 'fraværHjelpLesMerSykListe' }).map((tekst) => (
                        <li key={tekst}>{tekst}</li>
                    ))}
                </ul>
            </ReadMore>
            <ReadMore
                header={getTekster({ id: 'fraværHjelpLesMerSyktBarn' })}
                className={style.lesMer}
            >
                <ul>
                    {getTekster({ id: 'fraværHjelpLesMerSyktBarnListe' }).map((tekst) => (
                        <li key={tekst}>{tekst}</li>
                    ))}
                </ul>
            </ReadMore>
            <ReadMore
                header={getTekster({ id: 'fraværHjelpLesMerFraværGodkjent' })}
                className={style.lesMer}
            >
                <ul>
                    {getTekster({ id: 'fraværHjelpLesMerFraværGodkjentListeStart' }).map((tekst) => (
                        <li key={tekst}>{tekst}</li>
                    ))}
                    <ul>
                        {getTekster({ id: 'fraværHjelpLesMerFraværGodkjentListeÅrsaker' }).map((tekst) => (
                            <li key={tekst}>{tekst}</li>
                        ))}
                    </ul>
                    <li>
                        {getTekster({id: 'fraværHjelpLesMerFraværGodkjentListeSlutt'})}
                    </li>
                </ul>
            </ReadMore>
            <ReadMore
                header={getTekster({ id: 'fraværHjelpLesMerFraværAnnet' })}
                className={style.lesMer}
            >
                <ul>
                    {getTekster({ id: 'fraværHjelpLesMerFraværAnnetListe' }).map((tekst) => (
                        <li key={tekst}>{tekst}</li>
                    ))}
                </ul>
            </ReadMore>
        </>
    );
};
