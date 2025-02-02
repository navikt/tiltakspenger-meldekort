import React from 'react';
import { Forside } from '@components/forside/Forside.tsx';
import { FyllUt } from '@components/fyll-ut/FyllUt.tsx';
import { AlleMeldekort } from '@components/alle/AlleMeldekort.tsx';
import { KvitteringsSide } from '@components/kvitteringsside/KvitteringsSide.tsx';

export type SiteRouteConfig<Props> = {
    path: string;
    Component: React.FunctionComponent<Props>;
};

export type SiteRouteMap =  typeof siteRouteConfigs

export type SiteRoutePath = keyof SiteRouteMap;

export type SiteRouteProps<Path extends SiteRoutePath> = React.ComponentProps<SiteRouteMap[Path]['Component']>;

export const siteRouteConfigs =
    {
        '/': {
            path: '/',
            Component: Forside,
        },
        '/alle': {
            path: '/alle',
            Component: AlleMeldekort,
        },
        '/:meldekortId/fyll-ut': {
            path: '/:meldekortId/fyll-ut',
            Component: FyllUt,
        },
        '/:meldekortId/kvittering': {
            path: '/:meldekortId/kvittering',
            Component: KvitteringsSide,
        },
    } as const satisfies Record<string, SiteRouteConfig<any>>;
