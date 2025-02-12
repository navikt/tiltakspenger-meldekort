import { test as base } from '@playwright/test';
import { klikkCookieBanner, testsBaseUrl } from './utils';

export const test = base.extend({
    page: async ({ page }, use) => {
        await page.goto(testsBaseUrl);

        await klikkCookieBanner(page);

        use(page);
    },
});

export { expect } from '@playwright/test';
