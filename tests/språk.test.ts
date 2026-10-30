import { Page } from '@playwright/test';
import { expect, test } from './helpers/mockApi';
import { gåTil, testsBaseUrl } from './helpers/utils';
import { getTekst } from '../packages/client/src/tekster/tekster';
import { TekstId, TeksterPropsMedLocale } from '../packages/client/src/tekster/typer';
import { TeksterLocale } from '../packages/common/src/locale';
import { nyMeldekortTilUtfylling } from './test-data-generators/MeldekortTestData';
import { nyMeldekortBruker } from './test-data-generators/MeldekortBrukerTestData';

const meldekort = nyMeldekortTilUtfylling();

const tekstPå = (locale: TeksterLocale, id: TekstId) =>
    getTekst({ id, locale } as TeksterPropsMedLocale<TekstId>);

const knapp = (page: Page, locale: TeksterLocale, id: TekstId) =>
    page.getByRole('button', { name: tekstPå(locale, id), exact: true });

const radio = (page: Page, locale: TeksterLocale, id: TekstId) =>
    page.getByRole('radio', { name: tekstPå(locale, id) });

const forventSpråk = async (page: Page, locale: TeksterLocale) => {
    await expect(knapp(page, locale, 'startUtfylling')).toBeVisible();
    await expect(dekoratørensValgteSpråk(page)).toHaveAttribute('data-locale', locale);
};

const dekoratørensValgteSpråk = (page: Page) =>
    page.locator('#decorator-language-menu [aria-current="true"]');

const velgSpråkIDekoratøren = async (page: Page, locale: TeksterLocale) => {
    await page.getByRole('button', { name: 'Språk/Language' }).click();
    await page.locator(`#decorator-language-menu [data-locale="${locale}"]`).click();
};

// Klientside-navigering uten å laste siden på nytt
const navigerKlientside = (page: Page, path: string) =>
    page.evaluate((url) => history.pushState(null, '', url), `${testsBaseUrl}${path}`);

test.beforeEach(async ({ mockApi }) => {
    await mockApi({
        bruker: nyMeldekortBruker({ nesteMeldekort: meldekort }),
        meldekort: [meldekort],
    });
});

test.describe('Språket bestemmes av URL-en', () => {
    for (const { locale, path } of [
        { locale: 'nb', path: '/' },
        { locale: 'en', path: '/en' },
    ] as const) {
        test(`${path} gir ${locale} fra serveren, også før hydrering`, async ({ page }) => {
            const html = await (await page.request.get(`${testsBaseUrl}${path}`)).text();
            const annetSpråk = locale === 'nb' ? 'en' : 'nb';

            expect(html).toContain(tekstPå(locale, 'startUtfylling'));
            expect(html).not.toContain(tekstPå(annetSpråk, 'startUtfylling'));
        });

        test(`${path} gir ${locale} i både innhold og dekoratør`, async ({ page }) => {
            await gåTil(page, path);
            await forventSpråk(page, locale);
        });
    }

    test('Feilsider under /en får engelsk dekoratør', async ({ page }) => {
        const respons = await page.goto(`${testsBaseUrl}/finnes-ikke/en`);

        expect(respons?.status()).toBe(404);
        await expect(dekoratørensValgteSpråk(page)).toHaveAttribute('data-locale', 'en');
    });
});

test.describe('Språkvelgeren i dekoratøren', () => {
    test('bytter URL og språk uten å laste siden på nytt', async ({ page }) => {
        await gåTil(page, '/');
        await page.evaluate(
            () => ((window as { ikkeLastetPåNytt?: boolean }).ikkeLastetPåNytt = true),
        );

        await velgSpråkIDekoratøren(page, 'en');
        await expect(page).toHaveURL(`${testsBaseUrl}/en`);
        await forventSpråk(page, 'en');

        await velgSpråkIDekoratøren(page, 'nb');
        await expect(page).toHaveURL(`${testsBaseUrl}/`);
        await forventSpråk(page, 'nb');

        expect(
            await page.evaluate(() => (window as { ikkeLastetPåNytt?: boolean }).ikkeLastetPåNytt),
        ).toBe(true);
    });

    test('beholder siden man står på', async ({ page }) => {
        await gåTil(page, `/${meldekort.id}/fraver`);

        await velgSpråkIDekoratøren(page, 'en');

        await expect(page).toHaveURL(`${testsBaseUrl}/${meldekort.id}/fraver/en`);
        await expect(radio(page, 'en', 'fraværHarHattFraværSvarJa')).toBeVisible();
    });

    test('beholder det som er fylt ut', async ({ page }) => {
        await gåTil(page, `/${meldekort.id}/fraver`);
        await radio(page, 'nb', 'fraværHarHattFraværSvarJa').check();

        await velgSpråkIDekoratøren(page, 'en');

        await expect(radio(page, 'en', 'fraværHarHattFraværSvarJa')).toBeChecked();
    });
});

test.describe('Nettleserhistorikk', () => {
    test('språket følger URL-en ved navigering tilbake og frem', async ({ page }) => {
        await gåTil(page, '/');
        await velgSpråkIDekoratøren(page, 'en');
        await forventSpråk(page, 'en');

        await page.goBack();
        await expect(page).toHaveURL(`${testsBaseUrl}/`);
        await forventSpråk(page, 'nb');

        await page.goForward();
        await expect(page).toHaveURL(`${testsBaseUrl}/en`);
        await forventSpråk(page, 'en');
    });

    test('språket oppdateres ved klientside-navigering som ikke går via språkvelgeren', async ({
        page,
    }) => {
        await gåTil(page, '/');

        await navigerKlientside(page, '/en');
        await forventSpråk(page, 'en');

        await navigerKlientside(page, '/');
        await forventSpråk(page, 'nb');
    });
});

test.describe('Navigering i appen beholder språket', () => {
    test('knapper i utfyllingen', async ({ page }) => {
        await gåTil(page, '/en');

        await page.getByRole('checkbox', { name: tekstPå('en', 'forsideBekrefter') }).click();
        await knapp(page, 'en', 'startUtfylling').click();
        await expect(page).toHaveURL(`${testsBaseUrl}/${meldekort.id}/fraver/en`);

        await radio(page, 'en', 'fraværHarHattFraværSvarNei').click();
        await knapp(page, 'en', 'neste').click();
        await expect(page).toHaveURL(`${testsBaseUrl}/${meldekort.id}/lonn/en`);

        await knapp(page, 'en', 'forrige').click();
        await expect(page).toHaveURL(`${testsBaseUrl}/${meldekort.id}/fraver/en`);
    });

    test('lenker', async ({ page }) => {
        await gåTil(page, '/en');

        await page.getByRole('link', { name: tekstPå('en', 'forsideSeOgEndre') }).click();

        await expect(page).toHaveURL(`${testsBaseUrl}/innsendte/en`);
        await expect(page.getByText(tekstPå('en', 'innsendteTittel')).first()).toBeVisible();
    });
});
