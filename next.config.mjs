/** @type {import('next').NextConfig} */

const BASE_PATH = '/tiltakspenger/meldekort'

const nextConfig = {
    basePath: BASE_PATH,
    output: 'standalone',
    reactStrictMode: true,
    generateEtags: false,
    // transpilePackages: ['@navikt/aksel-icons', '@navikt/ds-react'],
    // experimental: {
    //     optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
    // },
    async redirects() {
        return [
            {
                source: '/',
                destination: BASE_PATH,
                basePath: false,
                permanent: false
            }
        ]
    }
};

export default nextConfig;
