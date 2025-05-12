const isDev =
    typeof window === 'undefined'
        ? process.env.NAIS_CLUSTER_NAME === 'dev-gcp'
        : window.location.host.includes('.dev.nav.no');

export const appConfig = {
    baseUrl: '/tiltakspenger/meldekort',
    arenaUrl: isDev
        ? 'https://meldekort-frontend-q2.ansatt.dev.nav.no/meldekort'
        : 'https://www.nav.no/meldekort/send-meldekort',
} as const;
