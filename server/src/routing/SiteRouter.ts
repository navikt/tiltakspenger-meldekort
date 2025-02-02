import { SsrRenderer } from '@ssr/htmlRenderer';
import { Router, Request } from 'express';
import { SiteRoutePath, SiteRouteProps } from '@client/routing/siteRouteConfigs';
import { appConfig } from '@appConfig';
import { joinPaths } from '@utils';

type Props = {
    router: Router;
    renderer: SsrRenderer;
};

export class SiteRouter {
    private router: Router;
    private readonly renderer: SsrRenderer;

    constructor({ router, renderer }: Props) {
        this.router = router;
        this.renderer = renderer;
    }

    public handle<Path extends SiteRoutePath>(
        path: Path,
        fetcher: (req: Request) => Promise<SiteRouteProps<Path>>
    ) {
        const fullPath = joinPaths(appConfig.basePath, path);
        const dataPath = joinPaths(path, 'data');

        this.router.get(path, async (req, res) => {
            const props = await fetcher(req);
            const html = await this.renderer(fullPath, { initialProps: props, initialRoute: path });
            res.send(html);
        });

        this.router.get(dataPath, async (req, res) => {
            const props = await fetcher(req);
            res.json(props);
        });
    }
}
