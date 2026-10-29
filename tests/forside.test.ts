import { expect, test } from './helpers/mockApi';
import {
    axeTestUtenDekoratøren,
    checkbox,
    gåTil,
    knapp,
    tekst,
    testsBaseUrl,
} from './helpers/utils';
import { nyMeldekortTilUtfylling } from './test-data-generators/MeldekortTestData';
import { nyMeldekortBruker } from './test-data-generators/MeldekortBrukerTestData';

const meldekort = nyMeldekortTilUtfylling();

test.beforeEach(async ({ page, mockApi }) => {
    await mockApi({
        bruker: nyMeldekortBruker({ nesteMeldekort: meldekort }),
        meldekort: [meldekort],
    });
    await gåTil(page, '/');
});

test('Kan navigere til meldekort utfyllingen etter bekreftelse', async ({ page }) => {
    const startUtfyllingKnapp = knapp(page, 'startUtfylling');
    const bekreftVarsel = page.getByText(tekst('forsideBekrefterFeil'));

    await startUtfyllingKnapp.click();
    await expect(bekreftVarsel).toBeVisible();
    await expect(page).toHaveURL(`${testsBaseUrl}/`);

    await checkbox(page, 'forsideBekrefter').click();
    await expect(bekreftVarsel).toBeHidden();

    await startUtfyllingKnapp.click();
    await expect(page).toHaveURL(`${testsBaseUrl}/${meldekort.id}/fraver`);
});

test('Skal ikke ha UU-feil', async ({ page }) => {
    await axeTestUtenDekoratøren(page, 'Forsiden');
});
