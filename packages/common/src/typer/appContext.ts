import { TeksterLocale } from '../locale';

// Komponent-props er bevisst bredt typet her — common skal være UI-agnostisk
// og ikke avhenge av react/preact.
export type SiteRouteComponentProps = Record<string, unknown>;

export type AppContext = {
    initialPath: string;
    initialProps: SiteRouteComponentProps;
    baseUrl: string;
    status: number;
    språk: TeksterLocale;
};
