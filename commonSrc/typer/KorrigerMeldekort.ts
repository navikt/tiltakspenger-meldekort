import { MeldekortDag } from './meldekort-utfylling';

export interface KorrigerMeldekortRequest {
    meldekortId: string;
    korrigerteDager: MeldekortDag[];
}
