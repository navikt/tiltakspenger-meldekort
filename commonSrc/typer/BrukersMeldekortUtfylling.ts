import { MeldekortDag } from './MeldekortBruker';
import { Nullable } from '@common/typer/Nullable.ts';

export type MeldekortSteg = 'fravær' | 'lønn' | 'deltatt' | 'oppsummering' | 'kvittering';

export interface MeldekortUtfyltDTO {
    id: string;
    dager: MeldekortDag[];
    locale: Nullable<string>;
}

/**
 * Rekkefølgen her er viktig for å vite hvor langt brukeren har kommet i utfyllingen. Brukes for å redirecte
 * brukeren dersom de endrer URLen eller maniuplerer nettleserhistorikken.
 */
export const STEG_REKKEFOLGE: MeldekortSteg[] = [
    'fravær',
    'lønn',
    'deltatt',
    'oppsummering',
] as const;
