import React from 'react';
import { SiteRouteName, SiteRoutePath, siteRoutePaths } from '@common/siteRoutePaths.ts';
import { Forside } from '@components/forside/Forside.tsx';
import { InnsendteMeldekort } from '@components/innsendte/InnsendteMeldekort';
import { Steg3_Deltakelse } from '@components/fyll-ut/steg-3-deltakelse/Steg3_Deltakelse.tsx';
import { Steg1_Fravær } from '@components/fyll-ut/steg-1-fravær/Steg1_Fravær.tsx';
import { Steg4_Oppsummering } from '@components/fyll-ut/steg-4-oppsummering/Steg4_Oppsummering.tsx';
import { Steg5_Kvittering } from '@components/fyll-ut/steg-5-kvittering/Steg5_Kvittering.tsx';
import { Steg2_Lønn } from '@components/fyll-ut/steg-2-lønn/Steg2_Lønn.tsx';
import { KorrigerMeldekortSendInn } from '@components/korrigerMeldekort/send-inn/KorrigerMeldekortSendInn.tsx';
import KorrigerMeldekortKvittering from '@components/korrigerMeldekort/KorrigerMeldekortKvittering';
import InnsendteMeldekortForKjede from '@components/innsendteMeldekortForKjede/InnsendteMeldekortForKjede';
import KorrigerMeldekortUtfylling from '@components/korrigerMeldekort/KorrigerMeldekortUtfylling';
import KorrigeringAvMeldekortRouteWrapper from '@components/korrigerMeldekort/KorrigeringAvMeldekortRouteWrapper';

export type SiteRouteConfig<Props = any> = {
    path: SiteRoutePath;
    Component: React.FunctionComponent<Props>;
};

export const siteRouteConfigs = {
    forside: {
        path: siteRoutePaths.forside,
        Component: Forside,
    },
    innsendte: {
        path: siteRoutePaths.innsendte,
        Component: InnsendteMeldekort,
    },
    meldekortForKjede: {
        path: siteRoutePaths.meldekortForKjede,
        Component: InnsendteMeldekortForKjede,
    },
    deltakelse: {
        path: siteRoutePaths.deltakelse,
        Component: Steg3_Deltakelse,
    },
    fravær: {
        path: siteRoutePaths.fravær,
        Component: Steg1_Fravær,
    },
    lønn: {
        path: siteRoutePaths.lønn,
        Component: Steg2_Lønn,
    },
    sendInn: {
        path: siteRoutePaths.sendInn,
        Component: Steg4_Oppsummering,
    },
    kvittering: {
        path: siteRoutePaths.kvittering,
        Component: Steg5_Kvittering,
    },
    korrigeringMeldekort: {
        path: siteRoutePaths.korrigeringMeldekort,
        Component: KorrigeringAvMeldekortRouteWrapper,
    },
    korrigerMeldekortUtfylling: {
        path: siteRoutePaths.korrigerMeldekortUtfylling,
        Component: KorrigerMeldekortUtfylling,
    },
    korrigerMeldekortOppsummering: {
        path: siteRoutePaths.korrigerMeldekortOppsummering,
        Component: KorrigerMeldekortSendInn,
    },
    korrigerMeldekortKvittering: {
        path: siteRoutePaths.korrigerMeldekortKvittering,
        Component: KorrigerMeldekortKvittering,
    },
} as const satisfies Record<SiteRouteName, SiteRouteConfig>;
