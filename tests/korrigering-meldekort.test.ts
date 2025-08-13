import test, { expect } from '@playwright/test';
import { klikkCookieBanner, testsBaseUrl } from './helpers/utils';
import {
    Meldekort,
    MeldekortDag,
    MeldekortDagStatus,
    MeldekortStatus,
} from '../commonSrc/typer/MeldekortBruker';
import { MeldeperiodeForPeriodeResponse } from '../commonSrc/typer/Meldeperiode';
import { Nullable } from '../commonSrc/typer/Nullable';

const nyMeldeperiodeForPeriodeResponse = ({
    meldeperiodeId = '12345',
    kjedeId = '67890',
    dager = [
        nyMeldekortDag({
            dag: '2023-01-01',
            status: MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET,
        }),
        nyMeldekortDag({
            dag: '2023-01-02',
            status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
        }),
        nyMeldekortDag({
            dag: '2023-01-03',
            status: MeldekortDagStatus.FRAVÆR_ANNET,
        }),
        nyMeldekortDag({
            dag: '2023-01-04',
            status: MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV,
        }),
        nyMeldekortDag({
            dag: '2023-01-05',
            status: MeldekortDagStatus.FRAVÆR_SYK,
        }),
        nyMeldekortDag({
            dag: '2023-01-06',
            status: MeldekortDagStatus.IKKE_BESVART,
        }),
        nyMeldekortDag({
            dag: '2023-01-07',
            status: MeldekortDagStatus.IKKE_BESVART,
        }),
        nyMeldekortDag({
            dag: '2023-01-08',
            status: MeldekortDagStatus.FRAVÆR_SYKT_BARN,
        }),
        nyMeldekortDag({
            dag: '2023-01-09',
            status: MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET,
        }),
        nyMeldekortDag({
            dag: '2023-01-10',
            status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
        }),
        nyMeldekortDag({
            dag: '2023-01-11',
            status: MeldekortDagStatus.FRAVÆR_ANNET,
        }),
        nyMeldekortDag({
            dag: '2023-01-12',
            status: MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV,
        }),
        nyMeldekortDag({
            dag: '2023-01-13',
            status: MeldekortDagStatus.IKKE_BESVART,
        }),
        nyMeldekortDag({
            dag: '2023-01-14',
            status: MeldekortDagStatus.IKKE_BESVART,
        }),
    ],
    periode = { fraOgMed: '2023-01-01', tilOgMed: '2023-01-14' },
    mottattTidspunktSisteMeldekort = '2023-01-15T12:00:00Z',
}: {
    meldeperiodeId?: string;
    kjedeId?: string;
    dager?: MeldekortDag[];
    periode?: { fraOgMed: string; tilOgMed: string };
    mottattTidspunktSisteMeldekort?: string;
}): MeldeperiodeForPeriodeResponse => ({
    meldeperiodeId,
    kjedeId,
    dager: dager,
    periode: {
        fraOgMed: periode.fraOgMed,
        tilOgMed: periode.tilOgMed,
    },
    mottattTidspunktSisteMeldekort,
});

const nyMeldekortDag = ({
    dag = '2023-01-01',
    status = MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
}: {
    dag?: string;
    status?: MeldekortDagStatus;
}): MeldekortDag => ({
    dag,
    status,
});

