import { RequestHandler } from 'express';
import { DATA, SELF, UNSAFE_EVAL, UNSAFE_INLINE } from 'csp-header';
import { buildCspHeader } from '@navikt/nav-dekoratoren-moduler/ssr';

const HMR_HOST = 'localhost:24678';
const NAV_CDN_HOST = 'https://cdn.nav.no';

export const cspMiddleware = async (): Promise<RequestHandler> => {
    const csp = await buildCspHeader(
        {
            'default-src': [SELF, DATA],
            'script-src': [SELF, UNSAFE_INLINE, UNSAFE_EVAL],
            'script-src-elem': [SELF, UNSAFE_INLINE],
            'style-src': [SELF, UNSAFE_INLINE],
            'style-src-elem': [SELF, UNSAFE_INLINE],
            'font-src': [SELF, DATA, NAV_CDN_HOST],
            'connect-src': [
                SELF,
                ...(process.env.NODE_ENV === 'development'
                    ? [`ws://${HMR_HOST}`, `http://${HMR_HOST}`]
                    : []),
            ],
        },
        { env: 'dev' }
    );

    return (req, res, next) => {
        res.setHeader('Content-Security-Policy', csp);
        next();
    };
};
