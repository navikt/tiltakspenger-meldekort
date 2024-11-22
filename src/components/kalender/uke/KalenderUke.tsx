import { MeldekortDag } from '@typer/meldekort-utfylling';
import { Heading } from '@navikt/ds-react';
import { getISOWeek } from 'date-fns';
import { KalenderDag } from '@components/kalender/dag/KalenderDag';

import style from './KalenderUke.module.css';

type Props = {
    dager: MeldekortDag[];
};

export const KalenderUke = ({ dager }: Props) => {
    const ukenummerTekst = `Uke ${getISOWeek(new Date(dager[0].dato))}`;

    return (
        <div className={style.uke}>
            <Heading size={'medium'} className={style.heading}>{ukenummerTekst}</Heading>
            <ul className={style.liste}>
                {dager.map((dag) => (
                    <KalenderDag dag={dag} key={dag.index} />
                ))}
            </ul>
        </div>
    );
};
