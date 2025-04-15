import { BodyLong } from '@navikt/ds-react';
import { MeldekortUtfylling } from '../../../commonSrc/typer/meldekort-utfylling.ts';
import { FraværModal } from '@components/fyll-ut/steg-2-fravær/fravær-modal/FraværModal';
import { MeldekortUtfyllingProvider } from '@context/meldekort-utfylling/MeldekortUtfyllingProvider';
import React, { useEffect, useRef, useState } from 'react';
import { Steg1_Deltatt } from '@components/fyll-ut/steg-1-deltatt/Steg1_Deltatt';
import { formatterDato, getUkenummer } from '@utils/datetime';
import { Steg2_Fravær } from '@components/fyll-ut/steg-2-fravær/Steg2_Fravær';
import { Steg3_SendInn } from '@components/fyll-ut/steg-3-sendinn/Steg3_SendInn.tsx';
import { PageHeader } from '@components/page-header/PageHeader.tsx';

import style from './FyllUt.module.css';
import { TekstId } from '@tekster/typer.ts';

type Props = {
    meldekort: MeldekortUtfylling;
};

export type MeldekortSteg = 'deltatt' | 'fravær' | 'bekreft' | 'innsendt';

export const FyllUt = ({ meldekort }: Props) => {
    // TODO: bruk history for state slik at en kan bruke back/forward-navigering etc
    const [meldekortSteg, _setMeldekortSteg] = useState<MeldekortSteg>('deltatt');
    const [forrigeSteg, setForrigeSteg] = useState<MeldekortSteg | undefined>();

    const fyllUtRef = useRef<HTMLDivElement>(null);

    const setMeldekortSteg = (valgtSteg: MeldekortSteg) => {
        setForrigeSteg(meldekortSteg);
        _setMeldekortSteg(valgtSteg);
    };

    const { fraOgMed, tilOgMed } = meldekort.periode;

    const ukerTekst = `Uke ${getUkenummer(fraOgMed)} og ${getUkenummer(tilOgMed)}`;

    const datoerTekst = `${formatterDato({ dato: fraOgMed, medUkeDag: false })} til ${formatterDato(
        {
            dato: tilOgMed,
            medUkeDag: false,
        }
    )}`;

    useEffect(() => {
        scrollTo(0, 0);
        fyllUtRef.current?.focus();
    }, [meldekortSteg]);

    const tittelForSteg: Record<MeldekortSteg, TekstId> = {
        deltatt: 'deltattTittel',
        fravær: 'fraværTittel',
        bekreft: 'sendInnTittel',
        // TODO Steg 1-3 (deltatt, fravær, bekreft) håndteres her, men "innsendt" er ikke en del av stegene. 'innsendt' er tatt med her bare for å ikke krangle med MeldekortSteg typen..
        //  Alle steg (ikke bare kvittering (innsendt) burde kanskje hatt egne paths? Mulig det trengs for historikk som er foreslått over her.
        innsendt: 'kvitteringTittel',
    };

    return (
        <div ref={fyllUtRef} tabIndex={-1} className={style.wrapper}>
            <PageHeader
                tekstId={tittelForSteg[meldekortSteg]}
                underTekst={
                    <div className={style.headerUndertekst}>
                        <BodyLong weight={'semibold'}>{ukerTekst}</BodyLong>
                        <BodyLong>{`(${datoerTekst})`}</BodyLong>
                    </div>
                }
            />
            <MeldekortUtfyllingProvider
                meldekortUtfylling={meldekort}
                setMeldekortSteg={setMeldekortSteg}
            >
                {meldekortSteg === 'deltatt' && <Steg1_Deltatt />}
                {meldekortSteg === 'fravær' && <Steg2_Fravær />}
                {meldekortSteg === 'bekreft' && <Steg3_SendInn forrigeSteg={forrigeSteg} />}
                <FraværModal />
            </MeldekortUtfyllingProvider>
        </div>
    );
};
