const isDev =
    typeof window === 'undefined'
        ? process.env.NAIS_CLUSTER_NAME === 'dev-gcp'
        : window.location.host.includes('.dev.nav.no');

export const appConfig = {
    baseUrl: '/tiltakspenger/meldekort',
    demoRoutePrefix: '/demo',
    arenaUrl: isDev
        ? 'https://meldekort-frontend-q2.ansatt.dev.nav.no/felles-meldekort/send-meldekort'
        : 'https://www.nav.no/felles-meldekort/send-meldekort',
    arenaTidligereMeldekortUrl: isDev
        ? 'https://meldekort-frontend-q2.ansatt.dev.nav.no/felles-meldekort/tidligere-meldekort'
        : 'https://www.nav.no/felles-meldekort/tidligere-meldekort',
} as const;
