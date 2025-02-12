import { test, expect } from './helpers/fixtures';
import { testsBaseUrl } from './helpers/utils';
import { getTekst } from '../src/tekster/tekster';
import { Page } from '@playwright/test';

// TODO: disse testene er avhengig av mock-dataene fra demo-modusen til appen
// Burde ha mock-data som defineres i testene

test.describe('Kan fylle ut og sende inn meldekortet', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${testsBaseUrl}/mitt_meldekort/fyll-ut`);
    });

    test('Kan ikke gå videre uten å velge fravær/ikke fravær', async ({ page }) => {
        const nesteKnapp = page.getByRole('button', { name: getTekst({ id: 'neste' }) });
        const ikkeValgtVarsel = page.getByText(getTekst({ id: 'deltattStegFraværIkkeValgt' }));

        await nesteKnapp.click();
        await expect(ikkeValgtVarsel).toBeVisible();
    });

    test('Kan ikke gå videre med for mange dager utfylt', async ({ page }) => {
        const forMangeDagerVarsel = page.getByText(getTekst({ id: 'forMangeDagerEnkel' }));

        await fyllUtDeltattSteg(page, false, 10);

        await expect(forMangeDagerVarsel).toBeVisible();
    });

    test('Går til send-inn med akseptabelt antall dager utfylt og ingen fravær valgt', async ({
        page,
    }) => {
        await fyllUtDeltattSteg(page, false, 8);

        const sendInnKnapp = page.getByRole('button', { name: getTekst({ id: 'sendInn' }) });

        await expect(sendInnKnapp).toBeVisible();
    });

    test('Går til utfylling av fravær dersom fravær er valgt', async ({ page }) => {
        await fyllUtDeltattSteg(page, true, 4);

        const fraværHjelpTittel = page.getByText(getTekst({ id: 'fraværHjelpTittel' }));

        await expect(fraværHjelpTittel).toBeVisible();
    });

    test('Kan fylle ut fravær og gå til send-inn', async ({ page }) => {
        const velgFraværKnapper = page.getByRole('button', {
            name: getTekst({ id: 'fraværPanelRegistrer' }),
            exact: true,
        });
        const fraværModal = page.getByRole('dialog');
        const sykRadio = page.getByRole('radio', {
            name: getTekst({ id: 'fraværModalSykIngress' }),
        });
        const lagreKnapp = page.getByRole('button', {
            name: getTekst({ id: 'lagre' }),
            exact: true,
        });
        const nesteKnapp = page.getByRole('button', {
            name: getTekst({ id: 'neste' }),
            exact: true,
        });
        const sendInnKnapp = page.getByRole('button', { name: getTekst({ id: 'sendInn' }) });

        await fyllUtDeltattSteg(page, true, 4);

        await velgFraværKnapper.nth(0).click();

        await expect(fraværModal).toBeVisible();
        await sykRadio.click();
        await lagreKnapp.click();

        await nesteKnapp.click();

        await expect(sendInnKnapp).toBeVisible();
    });
});

const fyllUtDeltattSteg = async (page: Page, fravær: boolean, antallDager: number) => {
    const nesteKnapp = page.getByRole('button', { name: getTekst({ id: 'neste' }), exact: true });
    const fraværValgRadio = page.getByRole('radio', {
        name: getTekst({ id: fravær ? 'deltattStegFraværJa' : 'deltattStegFraværNei' }),
    });
    const deltattCheckboxes = page.getByRole('checkbox', {
        name: getTekst({ id: 'deltattDagPrefix' }),
    });

    for (let i = 0; i < antallDager; ++i) {
        await deltattCheckboxes.nth(i).click();
    }

    await fraværValgRadio.click();
    await nesteKnapp.click();
};
