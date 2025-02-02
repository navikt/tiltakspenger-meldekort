import { defineConfig, loadEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';
import { preact } from '@preact/preset-vite';

// https://vite.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    process.env.NODE_ENV = process.env.NODE_ENV || 'production';

    const analyzeClientBundle = process.env.ANALYZE === "true" && !isSsrBuild;
    const usePreact = process.env.NODE_ENV  === "production";

    return {
        plugins: [
            usePreact ? preact() : react(),
            tsconfigPaths(),
            ...(analyzeClientBundle ? [visualizer({ open: true, gzipSize: true })] : []),
        ],
        base: '/tiltakspenger/meldekort',
        css: {
            modules: {
                // Stabile CSS-modules navn for bedre HMR i dev mode
                ...(process.env.NODE_ENV === 'development' && {
                    generateScopedName: '[path][name]__[local]',
                }),
            },
        },
        ...(usePreact && preactOptions)
    };
});

const preactOptions: UserConfig = {
    resolve: {
        alias: {
            // useSyncExternalStore shim som noen pakker bruker for bakoverkompatibilitet
            // preset-vite aliaser ikke denne selv
            'use-sync-external-store/shim/index.js': `${process.cwd()}/node_modules/preact/compat/src/hooks.js`,
        },
    },
    ssr: {
        // noExternal på react deps for at preact compat aliaser skal funke
        noExternal: [
            '@floating-ui/react',
            '@navikt/aksel-icons',
            '@navikt/ds-react',
            'swr',
            'use-sync-external-store',
            'wouter',
        ],
    },
};
