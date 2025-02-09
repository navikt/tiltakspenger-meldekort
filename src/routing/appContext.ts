import { SiteRouteProps } from '@routing/siteRoutes.ts';

export type AppContext = {
    initialPath: string;
    initialProps: SiteRouteProps;
    baseUrl: string;
    error?: string;
}