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
                <li>{'Du kan krysse av for deltakelse hvis dagen er en offentlig fridag og du ikke får deltatt fordi tiltaket er stengt.'}</li>
                <li>{'Hvis du har hatt lønn i avtalt tiltakstid den aktuelle dagen, for eksempel lønn fra tiltaksarrangør, har du ikke rett på tiltakspenger og må registrere fravær.'}</li>
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

            <BodyLong spacing>{'Fravær godkjent av Nav'}</BodyLong> 
            <ul>
                <li>{'Du kan ha rett til tiltakspenger selv om du har hatt fravær. Det gjelder hvis fraværet skyldes aktiviteter som du har avtalt med veilederen din.'}</li>
                <li>{'Godkjente årsaker til fravær, som fortsatt gir deg tiltakspenger, er for eksempel:'}
                    <ul>
                        <li>{'jobbintervju'}</li>
                        <li>{'timeavtale i det offentlige hjelpeapparatet'}</li>
                        <li>{'alvorlig sykdom/begravelse i nærmeste familie'}</li>
                    </ul>
                </li>
                <li>{'Ta kontakt med veilederen din for å dokumentere årsaken til fraværet og få det godkjent.'}</li>
            </ul>

             <BodyLong spacing>{'Annet fravær'}</BodyLong> 
            <ul>
                <li>{'Du skal velge «Annet fravær» hvis du har vært fraværende den aktuelle tiltaksdagen.'}</li>
                <li>{'Du skal velge «Annet fravær» hvis du har fått lønn for tiden du deltok i tiltaket den aktuelle dagen.'}</li>
                <li>{'Du skal velge «Annet fravær» hvis du har fått fri/ferie utenom planlagt ferieperiode for tiltaket.'}</li>
            </ul>

             


            <Heading size={'small'} level={'3'}>
                {'Vurdere å ha med noe mer spesifikt for mottatt lønn i tiltakstiden...'}
            </Heading>
            <ul>
                <li>{'Hvis lønn for arbeid uten for tiltakstiden...'}</li>
                <li>{'Hvis lønn ditt og datt....'}</li>
            </ul>

            <Heading size={'small'} level={'5'}>
                {'Ta kontakt med veilederen din hvis du er usikker på hva du skal føre på meldekortet"'}
            </Heading>
            

          <BodyLong>{'Dette er en paragraf uten avstand'}</BodyLong>
         <BodyLong>{'Dette er en paragraf uten avstand'}</BodyLong>  
        </ReadMore>
    );
};
