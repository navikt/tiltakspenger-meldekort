import { format } from 'date-fns';
import {
    MeldekortDag,
    MeldekortDagStatus,
    MeldekortDeltattUndervalg,
    MeldekortIkkeDeltattUndervalg,
} from '@typer/meldekort-utfylling';
import classNames from 'classnames';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import {
    BabyWrappedFillIcon,
    CheckmarkCircleFillIcon,
    CheckmarkIcon,
    FirstAidFillIcon,
    SunFillIcon,
    SunIcon,
    XMarkIcon,
    XMarkOctagonFillIcon,
} from '@navikt/aksel-icons';

import style from './Dag.module.css';

const getStatusStyle = (dag: MeldekortDag) => {
    const { deltattValg, underValg } = dag.status;

    if (deltattValg === 'deltatt') {
        return underValg === 'DELTATT_UTEN_LØNN' ? style.deltatt : style.deltattMedLønn;
    }

    if (deltattValg === 'ikkeDeltatt') {
        return underValg === 'IKKE_DELTATT' ? style.ikkeDeltatt : style.fravær;
    }

    return style.ikkeValgt;
};

const statusTilTekst: Record<MeldekortDeltattUndervalg | MeldekortIkkeDeltattUndervalg, string> = {
    [MeldekortDeltattUndervalg.DeltattUtenLønn]: 'Deltatt',
    [MeldekortDeltattUndervalg.DeltattMedLønn]: 'Deltatt',
    [MeldekortIkkeDeltattUndervalg.FraværSyk]: 'Syk',
    [MeldekortIkkeDeltattUndervalg.FraværSyktBarn]: 'Sykt barn',
    [MeldekortIkkeDeltattUndervalg.FraværAnnet]: 'Fravær',
    [MeldekortIkkeDeltattUndervalg.IkkeDeltatt]: 'Skulket',
};

const StatusTilIkon = ({ status }: { status: MeldekortDagStatus }) => {
    switch (status.underValg) {
        case MeldekortDeltattUndervalg.DeltattUtenLønn:
        case MeldekortDeltattUndervalg.DeltattMedLønn:
            return (
                <CheckmarkCircleFillIcon
                    style={{ color: 'var(--a-green-700)' }}
                    className={style.ikon}
                />
            );
        case MeldekortIkkeDeltattUndervalg.FraværSyk:
            return (
                <FirstAidFillIcon style={{ color: 'var(--a-red-500)' }} className={style.ikon} />
            );
        case MeldekortIkkeDeltattUndervalg.FraværSyktBarn:
            return (
                <BabyWrappedFillIcon style={{ color: 'var(--a-red-500)' }} className={style.ikon} />
            );
        case MeldekortIkkeDeltattUndervalg.FraværAnnet:
            return <SunFillIcon style={{ color: 'var(--a-orange-500)' }} className={style.ikon} />;
        case MeldekortIkkeDeltattUndervalg.IkkeDeltatt:
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

export const Dag = ({ dag, readonly }: Props) => {
    const { setValgtMeldekortDag } = useMeldekortUtfylling();

    const formattedDate = `${format(dag.dato, 'd')}.`;

    return (
        <td key={dag.dato} className={classNames(style.datoKontainer)}>
            <button
                className={classNames(style.dato, getStatusStyle(dag))}
                onClick={() => {
                    setValgtMeldekortDag(dag);
                }}
                disabled={readonly}
            >
                {formattedDate}
                <StatusTilIkon status={dag.status} />
            </button>
            {dag.status.underValg && (
                <div className={style.statusTekst}>{statusTilTekst[dag.status.underValg]}</div>
            )}
        </td>
    );
};
