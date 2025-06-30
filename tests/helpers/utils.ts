import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { AxeResults } from 'axe-core';
import { expect } from './fixtures';

export const testsBaseUrl = 'http://localhost:3050/tiltakspenger/meldekort/demo';

// Dekoratørens cookie banner legger seg noen ganger over elementer på siden, må sørge for å klikke den vekk
export const klikkCookieBanner = async (page: Page) =>
    page.getByTestId('consent-banner-refuse-optional').click();

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
