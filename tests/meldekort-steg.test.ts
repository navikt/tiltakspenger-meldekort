import { axeTestUtenDekoratøren, klikkCookieBanner, testsBaseUrl } from './helpers/utils';
import { getTekst } from '../src/tekster/tekster';
import test, { expect, Page } from '@playwright/test';
import { MeldekortDagStatus, MeldekortStatus } from '../commonSrc/typer/MeldekortBruker';
import { BrukersMeldekortUtfylling } from '../commonSrc/typer/BrukersMeldekortUtfylling';
import {
    nyMeldekortDagerForPeriode,
    nyUtfylltMeldekort,
} from './test-data-generators/MeldekortTestData';

test.describe('Meldekort steg', () => {
    // TODO: disse testene er avhengig av mock-dataene fra demo-modusen til appen
    // Burde ha mock-data som defineres i testene
    test.beforeEach(async ({ page }) => {
        console.log('GÅR TIL STEG DESCRIBE');
        await page.goto(`${testsBaseUrl}/meldekort_2/fraver`);
        await klikkCookieBanner(page);
    });

    test('Kan ikke gå videre uten å velge fravær/ikke fravær', async ({ page }) => {
        const nesteKnapp = page.getByRole('button', { name: getTekst({ id: 'neste' }) });
        const ikkeValgtVarsel = page.getByText(getTekst({ id: 'fraværSpørsmålIkkeValgt' }));

        await nesteKnapp.click();

        await expect(ikkeValgtVarsel).toBeVisible();
        await axeTestUtenDekoratøren(page, 'Fylt ut deltagelse uten bekreftelse');
    });

    test('Går til send-inn med akseptabelt antall dager utfylt og ingen fravær eller lønn valgt', async ({
        page,
    }) => {
        await fyllUtFraværSteg(page, 0);
        await fyllUtLønnSteg(page, 0);
        await fyllUtDeltattSteg(page, 10);

        const sendInnKnapp = page.getByRole('button', { name: getTekst({ id: 'sendInn' }) });

        await expect(sendInnKnapp).toBeVisible();
        await axeTestUtenDekoratøren(page, 'Send inn uten fravær eller lønn');
    });

    test('Kan fylle ut fravær og gå til send-inn', async ({ page }) => {
        const sendInnKnapp = page.getByRole('button', { name: getTekst({ id: 'sendInn' }) });
        const nesteKnapp = page.getByRole('button', {
            name: getTekst({ id: 'neste' }),
            exact: true,
        });

        await fyllUtFraværSteg(page, 2);
        await fyllUtLønnSteg(page, 0);
        await fyllUtDeltattSteg(page, 8);

        await expect(sendInnKnapp).toBeVisible();
        await axeTestUtenDekoratøren(page, 'Send inn med fravær');
    });

    test('Kan sende inn et meldekort', async ({ page }) => {
        await fyllUtFraværSteg(page, 0);
        await fyllUtLønnSteg(page, 0);
        await fyllUtDeltattSteg(page, 10);
        await sendInnOgAssertInnsending(page, {
            antallDagerMedDeltatt: 10,
            antallDagerMedFravær: 0,
            antallDagerMedLønn: 0,
            antallDagerMedIkkeBesvart: 4,
        });
        await axeTestUtenDekoratøren(page, 'Kvittering etter innsending');
    });

    test('Utfylt fravær fjernes om bruker velger at de ikke har hatt fravær', async ({ page }) => {
        const forrigeKnapp = page.getByRole('button', {
            name: getTekst({ id: 'forrige' }),
            exact: true,
        });
        const nesteKnapp = page.getByRole('button', {
            name: getTekst({ id: 'neste' }),
            exact: true,
        });
        const radioHarIkkeHattFravær = page.getByRole('radio', {
            name: getTekst({ id: 'fraværHarHattFraværSvarNei' }),
        });
        await fyllUtFraværSteg(page, 3);

        await forrigeKnapp.click();
        await expect(page).toHaveURL(/fraver$/);
        await radioHarIkkeHattFravær.click();
        await nesteKnapp.click();

        await fyllUtLønnSteg(page, 0);
        await fyllUtDeltattSteg(page, 10);

        // På steget for bekreftelse skal det ikke være noen dager med fravær
        await sendInnOgAssertInnsending(page, {
            antallDagerMedDeltatt: 10,
            antallDagerMedFravær: 0,
            antallDagerMedLønn: 0,
            antallDagerMedIkkeBesvart: 4,
        });
    });

    test('Utfylt lønn fjernes om bruker velger at de ikke har hatt lønn', async ({ page }) => {
        const forrigeKnapp = page.getByRole('button', {
            name: getTekst({ id: 'forrige' }),
            exact: true,
        });
        const nesteKnapp = page.getByRole('button', {
            name: getTekst({ id: 'neste' }),
            exact: true,
        });
        const radioHarIkkeHattFravær = page.getByRole('radio', {
            name: getTekst({ id: 'lønnHarMottattLønnSvarNei' }),
        });
        await fyllUtFraværSteg(page, 0);
        await fyllUtLønnSteg(page, 3);

        await forrigeKnapp.click();
        await expect(page).toHaveURL(/lonn$/);
        await radioHarIkkeHattFravær.click();
        await nesteKnapp.click();

        await fyllUtDeltattSteg(page, 10);

        // På steget for bekreftelse skal det ikke være noen dager med fravær
        await sendInnOgAssertInnsending(page, {
            antallDagerMedDeltatt: 10,
            antallDagerMedFravær: 0,
            antallDagerMedLønn: 0,
            antallDagerMedIkkeBesvart: 4,
        });
    });
});

