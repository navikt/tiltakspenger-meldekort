import { defineConfig, loadEnv } from 'vite';
import preact from "@preact/preset-vite";
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    console.log('node env', process.env.NODE_ENV);

    return {
        plugins: [
            preact(),
            tsconfigPaths(),
            ...(process.env.ANALYZE ? [visualizer({ open: true, gzipSize: true })] : []),
        ],
        base: '/tiltakspenger/meldekort',
        ssr: {
            // noExternal på react deps for at preact compat skal funke
            noExternal: ['@navikt/ds-react', '@navikt/aksel-icons'],
        },
    };
});
