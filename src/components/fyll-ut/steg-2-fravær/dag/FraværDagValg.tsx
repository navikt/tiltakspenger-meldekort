import { MeldekortDag, MeldekortDagStatus } from '@typer/meldekort-utfylling';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { formatterDato } from '@utils/datetime';
import { BodyLong, Button } from '@navikt/ds-react';
import { CheckmarkCircleFillIcon } from '@navikt/aksel-icons';

import style from './FraværDagValg.module.css';

type Props = {
    dag: MeldekortDag;
};

export const FraværDagValg = ({ dag }: Props) => {
    const { lagreMeldekortDag } = useMeldekortUtfylling();

    const erValgt = dag.status === MeldekortDagStatus.Deltatt;

    const datoTekst = formatterDato({ dato: dag.dato, medUkeDag: true, medStorForbokstav: true });

    if (erValgt) {
        return (
            <div className={style.deltatt}>
                <CheckmarkCircleFillIcon className={style.deltattIkon} />
                <BodyLong>{`${datoTekst}: `}</BodyLong>
                <BodyLong weight={'semibold'}>{'Deltatt'}</BodyLong>
            </div>
        );
    }

    return (
        <div className={style.ikkeDeltatt}>
            <BodyLong>{datoTekst}</BodyLong>
            <div className={style.rad}>
                <BodyLong weight={'semibold'}>{'Ikke deltatt'}</BodyLong>
                <Button size={'small'} variant={'secondary'}>
                    {'Registrer fravær'}
                </Button>
            </div>
        </div>
    );
};
