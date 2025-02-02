import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '@App';
import { AppContext } from '@routing/appContext';
import { Router, BaseLocationHook } from 'wouter';

export const render = (url: string, appContext: AppContext) => {
    const ssrLocationHook: BaseLocationHook = () => [url, () => {}];

    return renderToString(
        <React.StrictMode>
            <Router base={import.meta.env.BASE_URL} ssrPath={url} hook={ssrLocationHook}>
                <App {...appContext} />
            </Router>
        </React.StrictMode>
    );
};
