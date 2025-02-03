import React from 'react';
import { Forside } from '@components/forside/Forside.tsx';
import { FyllUt } from '@components/fyll-ut/FyllUt.tsx';
import { AlleMeldekort } from '@components/alle/AlleMeldekort.tsx';
import { KvitteringsSide } from '@components/kvitteringsside/KvitteringsSide.tsx';

export type SiteRouteConfig<Props> = {
    path: string;
    Component: React.FunctionComponent<Props>;
};

export type SiteRoute = (typeof siteRoutes)[number];

export type SiteRoutePath = SiteRoute['path'];

export type SiteRouteProps = React.ComponentProps<SiteRoute['Component']>;

export const siteRoutes = [
    {
        path: '/',
        Component: Forside,
    },
    {
        path: '/alle',
        Component: AlleMeldekort,
    },
    {
        path: '/:meldekortId/fyll-ut',
        Component: FyllUt,
    },
    {
        path: '/:meldekortId/kvittering',
        Component: KvitteringsSide,
    },
] as const satisfies SiteRouteConfig<any>[];
