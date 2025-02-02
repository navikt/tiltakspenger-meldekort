const expectedEnv = [
    'NODE_ENV',
    'MELDEKORT_API_URL',
    'MELDEKORT_API_SCOPE',
    'IDPORTEN_ISSUER',
    'IDPORTEN_JWKS_URI',
    'TOKEN_X_ISSUER',
    'TOKEN_X_TOKEN_ENDPOINT',
    'TOKEN_X_CLIENT_ID',
    'TOKEN_X_PRIVATE_JWK',
] as const;

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
