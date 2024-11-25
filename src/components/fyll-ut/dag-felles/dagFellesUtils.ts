import { MeldekortDag, MeldekortDagStatus } from '@typer/meldekort-utfylling';
import {
    BabyWrappedFillIcon,
    CheckmarkCircleFillIcon,
    FirstAidFillIcon, QuestionmarkDiamondIcon,
    SunFillIcon,
    XMarkOctagonFillIcon,
} from '@navikt/aksel-icons';

import style from './dagFellesStyle.module.css';

import { TekstId } from '@components/tekst/Tekst';

type StatusEllerNull = MeldekortDag['status']

const meldekortStatusTilStyle: Record<MeldekortDagStatus, string> = {
    [MeldekortDagStatus.Deltatt]: style.deltatt,
    [MeldekortDagStatus.FraværSyk]: style.syk,
    [MeldekortDagStatus.FraværSyktBarn]: style.syktBarn,
    [MeldekortDagStatus.FraværAnnet]: style.annet,
    [MeldekortDagStatus.IkkeDeltatt]: style.ikkeDeltatt,
};

export const getMeldekortDagStatusStyle = (status: StatusEllerNull) => {
    return status ? meldekortStatusTilStyle[status] : style.ikkeRegistrert;
};

export const getIkonKomponent = (status: StatusEllerNull) => {
    switch (status) {
        case MeldekortDagStatus.Deltatt:
            return CheckmarkCircleFillIcon;
        case MeldekortDagStatus.FraværSyk:
            return FirstAidFillIcon;
        case MeldekortDagStatus.FraværSyktBarn:
            return BabyWrappedFillIcon;
        case MeldekortDagStatus.FraværAnnet:
            return SunFillIcon;
        case MeldekortDagStatus.IkkeDeltatt:
            return XMarkOctagonFillIcon;
    }

    return QuestionmarkDiamondIcon;
};

export const getStatusTekstId = (status: StatusEllerNull): TekstId => {
    switch (status) {
        case MeldekortDagStatus.Deltatt:
            return 'statusDeltatt';
        case MeldekortDagStatus.FraværSyk:
            return 'statusSyk';
        case MeldekortDagStatus.FraværSyktBarn:
            return 'statusSyktBarn';
        case MeldekortDagStatus.FraværAnnet:
            return 'statusGodkjentFravær';
        case MeldekortDagStatus.IkkeDeltatt:
            return 'statusIkkeGodkjentFravær';
    }

    return 'statusIkkeRegistrert';
}
