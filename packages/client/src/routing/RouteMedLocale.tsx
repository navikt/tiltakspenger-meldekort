import { Route } from 'wouter';
import { addLocaleSuffix } from '@meldekort/common/urls';
import { RouteComponent } from '@routing/RouteComponent';
import { AppContext } from '@meldekort/common/typer/appContext';
import { SiteRouteConfig } from '@routing/siteRouteConfigs';
import { locales } from '@meldekort/common/locale';

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