test.describe('kontroll av helg av meldekortet', () => {
    test('kan ikke fylle ut helgedager dersom saken ikke tillater det', async ({ page }) => {
        await page.route(
            '*/**/meldekort_2/fraver/data',
            async (route) =>
                await route.fulfill({
                    json: {
                        brukersMeldekort: nyUtfylltMeldekort({
                            id: 'meldekort_2',
                            dager: nyMeldekortDagerForPeriode({}),
                            status: MeldekortStatus.KAN_UTFYLLES,
                        }),
                        kanFylleUtHelg: false,
                    },
                }),
        );

        await page.route(
            '*/**/meldekort_2/lonn/data',
            async (route) =>
                await route.fulfill({
                    json: {
                        brukersMeldekort: nyUtfylltMeldekort({
                            id: 'meldekort_2',
                            dager: nyMeldekortDagerForPeriode({}),
                            status: MeldekortStatus.KAN_UTFYLLES,
                        }),
                        kanFylleUtHelg: false,
                    },
                }),
        );

        await page.route(
            '*/**/meldekort_2/deltakelse/data',
            async (route) =>
                await route.fulfill({
                    json: {
                        brukersMeldekort: nyUtfylltMeldekort({
                            id: 'meldekort_2',
                            dager: nyMeldekortDagerForPeriode({}),
                            status: MeldekortStatus.KAN_UTFYLLES,
                        }),
                        kanFylleUtHelg: false,
                    },
                }),
        );

        await page.route(
            '*/**/meldekort_2/send-inn/data',
            async (route) =>
                await route.fulfill({
                    json: {
                        brukersMeldekort: nyUtfylltMeldekort({
                            id: 'meldekort_2',
                            dager: nyMeldekortDagerForPeriode({}),
                            status: MeldekortStatus.KAN_UTFYLLES,
                        }),
                        kanFylleUtHelg: false,
                    },
                }),
        );

        //Fravær steg
        await page.goto(`${testsBaseUrl}/meldekort_2/fraver`);
        await klikkCookieBanner(page);
        await page.waitForURL(/fraver$/);
        await page.getByText('Ja, jeg har vært syk').click();
        expect(page.getByText('Lørdag 7. januar')).toBeHidden();
        expect(page.getByText('Søndag 8. januar')).toBeHidden();
        expect(page.getByText('Lørdag 14. januar')).toBeHidden();
        expect(page.getByText('Søndag 15. januar')).toBeHidden();

        await page.getByText('Nei, jeg har ikke vært syk').click();
        await page.getByText('Neste steg').click();

        //Lønn steg
        await page.waitForURL(/lonn$/);
        await page.getByText('Ja, jeg mottar lønn for tiden i tiltaket').click();
        expect(page.getByText('Lørdag 7. januar')).toBeHidden();
        expect(page.getByText('Søndag 8. januar')).toBeHidden();
        expect(page.getByText('Lørdag 14. januar')).toBeHidden();
        expect(page.getByText('Søndag 15. januar')).toBeHidden();
        await page.getByText('Nei, jeg mottar ikke lønn for tid i tiltaket').click();
        await page.getByText('Neste steg').click();

        //Deltatt steg
        await page.waitForURL(/deltakelse$/);
        expect(page.getByText('Lørdag 7. januar')).toBeHidden();
        expect(page.getByText('Søndag 8. januar')).toBeHidden();
        expect(page.getByText('Lørdag 14. januar')).toBeHidden();
        expect(page.getByText('Søndag 15. januar')).toBeHidden();
        await page.getByText('Neste steg').click();

        //Send inn steg
        await page.waitForURL(/send-inn$/);
        expect(page.getByText('Lørdag 7. januar')).toBeHidden();
        expect(page.getByText('Søndag 8. januar')).toBeHidden();
        expect(page.getByText('Lørdag 14. januar')).toBeHidden();
        expect(page.getByText('Søndag 15. januar')).toBeHidden();
    });
    test('kan fylle ut helgedager dersom saken tillater det', async ({ page }) => {
        await page.route(
            '*/**/meldekort_2/fraver/data',
            async (route) =>
                await route.fulfill({
                    json: {
                        brukersMeldekort: nyUtfylltMeldekort({
                            id: 'meldekort_2',
                            dager: nyMeldekortDagerForPeriode({}),
                            status: MeldekortStatus.KAN_UTFYLLES,
                        }),
                        kanFylleUtHelg: true,
                    },
                }),
        );

        await page.route(
            '*/**/meldekort_2/lonn/data',
            async (route) =>
                await route.fulfill({
                    json: {
                        brukersMeldekort: nyUtfylltMeldekort({
                            id: 'meldekort_2',
                            dager: nyMeldekortDagerForPeriode({}),
                            status: MeldekortStatus.KAN_UTFYLLES,
                        }),
                        kanFylleUtHelg: true,
                    },
                }),
        );

        await page.route(
            '*/**/meldekort_2/deltakelse/data',
            async (route) =>
                await route.fulfill({
                    json: {
                        brukersMeldekort: nyUtfylltMeldekort({
                            id: 'meldekort_2',
                            dager: nyMeldekortDagerForPeriode({}),
                            status: MeldekortStatus.KAN_UTFYLLES,
                        }),
                        kanFylleUtHelg: true,
                    },
                }),
        );

        await page.route(
            '*/**/meldekort_2/send-inn/data',
            async (route) =>
                await route.fulfill({
                    json: {
                        brukersMeldekort: nyUtfylltMeldekort({
                            id: 'meldekort_2',
                            dager: nyMeldekortDagerForPeriode({}),
                            status: MeldekortStatus.KAN_UTFYLLES,
                        }),
                        kanFylleUtHelg: true,
                    },
                }),
        );

        //Fravær steg
        await page.goto(`${testsBaseUrl}/meldekort_2/fraver`);
        await klikkCookieBanner(page);
        await page.waitForURL(/fraver$/);
        await page.getByText('Ja, jeg har vært syk').click();
        expect(page.getByText('Lørdag 7. januar')).toBeVisible();
        expect(page.getByText('Søndag 8. januar')).toBeVisible();
        expect(page.getByText('Lørdag 14. januar')).toBeVisible();
        expect(page.getByText('Søndag 15. januar')).toBeVisible();

        await page.getByText('Nei, jeg har ikke vært syk').click();
        await page.getByText('Neste steg').click();

        //Lønn steg
        await page.waitForURL(/lonn$/);
        await page.getByText('Ja, jeg mottar lønn for tiden i tiltaket').click();
        expect(page.getByText('Lørdag 7. januar')).toBeVisible();
        expect(page.getByText('Søndag 8. januar')).toBeVisible();
        expect(page.getByText('Lørdag 14. januar')).toBeVisible();
        expect(page.getByText('Søndag 15. januar')).toBeVisible();
        await page.getByText('Nei, jeg mottar ikke lønn for tid i tiltaket').click();
        await page.getByText('Neste steg').click();

        //Deltatt steg
        await page.waitForURL(/deltakelse$/);
        expect(page.getByText('Fredag 6. januar')).toBeVisible();
        expect(page.getByText('Lørdag 7. januar')).toBeVisible();
        expect(page.getByText('Søndag 8. januar')).toBeVisible();
        expect(page.getByText('Lørdag 14. januar')).toBeVisible();
        expect(page.getByText('Søndag 15. januar')).toBeVisible();
        await page.getByText('Neste steg').click();

        //Send inn steg
        await page.waitForURL(/send-inn$/);
        expect(page.getByText('Lørdag 7. januar')).toBeVisible();
        expect(page.getByText('Søndag 8. januar')).toBeVisible();
        expect(page.getByText('Lørdag 14. januar')).toBeVisible();
        expect(page.getByText('Søndag 15. januar')).toBeVisible();
    });
});

