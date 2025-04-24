import React from 'react';
import { SiteRouteName, SiteRoutePath } from '@common/siteRoutes.ts';
import { Forside } from '@components/forside/Forside.tsx';
import { AlleMeldekort } from '@components/alle/AlleMeldekort.tsx';
import { Steg1_Deltatt } from '@components/fyll-ut/steg-1-deltatt/Steg1_Deltatt.tsx';
import { Steg2_Fravær } from '@components/fyll-ut/steg-2-fravær/Steg2_Fravær.tsx';
import { Steg3_SendInn } from '@components/fyll-ut/steg-3-sendinn/Steg3_SendInn.tsx';
import { Steg4_Kvittering } from '@components/fyll-ut/steg-4-kvittering/Steg4_Kvittering.tsx';

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
        Component: Steg1_Deltatt,
    },
    fravær: {
        path: '/:meldekortId/fraver',
        Component: Steg2_Fravær,
    },
    sendInn: {
        path: '/:meldekortId/send-inn',
        Component: Steg3_SendInn,
    },
    kvittering: {
        path: '/:meldekortId/kvittering',
        Component: Steg4_Kvittering,
    },
} as const satisfies Record<SiteRouteName, SiteRouteConfig>;
