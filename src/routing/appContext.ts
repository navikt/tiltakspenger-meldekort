import { SiteRoutePath, SiteRouteProps } from '@routing/siteRoutes.ts';

export type AppContext = {
    initialRoute: SiteRoutePath | string;
    initialProps: SiteRouteProps;
    error?: string;
}