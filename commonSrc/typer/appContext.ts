import React from 'react';

export type SiteRouteComponentProps = React.ComponentProps<any>;

export type AppContext = {
    initialPath: string;
    initialProps: SiteRouteComponentProps;
    baseUrl: string;
    status: number;
};
