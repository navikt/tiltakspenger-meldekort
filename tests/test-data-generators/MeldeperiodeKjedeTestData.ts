import { Meldekort } from '../../packages/common/src/typer/MeldekortBruker';
import { MeldekortForKjedeResponse } from '../../packages/common/src/typer/MeldeperiodeKjede';
import { Nullable } from '../../packages/common/src/typer/Nullable';
import { Periode } from '../../packages/common/src/typer/periode';
import { nyMeldekortDagerForPeriode, nyUtfylltMeldekort } from './MeldekortTestData';

/**
 * Hvis et av feltene er null / tom, burde resten være null / tom
 */
export const nyMeldekortForKjedeResponse = ({
    kjedeId = 'mpk_123',
    periode = { fraOgMed: '2022-01-01', tilOgMed: '2022-01-31' },
    meldekort = [
        nyUtfylltMeldekort({
            kjedeId: kjedeId!,
            dager: nyMeldekortDagerForPeriode({
                fraOgMed: periode!.fraOgMed,
                tilOgMed: periode!.tilOgMed,
            }),
        }),
    ],
}: {
    kjedeId: Nullable<string>;
    periode: Nullable<Periode>;
    meldekort: Meldekort[];
}): MeldekortForKjedeResponse => {
    return {
        kjedeId,
        periode,
        meldekort,
    };
};
