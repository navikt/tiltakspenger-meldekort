import { KorrigerMeldekortStatus } from '../KorrigerMeldekortUtils';
import styles from './OppsummeringAvKorrigertMeldekortDag.module.css';
import {
    BabyWrappedFillIcon,
    CheckmarkCircleFillIcon,
    FirstAidFillIcon,
    QuestionmarkDiamondIcon,
    SunFillIcon,
    XMarkOctagonFillIcon,
} from '@navikt/aksel-icons';
import { SVGProps } from 'react';
import { TekstId } from '@tekster/typer';

export const korrigerMeldekortStatusTilStyle: Record<KorrigerMeldekortStatus, string> = {
    [KorrigerMeldekortStatus.DELTATT]: styles.deltatt,
    [KorrigerMeldekortStatus.MOTTAT_LØNN]: styles.lønn,
    [KorrigerMeldekortStatus.SYK]: styles.syk,
    [KorrigerMeldekortStatus.SYK_BARN_ELLER_SYK_BARNEPASSER]: styles.syktBarn,
    [KorrigerMeldekortStatus.FRAVÆR_GODKJENT_AV_NAV]: styles.annet,
    [KorrigerMeldekortStatus.ANNET_FRAVÆR]: styles.ikkeDeltatt,
    [KorrigerMeldekortStatus.IKKE_TILTAKSDAG]: styles.ikkeTiltaksdag,
};

export const korrigerStatusTilIkon: Record<
    KorrigerMeldekortStatus,
    React.FunctionComponent<SVGProps<SVGSVGElement>>
> = {
    [KorrigerMeldekortStatus.DELTATT]: CheckmarkCircleFillIcon,
    [KorrigerMeldekortStatus.MOTTAT_LØNN]: XMarkOctagonFillIcon,
    [KorrigerMeldekortStatus.SYK]: FirstAidFillIcon,
    [KorrigerMeldekortStatus.SYK_BARN_ELLER_SYK_BARNEPASSER]: BabyWrappedFillIcon,
    [KorrigerMeldekortStatus.FRAVÆR_GODKJENT_AV_NAV]: SunFillIcon,
    [KorrigerMeldekortStatus.ANNET_FRAVÆR]: XMarkOctagonFillIcon,
    [KorrigerMeldekortStatus.IKKE_TILTAKSDAG]: QuestionmarkDiamondIcon,
};

export const korrigerStatusTilTekstId: Record<KorrigerMeldekortStatus, TekstId> = {
    [KorrigerMeldekortStatus.DELTATT]: 'statusDeltatt',
    [KorrigerMeldekortStatus.MOTTAT_LØNN]: 'statusMottattLønn',
    [KorrigerMeldekortStatus.SYK]: 'statusSyk',
    [KorrigerMeldekortStatus.SYK_BARN_ELLER_SYK_BARNEPASSER]: 'statusSykBarnEllerSykBarnepasser',
    [KorrigerMeldekortStatus.FRAVÆR_GODKJENT_AV_NAV]: 'statusGodkjentFravær',
    [KorrigerMeldekortStatus.ANNET_FRAVÆR]: 'statusAnnetFravær',
    [KorrigerMeldekortStatus.IKKE_TILTAKSDAG]: 'statusIkkeTiltaksdag',
};
