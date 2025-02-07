import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AppContext } from '@routing/appContext.ts';
import { Router } from 'wouter';
import { getBaseUrl } from '@utils/urls.ts';

const parseAppContext = (): AppContext => {
    try {
        const contextElement = document.getElementById('app-context')!!;
        return JSON.parse(contextElement.innerText);
    } catch (e) {
        console.error(`Failed to parse app context - ${e}`);
        return {
            initialProps: {},
            initialPath: window.location.pathname,
            error: 'Oi sann, noe gikk galt!',
        };
    }
};

const appContext = parseAppContext();

ReactDOM.hydrateRoot(
    document.getElementById('root')!,
    <React.StrictMode>
        <Router base={getBaseUrl(appContext)}>
            <App {...appContext} />
        </Router>
    </React.StrictMode>
);
