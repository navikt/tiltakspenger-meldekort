const isDev =
    typeof window === 'undefined'
        ? process.env.NAIS_CLUSTER_NAME === 'dev-gcp'
        : window.location.host.includes('.dev.nav.no');

export const appConfig = {
    baseUrl: '/tiltakspenger/meldekort',
    demoRoutePrefix: '/demo',
    arenaUrl: isDev
        ? 'https://meldekort-frontend-q2.ansatt.dev.nav.no/meldekort/send-meldekort'
        : 'https://www.nav.no/meldekort/send-meldekort',
    arenaTidligereMeldekortUrl: isDev
        ? 'https://meldekort-frontend-q2.ansatt.dev.nav.no/meldekort/tidligere-meldekort'
        : 'https://www.nav.no/meldekort/tidligere-meldekort',
} as const;
