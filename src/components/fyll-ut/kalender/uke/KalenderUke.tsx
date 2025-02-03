import React from 'react';
import { MeldekortDag } from '@typer/meldekort-utfylling.ts';
import { Heading } from '@navikt/ds-react';
import { getUkenummer } from '@utils/datetime.ts';
import { DeltattDagPanel } from '@components/fyll-ut/steg-1-deltatt/dag/DeltattDagPanel';
import { MeldekortSteg } from '@components/fyll-ut/FyllUt';
import { FraværDagPanel } from '@components/fyll-ut/steg-2-fravær/dag/FraværDagPanel';
import { StatiskDagPanel } from '@components/fyll-ut/kalender/statisk-dag/StatiskDagPanel';

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
        <div>
            <Heading size={'medium'} className={style.heading}>
                {ukenummerTekst}
            </Heading>
            <ul className={style.liste}>
                {dager.map((dag) => (
                    <li key={dag.dato}>
                        <DagKomponent dag={dag} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
