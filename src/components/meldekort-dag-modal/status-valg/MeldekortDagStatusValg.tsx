import {
    MeldekortDeltattUndervalg,
    MeldekortIkkeDeltattUndervalg,
} from '@typer/meldekort-utfylling';
import { BodyLong, Radio } from '@navikt/ds-react';

import style from './MeldekortDagStatusValg.module.css'

type Props = {
    status: MeldekortDeltattUndervalg | MeldekortIkkeDeltattUndervalg;
    tittel: string;
    ingress: string;
};

export const MeldekortDagStatusValg = ({ status, tittel, ingress }: Props) => {
    return (
        <Radio value={status} className={style.valg}>
            <BodyLong weight={'semibold'}>{tittel}</BodyLong>
            <BodyLong>{ingress}</BodyLong>
        </Radio>
    );
};
