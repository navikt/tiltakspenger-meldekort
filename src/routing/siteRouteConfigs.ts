import React from 'react';
import { SiteRouteName, SiteRoutePath } from '@common/siteRoutes.ts';
import { Forside } from '@components/forside/Forside.tsx';
import { AlleMeldekort } from '@components/alle/AlleMeldekort.tsx';
import { Steg4_Deltatt } from '@components/fyll-ut/steg-4-deltatt/Steg4_Deltatt.tsx';
import { Steg2_Fravær } from '@components/fyll-ut/steg-2-fravær/Steg2_Fravær.tsx';
import { Steg5_Oppsummering } from '@components/fyll-ut/steg-5-oppsummering/Steg5_Oppsummering.tsx';
import { Steg6_Kvittering } from '@components/fyll-ut/steg-6-kvittering/Steg6_Kvittering.tsx';
import { Steg3_Lønn } from '@components/fyll-ut/steg-3-lønn/Steg3_Lønn.tsx';

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
        Component: Steg4_Deltatt,
    },
    fravær: {
        path: '/:meldekortId/fraver',
        Component: Steg2_Fravær,
    },
    lønn: {
        path: '/:meldekortId/lonn',
        Component: Steg3_Lønn,
    },
    sendInn: {
        path: '/:meldekortId/send-inn',
        Component: Steg5_Oppsummering,
    },
    kvittering: {
        path: '/:meldekortId/kvittering',
        Component: Steg6_Kvittering,
    },
} as const satisfies Record<SiteRouteName, SiteRouteConfig>;
