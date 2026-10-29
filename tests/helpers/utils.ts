import { expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { AxeResults } from 'axe-core';
import { getTekst, getTekster } from '../../packages/client/src/tekster/tekster';
import { TekstId, TeksterPropsMedLocale } from '../../packages/client/src/tekster/typer';

export const testsBaseUrl = 'http://localhost:3050/tiltakspenger/meldekort/demo';

// For tekster uten resolverProps
export const tekst = (id: TekstId) =>
    getTekst({ id, locale: 'nb' } as TeksterPropsMedLocale<TekstId>);

export const tekstSegmenter = (id: TekstId) =>
    getTekster({ id, locale: 'nb' } as TeksterPropsMedLocale<TekstId>);

export const knapp = (page: Page, id: TekstId, exact = true) =>
    page.getByRole('button', { name: tekst(id), exact });

export const radio = (page: Page, id: TekstId) => page.getByRole('radio', { name: tekst(id) });

export const checkbox = (page: Page, id: TekstId) =>
    page.getByRole('checkbox', { name: tekst(id) });

export const lenke = (page: Page, id: TekstId) => page.getByRole('link', { name: tekst(id) });

/**
 * Går til en side relativt til demo-rutene og fjerner cookie-banneret
 */
export const gåTil = async (page: Page, path: string) => {
    await page.goto(`${testsBaseUrl}${path}`);
    await klikkCookieBanner(page);
};

// Dekoratørens cookie banner legger seg noen ganger over elementer på siden, må sørge for å klikke den vekk
export const klikkCookieBanner = async (page: Page) => {
    const cookieBannerRefuseCookiesButton = page
        .getByTestId('consent-banner-refuse-optional')
        .first();
    try {
        if (await cookieBannerRefuseCookiesButton.isVisible()) {
            await cookieBannerRefuseCookiesButton.click();
        }
    } catch {
        // Ignore errors if the banner is not interactable
    }
};

export const axeTestUtenDekoratøren = async (page: Page, failMsg: string) => {
    const result = await new AxeBuilder({ page })
        .disableRules(['svg-img-alt'])
        .exclude('#decorator-header')
        .exclude('#decorator-footer')
        .analyze();

    expect(result.violations.length, {
        message: formatterAxeFeil(failMsg, result),
    }).toEqual(0);
};

export const formatterAxeFeil = (msg: string, result: AxeResults) => {
    return `UU-feil - ${msg} - ${JSON.stringify(result.violations, undefined, 2)}`;
};
