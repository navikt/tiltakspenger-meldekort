import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AppProps } from '@appProps.ts';

const parseAppProps = (): AppProps => {
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
        <App {...parseAppProps()} />
    </React.StrictMode>
);
