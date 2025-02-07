import { SiteRoutePath, SiteRouteProps } from '@routing/siteRoutes.ts';

export type AppContext = {
    initialPath: SiteRoutePath | string;
    initialProps: SiteRouteProps;
    error?: string;
    demo?: boolean;
}