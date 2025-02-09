import { SiteHtmlRenderer } from '@ssr/siteHtmlRenderer';
import { Router, Request } from 'express';
import { SiteRouteProps } from '@client/routing/siteRoutes';
import { appConfig } from '@appConfig';
import path from 'path';
import { fetchFraApi, FetchFraApi } from '@fetch/apiFetch';
import { fetchFraApiMock } from '@fetch/apiFetchMock';

type Props = {
    router: Router;
    renderer: SiteHtmlRenderer;
};

export class SiteRoutesBuilder {
    private readonly router: Router;
    private readonly renderer: SiteHtmlRenderer;
    private readonly apiFetchFunc: FetchFraApi;
    private readonly mockFetchFunc: FetchFraApi;

    private readonly isProd = process.env.NAIS_CLUSTER_NAME === 'prod-gcp';

    constructor({ router, renderer }: Props) {
        this.router = router;
        this.renderer = renderer;
        this.apiFetchFunc = fetchFraApi;
        // Aldri vis mock-data i prod
        this.mockFetchFunc = this.isProd ? fetchFraApi : fetchFraApiMock;
    }

    public routes(
        routePath: string,
        dataFetcher: (req: Request, apiFetcher: FetchFraApi) => Promise<SiteRouteProps>
    ) {
        const fullPath = this.joinPaths(appConfig.baseUrl, routePath);
        const dataPath = this.joinPaths(routePath, 'data');

        // Serverer SSR-html til frontend
        this.router.get(routePath, async (req, res) => {
            const props = await dataFetcher(req, this.apiFetchFunc);
            const html = await this.renderer(fullPath, {
                initialProps: props,
                initialPath: routePath,
                baseUrl: appConfig.baseUrl,
                status: 200
            });
            res.send(html);
        });

        // Serverer json-props for client-side rendering ved navigering
        this.router.get(dataPath, async (req, res) => {
            const props = await dataFetcher(req, this.apiFetchFunc);
            res.json(props);
        });

        if (!this.isProd) {
            this.demoRoutes(routePath, dataFetcher);
        }
    }

    private demoRoutes(
        routePath: string,
        dataFetcher: (req: Request, apiFetcher: FetchFraApi) => Promise<SiteRouteProps>
    ) {
        const demoRoutePath = this.joinPaths('/demo', routePath);
        const demoFullPath = this.joinPaths(appConfig.baseUrl, demoRoutePath);
        const demoDataPath = this.joinPaths(demoRoutePath, 'data');

        this.router.get(demoRoutePath, async (req, res) => {
            const props = await dataFetcher(req, this.mockFetchFunc);
            const html = await this.renderer(demoFullPath, {
                initialProps: props,
                initialPath: demoRoutePath,
                baseUrl: `${appConfig.baseUrl}/demo`,
                status: 200
            });
            res.send(html);
        });

        this.router.get(demoDataPath, async (req, res) => {
            const props = await dataFetcher(req, this.mockFetchFunc);
            res.json(props);
        });
    }

    private joinPaths = (...paths: string[]) => path.posix.join(...paths);
}
