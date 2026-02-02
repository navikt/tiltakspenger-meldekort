import { AppContext } from '@common/typer/appContext';
import { KorrigerMeldekortProvider } from '@context/korriger/KorrigerMeldekortProvider';
import { siteRouteConfigs } from '@routing/siteRouteConfigs';
import { RouteMedLocale } from '@routing/RouteMedLocale.tsx';
import { SpråkProvider } from '@context/språk/SpråkProvider.tsx';

const KorrigeringAvMeldekortRouteWrapper = ({ appContext }: { appContext: AppContext }) => {
    const {
        korrigerMeldekortUtfylling,
        korrigerMeldekortOppsummering,
        korrigerMeldekortKvittering,
    } = siteRouteConfigs;

    return (
        <SpråkProvider defaultSpråk={'nb'} alltidDefault={true}>
            <KorrigerMeldekortProvider>
                <RouteMedLocale appContext={appContext} routeConfig={korrigerMeldekortUtfylling} />
                <RouteMedLocale
                    appContext={appContext}
                    routeConfig={korrigerMeldekortOppsummering}
                />
                <RouteMedLocale appContext={appContext} routeConfig={korrigerMeldekortKvittering} />
            </KorrigerMeldekortProvider>
        </SpråkProvider>
    );
};

export default KorrigeringAvMeldekortRouteWrapper;