const fyllUtDeltattSteg = async (page: Page, antallDagerMedDeltatt: number) => {
    const nesteKnapp = page.getByRole('button', { name: getTekst({ id: 'neste' }), exact: true });
    const deltattCheckboxes = page.getByRole('checkbox', {
        name: getTekst({ id: 'deltattDagPrefix' }),
    });

    for (let i = 0; i < antallDagerMedDeltatt; ++i) {
        await deltattCheckboxes.nth(i).click();
    }
    await nesteKnapp.click();
};

const fyllUtFraværSteg = async (page: Page, antallDagerMedFravær: number) => {
    const nesteKnapp = page.getByRole('button', { name: getTekst({ id: 'neste' }), exact: true });

    const fraværValgRadio = page.getByRole('radio', {
        name: getTekst({
            id:
                antallDagerMedFravær > 0
                    ? 'fraværHarHattFraværSvarJa'
                    : 'fraværHarHattFraværSvarNei',
        }),
    });

    await fraværValgRadio.click();

    const velgFraværKnapper = page.getByRole('button', {
        // datoTekst varierer for hver dagså vi matcher på alt utenom den.
        name: getTekst({ id: 'fraværPanelRegistrerSR', resolverProps: { datoTekst: '' } }),
        exact: false,
    });
    const sykRadio = page.getByRole('radio', {
        name: getTekst({ id: 'fraværModalSykIngress' }),
    });
    const lagreKnapp = page.getByRole('button', {
        name: getTekst({ id: 'lagre' }),
        exact: true,
    });
    const fraværModal = page.getByRole('dialog');

    if (antallDagerMedFravær > 0) {
        for (let i = 0; i < antallDagerMedFravær; ++i) {
            await expect(velgFraværKnapper.nth(i)).toHaveText(
                getTekst({ id: 'fraværPanelRegistrer' }),
            );
            await velgFraværKnapper.nth(i).click();
            await expect(fraværModal).toBeVisible();
            await sykRadio.click();
            await lagreKnapp.click();
        }
    }

    await nesteKnapp.click();
};

