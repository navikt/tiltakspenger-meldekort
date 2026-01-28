import React from 'react';
import { TeksterLocale } from '@common/typer/TeksterLocale';

export type SiteRouteComponentProps = React.ComponentProps<any>;

export type AppContext = {
    initialPath: string;
    initialProps: SiteRouteComponentProps;
    baseUrl: string;
    status: number;
    språk: TeksterLocale;
};
