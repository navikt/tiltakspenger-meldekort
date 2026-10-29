declare global {
    // Settes av esbuild (build.mjs). Er false i produksjonsbygget, slik at testscenario-koden fjernes helt.
    const __INKLUDER_TESTSCENARIO__: boolean;

    namespace NodeJS {
        interface ProcessEnv {
            MELDEKORT_API_URL: string;
            MELDEKORT_API_SCOPE: string;
            NAIS_CLUSTER_NAME?: 'dev-gcp' | 'prod-gcp';
            BASE_URL: string;
        }
    }
}

export {};
