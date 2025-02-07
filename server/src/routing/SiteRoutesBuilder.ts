import { SsrRenderer } from '@ssr/htmlRenderer';
import { Router, Request } from 'express';
import { SiteRoutePath, SiteRouteProps } from '@client/routing/siteRoutes';
import { appConfig } from '@appConfig';
import path from 'path';
import { fetchFraApi, FetchFraApi } from '@fetch/apiFetch';
import { fetchFraApiMock } from '@fetch/apiFetchMock';

type Props = {
    router: Router;
    renderer: SsrRenderer;
    apiFetchFunc?: FetchFraApi;
    mockFetchFunc?: FetchFraApi;
};

export class SiteRoutesBuilder {
    private readonly router: Router;
    private readonly renderer: SsrRenderer;
    private readonly apiFetchFunc: FetchFraApi;
    private readonly mockFetchFunc: FetchFraApi;

    constructor({
        router,
        renderer,
        apiFetchFunc = fetchFraApi,
        mockFetchFunc = fetchFraApiMock,
    }: Props) {
        this.router = router;
        this.renderer = renderer;
        this.apiFetchFunc = apiFetchFunc;
        // Aldri mock-data i prod
        this.mockFetchFunc =
            process.env.NAIS_CLUSTER_NAME === 'prod-gcp' ? apiFetchFunc : mockFetchFunc;
    }

    public routes<Path extends SiteRoutePath>(
        routePath: Path,
        dataFetcher: (req: Request, apiFetcher: FetchFraApi) => Promise<SiteRouteProps>
    ) {
        const fullPath = this.joinPaths(appConfig.basePath, routePath);
        const dataPath = this.joinPaths(routePath, 'data');

        // Serverer SSR-html til frontend
        this.router.get(routePath, async (req, res) => {
            const props = await dataFetcher(req, this.apiFetchFunc);
            const html = await this.renderer(fullPath, {
                initialProps: props,
                initialPath: routePath,
            });
            console.log('SSR real page');
            res.send(html);
        });

        // Serverer json-props for client-side rendering ved navigering
        this.router.get(dataPath, async (req, res) => {
            const props = await dataFetcher(req, this.apiFetchFunc);
            console.log('SSR real data');
            res.json(props);
        });

        if (process.env.NAIS_CLUSTER_NAME !== 'prod-gcp') {
            this.demoRoutes(routePath, dataFetcher);
        }
    }

    private demoRoutes<Path extends SiteRoutePath>(
        routePath: Path,
        dataFetcher: (req: Request, apiFetcher: FetchFraApi) => Promise<SiteRouteProps>
    ) {
        const demoRoutePath = this.joinPaths('/demo', routePath);
        const demoFullPath = this.joinPaths(appConfig.basePath, demoRoutePath);
        const demoDataPath = this.joinPaths(demoRoutePath, 'data');

        this.router.get(demoRoutePath, async (req, res) => {
            const props = await dataFetcher(req, this.mockFetchFunc);
            const html = await this.renderer(demoFullPath, {
                initialProps: props,
                initialPath: demoRoutePath,
                demo: true,
            });
            console.log('SSR mock page');
            res.send(html);
        });

        this.router.get(demoDataPath, async (req, res) => {
            const props = await dataFetcher(req, this.mockFetchFunc);
            console.log('SSR mock data');
            res.json(props);
        });
    }

    private joinPaths = (...paths: string[]) => path.posix.join(...paths);
}
