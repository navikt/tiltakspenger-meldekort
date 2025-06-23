import React from 'react';
import style from './Steg3_Lønn.module.css';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Undertekst } from '@components/page-header/Undertekst.tsx';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper.tsx';
import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling.ts';

type SSRProps = {
    meldekort: MeldekortUtfylling;
};

export const Steg3_Lønn = ({ meldekort }: SSRProps) => {
    const { getUndertekster } = useMeldekortUtfylling();
    const undertekster = getUndertekster();
    return (
        <MeldekortStegWrapper>
            <PageHeader
                tekstId={'lønnTittel'}
                underTekst={
                    <div className={style.undertekstWrapper}>
                        <Undertekst tekst={undertekster.ukerTekst} weight={'semibold'} />
                        <Undertekst tekst={undertekster.datoerTekst} />
                    </div>
                }
            />
            {/*TODO Implementeres i trello 1407 - https://trello.com/c/5DN7E4fZ/1407-endre-flyten-i-meldekortet-for-%C3%A5-kunne-sp%C3%B8rre-bruker-om-l%C3%B8nn*/}
        </MeldekortStegWrapper>
    );
};
