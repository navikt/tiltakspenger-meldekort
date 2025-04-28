import React, { SVGProps } from 'react';
import { MeldekortDagStatus } from '../../../../commonSrc/typer/meldekort-utfylling.ts';
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
    [MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET]: style.deltatt,
    [MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET]: style.deltatt,
    [MeldekortDagStatus.FRAVÆR_SYK]: style.syk,
    [MeldekortDagStatus.FRAVÆR_SYKT_BARN]: style.syktBarn,
    [MeldekortDagStatus.FRAVÆR_VELFERD_GODKJENT_AV_NAV]: style.annet,
    [MeldekortDagStatus.FRAVÆR_VELFERD_IKKE_GODKJENT_AV_NAV]: style.ikkeDeltatt,
    [MeldekortDagStatus.IKKE_REGISTRERT]: style.ikkeRegistrert,
};

export const statusTilIkon: Record<
    MeldekortDagStatus,
    React.FunctionComponent<SVGProps<SVGSVGElement>>
> = {
    [MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET]: CheckmarkCircleFillIcon,
    [MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET]: CheckmarkCircleFillIcon,
    [MeldekortDagStatus.FRAVÆR_SYK]: FirstAidFillIcon,
    [MeldekortDagStatus.FRAVÆR_SYKT_BARN]: BabyWrappedFillIcon,
    [MeldekortDagStatus.FRAVÆR_VELFERD_GODKJENT_AV_NAV]: SunFillIcon,
    [MeldekortDagStatus.FRAVÆR_VELFERD_IKKE_GODKJENT_AV_NAV]: XMarkOctagonFillIcon,
    [MeldekortDagStatus.IKKE_REGISTRERT]: QuestionmarkDiamondIcon,
};

export const statusTilTekstId: Record<MeldekortDagStatus, TekstId> = {
    [MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET]: 'statusDeltatt',
    [MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET]: 'statusDeltatt',
    [MeldekortDagStatus.FRAVÆR_SYK]: 'statusSyk',
    [MeldekortDagStatus.FRAVÆR_SYKT_BARN]: 'statusSyktBarn',
    [MeldekortDagStatus.FRAVÆR_VELFERD_GODKJENT_AV_NAV]: 'statusGodkjentFravær',
    [MeldekortDagStatus.FRAVÆR_VELFERD_IKKE_GODKJENT_AV_NAV]: 'statusIkkeGodkjentFravær',
    [MeldekortDagStatus.IKKE_REGISTRERT]: 'statusIkkeRegistrert',
};

export const dagStatusMedFravær: ReadonlySet<MeldekortDagStatus> = new Set([
    MeldekortDagStatus.FRAVÆR_SYK,
    MeldekortDagStatus.FRAVÆR_SYKT_BARN,
    MeldekortDagStatus.FRAVÆR_VELFERD_GODKJENT_AV_NAV,
    MeldekortDagStatus.FRAVÆR_VELFERD_IKKE_GODKJENT_AV_NAV,
]);
