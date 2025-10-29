import test, { expect } from '@playwright/test';
import { klikkCookieBanner, testsBaseUrl } from './helpers/utils';
import { MeldekortDagStatus } from '../commonSrc/typer/MeldekortBruker';
import { nyMeldekortDag, nyUtfylltMeldekort } from './test-data-generators/MeldekortTestData';
import { nyMeldeperiodeForPeriodeResponse } from './test-data-generators/MeldeperiodeTestData';
import { getTekst } from '../src/tekster/tekster';

const førsteMeldekort = nyUtfylltMeldekort({});

test.beforeEach(async ({ page }) => {
    await page.route('*/**/innsendte/data', async (route) => {
        await route.fulfill({
            json: { meldekort: [førsteMeldekort], arenaMeldekortStatus: 'HAR_IKKE_MELDEKORT' },
        });
    });

    await page.route('*/**/api/meldeperiode', async (route) => {
        await route.fulfill({
            json: nyMeldeperiodeForPeriodeResponse({}),
        });
    });

    await page.route('*/**/12345/korrigering/data', async (route) => {
        await route.fulfill({ json: { meldekort: førsteMeldekort } });
    });
    await page.route('*/**/12345/korrigering/oppsummering/data', async (route) => {
        await route.fulfill({ json: { originaleMeldekort: førsteMeldekort } });
    });
    await page.route('*/**/12345/korrigering/kvittering/data', async (route) => {
        await route.fulfill({ json: { originaleMeldekort: førsteMeldekort } });
    });
});

test('kan korrigere meldekort', async ({ page }) => {
    await page.route(`*/**/api/korriger`, async (route) => {
        await route.fulfill({ status: 200 });
    });

    await page.route('*/**/api/meldeperiode', async (route) => {
        await route.fulfill({
            json: nyMeldeperiodeForPeriodeResponse({}),
        });
    });

    await page.goto(`${testsBaseUrl}/innsendte`);
    await klikkCookieBanner(page);
    //Skal kunne navigere seg til korrigering
    await page.getByText('Meldekort uke 1 - 2').click();
    await page.getByText(getTekst({ id: 'endreMeldekort' })).click();

    await page.waitForURL('**/12345/korrigering');
    expect(page.url()).toContain('/12345/korrigering');
    // Endrer på statuser for uke 1
    await page.selectOption('#select-2023-01-02', getTekst({ id: 'statusDeltatt' }));
    //tirsdag 3. er allerede satt som deltatt
    await page.selectOption('#select-2023-01-04', getTekst({ id: 'statusDeltatt' }));
    await page.selectOption('#select-2023-01-05', getTekst({ id: 'statusDeltatt' }));
    // fredag 6. er allerede syk
    // Endrer på statuser for uke 2
    await page.selectOption('#select-2023-01-09', getTekst({ id: 'statusDeltattMedLønn' }));
    await page.selectOption('#select-2023-01-10', getTekst({ id: 'statusSyktBarn' }));
    await page.selectOption('#select-2023-01-11', getTekst({ id: 'statusAnnetFravær' }));
    await page.selectOption('#select-2023-01-12', getTekst({ id: 'statusDeltatt' }));
    await page.selectOption('#select-2023-01-13', getTekst({ id: 'statusGodkjentFravær' }));

    await page.getByText(getTekst({ id: 'neste' })).click();
    expect(page.url()).toContain('/12345/korrigering/oppsummering');
    await page.waitForTimeout(1000); //her skjer det noe rare timing greier når man kjører fra terminalen - å bruke waitForURL her fungerer heller ikke så bra
    // Verifiserer at oppsummeringen viser de endrede statusene
    await expect(
        page.getByText(`Mandag 2. januar: ${getTekst({ id: 'statusDeltatt' })}`),
    ).toBeVisible();
    await expect(
        page.getByText(`Tirsdag 3. januar: ${getTekst({ id: 'statusDeltatt' })}`),
    ).toBeVisible();
    await expect(
        page.getByText(`Onsdag 4. januar: ${getTekst({ id: 'statusDeltatt' })}`),
    ).toBeVisible();
    await expect(
        page.getByText(`Torsdag 5. januar: ${getTekst({ id: 'statusDeltatt' })}`),
    ).toBeVisible();
    await expect(
        page.getByText(`Fredag 6. januar: ${getTekst({ id: 'statusSyk' })}`),
    ).toBeVisible();
    await expect(
        page.getByText(`Mandag 9. januar: ${getTekst({ id: 'statusDeltattMedLønn' })}`),
    ).toBeVisible();
    await expect(
        page.getByText(`Tirsdag 10. januar: ${getTekst({ id: 'statusSyktBarn' })}`),
    ).toBeVisible();
    await expect(
        page.getByText(`Onsdag 11. januar: ${getTekst({ id: 'statusAnnetFravær' })}`),
    ).toBeVisible();
    await expect(
        page.getByText(`Torsdag 12. januar: ${getTekst({ id: 'statusDeltatt' })}`),
    ).toBeVisible();
    await expect(
        page.getByText(`Fredag 13. januar: ${getTekst({ id: 'statusGodkjentFravær' })}`),
    ).toBeVisible();

    await page.getByText('Jeg bekrefter at disse opplysningene stemmer').click();
    await page.getByText('Send meldekortet').click();

    // Verifiserer at vi kommer til bekreftelse
    await page.waitForTimeout(1000); //her skjer det noe rare timing greier når man kjører fra terminalen.
    expect(page.url()).toContain('/12345/korrigering/kvittering');
    expect(page.getByText('Endringer på meldekortet er sendt inn.')).toBeVisible();
});

