const expectedEnv = ['NODE_ENV', 'MELDEKORT_API_URL', 'MELDEKORT_API_SCOPE'] as const;

export const validateEnv = async () => {
    const missingVars: string[] = [];

    expectedEnv.forEach((key) => {
        if (!process.env[key]) {
            console.error(`Missing env var for ${key}!`);
            missingVars.push(key);
        }
    });

    if (missingVars.length > 0) {
        throw new Error('Missing critical env vars!');
    }
};

export const isProd = () => process.env.NAIS_CLUSTER_NAME === 'prod-gcp';

export const isDev = () => process.env.NAIS_CLUSTER_NAME === 'dev-gcp';
