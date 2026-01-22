import { MeldekortDag } from '@common/typer/MeldekortBruker.ts';

export const hentAktuelleDager = (dager: MeldekortDag[], kanSendeHelg: boolean): MeldekortDag[] => {
    return kanSendeHelg ? dager : [...dager.slice(0, 5), ...dager.slice(7, 12)];
};
