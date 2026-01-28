import { Request, Router } from 'express';
import { appConfig } from '@common/appConfig';
import path from 'path';
import { fetchFraApi, FetchFraApi } from '@fetch/apiFetch';
import { fetchFraApiMock } from '@fetch/apiFetchMock';
import { SiteRouteComponentProps } from '@common/typer/appContext';
import { brukerTesterPågår, isProd } from '@utils/env';
import { HtmlRenderFunc } from '@ssr/htmlRenderUtils';

type ConstructorProps = {
    router: Router;
    renderer: HtmlRenderFunc;
};

type DataFetcherReturn = {
    props: SiteRouteComponentProps;
    status?: number;
    redirectUrl?: string;
};

type DataFetcher = (req: Request, apiFetcher: FetchFraApi) => Promise<DataFetcherReturn>;

export class SiteRoutesBuilder {
    private readonly router: Router;
    private readonly renderer: HtmlRenderFunc;
    private readonly apiFetchFunc: FetchFraApi;
    private readonly mockFetchFunc: FetchFraApi;

    constructor({ router, renderer }: ConstructorProps) {
        this.router = router;
        this.renderer = renderer;
        this.apiFetchFunc = fetchFraApi;
        // Aldri vis mock-data i prod
        this.mockFetchFunc = isProd() && !brukerTesterPågår() ? fetchFraApi : fetchFraApiMock;
    }

    public routes(routePath: string, dataFetcher: DataFetcher) {
        const routePathEn = this.joinPaths(routePath, 'en');

        const fullPathNb = this.joinPaths(appConfig.baseUrl, routePath);
        const fullPathEn = this.joinPaths(appConfig.baseUrl, routePathEn);

        const dataPath = this.joinPaths(routePath, 'data');
        const dataPathEn = this.joinPaths(routePathEn, 'data');

        // Serverer SSR-html til frontend
        this.router.get(routePath, async (req, res) => {
            const { props, status = 200, redirectUrl } = await dataFetcher(req, this.apiFetchFunc);
            if (redirectUrl) {
                return res.redirect(redirectUrl);
            }

            const html = await this.renderer(fullPathNb, {
                initialProps: props,
                initialPath: req.path,
                baseUrl: appConfig.baseUrl,
                status,
                språk: 'nb',
            });
            res.status(status).send(html);
        });

        this.router.get(routePathEn, async (req, res) => {
            const { props, status = 200, redirectUrl } = await dataFetcher(req, this.apiFetchFunc);
            if (redirectUrl) {
                return res.redirect(redirectUrl);
            }

            const html = await this.renderer(fullPathEn, {
                initialProps: props,
                initialPath: req.path,
                baseUrl: appConfig.baseUrl,
                status,
                språk: 'en',
            });
            res.status(status).send(html);
        });

        // Serverer json-props for client-side rendering ved navigering
        this.router.get(dataPath, async (req, res) => {
            const { props, status = 200 } = await dataFetcher(req, this.apiFetchFunc);
            res.status(status).json(props);
        });
        this.router.get(dataPathEn, async (req, res) => {
            const { props, status = 200 } = await dataFetcher(req, this.apiFetchFunc);
            res.status(status).json(props);
        });

        if (!isProd() || brukerTesterPågår()) {
            this.demoRoutes(routePath, dataFetcher);
        }
    }

    private demoRoutes(routePath: string, dataFetcher: DataFetcher) {
        const demoRoutePath = this.joinPaths(appConfig.demoRoutePrefix, routePath);
        const demoRoutePathEn = this.joinPaths(appConfig.demoRoutePrefix, routePath, 'en');

        const demoFullPath = this.joinPaths(appConfig.baseUrl, demoRoutePath);
        const demoFullPathEn = this.joinPaths(appConfig.baseUrl, demoRoutePathEn);

        const demoDataPath = this.joinPaths(demoRoutePath, 'data');
        const demoDataPathEn = this.joinPaths(demoRoutePathEn, 'data');

        this.router.get(demoRoutePath, async (req, res) => {
            const { props, status = 200 } = await dataFetcher(req, this.mockFetchFunc);

            const html = await this.renderer(demoFullPath, {
                initialProps: props,
                initialPath: req.path.replace(appConfig.demoRoutePrefix, ''),
                baseUrl: `${appConfig.baseUrl}${appConfig.demoRoutePrefix}`,
                status,
                språk: 'nb',
            });
            res.status(status).send(html);
        });

        this.router.get(demoRoutePathEn, async (req, res) => {
            const { props, status = 200 } = await dataFetcher(req, this.mockFetchFunc);

            console.log(`lol, ${req.path}`);

            const html = await this.renderer(demoFullPathEn, {
                initialProps: props,
                initialPath: req.path.replace(appConfig.demoRoutePrefix, ''),
                baseUrl: `${appConfig.baseUrl}${appConfig.demoRoutePrefix}`,
                status,
                språk: 'en',
            });
            res.status(status).send(html);
        });

        this.router.get(demoDataPath, async (req, res) => {
            const { props, status = 200 } = await dataFetcher(req, this.mockFetchFunc);
            res.status(status).json(props);
        });
        this.router.get(demoDataPathEn, async (req, res) => {
            const { props, status = 200 } = await dataFetcher(req, this.mockFetchFunc);
            res.status(status).json(props);
        });
    }

    private joinPaths = (...paths: string[]) => path.posix.join(...paths);
}
