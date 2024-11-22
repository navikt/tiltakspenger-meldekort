import { MeldekortDag, MeldekortDagStatus } from '@typer/meldekort-utfylling';
import { Checkbox } from '@navikt/ds-react';
import classNames from 'classnames';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { formatterDato } from '@utils/datetime';
import {
    BabyWrappedFillIcon,
    CheckmarkCircleFillIcon,
    FirstAidFillIcon,
    SunFillIcon,
    XMarkOctagonFillIcon,
} from '@navikt/aksel-icons';

import style from './DeltattDagValg.module.css';

type Props = {
    dag: MeldekortDag;
};

export const DeltattDagValg = ({ dag }: Props) => {
    const { lagreMeldekortDag } = useMeldekortUtfylling();

    const erValgt = dag.status === MeldekortDagStatus.Deltatt;

    return (
        <Checkbox
            onChange={(e) => {
                lagreMeldekortDag({
                    ...dag,
                    status: e.target.checked ? MeldekortDagStatus.Deltatt : null,
                });
            }}
            checked={erValgt}
            className={classNames(style.dag, erValgt && style.valgt)}
        >
            {formatterDato({ dato: dag.dato, medUkeDag: true })}
        </Checkbox>
    );
};

const statusTilTekst: Record<MeldekortDagStatus, string> = {
    [MeldekortDagStatus.Deltatt]: 'Deltatt',
    [MeldekortDagStatus.FraværSyk]: 'Syk',
    [MeldekortDagStatus.FraværSyktBarn]: 'Sykt barn',
    [MeldekortDagStatus.FraværAnnet]: 'Fravær',
    [MeldekortDagStatus.IkkeDeltatt]: 'Skulket',
};

const statusTilStyle: Record<MeldekortDagStatus, string> = {
    [MeldekortDagStatus.Deltatt]: style.deltatt,
    [MeldekortDagStatus.FraværSyk]: style.fravær,
    [MeldekortDagStatus.FraværSyktBarn]: style.fravær,
    [MeldekortDagStatus.FraværAnnet]: style.fravær,
    [MeldekortDagStatus.IkkeDeltatt]: style.ikkeDeltatt,
};

const StatusTilIkon = ({ status }: { status: MeldekortDagStatus | null }) => {
    switch (status) {
        case MeldekortDagStatus.Deltatt:
            return (
                <CheckmarkCircleFillIcon
                    style={{ color: 'var(--a-green-700)' }}
                    className={style.ikon}
                />
            );
        case MeldekortDagStatus.FraværSyk:
            return (
                <FirstAidFillIcon style={{ color: 'var(--a-red-500)' }} className={style.ikon} />
            );
        case MeldekortDagStatus.FraværSyktBarn:
            return (
                <BabyWrappedFillIcon style={{ color: 'var(--a-red-500)' }} className={style.ikon} />
            );
        case MeldekortDagStatus.FraværAnnet:
            return <SunFillIcon style={{ color: 'var(--a-orange-500)' }} className={style.ikon} />;
        case MeldekortDagStatus.IkkeDeltatt:
            return (
                <XMarkOctagonFillIcon
                    style={{ color: 'var(--a-red-700)' }}
                    className={style.ikon}
                />
            );
    }

    return null;
};
