import { MeldekortDag } from './MeldekortBruker';
import { Periode } from './periode';

export interface MeldeperiodeForPeriodeResponse {
    meldeperiodeId: string;
    kjedeId: string;
    dager: MeldekortDag[];
    periode: Periode;
    mottattTidspunktSisteMeldekort: string;
    maksAntallDagerForPeriode: number;
}
