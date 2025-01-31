import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from '@App';
import { AppProps } from '@appProps.ts';

export const render = (url: string, appContext: AppProps) => {
    return renderToString(
        <React.StrictMode>
            <App {...appContext} />
        </React.StrictMode>
    );
};
