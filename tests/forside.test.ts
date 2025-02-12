import { getTekst } from '../src/tekster/tekster';
import { test, expect } from './helpers/fixtures';
import { testsBaseUrl } from './helpers/utils';

test('Kan navigere til fyll-ut etter bekreftelse', async ({ page }) => {
    const nesteKnapp = page.getByRole('button', { name: getTekst({ id: 'neste' }) });
    const bekreftCheckbox = page.getByRole('checkbox', {
        name: getTekst({ id: 'forsideBekrefter' }),
    });
    const bekreftVarsel = page.getByText(getTekst({ id: 'forsideBekrefterFeil' }));

    await expect(nesteKnapp).toBeVisible();

    await nesteKnapp.click();
    await expect(bekreftVarsel).toBeVisible();
    await expect(page).toHaveURL(testsBaseUrl);

    await bekreftCheckbox.click();
    await expect(bekreftVarsel).not.toBeVisible();

    await nesteKnapp.click();
    await expect(page).toHaveURL(/fyll-ut$/);
});
