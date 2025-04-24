export const siteRoutes = {
    forside: '/',
    alle: '/alle',
    deltakelse: '/:meldekortId/deltakelse',
    fravær: '/:meldekortId/fraver',
    sendInn: '/:meldekortId/send-inn',
    kvittering: '/:meldekortId/kvittering',
} as const satisfies Record<string, string>;

export type SiteRouteName = keyof typeof siteRoutes;

export type SiteRoutePath = (typeof siteRoutes)[SiteRouteName];
