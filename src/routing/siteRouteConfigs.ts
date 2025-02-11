import React from 'react';
import { Forside } from '@components/forside/Forside.tsx';
import { FyllUt } from '@components/fyll-ut/FyllUt.tsx';
import { AlleMeldekort } from '@components/alle/AlleMeldekort.tsx';
import { KvitteringsSide } from '@components/kvitteringsside/KvitteringsSide.tsx';
import { SiteRouteName, SiteRoutePath } from '../../commonSrc/siteRoutes.ts';

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
    fyllUt: {
        path: '/:meldekortId/fyll-ut',
        Component: FyllUt,
    },
    kvittering: {
        path: '/:meldekortId/kvittering',
        Component: KvitteringsSide,
    },
} as const satisfies Record<SiteRouteName, SiteRouteConfig>;