const nyUtfylltMeldekort = ({
    id = '12345',
    meldeperiodeId = '12345',
    kjedeId = '67890',
    versjon = 1,
    kanSendes = null,
    periode = { fraOgMed: '2023-01-01', tilOgMed: '2023-01-14' },
    uke1 = 1,
    uke2 = 2,
    minAntallDager = 10,
    maksAntallDager = 14,
    innsendt = '2023-01-15T12:00:00Z',
    status = MeldekortStatus.INNSENDT,
    dager = [
        nyMeldekortDag({
            dag: '2023-01-01',
            status: MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET,
        }),
        nyMeldekortDag({
            dag: '2023-01-02',
            status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
        }),
        nyMeldekortDag({
            dag: '2023-01-03',
            status: MeldekortDagStatus.FRAVÆR_ANNET,
        }),
        nyMeldekortDag({
            dag: '2023-01-04',
            status: MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV,
        }),
        nyMeldekortDag({
            dag: '2023-01-05',
            status: MeldekortDagStatus.FRAVÆR_SYK,
        }),
        nyMeldekortDag({
            dag: '2023-01-06',
            status: MeldekortDagStatus.IKKE_BESVART,
        }),
        nyMeldekortDag({
            dag: '2023-01-07',
            status: MeldekortDagStatus.IKKE_BESVART,
        }),
        nyMeldekortDag({
            dag: '2023-01-08',
            status: MeldekortDagStatus.FRAVÆR_SYKT_BARN,
        }),
        nyMeldekortDag({
            dag: '2023-01-09',
            status: MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET,
        }),
        nyMeldekortDag({
            dag: '2023-01-10',
            status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
        }),
        nyMeldekortDag({
            dag: '2023-01-11',
            status: MeldekortDagStatus.FRAVÆR_ANNET,
        }),
        nyMeldekortDag({
            dag: '2023-01-12',
            status: MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV,
        }),
        nyMeldekortDag({
            dag: '2023-01-13',
            status: MeldekortDagStatus.IKKE_BESVART,
        }),
        nyMeldekortDag({
            dag: '2023-01-14',
            status: MeldekortDagStatus.IKKE_BESVART,
        }),
    ],
}: {
    id?: string;
    meldeperiodeId?: string;
    kjedeId?: string;
    versjon?: number;
    periode?: { fraOgMed: string; tilOgMed: string };
    uke1?: number;
    uke2?: number;
    minAntallDager?: number;
    maksAntallDager?: number;
    innsendt?: Nullable<string>;
    dager?: MeldekortDag[];
    status?: MeldekortStatus;
    kanSendes?: Nullable<string>;
}): Meldekort => ({
    id,
    meldeperiodeId: meldeperiodeId,
    kjedeId: kjedeId,
    versjon: versjon,
    fraOgMed: periode.fraOgMed,
    tilOgMed: periode.tilOgMed,
    uke1,
    uke2,
    minAntallDager,
    maksAntallDager,
    innsendt,
    kanSendes: kanSendes,
    dager,
    status,
});

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
    await page.getByText('Endre meldekort').click();

    await page.waitForURL('**/12345/korrigering');
    expect(page.url()).toContain('/12345/korrigering');
    // Endrer på statuser for uke 1
    await page.selectOption('#select-2023-01-01', 'Deltatt');
    //dag 2 er allerede satt som deltatt
    await page.selectOption('#select-2023-01-03', 'Deltatt');
    await page.selectOption('#select-2023-01-04', 'Deltatt');
    await page.selectOption('#select-2023-01-05', 'Deltatt');
    // Endrer på statuser for uke 2
    await page.selectOption('#select-2023-01-08', 'Mottatt lønn');
    await page.selectOption('#select-2023-01-09', 'Syk barn eller syk barnepasser');
    await page.selectOption('#select-2023-01-10', 'Annet fravær');
    await page.selectOption('#select-2023-01-11', 'Deltatt');
    await page.selectOption('#select-2023-01-12', 'Fravær godkjent av Nav');

    await page.getByText('Neste steg').click();
    expect(page.url()).toContain('/12345/korrigering/oppsummering');
    // Verifiserer at oppsummeringen viser de endrede statusene
    expect(page.getByText('Søndag 1. januar: Deltatt')).toBeVisible();
    expect(page.getByText('Mandag 2. januar: Deltatt')).toBeVisible();
    expect(page.getByText('Tirsdag 3. januar: Deltatt')).toBeVisible();
    expect(page.getByText('Onsdag 4. januar: Deltatt')).toBeVisible();
    expect(page.getByText('Torsdag 5. januar: Deltatt')).toBeVisible();
    expect(page.getByText('Lørdag 7. januar: Ikke besvart')).toBeVisible();
    expect(page.getByText('Fredag 6. januar: Ikke besvart')).toBeVisible();
    expect(page.getByText('Søndag 8. januar: Mottatt lønn')).toBeVisible();
    expect(page.getByText('Mandag 9. januar: Syk barn eller syk barnepasser')).toBeVisible();
    expect(page.getByText('Tirsdag 10. januar: Annet fravær')).toBeVisible();
    expect(page.getByText('Onsdag 11. januar: Deltatt')).toBeVisible();
    expect(page.getByText('Torsdag 12. januar: Fravær godkjent av Nav')).toBeVisible();
    expect(page.getByText('Fredag 13. januar: Ikke besvart')).toBeVisible();
    expect(page.getByText('Lørdag 14. januar: Ikke besvart')).toBeVisible();

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
        await page.getByText('Endre meldekort').click();

        await page.waitForURL('**/12345/korrigering');
        expect(page.url()).toContain('/12345/korrigering');
        await page.getByText('Avbryt endring').click();
        expect(page.url()).toBe('http://localhost:3050/tiltakspenger/meldekort/demo/');
    });
    test('fra oppsummering', async ({ page }) => {
        await page.goto(`${testsBaseUrl}/innsendte`);
        await klikkCookieBanner(page);

        await page.getByText('Meldekort uke 1 - 2').click();
        await page.getByText('Endre meldekort').click();
        await page.waitForURL('**/12345/korrigering');
        expect(page.url()).toContain('/12345/korrigering');
        await page.getByText('Neste steg').click();
        expect(page.url()).toContain('/12345/korrigering/oppsummering');
        await page.getByText('Avbryt endring').click();
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
    await page.getByText('Endre meldekort').click();

    await page.waitForURL('**/12345/korrigering');
    expect(page.url()).toContain('/12345/korrigering');
    await page.getByText('Neste steg').click();
    expect(page.url()).toContain('/12345/korrigering/oppsummering');

    // Prøver å sende inn uten å bekrefte
    await page.getByText('Send meldekortet').click();
    expect(page.getByText('Du må bekrefte for å gå videre')).toBeVisible();
    expect(page.url()).toContain('/12345/korrigering/oppsummering');

    await page.getByText('Jeg bekrefter at disse opplysningene stemmer').click();
    await page.getByText('Send meldekortet').click();

    // Verifiserer at vi kommer til bekreftelse
    await page.waitForTimeout(1000); //her skjer det noe rare timing greier når man kjører fra terminalen.
    expect(page.url()).toContain('/12345/korrigering/kvittering');
    expect(page.getByText('Endringer på meldekortet er sendt inn.')).toBeVisible();
});

