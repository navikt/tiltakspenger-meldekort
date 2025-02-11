export const siteRoutes = {
    forside: '/',
    alle: '/alle',
    fyllUt: '/:meldekortId/fyll-ut',
    kvittering: '/:meldekortId/kvittering',
} as const satisfies Record<string, string>;

export type SiteRouteName = keyof typeof siteRoutes;

export type SiteRoutePath = (typeof siteRoutes)[SiteRouteName];
