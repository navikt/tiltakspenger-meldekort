import { Route, Switch } from 'wouter';
import { siteRouteConfigs } from '@routing/siteRouteConfigs.ts';
import { RouteComponent } from '@routing/RouteComponent.tsx';
import { Feilside } from '@Feilside.tsx';
import { AppContext } from '@common/typer/appContext.ts';
import { MeldekortUtfyllingProvider } from '@context/meldekort-utfylling/MeldekortUtfyllingProvider.tsx';
import { useRouting } from '@routing/useRouting.ts';
import KorrigeringAvMeldekortRouteWrapper from '@components/korrigerMeldekort/KorrigeringAvMeldekortRouteWrapper';

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
    const { navigate } = useRouting();

    return (
        <Switch>
            <MeldekortUtfyllingProvider navigate={navigate}>
                <Route path={innsendte.path} key={innsendte.path}>
                    <RouteComponent route={innsendte} appContext={appContext} />
                </Route>
                <Route path={meldekortForKjede.path} key={meldekortForKjede.path}>
                    <RouteComponent route={meldekortForKjede} appContext={appContext} />
                </Route>

                {/* Forsiden trenger å informere provideren om hvilket meldekort som det skal jobbes med i stegene */}
                <Route path={forside.path}>
                    <RouteComponent route={forside} appContext={appContext} />
                </Route>

                <Route path={deltakelse.path}>
                    <RouteComponent route={deltakelse} appContext={appContext} />
                </Route>
                <Route path={fravær.path}>
                    <RouteComponent route={fravær} appContext={appContext} />
                </Route>
                <Route path={lønn.path}>
                    <RouteComponent route={lønn} appContext={appContext} />
                </Route>
                <Route path={sendInn.path}>
                    <RouteComponent route={sendInn} appContext={appContext} />
                </Route>
                <Route path={kvittering.path}>
                    <RouteComponent route={kvittering} appContext={appContext} />
                </Route>

                {/*pga match av provideren over, må alle routes være innenfor denne - Eventuelt hvis det er en fully-standalone route - over provideren. Litt dumt at base
                    pathen må wrappes i en provider*/}
                <Route path={korrigeringMeldekort.path}>
                    <KorrigeringAvMeldekortRouteWrapper appContext={appContext} />
                </Route>
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
