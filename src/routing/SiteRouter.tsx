import { Route, Switch } from 'wouter';
import { siteRouteConfigs } from '@routing/siteRouteConfigs.ts';
import { RouteComponent } from '@routing/RouteComponent.tsx';
import { Feilside } from '@Feilside.tsx';
import { AppContext } from '@common/typer/appContext.ts';
import { MeldekortUtfyllingProvider } from '@context/meldekort-utfylling/MeldekortUtfyllingProvider.tsx';
import { useRouting } from '@routing/useRouting.ts';
import KorrigeringAvMeldekortRouteWrapper from '@components/korrigerMeldekort/KorrigeringAvMeldekortRouteWrapper';
import { Fragment } from 'react';
import { addLocaleSuffix } from '@utils/urls.ts';
import { localeSuffixes } from '@tekster/typer.ts';

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
                {localeSuffixes.flatMap((locale) => {
                    return (
                        <Fragment key={locale}>
                            <Route
                                path={addLocaleSuffix(innsendte.path, locale)}
                                key={innsendte.path}
                            >
                                <RouteComponent route={innsendte} appContext={appContext} />
                            </Route>
                            <Route
                                path={addLocaleSuffix(meldekortForKjede.path, locale)}
                                key={meldekortForKjede.path}
                            >
                                <RouteComponent route={meldekortForKjede} appContext={appContext} />
                            </Route>

                            {/* Forsiden trenger å informere provideren om hvilket meldekort som det skal jobbes med i stegene */}
                            <Route path={addLocaleSuffix(forside.path, locale)} key={forside.path}>
                                <RouteComponent route={forside} appContext={appContext} />
                            </Route>

                            <Route path={addLocaleSuffix(deltakelse.path, locale)}>
                                <RouteComponent route={deltakelse} appContext={appContext} />
                            </Route>
                            <Route path={addLocaleSuffix(fravær.path, locale)}>
                                <RouteComponent route={fravær} appContext={appContext} />
                            </Route>
                            <Route path={addLocaleSuffix(lønn.path, locale)}>
                                <RouteComponent route={lønn} appContext={appContext} />
                            </Route>
                            <Route path={addLocaleSuffix(sendInn.path, locale)}>
                                <RouteComponent route={sendInn} appContext={appContext} />
                            </Route>
                            <Route path={addLocaleSuffix(kvittering.path, locale)}>
                                <RouteComponent route={kvittering} appContext={appContext} />
                            </Route>

                            {/*pga match av provideren over, må alle routes være innenfor denne - Eventuelt hvis det er en fully-standalone route - over provideren. Litt dumt at base
                    pathen må wrappes i en provider*/}
                            <Route path={addLocaleSuffix(korrigeringMeldekort.path, locale)}>
                                <KorrigeringAvMeldekortRouteWrapper
                                    appContext={appContext}
                                    locale={locale}
                                />
                            </Route>
                        </Fragment>
                    );
                })}
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
