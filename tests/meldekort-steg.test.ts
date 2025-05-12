import { expect, test } from './helpers/fixtures';
import { axeTestUtenDekoratøren, testsBaseUrl } from './helpers/utils';
import { getTekst } from '../src/tekster/tekster';
import { Page } from '@playwright/test';
import { MeldekortFraBrukerDTO } from '../commonSrc/typer/meldekort-dto';
import { MeldekortDagStatus } from '../commonSrc/typer/meldekort-utfylling';

// TODO: disse testene er avhengig av mock-dataene fra demo-modusen til appen
// Burde ha mock-data som defineres i testene

test.beforeEach(async ({ page }) => {
    await page.goto(`${testsBaseUrl}/meldekort_2/deltakelse`);
});

test.describe('Kan fylle ut og sende inn meldekortet', () => {
    test('Kan ikke gå videre uten å velge fravær/ikke fravær', async ({ page }) => {
        const nesteKnapp = page.getByRole('button', { name: getTekst({ id: 'neste' }) });
        const ikkeValgtVarsel = page.getByText(getTekst({ id: 'deltattStegFraværIkkeValgt' }));
        const deltattCheckboxes = page.getByRole('checkbox', {
            name: getTekst({ id: 'deltattDagPrefix' }),
        });

        await deltattCheckboxes.nth(0).click();

        await nesteKnapp.click();

        await expect(ikkeValgtVarsel).toBeVisible();
        await axeTestUtenDekoratøren(page, 'Fylt ut deltagelse uten bekreftelse');
    });

    test('Kan ikke gå videre med for mange dager utfylt', async ({ page }) => {
        const forMangeDagerVarsel = page.getByText(getTekst({ id: 'forMangeDagerEnkel' }));

        await fyllUtDeltattSteg(page, false, 10);

        await expect(forMangeDagerVarsel).toBeVisible();
        await axeTestUtenDekoratøren(page, 'Fylt ut deltagelse med for mange dager');
    });

    test('Går til send-inn med akseptabelt antall dager utfylt og ingen fravær valgt', async ({
        page,
    }) => {
        await fyllUtDeltattSteg(page, false, 8);

        const sendInnKnapp = page.getByRole('button', { name: getTekst({ id: 'sendInn' }) });

        await expect(sendInnKnapp).toBeVisible();
        await axeTestUtenDekoratøren(page, 'Send inn uten fravær');
    });

    test('Går til utfylling av fravær dersom fravær er valgt', async ({ page }) => {
        await fyllUtDeltattSteg(page, true, 4);

        const fraværHjelpTittel = page.getByText(getTekst({ id: 'fraværHjelpTittel' }));

        await expect(fraværHjelpTittel).toBeVisible();
        await axeTestUtenDekoratøren(page, 'Fyll ut fravær');
    });

    test('Kan fylle ut fravær og gå til send-inn', async ({ page }) => {
        const sendInnKnapp = page.getByRole('button', { name: getTekst({ id: 'sendInn' }) });
        const nesteKnapp = page.getByRole('button', {
            name: getTekst({ id: 'neste' }),
            exact: true,
        });

        await fyllUtFraværSteg(page, 5, 3);

        await nesteKnapp.click();

        await expect(sendInnKnapp).toBeVisible();
        await axeTestUtenDekoratøren(page, 'Send inn med fravær');
    });

    test('Kan sende inn et meldekort', async ({ page }) => {
        await fyllUtDeltattSteg(page, false, 8);
        await sendInnOgAssertInnsending(page, {
            deltatt: 8,
            fraværSyk: 0,
            ikkeRegistrert: 6,
        });
        await axeTestUtenDekoratøren(page, 'Kvittering etter innsending');
    });

    test('Utfylt fravær fjernes om bruker går til "forrige" og velger at de ikke har hatt fravær', async ({
        page,
    }) => {
        // Fyll ut fravær og gå til forrige steg
        const forrigeKnapp = page.getByRole('button', {
            name: getTekst({ id: 'forrige' }),
            exact: true,
        });
        await fyllUtFraværSteg(page, 5, 3);
        await forrigeKnapp.click();
        await expect(page).toHaveURL(/deltakelse$/);

        // Endre valget på deltakelse-steget til å si at bruker ikke har hatt fravær
        const nesteKnapp = page.getByRole('button', {
            name: getTekst({ id: 'neste' }),
            exact: true,
        });
        const radioHarIkkeHattFravær = page.getByRole('radio', {
            name: getTekst({ id: 'deltattStegFraværNei' }),
        });
        await radioHarIkkeHattFravær.click();
        await nesteKnapp.click();

        // På steget for bekreftelse skal det ikke være noen dager med fravær
        await sendInnOgAssertInnsending(page, {
            deltatt: 5,
            fraværSyk: 0,
            ikkeRegistrert: 9,
        });
    });
});

