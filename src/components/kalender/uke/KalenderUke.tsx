import React from 'react';
import { MeldekortDag } from '../../../../commonSrc/typer/meldekort-utfylling.ts';
import { Heading } from '@navikt/ds-react';
import { getUkenummer } from '@utils/datetime.ts';
import { DeltattDagPanel } from '@components/fyll-ut/steg-1-deltatt/dag/DeltattDagPanel.tsx';
import { MeldekortSteg } from '@components/fyll-ut/FyllUt.tsx';
import { FraværDagPanel } from '@components/fyll-ut/steg-2-fravær/dag/FraværDagPanel.tsx';
import { StatiskDagPanel } from '@components/kalender/statisk-dag/StatiskDagPanel.tsx';
import { Tekst } from '@components/tekst/Tekst.tsx';

import style from './KalenderUke.module.css';

const DagKomponentForSteg: Record<MeldekortSteg, React.FunctionComponent<{ dag: MeldekortDag }>> = {
    deltatt: DeltattDagPanel,
    fravær: FraværDagPanel,
    bekreft: StatiskDagPanel,
    innsendt: StatiskDagPanel,
};

type Props = {
    dager: MeldekortDag[];
    steg: MeldekortSteg;
};

export const KalenderUke = ({ dager, steg }: Props) => {
    const ukenummerTekst = `Uke ${getUkenummer(dager[0].dato)}`;

    const DagKomponent = DagKomponentForSteg[steg];

    return (
        <div className={style.wrapper}>
            <Heading size={'medium'} level={'2'}>
                {ukenummerTekst}
            </Heading>
            {steg == 'deltatt' && <Tekst id={'deltattUkeHjelp'} />}
            {steg == 'fravær' && <Tekst id={'fraværUkeHjelp'} />}
            <ul className={style.liste}>
                {dager.map((dag) => (
                    <li key={dag.dato}>
                        {dag.harRett ? <DagKomponent dag={dag} /> : <StatiskDagPanel dag={dag} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};
