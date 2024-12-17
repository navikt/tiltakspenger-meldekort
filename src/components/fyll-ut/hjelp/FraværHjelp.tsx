import { BodyLong, Heading, ReadMore } from '@navikt/ds-react';

import style from '@components/fyll-ut/hjelp/Hjelp.module.css';

export const FraværHjelp = () => {
    return (
        <ReadMore header={'Hjelp til utfylling'} className={style.hjelp}>
            <Heading size={'medium'} level={'3'}>
                {'Dette er en header'}
            </Heading>
            <BodyLong spacing>{'Dette er en paragraf med avstand til neste paragraf'}</BodyLong>
            <BodyLong>{'Dette er en paragraf uten avstand'}</BodyLong>
            <BodyLong>{'Dette er en paragraf uten avstand'}</BodyLong>
            <ul>
                <li>{'Dette er et listeelement'}</li>
                <li>{'Dette er et listeelement'}</li>
                <li>{'Dette er et listeelement'}</li>
            </ul>
        </ReadMore>
    );
};
