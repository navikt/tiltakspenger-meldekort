/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/tiltakspenger/meldekort',
    output: 'standalone',
    reactStrictMode: true,
    // transpilePackages: ['@navikt/aksel-icons', '@navikt/ds-react'],
    // experimental: {
    //     optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
    // },
};

export default nextConfig;
