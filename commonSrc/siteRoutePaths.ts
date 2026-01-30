import { MeldekortSteg } from '@common/typer/BrukersMeldekortUtfylling';

export const siteRoutePaths = {
    forside: '/',
    innsendte: '/innsendte',
    meldekortForKjede: '/innsendte/kjede/:kjedeId',
    fravær: '/:meldekortId/fraver',
    lønn: '/:meldekortId/lonn',
    deltakelse: '/:meldekortId/deltakelse',
    sendInn: '/:meldekortId/send-inn',
    kvittering: '/:meldekortId/kvittering',
    korrigeringMeldekort: '/:meldekortId/korrigering/:rest*/:locale?',
    korrigerMeldekortUtfylling: '/:meldekortId/korrigering/utfylling',
    korrigerMeldekortOppsummering: '/:meldekortId/korrigering/oppsummering',
    korrigerMeldekortKvittering: '/:meldekortId/korrigering/kvittering',
} as const satisfies Record<string, string>;

export type SiteRouteName = keyof typeof siteRoutePaths;

export type SiteRoutePath = (typeof siteRoutePaths)[SiteRouteName];

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
            return getPath(siteRoutePaths.fravær, { meldekortId });
        case 'lønn':
            return getPath(siteRoutePaths.lønn, { meldekortId });
        case 'deltatt':
            return getPath(siteRoutePaths.deltakelse, { meldekortId });
        case 'oppsummering':
            return getPath(siteRoutePaths.sendInn, { meldekortId });
        case 'kvittering':
            return getPath(siteRoutePaths.kvittering, { meldekortId });
        default:
            return getPath(siteRoutePaths.forside);
    }
};
