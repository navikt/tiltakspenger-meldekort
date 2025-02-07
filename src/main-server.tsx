import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '@App';
import { AppContext } from '@routing/appContext';
import { Router, BaseLocationHook } from 'wouter';
import { getBaseUrl } from '@utils/urls.ts';

export const render = (url: string, appContext: AppContext) => {
    const ssrLocationHook: BaseLocationHook = () => [url, () => {}];

    return renderToString(
        <React.StrictMode>
            <Router base={getBaseUrl(appContext)} ssrPath={url} hook={ssrLocationHook}>
                <App {...appContext} />
            </Router>
        </React.StrictMode>
    );
};
