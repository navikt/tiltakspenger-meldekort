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

// Husk å holde denne oppdatert
export const førstePåskedagPerÅr: Record<number, string> = {
    2025: '2025-04-20',
    2026: '2026-04-05',
    2027: '2027-03-28',
    2028: '2028-04-16',
    2029: '2029-04-01',
} as const;
