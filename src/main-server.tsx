import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '@App';
import { AppContext } from '@appContext.ts';
import { StaticRouter } from 'react-router';

export const render = (url: string, appContext: AppContext) => {
    return renderToString(
        <React.StrictMode>
            <StaticRouter location={url} basename={import.meta.env.BASE_URL}>
                <App {...appContext} />
            </StaticRouter>
        </React.StrictMode>
    );
};
