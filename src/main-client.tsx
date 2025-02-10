import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AppContext } from '@routing/appContext.ts';
import { Router } from 'wouter';
import { appConfig } from '@appConfig.ts';

const parseAppContext = (): AppContext => {
    try {
        const contextElement = document.getElementById('app-context')!!;
        return JSON.parse(contextElement.innerText);
    } catch (e) {
        console.error(`Failed to parse app context - ${e}`);
        return {
            initialPath: window.location.pathname,
            initialProps: {},
            baseUrl: appConfig.baseUrl,
            status: 500,
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
    </React.StrictMode>
);
