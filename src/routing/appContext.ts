import { SiteRoutePath, SiteRouteProps } from '@routing/siteRouteConfigs.ts';

export type AppContext<Route extends SiteRoutePath = SiteRoutePath> = {
    initialRoute: Route;
    initialProps: SiteRouteProps<Route>;
};