test.describe('kan avbryte korrigering av et meldekort', () => {
    test('fra korrigering', async ({ page }) => {
        await page.goto(`${testsBaseUrl}/innsendte`);
        await klikkCookieBanner(page);
        //Skal kunne navigere seg til korrigering
        await page.getByText('Meldekort uke 1 - 2').click();
        await page.getByText(getTekst({ id: 'endreMeldekort' })).click();

        await page.waitForURL('**/12345/korrigering');
        expect(page.url()).toContain('/12345/korrigering');
        await page.getByText(getTekst({ id: 'avbrytEndring' })).click();
        expect(page.url()).toBe('http://localhost:3050/tiltakspenger/meldekort/demo/');
    });
    test('fra oppsummering', async ({ page }) => {
        await page.goto(`${testsBaseUrl}/innsendte`);
        await klikkCookieBanner(page);

        await page.getByText('Meldekort uke 1 - 2').click();
        await page.getByText(getTekst({ id: 'endreMeldekort' })).click();
        await page.waitForURL('**/12345/korrigering');
        expect(page.url()).toContain('/12345/korrigering');
        await page.getByText(getTekst({ id: 'neste' })).click();
        expect(page.url()).toContain('/12345/korrigering/oppsummering');
        await page.getByText(getTekst({ id: 'avbrytEndring' })).click();
        expect(page.url()).toBe('http://localhost:3050/tiltakspenger/meldekort/demo/');
    });
});

test('kan ikke sende inn meldekort uten å bekrefte', async ({ page }) => {
    await page.route(`*/**/api/korriger`, async (route) => {
        await route.fulfill({ status: 200 });
    });

    await page.goto(`${testsBaseUrl}/innsendte`);
    await klikkCookieBanner(page);
    //Skal kunne navigere seg til korrigering
    await page.getByText('Meldekort uke 1 - 2').click();
    await page.getByText(getTekst({ id: 'endreMeldekort' })).click();

    await page.waitForURL('**/12345/korrigering');
    expect(page.url()).toContain('/12345/korrigering');
    await page.getByText(getTekst({ id: 'neste' })).click();
    expect(page.url()).toContain('/12345/korrigering/oppsummering');

    // Prøver å sende inn uten å bekrefte
    await page.getByText(getTekst({ id: 'korrigeringSendMeldekortet' })).click();
    await expect(page.getByText('Du må bekrefte for å gå videre')).toBeVisible();
    expect(page.url()).toContain('/12345/korrigering/oppsummering');

    await page.getByText(getTekst({ id: 'oppsummeringBekrefter' })).click();
    await page.getByText('Send meldekortet').click();

    // Verifiserer at vi kommer til bekreftelse
    await page.waitForTimeout(1000); //her skjer det noe rare timing greier når man kjører fra terminalen.
    expect(page.url()).toContain('/12345/korrigering/kvittering');
    await expect(page.getByText('Endringer på meldekortet er sendt inn.')).toBeVisible();
});