test('forrige steg på oppsummering tar deg tilbake til korrigering med den korrigerte dataen', async ({
    page,
}) => {
    await page.goto(`${testsBaseUrl}/innsendte`);
    await klikkCookieBanner(page);
    //Skal kunne navigere seg til korrigering
    await page.getByText('Meldekort uke 1 - 2').click();
    await page.getByText('Endre meldekort').click();

    await page.waitForURL('**/12345/korrigering');
    expect(page.url()).toContain('/12345/korrigering');
    // Endrer på statuser for uke 1
    await page.selectOption('#select-2023-01-01', 'Deltatt');
    await page.selectOption('#select-2023-01-03', 'Deltatt');
    await page.selectOption('#select-2023-01-04', 'Deltatt');
    await page.selectOption('#select-2023-01-05', 'Deltatt');
    // Endrer på statuser for uke 2
    await page.selectOption('#select-2023-01-08', 'Mottatt lønn');
    await page.selectOption('#select-2023-01-09', 'Syk barn eller syk barnepasser');
    await page.selectOption('#select-2023-01-10', 'Annet fravær');
    await page.selectOption('#select-2023-01-11', 'Deltatt');
    await page.selectOption('#select-2023-01-12', 'Fravær godkjent av Nav');

    await page.getByText('Neste steg').click();
    expect(page.url()).toContain('/12345/korrigering/oppsummering');

    // Går tilbake til korrigering
    await page.getByText('Forrige steg').click();
    expect(page.url()).toBe('http://localhost:3050/tiltakspenger/meldekort/demo/12345/korrigering');

    // Verifiserer at de endrede statusene er der
    expect(page.locator('#select-2023-01-01')).toHaveValue(
        MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
    );
    expect(page.locator('#select-2023-01-03')).toHaveValue(
        MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
    );
    expect(page.locator('#select-2023-01-04')).toHaveValue(
        MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
    );
    expect(page.locator('#select-2023-01-05')).toHaveValue(
        MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
    );
    expect(page.locator('#select-2023-01-06')).toHaveValue(MeldekortDagStatus.IKKE_BESVART);
    expect(page.locator('#select-2023-01-07')).toHaveValue(MeldekortDagStatus.IKKE_BESVART);

    expect(page.locator('#select-2023-01-08')).toHaveValue(
        MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET,
    );
    expect(page.locator('#select-2023-01-09')).toHaveValue(MeldekortDagStatus.FRAVÆR_SYKT_BARN);
    expect(page.locator('#select-2023-01-10')).toHaveValue(MeldekortDagStatus.FRAVÆR_ANNET);
    expect(page.locator('#select-2023-01-11')).toHaveValue(
        MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
    );
    expect(page.locator('#select-2023-01-12')).toHaveValue(
        MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV,
    );
    expect(page.locator('#select-2023-01-13')).toHaveValue(MeldekortDagStatus.IKKE_BESVART);
    expect(page.locator('#select-2023-01-14')).toHaveValue(MeldekortDagStatus.IKKE_BESVART);
});

