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

/**
 *  Henter ut rutenavnet fra URL-en med eller uten parametere
 */
export const getPath = (siteRoutePath: SiteRoutePath, params?: Record<string, string>): string => {
    if (!params) return siteRoutePath;

    return Object.keys(params).reduce(
        (path, paramKey) => path.replace(`:${paramKey}`, params[paramKey]),
        siteRoutePath
    );
};
