import { KalenderUke } from '@components/kalender/uke/KalenderUke.tsx';
import { MeldekortSteg } from '@common/typer/BrukersMeldekortUtfylling';
import { classNames } from '@utils/classNames.ts';

import style from './Kalender.module.css';
import { Alert } from '@navikt/ds-react';
import React from 'react';
import { getUkenummer, lokalTid } from '@utils/datetime.ts';

import { useSpråk } from '@context/språk/useSpråk.ts';
import { Meldekort } from '@common/typer/MeldekortBruker.ts';

type Props = {
    meldekort: Meldekort;
    steg: MeldekortSteg;
    kanFylleUtHelg: boolean;
    className?: string;
};

export const Kalender = ({ steg, meldekort, kanFylleUtHelg, className }: Props) => {
    const forsteUke = kanFylleUtHelg ? meldekort.dager.slice(0, 7) : meldekort.dager.slice(0, 5);
    const andreUke = kanFylleUtHelg ? meldekort.dager.slice(7, 14) : meldekort.dager.slice(7, 12);
    const { valgtSpråk } = useSpråk();

    function kanVæreJuleferie() {
        const førsteDagIMeldekort = lokalTid(meldekort.dager[0].dag, valgtSpråk);
        // Hvis første dag i meldekortet er etter 1. januar er det nok ikke juleferie
        if (førsteDagIMeldekort.month() === 0 && førsteDagIMeldekort.date() > 1) {
            return false;
        }

        const uke1 = getUkenummer(meldekort.dager[0].dag, valgtSpråk);
        const uke2 = getUkenummer(meldekort.dager[meldekort.dager.length - 1].dag, valgtSpråk);
        const potensielleJuleferieUker = [52, 53, 1];
        return potensielleJuleferieUker.some((uke) => uke1 === uke || uke2 === uke);
    }

    return (
        <>
            {kanVæreJuleferie() && (
                <Alert variant="info">
                    {
                        'Dersom tiltaket ditt er stengt på grunn av juleferie skal du melde «deltok» på dagene du skulle vært i tiltak. 🎄🎅🤶'
                    }
                </Alert>
            )}
            <div className={classNames(style.kalender, className)}>
                <KalenderUke dager={forsteUke} steg={steg} />
                <KalenderUke dager={andreUke} steg={steg} />
            </div>
        </>
    );
};