const fyllUtDeltattSteg = async (page: Page, fravær: boolean, antallDeltatt: number) => {
    const nesteKnapp = page.getByRole('button', { name: getTekst({ id: 'neste' }), exact: true });
    const fraværValgRadio = page.getByRole('radio', {
        name: getTekst({ id: fravær ? 'deltattStegFraværJa' : 'deltattStegFraværNei' }),
    });
    const deltattCheckboxes = page.getByRole('checkbox', {
        name: getTekst({ id: 'deltattDagPrefix' }),
    });

    for (let i = 0; i < antallDeltatt; ++i) {
        await deltattCheckboxes.nth(i).click();
    }

    await fraværValgRadio.click();
    await nesteKnapp.click();
};

const fyllUtFraværSteg = async (page: Page, antallDeltatt: number, antallFravær: number) => {
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

    await fyllUtDeltattSteg(page, true, antallDeltatt);

    for (let i = 0; i < antallFravær; ++i) {
        await expect(velgFraværKnapper.nth(i)).toHaveText(getTekst({ id: 'fraværPanelRegistrer' }));
        await velgFraværKnapper.nth(i).click();
        await expect(fraværModal).toBeVisible();
        await sykRadio.click();
        await lagreKnapp.click();
    }
};

type Antall = {
    deltatt: number;
    fraværSyk: number;
    ikkeRegistrert: number;
};

/**
 * Bekreft innsending og assert at det som sendes er som forventet
 */
const sendInnOgAssertInnsending = async (page: Page, antall: Antall) => {
    await expect(page).toHaveURL(/send-inn$/);

    const sendInnKnapp = page.getByRole('button', { name: getTekst({ id: 'sendInn' }) });
    const bekreftCheckbox = page.getByRole('checkbox', {
        name: getTekst({ id: 'sendInnBekrefter' }),
    });
    const bekreftVarsel = page.getByText(getTekst({ id: 'sendInnBekrefterFeil' }));

    await sendInnKnapp.click();

    // Må bekrefte før innsending
    await expect(bekreftVarsel).toBeVisible();
    await bekreftCheckbox.click();
    await expect(bekreftVarsel).not.toBeVisible();

    const sendInnPromise: Promise<MeldekortFraBrukerDTO> = page
        .waitForRequest((request) => request.url().endsWith('/api/send-inn'))
        .then((request) => request.postDataJSON());

    await sendInnKnapp.click();

    await expect(page).toHaveURL(/kvittering$/);

    const sendInnData = await sendInnPromise;

    const dagerDeltatt = sendInnData.dager.filter(
        (dag) => dag.status === MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET
    ).length;
    const dagerFraværSyk = sendInnData.dager.filter(
        (dag) => dag.status === MeldekortDagStatus.FRAVÆR_SYK
    ).length;
    const dagerIkkeRegistrert = sendInnData.dager.filter(
        (dag) => dag.status === MeldekortDagStatus.IKKE_REGISTRERT
    ).length;

    expect(dagerDeltatt).toBe(antall.deltatt);
    expect(dagerFraværSyk).toBe(antall.fraværSyk);
    expect(dagerIkkeRegistrert).toBe(antall.ikkeRegistrert);
};
