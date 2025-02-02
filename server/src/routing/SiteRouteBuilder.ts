import { SsrRenderer } from '@ssr/htmlRenderer';
import { Router, Request } from 'express';
import { SiteRoutePath, SiteRouteProps } from '@client/routing/siteRoutes';
import { appConfig } from '@appConfig';
import path from 'path';

type Props = {
    router: Router;
    renderer: SsrRenderer;
};

export class SiteRouteBuilder {
    private readonly router: Router;
    private readonly renderer: SsrRenderer;

    constructor({ router, renderer }: Props) {
        this.router = router;
        this.renderer = renderer;
    }

    public route<Path extends SiteRoutePath>(
        path: Path,
        fetcher: (req: Request) => Promise<SiteRouteProps<Path>>
    ) {
        const fullPath = this.joinPaths(appConfig.basePath, path);
        const dataPath = this.joinPaths(path, 'data');

        // Serverer SSR-html til frontend
        this.router.get(path, async (req, res) => {
            const props = await fetcher(req);
            const html = await this.renderer(fullPath, { initialProps: props, initialRoute: path });
            res.send(html);
        });

        // Serverer json-props for client-side rendering ved navigering
        this.router.get(dataPath, async (req, res) => {
            const props = await fetcher(req);
            res.json(props);
        });
    }

    private joinPaths = (...paths: string[]) => path.posix.join(...paths);
}
