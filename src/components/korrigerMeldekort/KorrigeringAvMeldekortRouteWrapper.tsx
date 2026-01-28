import { AppContext } from '@common/typer/appContext';
import { KorrigerMeldekortProvider } from '@context/korriger/KorrigerMeldekortProvider';
import { siteRouteConfigs } from '@routing/siteRouteConfigs';
import { Switch } from 'wouter';
import { RouteMedLocale } from '@routing/RouteMedLocale.tsx';

const KorrigeringAvMeldekortRouteWrapper = ({ appContext }: { appContext: AppContext }) => {
    const {
        korrigerMeldekortUtfylling,
        korrigerMeldekortOppsummering,
        korrigerMeldekortKvittering,
    } = siteRouteConfigs;

    return (
        <KorrigerMeldekortProvider>
            <Switch>
                <RouteMedLocale appContext={appContext} routeConfig={korrigerMeldekortUtfylling} />
                <RouteMedLocale
                    appContext={appContext}
                    routeConfig={korrigerMeldekortOppsummering}
                />
                <RouteMedLocale appContext={appContext} routeConfig={korrigerMeldekortKvittering} />
            </Switch>
        </KorrigerMeldekortProvider>
    );
};

export default KorrigeringAvMeldekortRouteWrapper;