test('forrige steg på oppsummering tar deg tilbake til korrigering med den korrigerte dataen', async ({
    page,
}) => {
    await page.goto(`${testsBaseUrl}/innsendte`);
    await klikkCookieBanner(page);
    //Skal kunne navigere seg til korrigering
    await page.getByText('Meldekort uke 1 - 2').click();
    await page.getByText(getTekst({ id: 'endreMeldekort' })).click();

    await page.waitForURL('**/12345/korrigering');
    expect(page.url()).toContain('/12345/korrigering');
    // Endrer på statuser for uke 1
    await page.selectOption('#select-2023-01-02', getTekst({ id: 'statusDeltatt' }));
    await page.selectOption('#select-2023-01-04', getTekst({ id: 'statusDeltatt' }));
    await page.selectOption('#select-2023-01-05', getTekst({ id: 'statusDeltatt' }));
    await page.selectOption('#select-2023-01-06', getTekst({ id: 'statusDeltatt' }));
    // Endrer på statuser for uke 2
    await page.selectOption('#select-2023-01-09', getTekst({ id: 'statusDeltattMedLønn' }));
    await page.selectOption('#select-2023-01-10', getTekst({ id: 'statusSyktBarn' }));
    await page.selectOption('#select-2023-01-11', getTekst({ id: 'statusAnnetFravær' }));
    await page.selectOption('#select-2023-01-12', getTekst({ id: 'statusDeltatt' }));
    await page.selectOption('#select-2023-01-13', getTekst({ id: 'statusGodkjentFravær' }));

    await page.getByText(getTekst({ id: 'neste' })).click();
    expect(page.url()).toContain('/12345/korrigering/oppsummering');

    // Går tilbake til korrigering
    await page.getByText(getTekst({ id: 'forrige' })).click();
    expect(page.url()).toBe('http://localhost:3050/tiltakspenger/meldekort/demo/12345/korrigering');

    // Verifiserer at de endrede statusene er der
    await expect(page.locator('#select-2023-01-02')).toHaveValue(
        MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
    );
    await expect(page.locator('#select-2023-01-04')).toHaveValue(
        MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
    );
    await expect(page.locator('#select-2023-01-05')).toHaveValue(
        MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
    );
    await expect(page.locator('#select-2023-01-06')).toHaveValue(
        MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
    );

    await expect(page.locator('#select-2023-01-09')).toHaveValue(
        MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET,
    );
    await expect(page.locator('#select-2023-01-10')).toHaveValue(
        MeldekortDagStatus.FRAVÆR_SYKT_BARN,
    );
    await expect(page.locator('#select-2023-01-11')).toHaveValue(MeldekortDagStatus.FRAVÆR_ANNET);
    await expect(page.locator('#select-2023-01-12')).toHaveValue(
        MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
    );
    await expect(page.locator('#select-2023-01-13')).toHaveValue(
        MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV,
    );
});