const fyllUtLønnSteg = async (page: Page, antallDagerMedLønn: number) => {
    const nesteKnapp = page.getByRole('button', { name: getTekst({ id: 'neste' }), exact: true });
    const lønnValgRadio = page.getByRole('radio', {
        name: getTekst({
            id: antallDagerMedLønn > 0 ? 'lønnHarMottattLønnSvarJa' : 'lønnHarMottattLønnSvarNei',
        }),
    });
    const lønnCheckboxes = page.getByRole('checkbox', {
        name: getTekst({ id: 'lønnDagPrefix' }),
    });

    await lønnValgRadio.click();

    if (antallDagerMedLønn > 0) {
        for (let i = 0; i < antallDagerMedLønn; ++i) {
            await lønnCheckboxes.nth(i).click();
        }
    }

    await nesteKnapp.click();
};

type Antall = {
    antallDagerMedDeltatt: number;
    antallDagerMedFravær: number;
    antallDagerMedLønn: number;
    antallDagerMedIkkeBesvart: number;
};

/**
 * Bekreft innsending og assert at det som sendes er som forventet
 */
const sendInnOgAssertInnsending = async (page: Page, antall: Antall) => {
    await expect(page).toHaveURL(/send-inn$/);

    const sendInnKnapp = page.getByRole('button', { name: getTekst({ id: 'sendInn' }) });
    const bekreftCheckbox = page.getByRole('checkbox', {
        name: getTekst({ id: 'oppsummeringBekrefter' }),
    });
    const bekreftVarsel = page.getByText(getTekst({ id: 'oppsummeringBekrefterFeil' }));

    await sendInnKnapp.click();

    // Må bekrefte før innsending
    await expect(bekreftVarsel).toBeVisible();
    await bekreftCheckbox.click();
    await expect(bekreftVarsel).not.toBeVisible();

    const sendInnPromise: Promise<BrukersMeldekortUtfylling> = page
        .waitForRequest((request) => request.url().endsWith('/api/send-inn'))
        .then((request) => request.postDataJSON());

    await sendInnKnapp.click();

    await expect(page).toHaveURL(/kvittering$/);

    const sendInnData = await sendInnPromise;

    const dagerDeltatt = sendInnData.dager.filter(
        (dag) => dag.status === MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET,
    ).length;
    const dagerFraværSyk = sendInnData.dager.filter(
        (dag) => dag.status === MeldekortDagStatus.FRAVÆR_SYK,
    ).length;
    const dagerMedLønn = sendInnData.dager.filter(
        (dag) => dag.status === MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET,
    ).length;
    const dagerIkkeBesvart = sendInnData.dager.filter(
        (dag) => dag.status === MeldekortDagStatus.IKKE_BESVART,
    ).length;

    expect(dagerDeltatt).toBe(antall.antallDagerMedDeltatt);
    expect(dagerFraværSyk).toBe(antall.antallDagerMedFravær);
    expect(dagerMedLønn).toBe(antall.antallDagerMedLønn);
    expect(dagerIkkeBesvart).toBe(antall.antallDagerMedIkkeBesvart);
};
