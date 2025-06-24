import { BodyLong, Heading, ReadMore } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { getTekster } from '@tekster/tekster.ts';

import style from './DeltattHjelp.module.css';

export const DeltattHjelp = () => {
    return (
        <>
            <Heading size={'medium'} level={'2'} className={style.header}>
                <Tekst id={'deltattHjelpTittel'} />
            </Heading>
            <TekstSegmenter id={'deltattHjelpIngress'} />
            <ReadMore
                header={getTekster({ id: 'deltattHjelpLesMerHeader' })}
                className={style.lesMer}
            >
                <ul>
                    {getTekster({ id: 'deltattHjelpLesMerListe' }).map((tekst) => (
                        <li key={tekst}>{tekst}</li>
                    ))}
                </ul>
                <BodyLong>
                    <Tekst id={'deltattHjelpLesMerTekst'} />
                </BodyLong>
            </ReadMore>
        </>
    );
};
