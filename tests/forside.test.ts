import test, { expect } from '@playwright/test';
import { getTekst } from '../src/tekster/tekster';
import { axeTestUtenDekoratøren, klikkCookieBanner, testsBaseUrl } from './helpers/utils';

test.beforeEach(async ({ page }) => {
    await page.goto(`${testsBaseUrl}`);
    await klikkCookieBanner(page);
});

test('Kan navigere til meldekort utfyllingen etter bekreftelse', async ({ page }) => {
    const startUtfyllingKnapp = page.getByRole('button', {
        name: getTekst({ id: 'startUtfylling' }),
    });
    const bekreftCheckbox = page.getByRole('checkbox', {
        name: getTekst({ id: 'forsideBekrefter' }),
    });
    const bekreftVarsel = page.getByText(getTekst({ id: 'forsideBekrefterFeil' }));

    await expect(startUtfyllingKnapp).toBeVisible();

    await startUtfyllingKnapp.click();
    await expect(bekreftVarsel).toBeVisible();
    await expect(page).toHaveURL(testsBaseUrl);

    await bekreftCheckbox.click();
    await expect(bekreftVarsel).not.toBeVisible();

    await startUtfyllingKnapp.click();
    await expect(page).toHaveURL(/fraver$/);
});

test('Skal ikke ha UU-feil', async ({ page }) => {
    await axeTestUtenDekoratøren(page, 'Forsiden');
});
