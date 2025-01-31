import React from 'react';
import { Forside } from '@components/forside/Forside.tsx';
import { AlleMeldekort } from '@components/alle/AlleMeldekort.tsx';
import { NotFound } from '@404.tsx';
import { KvitteringsSide } from '@components/kvitteringsside/KvitteringsSide.tsx';
import { FyllUt } from '@components/fyll-ut/FyllUt.tsx';

export type RouteName = keyof typeof routeComponents;

type RouteComponent<R extends RouteName> = (typeof routeComponents)[R]

export type AppProps<R extends RouteName = RouteName> = R extends RouteName
    ? {
          route: R;
          props: React.ComponentProps<RouteComponent<R>>;
      }
    : never;

export const routeComponents = {
    notFound: NotFound,
    forside: Forside,
    utfylling: FyllUt,
    seAlle: AlleMeldekort,
    kvittering: KvitteringsSide,
} as const satisfies Record<string, React.FunctionComponent<any>>;
