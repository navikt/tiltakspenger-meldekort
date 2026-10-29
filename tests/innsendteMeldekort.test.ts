import { expect, test } from './helpers/mockApi';
import { gåTil, tekst, testsBaseUrl } from './helpers/utils';
import { nyUtfylltMeldekort } from './test-data-generators/MeldekortTestData';

const meldekortKjede1 = nyUtfylltMeldekort({
    id: 'mk1',
    kjedeId: 'mpk_123',
    fraOgMed: '2025-07-07',
    tilOgMed: '2025-07-20',
    uke1: 28,
    uke2: 29,
});
const meldekortKjede2 = nyUtfylltMeldekort({
    id: 'mk2',
    kjedeId: 'mpk_456',
    fraOgMed: '2025-07-21',
    tilOgMed: '2025-08-03',
    innsendt: '2025-08-03T12:00:00Z',
    uke1: 30,
    uke2: 31,
});
const korrigertMeldekortKjede2 = nyUtfylltMeldekort({
    ...meldekortKjede2,
    id: 'mk3',
    versjon: 2,
    innsendt: '2025-08-04T12:00:00Z',
});

const tidligereMeldekortLenkeTekst = tekst('tidligereMeldekortForPeriode');

test('navigasjon til startsiden fungerer', async ({ page, mockApi }) => {
    await mockApi({ innsendte: [meldekortKjede1] });
    await gåTil(page, '/innsendte');

    await page.getByText(tekst('innsendteTilbake')).click();

    await expect(page).toHaveURL(`${testsBaseUrl}/`);
});

test('navigasjon til gamle meldekortløsning fungerer', async ({ page, mockApi }) => {
    await mockApi({ innsendte: [meldekortKjede1] });
    await gåTil(page, '/innsendte');

    await page.getByText(tekst('alleArenaLenke')).click();

    await expect(page).toHaveURL(/idporten/);
});

test('lister opp kun siste innsendte meldekort for en gitt kjede', async ({ page, mockApi }) => {
    await mockApi({ innsendte: [meldekortKjede2, korrigertMeldekortKjede2] });
    await gåTil(page, '/innsendte');

    await page.getByText('Meldekort uke 30 - 31').click();

    await expect(page.getByText(/Innsendt 4\. august 2025/)).toBeVisible();
});

test('ulike kjeder blir listet opp separat', async ({ page, mockApi }) => {
    await mockApi({ innsendte: [meldekortKjede1, meldekortKjede2] });
    await gåTil(page, '/innsendte');

    await expect(page.getByText('Meldekort uke 28 - 29')).toBeVisible();
    await expect(page.getByText('Meldekort uke 30 - 31')).toBeVisible();
});

test('navigasjon til tidligere meldekort for en kjede fungerer', async ({ page, mockApi }) => {
    await mockApi({
        innsendte: [meldekortKjede2, korrigertMeldekortKjede2],
        kjeder: [
            {
                kjedeId: meldekortKjede2.kjedeId,
                periode: { fraOgMed: meldekortKjede2.fraOgMed, tilOgMed: meldekortKjede2.tilOgMed },
                meldekort: [meldekortKjede2, korrigertMeldekortKjede2],
            },
        ],
    });
    await gåTil(page, '/innsendte');

    await page.getByText('Meldekort uke 30 - 31').click();
    await page.getByText(tidligereMeldekortLenkeTekst).click();

    await expect(page).toHaveURL(`${testsBaseUrl}/innsendte/kjede/${meldekortKjede2.kjedeId}`);
});

test('en kjede med kun 1 innsendt meldekort viser ikke lenke til tidligere innsendte meldekort', async ({
    page,
    mockApi,
}) => {
    await mockApi({ innsendte: [meldekortKjede1] });
    await gåTil(page, '/innsendte');

    await page.getByText('Meldekort uke 28 - 29').click();

    await expect(page.getByText(/Innsendt 15\. januar 2023/)).toBeVisible();
    await expect(page.getByText(tidligereMeldekortLenkeTekst)).toBeHidden();
});
