import path from 'path';
import process from 'process';

export const joinPaths = (...paths: string[]) => path.posix.join(...paths);

export const validateEnv = async (expectedEnv: string[]) => {
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
