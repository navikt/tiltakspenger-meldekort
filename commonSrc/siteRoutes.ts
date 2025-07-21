import { MeldekortSteg } from '@common/typer/meldekort-utfylling';

export const siteRoutes = {
    forside: '/',
    alle: '/alle',
    fravær: '/:meldekortId/fraver',
    lønn: '/:meldekortId/lonn',
    deltakelse: '/:meldekortId/deltakelse',
    sendInn: '/:meldekortId/send-inn',
    kvittering: '/:meldekortId/kvittering',
    endreMeldekort: '/:meldekortId/endre',
    endreMeldekortOppsummering: '/:meldekortId/endre-oppsummering',
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
        siteRoutePath,
    );
};

export const getPathForMeldekortSteg = (meldekortSteg: MeldekortSteg, meldekortId: string) => {
    switch (meldekortSteg) {
        case 'fravær':
            return getPath(siteRoutes.fravær, { meldekortId });
        case 'lønn':
            return getPath(siteRoutes.lønn, { meldekortId });
        case 'deltatt':
            return getPath(siteRoutes.deltakelse, { meldekortId });
        case 'oppsummering':
            return getPath(siteRoutes.sendInn, { meldekortId });
        case 'kvittering':
            return getPath(siteRoutes.kvittering, { meldekortId });
        default:
            return getPath(siteRoutes.forside);
    }
};
