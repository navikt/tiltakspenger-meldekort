import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AppContext } from '@routing/appContext.ts';
import { Router } from 'wouter';

const parseAppProps = (): AppContext => {
    try {
        const contextElement = document.getElementById('app-context')!!;
        return JSON.parse(contextElement.innerText);
    } catch (e) {
        console.error(`Failed to parse app context - ${e}`);
        return { route: 'notFound', props: {} };
    }
};

ReactDOM.hydrateRoot(
    document.getElementById('root')!,
    <React.StrictMode>
        <Router base={import.meta.env.BASE_URL}>
            <App {...parseAppProps()} />
        </Router>
    </React.StrictMode>
);
