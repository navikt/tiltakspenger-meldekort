import { SiteRoutePath, SiteRouteProps } from '@routing/siteRoutes.ts';

export type AppContext = {
    initialRoute: string;
    initialProps: SiteRouteProps<any>;
    error?: string;
}