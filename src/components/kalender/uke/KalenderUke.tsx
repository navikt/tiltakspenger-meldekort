import React from 'react';
import { MeldekortDag, MeldekortSteg } from '@common/typer/meldekort-utfylling.ts';
import { Heading } from '@navikt/ds-react';
import { getUkenummer } from '@utils/datetime.ts';
import { DeltattDagPanel } from '@components/fyll-ut/steg-3-deltakelse/dag/DeltattDagPanel.tsx';
import { FraværDagPanel } from '@components/fyll-ut/steg-1-fravær/dag/FraværDagPanel.tsx';
import { MeldekortdagOppsummering } from '@components/kalender/statisk-dag/StatiskDagPanel.tsx';
import { Tekst } from '@components/tekst/Tekst.tsx';

import style from './KalenderUke.module.css';
import { LønnDagPanel } from '@components/fyll-ut/steg-2-lønn/dag/LønnDagPanel.tsx';

const DagKomponentForSteg: Record<MeldekortSteg, React.FunctionComponent<{ dag: MeldekortDag }>> = {
    deltatt: DeltattDagPanel,
    lønn: LønnDagPanel,
    fravær: FraværDagPanel,
    oppsummering: MeldekortdagOppsummering,
    kvittering: MeldekortdagOppsummering,
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
            {steg == 'lønn' && <Tekst id={'lønnUkeHjelp'} />}
            {steg == 'fravær' && <Tekst id={'fraværUkeHjelp'} />}
            <ul className={style.liste}>
                {dager.map((dag) => (
                    <li key={dag.dato}>
                        {dag.harRett ? (
                            <DagKomponent dag={dag} />
                        ) : (
                            <MeldekortdagOppsummering dag={dag} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
