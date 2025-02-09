import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AppContext } from '@routing/appContext.ts';
import { Router } from 'wouter';

const parseAppContext = (): AppContext => {
    try {
        const contextElement = document.getElementById('app-context')!!;
        return JSON.parse(contextElement.innerText);
    } catch (e) {
        console.error(`Failed to parse app context - ${e}`);
        return {
            initialPath: window.location.pathname,
            initialProps: {},
            baseUrl: import.meta.env.BASE_URL,
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
