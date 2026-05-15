import { Meldekort } from './MeldekortBruker';
import { Nullable } from './Nullable';
import { Periode } from './periode';

export interface MeldekortForKjedeResponse {
    kjedeId: Nullable<string>;
    periode: Nullable<Periode>;
    meldekort: Meldekort[];
}
