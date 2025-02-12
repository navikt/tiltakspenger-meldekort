import { Page } from '@playwright/test';

export const testsBaseUrl = 'http://localhost:3050/tiltakspenger/meldekort/demo';

// Dekoratørens cookie banner legger seg noen ganger over elementer på siden, må sørge for å klikke den vekk
export const klikkCookieBanner = async (page: Page) =>
    page.getByRole('button', { name: 'Bare nødvendige' }).click();
