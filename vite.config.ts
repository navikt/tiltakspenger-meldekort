import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';
import { preact } from '@preact/preset-vite';

// https://vite.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    process.env.NODE_ENV = process.env.NODE_ENV || 'production';

    const analyze = process.env.ANALYZE && !isSsrBuild

    return {
        plugins: [
            react(),
            tsconfigPaths(),
            ...(analyze ? [visualizer({ open: true, gzipSize: true })] : []),
        ],
        base: '/tiltakspenger/meldekort',
        // ssr: {
        //     // noExternal på react deps for at preact compat skal funke
        //     noExternal: [
        //         '@floating-ui/react',
        //         '@navikt/ds-react',
        //         '@navikt/aksel-icons',
        //         'swr',
        //         'use-sync-external-store',
        //         "wouter"
        //     ],
        // },
        css: {
            modules: {
                // Stabile CSS-modules navn for å støtte HMR i dev mode
                ...(process.env.NODE_ENV === 'development' && {
                    generateScopedName: '[path][name]__[local]',
                }),
            },
        },
    };
});
