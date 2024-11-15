import { BodyLong, Radio } from '@navikt/ds-react';

import style from './MeldekortDagStatusValg.module.css';
import classNames from 'classnames';

type Props = {
    valg?: string;
    tittel: string;
    ingress: string;
};

export const MeldekortDagStatusValg = ({ valg, tittel, ingress }: Props) => {
    return (
        <Radio value={valg} className={classNames(valg && style[valg], style.valg, style.kort)}>
            <BodyLong weight={'semibold'}>{tittel}</BodyLong>
            <BodyLong>{ingress}</BodyLong>
        </Radio>
    );
};
