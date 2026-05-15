import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AppContext } from '@meldekort/common/typer/appContext';
import { Router } from 'wouter';
import { appConfig } from '@meldekort/common/appConfig';

const parseAppContext = (): AppContext => {
    try {
        const contextElement = document.getElementById('app-context')!;
        return JSON.parse(contextElement.innerText);
    } catch (e) {
        console.error(`Failed to parse app context - ${e}`);
        return {
            initialPath: window.location.pathname,
            initialProps: {},
            baseUrl: appConfig.baseUrl,
            status: 500,
            språk: 'nb',
        };
    }
};

const appContext = parseAppContext();

ReactDOM.hydrateRoot(
    document.getElementById('root')!,
    <React.StrictMode>
        <Router base={appContext.baseUrl}>
            <App {...appContext} />
        </Router>
    </React.StrictMode>,
);
