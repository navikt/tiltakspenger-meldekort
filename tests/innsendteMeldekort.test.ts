import test, { expect } from '@playwright/test';
import { klikkCookieBanner, testsBaseUrl } from './helpers/utils';
import { nyUtfylltMeldekort } from './test-data-generators/MeldekortTestData';
import { nyMeldekortForKjedeResponse } from './test-data-generators/MeldeperiodeKjedeTestData';

const meldekort1 = nyUtfylltMeldekort({
    id: 'mk1',
    kjedeId: 'mpk_123',
    periode: { fraOgMed: '2025-07-07', tilOgMed: '2025-07-20' },
    uke1: 28,
    uke2: 29,
});
const meldekort2 = nyUtfylltMeldekort({
    id: 'mk2',
    kjedeId: 'mpk_456',
    periode: { fraOgMed: '2025-07-21', tilOgMed: '2025-08-03' },
    innsendt: '2025-08-03T12:00:00Z',
    uke1: 30,
    uke2: 31,
});
const meldekort3 = nyUtfylltMeldekort({
    id: 'mk3',
    kjedeId: 'mpk_456',
    periode: { fraOgMed: '2025-07-21', tilOgMed: '2025-08-03' },
    innsendt: '2025-08-04T12:00:00Z',
    uke1: 30,
    uke2: 31,
});

const meldekortForKjede2 = nyMeldekortForKjedeResponse({
    kjedeId: 'mpk_456',
    periode: { fraOgMed: '2025-07-21', tilOgMed: '2025-08-03' },
    meldekort: [meldekort2, meldekort3],
});

test('navigasjon til startisden fungerer', async ({ page }) => {
    await page.goto(`${testsBaseUrl}/innsendte`);
    await klikkCookieBanner(page);
    await page.getByText('Tilbake til startsiden for meldekort').click();
    await page.waitForURL(`${testsBaseUrl}/`);
    expect(page.url()).toBe(`${testsBaseUrl}/`);
});

test('navigasjon til gamle meldekortløsning fungerer', async ({ page }) => {
    await page.goto(`${testsBaseUrl}/innsendte`);
    await klikkCookieBanner(page);
    await page.getByText('gamle løsningen for meldekort').click();
    expect(page.url()).toContain(`idporten`);
});

test('lister opp kun siste innsendte meldekort for en gitt kjede', async ({ page }) => {
    await page.route('*/**/innsendte/data', async (route) => {
        await route.fulfill({
            json: {
                meldekort: [meldekort2, meldekort3],
                arenaMeldekortStatus: 'HAR_IKKE_MELDEKORT',
            },
        });
    });

    await page.goto(`${testsBaseUrl}/innsendte`);
    await klikkCookieBanner(page);

    await page.getByText('Meldekort uke 30 - 31').click();

    expect(page.getByText(/Innsendt 4\. august 2025/)).toBeVisible();
});

test('ulike kjeder blir listet opp separat', async ({ page }) => {
    await page.route('*/**/innsendte/data', async (route) => {
        await route.fulfill({
            json: {
                meldekort: [meldekort1, meldekort2],
                arenaMeldekortStatus: 'HAR_IKKE_MELDEKORT',
            },
        });
    });

    await page.goto(`${testsBaseUrl}/innsendte`);
    await klikkCookieBanner(page);

    expect(page.getByText('Meldekort uke 28 - 29')).toBeVisible();
    expect(page.getByText('Meldekort uke 30 - 31')).toBeVisible();
});

test('navigasjon til tidligere meldekort for en kjede fungerer', async ({ page }) => {
    await page.route('*/**/innsendte/data', async (route) => {
        await route.fulfill({
            json: {
                meldekort: [meldekort2, meldekort3],
                arenaMeldekortStatus: 'HAR_IKKE_MELDEKORT',
            },
        });
    });

    await page.route('*/**/kjede/mpk_456/data', async (route) => {
        await route.fulfill({
            json: {
                kjedeId: meldekortForKjede2.kjedeId,
                periode: meldekortForKjede2.periode,
                meldekort: meldekortForKjede2.meldekort,
            },
        });
    });

    await page.goto(`${testsBaseUrl}/innsendte`);
    await klikkCookieBanner(page);

    await page.getByText('Meldekort uke 30 - 31').click();

    await page
        .getByText('Se tidligere meldekort som har blitt sendt inn for samme perioden')
        .click();

    expect(page.url()).toContain(`/kjede/mpk_456`);
});

test('en kjede med kun 1 innsendt meldekort viser ikke lenke til tidligere innsendte meldekort', async ({
    page,
}) => {
    await page.route('*/**/innsendte/data', async (route) => {
        await route.fulfill({
            json: {
                meldekort: [meldekort1],
                arenaMeldekortStatus: 'HAR_IKKE_MELDEKORT',
            },
        });
    });

    await page.goto(`${testsBaseUrl}/innsendte`);
    await klikkCookieBanner(page);

    await page.getByText('Meldekort uke 28 - 29').click();

    await expect(page.getByText(/Innsendt 15\. januar 2023/)).toBeVisible();

    expect(
        page.getByText('Se tidligere meldekort som har blitt sendt inn for samme perioden'),
    ).not.toBeVisible();
});
