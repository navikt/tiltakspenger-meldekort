import { BodyLong, Radio } from '@navikt/ds-react';
import classNames from 'classnames';
import { FraværStatus } from '@typer/meldekort-utfylling';
import { Tekst } from '@components/tekst/Tekst';
import { TekstId } from '@components/tekst/nb';

import style from './FraværStatusValg.module.css';

type Props = {
    status: FraværStatus;
    ingressId: TekstId;
};

export const FraværStatusValg = ({ status, ingressId }: Props) => {
    return (
        <Radio value={status} className={classNames(status && style[status], style.valg)}>
            <BodyLong weight={'semibold'}>
                <Tekst id={status} />
            </BodyLong>
            <BodyLong>
                <Tekst id={ingressId} />
            </BodyLong>
        </Radio>
    );
};
