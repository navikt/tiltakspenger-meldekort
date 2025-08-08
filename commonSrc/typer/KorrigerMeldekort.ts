import { MeldekortDag } from './MeldekortBruker';

export interface KorrigerMeldekortRequest {
    meldekortId: string;
    korrigerteDager: MeldekortDag[];
}
