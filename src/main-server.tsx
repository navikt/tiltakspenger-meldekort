import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '@App';
// import { StaticRouter } from 'react-router-dom/server';
import { AppContext } from '@routing/appContext';

export const render = (url: string, appContext: AppContext) => {
    return renderToString(
        <React.StrictMode>
            {/*<StaticRouter location={url} basename={import.meta.env.BASE_URL}>*/}
                <App {...appContext} />
            {/*</StaticRouter>*/}
        </React.StrictMode>
    );
};
