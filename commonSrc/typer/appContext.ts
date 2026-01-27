import React from 'react';
import { TeksterLocale } from '@tekster/typer.ts';

export type SiteRouteComponentProps = React.ComponentProps<any>;

export type AppContext = {
    initialPath: string;
    initialProps: SiteRouteComponentProps;
    baseUrl: string;
    status: number;
    språk: TeksterLocale;
};
