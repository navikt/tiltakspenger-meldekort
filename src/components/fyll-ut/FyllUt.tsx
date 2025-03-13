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
        if (forrigeSteg) {
            scrollTo(0, 0);
            fyllUtRef.current?.focus();
        }
    }, [meldekortSteg, forrigeSteg]);

    return (
        <div ref={fyllUtRef} tabIndex={-1} className={style.wrapper}>
            <PageHeader
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
