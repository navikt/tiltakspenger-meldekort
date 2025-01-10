import { BodyLong, Heading, ReadMore } from '@navikt/ds-react';

import style from './Hjelp.module.css';

export const DeltattHjelp = () => {
    return (
        <ReadMore header={'Les mer om hva som skal registreres på meldekortet'} className={style.hjelp}>
            
            <BodyLong spacing>{'For hver tiltaksdag i meldeperioden må du angi om du har deltatt eller ikke. Du kan ha rett til tiltakspenger ved enkelte fravær. Det er derfor viktig at du melder for alle avtalte tiltaksdager. Du skal ikke oppgi noe for dager som er utenfor tiltaket.'}</BodyLong>            

            <Heading size={'small'} level={'3'}>
                {'Når skal du føre at du har deltatt?'}
            </Heading>
            <ul>
                <li>{'Du skal krysse av for deltakelse hvis du har deltatt på tiltaket som avtalt.'}</li>
                <li>{'Hvis du ikke har deltatt hele det avtalte tidsrommet den aktuelle dagen, har du ikke rett på tiltakspenger og må derfor registrere fravær.'}</li>
                <li>{'Hvis du har hatt lønn i avtalt tiltakstid den aktuelle dagen, for eksempel lønn fra tiltaksarrangør, har du ikke rett på tiltakspenger og må registrere fravær.'}</li>
                <li>{'Du kan krysse av for deltakelse hvis dagen er en offentlig fridag og du ikke får deltatt fordi tiltaket er stengt.'}</li>
                <li>{'Du kan krysse av for deltakelse hvis du ikke får deltatt fordi tiltaket er feriestengt????'}</li>
            </ul>

             <Heading size={'small'} level={'3'}>
                {'Når skal du melde om fravær?'}
            </Heading>
            <BodyLong>{'Syk'}</BodyLong>
            <ul>
                <li>{'Du skal velge «Syk» hvis du har vært for syk til å kunne delta på tiltaksdagen. Du kan ha rett til tiltakspenger når du er syk. Det er derfor viktig at du melder om dette.'}</li>
                <li>{'Du får utbetalt full stønad de 3 første dagene du er syk. Er du syk mer enn 3 dager, får du utbetalt 75 prosent av full stønad resten av arbeidsgiverperioden. En arbeidsgiverperiode er på til sammen 16 virkedager.'}</li>
                <li>{'Du må ha sykmelding fra lege for å ha rett på tiltakspenger i mer enn 3 dager.'}</li>
            </ul>

            <BodyLong>{'Sykt barn eller syk barnepasser'}</BodyLong> 
            <ul>
                <li>{'Du skal velge «Sykt barn eller syk barnepasser» hvis du ikke kunne delta på tiltaksdagen fordi barnet ditt eller barnets barnepasser var syk.'}</li>
                <li>{'Det er de samme reglene som gjelder for sykt barn/barnepasser som ved egen sykdom. Det vil si at du har rett til full utbetaling de tre første dagene og 75 % resten av arbeidsgiverperioden.'}</li>
                <li>{'Du må sende legeerklæring for barnet ditt eller bekreftelse fra barnepasseren fra dag 4 for å ha rett på tiltakspenger i mer enn 3 dager.'}</li>
            </ul>

            <BodyLong spacing>{'Annet fravær'}</BodyLong> 
            <ul>
                <li>{'Du skal velge «Annet fravær» hvis du har vært helt eller delvis fraværende den aktuelle tiltaksdagen.'}</li>
                <li>{'Du skal velge «Annet fravær» hvis du har fått lønn for tiden du deltok i tiltaket den aktuelle dagen.'}</li>
                <li>{'Du skal velge «Annet fravær» hvis du har fått fri/ferie utenom planlagt ferieperiode for tiltaket.'}</li>
                <li>{'Du skal også velge «Annet fravær» hvis du har vært fraværende fordi du har gjennomført aktiviteter som du har avtalt med veilederen din.'}</li>
            </ul>

             <Heading size={'small'} level={'3'}>
                {'Du kan ha rett til tiltakspenger ved annet fravær'}
            </Heading>
            <ul>
                <li>{'Du kan ha rett til tiltakspenger selv om du har hatt fravær. Det er viktig at du melder fra om alt fravær til veilederen din, siden det i enkelte tilfeller kan gjøres unntak.'}</li>
                <li>{'Godkjente årsaker til fravær, som fortsatt gir deg tiltakspenger, er for eksempel:'}
                    <ul>
                        <li>{'jobbintervju'}</li>
                        <li>{'timeavtale i det offentlige hjelpeapparatet'}</li>
                        <li>{'alvorlig sykdom/begravelse i nærmeste familie'}</li>
                    </ul>
                </li>
                <li>{'Du må kunne dokumentere årsaken til fraværet for å få det godkjent. Hvis veilederen din godkjenner fraværet ditt, vil du få etterbetalt for dagene du har hatt fravær.'}</li>
            </ul>

          <BodyLong>{'Dette er en paragraf uten avstand'}</BodyLong>
         <BodyLong>{'Dette er en paragraf uten avstand'}</BodyLong>  
        </ReadMore>
    );
};
