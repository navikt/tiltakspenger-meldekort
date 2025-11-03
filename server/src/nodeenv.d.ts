declare global {
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
