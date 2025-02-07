import React, { SVGProps } from 'react';
import { MeldekortDagStatus } from '@typer/meldekort-utfylling.ts';
import {
    BabyWrappedFillIcon,
    CheckmarkCircleFillIcon,
    FirstAidFillIcon,
    QuestionmarkDiamondIcon,
    SunFillIcon,
    XMarkOctagonFillIcon,
} from '@navikt/aksel-icons';

import style from './dagFellesStyle.module.css';
import { TekstId } from '@tekster/typer.ts';

export const meldekortStatusTilStyle: Record<MeldekortDagStatus, string> = {
    [MeldekortDagStatus.Deltatt]: style.deltatt,
    [MeldekortDagStatus.FraværSyk]: style.syk,
    [MeldekortDagStatus.FraværSyktBarn]: style.syktBarn,
    [MeldekortDagStatus.FraværAnnet]: style.annet,
    [MeldekortDagStatus.IkkeDeltatt]: style.ikkeDeltatt,
    [MeldekortDagStatus.IkkeRegistrert]: style.ikkeRegistrert,
};

export const statusTilIkon: Record<
    MeldekortDagStatus,
    React.FunctionComponent<SVGProps<SVGSVGElement>>
> = {
    [MeldekortDagStatus.Deltatt]: CheckmarkCircleFillIcon,
    [MeldekortDagStatus.FraværSyk]: FirstAidFillIcon,
    [MeldekortDagStatus.FraværSyktBarn]: BabyWrappedFillIcon,
    [MeldekortDagStatus.FraværAnnet]: SunFillIcon,
    [MeldekortDagStatus.IkkeDeltatt]: XMarkOctagonFillIcon,
    [MeldekortDagStatus.IkkeRegistrert]: QuestionmarkDiamondIcon,
};

export const statusTilTekstId: Record<MeldekortDagStatus, TekstId> = {
    [MeldekortDagStatus.Deltatt]: 'statusDeltatt',
    [MeldekortDagStatus.FraværSyk]: 'statusSyk',
    [MeldekortDagStatus.FraværSyktBarn]: 'statusSyktBarn',
    [MeldekortDagStatus.FraværAnnet]: 'statusGodkjentFravær',
    [MeldekortDagStatus.IkkeDeltatt]: 'statusIkkeGodkjentFravær',
    [MeldekortDagStatus.IkkeRegistrert]: 'statusIkkeRegistrert',
};
