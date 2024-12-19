import { BodyLong, Heading, ReadMore } from '@navikt/ds-react';

import style from './Hjelp.module.css';

export const FraværHjelp = () => {
    return (
        <ReadMore header={'Les mer om hvilke fravær som kan gi rett til tiltakspenger'} className={style.hjelp}>
            <Heading size={'medium'} level={'3'}>
                {'Syk'}
            </Heading>            
            <ul>
                <li>{'Dette er et listeelement'}</li>
                <li>{'Dette er et listeelement'}</li>
                <li>{'Dette er et listeelement'}</li>
            </ul>
            
            <Heading size={'medium'} level={'3'}>
                {'Sykt barn eller syk barnepasser'}
            </Heading>            
            <ul>
                <li>{'Dette er et listeelement'}</li>
                <li>{'Dette er et listeelement'}</li>
                <li>{'Dette er et listeelement'}</li>
            </ul>
            <Heading size={'medium'} level={'3'}>
                {'Annet fravær'}
            </Heading>            
            <ul>
                <li>{'Dette er et listeelement'}</li>
                <li>{'Dette er et listeelement'}</li>
                <li>{'Dette er et listeelement'}</li>
            </ul>
            <Heading size={'medium'} level={'3'}>
                {'Du kan ha rett til tiltakspenger ved annet fravær'}
            </Heading>            
            <ul>
                <li>{'Dette er et listeelement'}</li>
                <li>{'Dette er et listeelement'}</li>
                <li>{'Dette er et listeelement'}</li>
            </ul>





            <BodyLong spacing>{'Dette er en paragraf med avstand til neste paragraf'}</BodyLong>
            <BodyLong>{'Dette er en paragraf uten avstand'}</BodyLong>
            <BodyLong>{'Dette er en paragraf uten avstand'}</BodyLong>
        </ReadMore>
    );
};
