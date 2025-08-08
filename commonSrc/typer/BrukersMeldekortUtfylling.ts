import { MeldekortDag } from './MeldekortBruker';

export type MeldekortSteg = 'fravær' | 'lønn' | 'deltatt' | 'oppsummering' | 'kvittering';

export interface BrukersMeldekortUtfylling {
    id: string;
    dager: MeldekortDag[];
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
