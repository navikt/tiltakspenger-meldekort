import { Route, Switch } from 'wouter';
import { siteRouteConfigs } from '@routing/siteRouteConfigs.ts';
import { Feilside } from '@Feilside.tsx';
import { AppContext } from '@common/typer/appContext.ts';
import { MeldekortUtfyllingProvider } from '@context/meldekort-utfylling/MeldekortUtfyllingProvider.tsx';
import KorrigeringAvMeldekortRouteWrapper from '@components/korrigerMeldekort/KorrigeringAvMeldekortRouteWrapper';
import { RouteMedLocale } from '@routing/RouteMedLocale.tsx';

type Props = {
    appContext: AppContext;
};

export const SiteRouter = ({ appContext }: Props) => {
    const {
        forside,
        innsendte,
        meldekortForKjede,
        deltakelse,
        fravær,
        lønn,
        sendInn,
        kvittering,
        korrigeringMeldekort,
    } = siteRouteConfigs;

    return (
        <Switch>
            <Route path={korrigeringMeldekort.path}>
                <KorrigeringAvMeldekortRouteWrapper appContext={appContext} />
            </Route>

            <MeldekortUtfyllingProvider>
                {/* Forsiden trenger å informere provideren om hvilket meldekort som det skal jobbes med i stegene */}
                <RouteMedLocale appContext={appContext} routeConfig={forside} />
                <RouteMedLocale appContext={appContext} routeConfig={innsendte} />
                <RouteMedLocale appContext={appContext} routeConfig={meldekortForKjede} />
                <RouteMedLocale appContext={appContext} routeConfig={deltakelse} />
                <RouteMedLocale appContext={appContext} routeConfig={fravær} />
                <RouteMedLocale appContext={appContext} routeConfig={lønn} />
                <RouteMedLocale appContext={appContext} routeConfig={sendInn} />
                <RouteMedLocale appContext={appContext} routeConfig={kvittering} />
            </MeldekortUtfyllingProvider>

            {/*
                Denne routen vil aldri matche fordi provideren vil alltid bli sett på som en match - Vi er derimot heldige fordi at appContext.status i App.tsx gir oss feilsiden. 
                Kan enten flytte den inn i provideren, eller finne en annen måte å håndtere dette på. 
                */}
            <Route>
                <Feilside />
            </Route>
        </Switch>
    );
};
