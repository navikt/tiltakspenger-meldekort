import React, { SVGProps } from 'react';
import { MeldekortSteg } from '@common/typer/BrukersMeldekortUtfylling';
import {
    BabyWrappedFillIcon,
    CheckmarkCircleFillIcon,
    FirstAidFillIcon,
    MinusCircleIcon,
    QuestionmarkDiamondIcon,
    SunFillIcon,
    XMarkOctagonFillIcon,
} from '@navikt/aksel-icons';

import style from './dagFellesStyle.module.scss';
import { TekstId } from '@tekster/typer.ts';
import { MeldekortDagStatus } from '@common/typer/MeldekortBruker';

export const meldekortStatusTilStyle: Record<MeldekortDagStatus, string> = {
    [MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET]: style.deltattUtenLønn,
    [MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET]: style.deltattMedLønn,
    [MeldekortDagStatus.FRAVÆR_SYK]: style.syk,
    [MeldekortDagStatus.FRAVÆR_SYKT_BARN]: style.syktBarn,
    [MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV]: style.fraværGodkjentAvNav,
    [MeldekortDagStatus.FRAVÆR_ANNET]: style.fraværAnnet,
    [MeldekortDagStatus.IKKE_BESVART]: style.ikkeBesvart,
    [MeldekortDagStatus.IKKE_TILTAKSDAG]: style.ikkeTiltaksdag,
    [MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER]: style.ikkeBesvart,
};

export const statusTilIkon: Record<
    MeldekortDagStatus,
    React.FunctionComponent<SVGProps<SVGSVGElement>>
> = {
    [MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET]: CheckmarkCircleFillIcon,
    [MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET]: XMarkOctagonFillIcon,
    [MeldekortDagStatus.FRAVÆR_SYK]: FirstAidFillIcon,
    [MeldekortDagStatus.FRAVÆR_SYKT_BARN]: BabyWrappedFillIcon,
    [MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV]: SunFillIcon,
    [MeldekortDagStatus.FRAVÆR_ANNET]: XMarkOctagonFillIcon,
    [MeldekortDagStatus.IKKE_BESVART]: QuestionmarkDiamondIcon,
    [MeldekortDagStatus.IKKE_TILTAKSDAG]: MinusCircleIcon,
    [MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER]: QuestionmarkDiamondIcon,
};

export const statusTilTekstId: Record<MeldekortDagStatus, TekstId> = {
    [MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET]: 'statusDeltatt',
    [MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET]: 'statusDeltattMedLønn',
    [MeldekortDagStatus.FRAVÆR_SYK]: 'statusSyk',
    [MeldekortDagStatus.FRAVÆR_SYKT_BARN]: 'statusSyktBarn',
    [MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV]: 'statusGodkjentFravær',
    [MeldekortDagStatus.FRAVÆR_ANNET]: 'statusAnnetFravær',
    [MeldekortDagStatus.IKKE_BESVART]: 'statusIkkeBesvart',
    [MeldekortDagStatus.IKKE_TILTAKSDAG]: 'statusIkkeTiltaksdag',
    [MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER]: 'statusIkkeRettTilTiltakspenger',
};

export const meldekortStegTilTekstId: Record<MeldekortSteg, TekstId> = {
    deltatt: 'deltattTittel',
    fravær: 'fraværTittel',
    lønn: 'lønnTittel',
    oppsummering: 'oppsummeringTittel',
    kvittering: 'kvitteringTittel',
};

export const dagStatusMedFravær: ReadonlySet<MeldekortDagStatus> = new Set([
    MeldekortDagStatus.FRAVÆR_SYK,
    MeldekortDagStatus.FRAVÆR_SYKT_BARN,
    MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV,
    MeldekortDagStatus.FRAVÆR_ANNET,
]);