test('dager som ikke har rett skal ikke kunne endres', async ({ page }) => {
    const meldekortMedDagerUtenRett = nyUtfylltMeldekort({
        dager: [
            nyMeldekortDag({
                dag: '2023-01-06',
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
            nyMeldekortDag({
                dag: '2023-01-07',
                status: MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER,
            }),
            nyMeldekortDag({
                dag: '2023-01-08',
                status: MeldekortDagStatus.FRAVÆR_SYKT_BARN,
            }),
            nyMeldekortDag({
                dag: '2023-01-09',
                status: MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET,
            }),
            nyMeldekortDag({
                dag: '2023-01-10',
                status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
            }),
            nyMeldekortDag({
                dag: '2023-01-11',
                status: MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
            }),
            nyMeldekortDag({
                dag: '2023-01-12',
                status: MeldekortDagStatus.FRAVÆR_ANNET,
            }),
            nyMeldekortDag({
                dag: '2023-01-13',
                status: MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV,
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
            nyMeldekortDag({
                dag: '2023-01-17',
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
            nyMeldekortDag({
                dag: '2023-01-18',
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
            nyMeldekortDag({
                dag: '2023-01-19',
                status: MeldekortDagStatus.IKKE_BESVART,
            }),
            nyMeldekortDag({
                dag: '2023-01-20',
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
    await page.getByText('Endre meldekort').click();

    expect(page.url()).toContain('/12345/korrigering');
    // Verifiserer at dager uten rett ikke kan endres - vi har ikke en god måte å faktisk teste dette, så vi bare sjekker at de har en readonly class
    const formField = page.locator(`label[for="select-2023-01-07"]`).locator('..');
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
        await page.getByText('Endre meldekort').click();

        await page
            .getByText(
                'Kunne ikke hente siste opplysninger om meldekortet. Prøv igjen senere. Hvis problemet vedvarer, kontakt Nav.',
            )
            .isVisible();
    });

    test('fra korrigering', async ({ page }) => {
        await page.route('*/**/api/meldeperiode', async (route) => {
            await route.fulfill({ status: 404 });
        });

        await page.goto(`${testsBaseUrl}/${førsteMeldekort.id}/korrigering`);
        await klikkCookieBanner(page);

        await page
            .getByText(
                'Vi får ikke innhentet siste opplysninger om meldekortet ditt. Prøv igjen senere. Hvis problemet vedvarer, kontakt Nav.',
            )
            .isVisible();

        await page.getByText('Tilbake til forsiden').click();
        expect(page.url()).toBe(`${testsBaseUrl}/`);
    });
});
