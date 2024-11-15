import { format } from 'date-fns';
import { MeldekortDag, MeldekortDagStatus } from '@typer/meldekort-utfylling';
import classNames from 'classnames';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import {
    BabyWrappedFillIcon,
    CheckmarkCircleFillIcon,
    FirstAidFillIcon,
    SunFillIcon,
    XMarkOctagonFillIcon,
} from '@navikt/aksel-icons';

import style from './KalenderDag.module.css';

const statusTilTekst: Record<MeldekortDagStatus, string> = {
    [MeldekortDagStatus.DeltattUtenLønn]: 'Deltatt',
    [MeldekortDagStatus.DeltattMedLønn]: 'Deltatt',
    [MeldekortDagStatus.FraværSyk]: 'Syk',
    [MeldekortDagStatus.FraværSyktBarn]: 'Sykt barn',
    [MeldekortDagStatus.FraværAnnet]: 'Fravær',
    [MeldekortDagStatus.IkkeDeltatt]: 'Skulket',
};

const statusTilStyle: Record<MeldekortDagStatus, string> = {
    [MeldekortDagStatus.DeltattUtenLønn]: style.deltatt,
    [MeldekortDagStatus.DeltattMedLønn]: style.deltatt,
    [MeldekortDagStatus.FraværSyk]: style.fravær,
    [MeldekortDagStatus.FraværSyktBarn]: style.fravær,
    [MeldekortDagStatus.FraværAnnet]: style.fravær,
    [MeldekortDagStatus.IkkeDeltatt]: style.ikkeDeltatt,
};

const StatusTilIkon = ({ status }: { status: MeldekortDagStatus | null }) => {
    switch (status) {
        case MeldekortDagStatus.DeltattUtenLønn:
        case MeldekortDagStatus.DeltattMedLønn:
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

type Props = {
    dag: MeldekortDag;
    readonly?: boolean;
};

export const KalenderDag = ({ dag, readonly }: Props) => {
    const { setValgtMeldekortDag } = useMeldekortUtfylling();

    const formattedDate = `${format(dag.dato, 'd')}.`;

    return (
        <td key={dag.dato} className={classNames(style.datoKontainer)}>
            <button
                className={classNames(style.dato, dag.status && statusTilStyle[dag.status])}
                onClick={() => {
                    setValgtMeldekortDag(dag);
                }}
                disabled={readonly}
            >
                {formattedDate}
                <StatusTilIkon status={dag.status} />
            </button>
            {dag.status && (
                <div className={style.statusTekst}>{dag.status && statusTilTekst[dag.status]}</div>
            )}
        </td>
    );
};
