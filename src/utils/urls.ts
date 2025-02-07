import { AppContext } from '@routing/appContext';

export const stripTrailingSlash = (path: string) => path.replace(/\/$/, '');

export const getBaseUrl = (appContext: AppContext) =>
    `${import.meta.env.BASE_URL}${appContext.demo ? '/demo' : ''}`;
