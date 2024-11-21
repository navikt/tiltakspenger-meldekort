declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MELDEKORT_API_URL: string;
            MELDEKORT_API_SCOPE: string;
        }
    }
}

export {};
