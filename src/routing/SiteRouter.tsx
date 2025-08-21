import { Route, Switch } from 'wouter';
import { siteRouteConfigs } from '@routing/siteRouteConfigs.ts';
import { RouteComponent } from '@routing/RouteComponent.tsx';
import { Feilside } from '@Feilside.tsx';
import { AppContext } from '@common/typer/appContext.ts';
import { MeldekortUtfyllingProvider } from '@context/meldekort-utfylling/MeldekortUtfyllingProvider.tsx';
import { useRouting } from '@routing/useRouting.ts';
import { KorrigerMeldekortProvider } from '@context/korriger/KorrigerMeldekortProvider';
import { MeldeperiodeForPeriodeProvider } from '@context/meldeperiodeForPeriode/MeldeperiodeForPeriodeProvider';

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
        korrigerMeldekort,
        korrigerMeldekortOppsummering,
        korrigerMeldekortKvittering,
    } = siteRouteConfigs;
    const { navigate } = useRouting();

    return (
        <Switch>
            <MeldekortUtfyllingProvider navigate={navigate}>
                <MeldeperiodeForPeriodeProvider>
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
                    <KorrigerMeldekortProvider>
                        <Route path={korrigerMeldekort.path}>
                            <RouteComponent route={korrigerMeldekort} appContext={appContext} />
                        </Route>
                        <Route path={korrigerMeldekortOppsummering.path}>
                            <RouteComponent
                                route={korrigerMeldekortOppsummering}
                                appContext={appContext}
                            />
                        </Route>
                        <Route path={korrigerMeldekortKvittering.path}>
                            <RouteComponent
                                route={korrigerMeldekortKvittering}
                                appContext={appContext}
                            />
                        </Route>
                    </KorrigerMeldekortProvider>
                </MeldeperiodeForPeriodeProvider>
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
