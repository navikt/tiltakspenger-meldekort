import React from 'react';
import { SiteRouteName, SiteRoutePath } from '@common/siteRoutes.ts';
import { Forside } from '@components/forside/Forside.tsx';
import { AlleMeldekort } from '@components/alle/AlleMeldekort.tsx';
import { Steg3_Deltakelse } from '@components/fyll-ut/steg-3-deltakelse/Steg3_Deltakelse.tsx';
import { Steg1_Fravær } from '@components/fyll-ut/steg-1-fravær/Steg1_Fravær.tsx';
import { Steg4_Oppsummering } from '@components/fyll-ut/steg-4-oppsummering/Steg4_Oppsummering.tsx';
import { Steg5_Kvittering } from '@components/fyll-ut/steg-5-kvittering/Steg5_Kvittering.tsx';
import { Steg2_Lønn } from '@components/fyll-ut/steg-2-lønn/Steg2_Lønn.tsx';
import EndreMeldekort from '@components/endreMeldekort/EndreMeldekort';
import EndreMeldekortOppsummering from '@components/endreMeldekort/EndreMeldekortOppsummering';

export type SiteRouteConfig<Props = any> = {
    path: SiteRoutePath;
    Component: React.FunctionComponent<Props>;
};

export const siteRouteConfigs = {
    forside: {
        path: '/',
        Component: Forside,
    },
    alle: {
        path: '/alle',
        Component: AlleMeldekort,
    },
    deltakelse: {
        path: '/:meldekortId/deltakelse',
        Component: Steg3_Deltakelse,
    },
    fravær: {
        path: '/:meldekortId/fraver',
        Component: Steg1_Fravær,
    },
    lønn: {
        path: '/:meldekortId/lonn',
        Component: Steg2_Lønn,
    },
    sendInn: {
        path: '/:meldekortId/send-inn',
        Component: Steg4_Oppsummering,
    },
    kvittering: {
        path: '/:meldekortId/kvittering',
        Component: Steg5_Kvittering,
    },
    endreMeldekort: {
        path: '/:meldekortId/endre',
        Component: EndreMeldekort,
    },
    endreMeldekortOppsummering: {
        path: '/:meldekortId/endre-oppsummering',
        Component: EndreMeldekortOppsummering,
    },
} as const satisfies Record<SiteRouteName, SiteRouteConfig>;
