import { SiteHtmlRenderer } from '@ssr/siteHtmlRenderer';
import { Router, Request } from 'express';
import { appConfig } from '@common/appConfig';
import path from 'path';
import { fetchFraApi, FetchFraApi } from '@fetch/apiFetch';
import { fetchFraApiMock } from '@fetch/apiFetchMock';
import { SiteRouteComponentProps } from '@common/typer/appContext';
import { isProd } from '@utils/env';

type ConstructorProps = {
    router: Router;
    renderer: SiteHtmlRenderer;
};

type DataFetcherReturn = {
    props: SiteRouteComponentProps;
    status?: number;
    redirectUrl?: string;
};

export class SiteRoutesBuilder {
    private readonly router: Router;
    private readonly renderer: SiteHtmlRenderer;
    private readonly apiFetchFunc: FetchFraApi;
    private readonly mockFetchFunc: FetchFraApi;

    constructor({ router, renderer }: ConstructorProps) {
        this.router = router;
        this.renderer = renderer;
        this.apiFetchFunc = fetchFraApi;
        // Aldri vis mock-data i prod
        this.mockFetchFunc = isProd() ? fetchFraApi : fetchFraApiMock;
    }

    public routes(
        routePath: string,
        dataFetcher: (req: Request, fetchFraApi: FetchFraApi) => Promise<DataFetcherReturn>
    ) {
        const fullPath = this.joinPaths(appConfig.baseUrl, routePath);
        const dataPath = this.joinPaths(routePath, 'data');

        // Serverer SSR-html til frontend
        this.router.get(routePath, async (req, res) => {
            const { props, status = 200, redirectUrl } = await dataFetcher(req, this.apiFetchFunc);
            if (redirectUrl) {
                return res.redirect(redirectUrl);
            }

            const html = await this.renderer(fullPath, {
                initialProps: props,
                initialPath: routePath,
                baseUrl: appConfig.baseUrl,
                status,
            });
            res.status(status).send(html);
        });

        // Serverer json-props for client-side rendering ved navigering
        this.router.get(dataPath, async (req, res) => {
            const { props, status = 200 } = await dataFetcher(req, this.apiFetchFunc);
            res.status(status).json(props);
        });

        if (!isProd()) {
            this.demoRoutes(routePath, dataFetcher);
        }
    }

    private demoRoutes(
        routePath: string,
        dataFetcher: (req: Request, apiFetcher: FetchFraApi) => Promise<SiteRouteComponentProps>
    ) {
        const demoRoutePath = this.joinPaths('/demo', routePath);
        const demoFullPath = this.joinPaths(appConfig.baseUrl, demoRoutePath);
        const demoDataPath = this.joinPaths(demoRoutePath, 'data');

        this.router.get(demoRoutePath, async (req, res) => {
            const { props, status } = await dataFetcher(req, this.mockFetchFunc);
            const html = await this.renderer(demoFullPath, {
                initialProps: props,
                initialPath: routePath,
                baseUrl: `${appConfig.baseUrl}/demo`,
                status,
            });
            res.status(status).send(html);
        });

        this.router.get(demoDataPath, async (req, res) => {
            const { props, status } = await dataFetcher(req, this.mockFetchFunc);
            res.status(status).json(props);
        });
    }

    private joinPaths = (...paths: string[]) => path.posix.join(...paths);
}