test('dager som ikke har rett skal ikke kunne endres', async ({ page }) => {
    const meldekortMedDagerUtenRett = nyUtfylltMeldekort({
        dager: [
            nyMeldekortDag({
                dag: '2023-01-02',
                status: MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER,
            }),
            nyMeldekortDag({
                dag: '2023-01-03',
                status: MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER,
            }),
            nyMeldekortDag({
                dag: '2023-01-04',
                status: MeldekortDagStatus.FRAVÆR_SYKT_BARN,
            }),
            nyMeldekortDag({
                dag: '2023-01-05',
                status: MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET,
            }),
            nyMeldekortDag({
                dag: '2023-01-06',
                status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
            }),
            nyMeldekortDag({
                dag: '2023-01-07',
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
            nyMeldekortDag({
                dag: '2023-01-08',
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
            nyMeldekortDag({
                dag: '2023-01-09',
                status: MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV,
            }),
            nyMeldekortDag({
                dag: '2023-01-10',
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
            nyMeldekortDag({
                dag: '2023-01-11',
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
            nyMeldekortDag({
                dag: '2023-01-12',
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
            nyMeldekortDag({
                dag: '2023-01-13',
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
            nyMeldekortDag({
                dag: '2023-01-14',
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
            nyMeldekortDag({
                dag: '2023-01-15',
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
            nyMeldekortDag({
                dag: '2023-01-16',
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
        ],
    });
    await page.route('*/**/innsendte/data', async (route) => {
        await route.fulfill({
            json: {
                meldekort: [meldekortMedDagerUtenRett],
                arenaMeldekortStatus: 'HAR_IKKE_MELDEKORT',
            },
        });
    });
    await page.route('*/**/12345/korrigering/data', async (route) => {
        await route.fulfill({ json: { meldekort: meldekortMedDagerUtenRett } });
    });
    await page.goto(`${testsBaseUrl}/innsendte`);
    await klikkCookieBanner(page);
    //Skal kunne navigere seg til korrigering
    await page.getByText('Meldekort uke 1 - 2').click();
    await page.getByText(getTekst({ id: 'endreMeldekort' })).click();

    await page.waitForURL('**/12345/korrigering');
    expect(page.url()).toContain('/12345/korrigering');
    // Verifiserer at dager uten rett ikke kan endres - vi har ikke en god måte å faktisk teste dette, så vi bare sjekker at de har en readonly class
    const formField = page.locator(`label[for="select-2023-01-02"]`).locator('..');
    await expect(formField).toHaveClass(/navds-form-field--readonly/);
});

test.describe('feil ved henting av meldeperiode', () => {
    test('fra innsendte-meldekort', async ({ page }) => {
        await page.route('*/**/api/meldeperiode', async (route) => {
            await route.fulfill({ status: 404 });
        });

        await page.goto(`${testsBaseUrl}/innsendte`);
        await klikkCookieBanner(page);
        //Skal kunne navigere seg til korrigering
        await page.getByText('Meldekort uke 1 - 2').click();
        await page.getByText(getTekst({ id: 'endreMeldekort' })).click();

        await page;
        await page.getByText(getTekst({ id: 'korrigeringErrorPrøvIgjenSenere' })).isVisible();
    });

    test('fra korrigering', async ({ page }) => {
        await page.route('*/**/api/meldeperiode', async (route) => {
            await route.fulfill({ status: 404 });
        });

        await page.goto(`${testsBaseUrl}/${førsteMeldekort.id}/korrigering`);
        await klikkCookieBanner(page);

        await page.getByText(getTekst({ id: 'korrigeringErrorPrøvIgjenSenere' })).isVisible();

        await page.getByText('Tilbake til forsiden').click();
        expect(page.url()).toBe(`${testsBaseUrl}/`);
    });
});

test.describe('validerer korrigering av meldekort', () => {
    test('Validerer min og maks antall dager der alle dager gir rett til tiltakspenger', async ({
        page,
    }) => {
        await page.goto(`${testsBaseUrl}/innsendte`);
        await klikkCookieBanner(page);

        await page.getByText('Meldekort uke 1 - 2').click();
        await page.getByText(getTekst({ id: 'endreMeldekort' })).click();

        await page.waitForURL('**/12345/korrigering');
        expect(page.url()).toContain('/12345/korrigering');
        await page.selectOption('#select-2023-01-02', 'Ikke besvart');
        await page.getByText(getTekst({ id: 'neste' })).click();

        expect(page.getByText('Merk: Følgende dager blir ikke regnet med:')).toBeVisible();

        await page.selectOption('#select-2023-01-02', 'Deltok');
        expect(page.getByText('Merk: Følgende dager blir ikke regnet med:')).toBeHidden();
        await page.getByText(getTekst({ id: 'neste' })).click();

        await page.waitForURL('**/12345/korrigering/oppsummering');
        expect(page.url()).toContain('/12345/korrigering/oppsummering');
    });
    test('Valider kun maks der minst en dag ikke gir rett til tiltakspenger.', async ({ page }) => {
        //behov for at minst en dag ikke gir rett til tiltakspenger
        const dager = [
            nyMeldekortDag({
                dag: '2025-01-06',
                status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
            }),
            nyMeldekortDag({
                dag: '2025-01-07',
                status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
            }),
            nyMeldekortDag({
                dag: '2025-01-08',
                status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
            }),
            nyMeldekortDag({
                dag: '2025-01-09',
                status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
            }),
            nyMeldekortDag({
                dag: '2025-01-10',
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
            nyMeldekortDag({
                dag: '2025-01-11',
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
            nyMeldekortDag({
                dag: '2025-01-12',
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
            nyMeldekortDag({
                dag: '2025-01-13',
                status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
            }),
            nyMeldekortDag({
                dag: '2025-01-14',
                status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
            }),
            nyMeldekortDag({
                dag: '2025-01-15',
                status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
            }),
            nyMeldekortDag({
                dag: '2025-01-16',
                status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
            }),
            nyMeldekortDag({
                dag: '2025-01-17',
                status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
            }),
            nyMeldekortDag({
                dag: '2025-01-18',
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
            nyMeldekortDag({
                dag: '2025-01-19',
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
        ];

        const meldekort = nyUtfylltMeldekort({
            dager: dager,
            maksAntallDager: 9,
            periode: { fraOgMed: '2025-01-06', tilOgMed: '2025-01-19' },
        });

        await page.route('*/**/innsendte/data', async (route) => {
            await route.fulfill({
                json: {
                    meldekort: [meldekort],
                    arenaMeldekortStatus: 'HAR_IKKE_MELDEKORT',
                },
            });
        });

        await page.route('*/**/api/meldeperiode', async (route) => {
            await route.fulfill({
                json: nyMeldeperiodeForPeriodeResponse({
                    dager: dager,
                    periode: { fraOgMed: '2025-01-06', tilOgMed: '2025-01-19' },
                }),
            });
        });

        await page.route('*/**/12345/korrigering/data', async (route) => {
            await route.fulfill({ json: { meldekort: meldekort } });
        });

        await page.goto(`${testsBaseUrl}/innsendte`);
        await klikkCookieBanner(page);
        await page.getByText('Meldekort uke 1 - 2').click();
        await page.getByText(getTekst({ id: 'endreMeldekort' })).click();

        await page.waitForURL('**/12345/korrigering');
        expect(page.url()).toContain('/12345/korrigering');

        await page.selectOption('#select-2025-01-10', getTekst({ id: 'statusDeltatt' }));
        await page.getByText(getTekst({ id: 'neste' })).click();

        await expect(
            page.getByText('Du har registrert for mange dager. Maks antall er 9 dager.'),
        ).toBeVisible();

        await page.selectOption('#select-2025-01-10', 'Ikke tiltaksdag');
        await expect(
            page.getByText('Du har registrert for mange dager. Maks antall er 9 dager.'),
        ).toBeHidden();

        await page.getByText(getTekst({ id: 'neste' })).click();
        await page.waitForURL('**/12345/korrigering/oppsummering');
        expect(page.url()).toContain('/12345/korrigering/oppsummering');
    });
});
