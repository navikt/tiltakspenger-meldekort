import React from 'react';
import { MeldekortDag } from '@typer/meldekort-utfylling';
import { Heading } from '@navikt/ds-react';
import { getISOWeek } from 'date-fns';
import { DeltattDagValg } from '@components/fyll-ut/steg-1-deltatt/dag/DeltattDagValg';
import { MeldekortSteg } from '@components/fyll-ut/FyllUt';
import { FraværDagValg } from '@components/fyll-ut/steg-2-fravær/dag/FraværDagValg';

import style from './KalenderUke.module.css';

const DagKomponentForSteg: Record<MeldekortSteg, React.FunctionComponent<{ dag: MeldekortDag }>> = {
    deltatt: DeltattDagValg,
    fravær: FraværDagValg,
    bekreft: () => null,
};

type Props = {
    dager: MeldekortDag[];
    steg: MeldekortSteg;
};

export const KalenderUke = ({ dager, steg }: Props) => {
    const ukenummerTekst = `Uke ${getISOWeek(dager[0].dato)}`;

    const DagKomponent = DagKomponentForSteg[steg];

    return (
        <div className={style.uke}>
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
