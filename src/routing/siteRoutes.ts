import React from 'react';
import { Forside } from '@components/forside/Forside.tsx';
import { FyllUt } from '@components/fyll-ut/FyllUt.tsx';
import { AlleMeldekort } from '@components/alle/AlleMeldekort.tsx';
import { KvitteringsSide } from '@components/kvitteringsside/KvitteringsSide.tsx';
import { Steg1_Deltatt } from '@components/fyll-ut/steg-1-deltatt/Steg1_Deltatt.tsx';
import { Steg2_Fravær } from '@components/fyll-ut/steg-2-fravær/Steg2_Fravær.tsx';
import { Steg3_SendInn } from '@components/fyll-ut/steg-3-sendinn/Steg3_SendInn.tsx';

export type SiteRouteConfig<Props = any> = {
    path: string;
    Component: React.FunctionComponent<Props>;
    childRoutes?: Record<string, SiteRouteConfig<Props>>;
};

export type SiteRouteProps = React.ComponentProps<any>;

export const siteRoutes = {
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
        childRoutes: {
            deltatt: {
                path: '/deltatt',
                Component: Steg1_Deltatt,
            },
            fravær: {
                path: '/:meldekortId/fyll-ut/fravær',
                Component: Steg2_Fravær,
            },
            sendInn: {
                path: '/:meldekortId/fyll-ut/send-inn',
                Component: Steg3_SendInn,
            },
        },
    },
    kvittering: {
        path: '/:meldekortId/kvittering',
        Component: KvitteringsSide,
    },
} as const satisfies Record<string, SiteRouteConfig>;
