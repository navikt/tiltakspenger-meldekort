import { Route } from 'wouter';
import { addLocaleSuffix } from '@common/urls.ts';
import { RouteComponent } from '@routing/RouteComponent.tsx';
import { AppContext } from '@common/typer/appContext.ts';
import { SiteRouteConfig } from '@routing/siteRouteConfigs.ts';
import { locales } from '@common/typer/locale';

type Props = {
    appContext: AppContext;
    routeConfig: SiteRouteConfig;
};

export const RouteMedLocale = ({ appContext, routeConfig }: Props) => {
    return locales.map((locale) => {
        return (
            <Route path={addLocaleSuffix(routeConfig.path, locale)} key={locale}>
                <RouteComponent route={routeConfig} appContext={appContext} />
            </Route>
        );
    });
};
