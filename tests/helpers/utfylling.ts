import { expect, Page } from '@playwright/test';
import { getTekst } from '../../packages/client/src/tekster/tekster';
import { MeldekortDagStatus } from '../../packages/common/src/typer/MeldekortBruker';
import { MeldekortUtfyltDTO } from '../../packages/common/src/typer/BrukersMeldekortUtfylling';

export const fyllUtDeltattSteg = async (page: Page, antallDagerMedDeltatt: number) => {
    const nesteKnapp = page.getByRole('button', {
        name: getTekst({ id: 'neste', locale: 'nb' }),
        exact: true,
    });
    const deltattCheckboxes = page.getByRole('checkbox', {
        name: getTekst({ id: 'deltattDagPrefix', locale: 'nb' }),
    });

    for (let i = 0; i < antallDagerMedDeltatt; ++i) {
        await deltattCheckboxes.nth(i).click();
    }
    await nesteKnapp.click();
};

const fraværIngress = {
    [MeldekortDagStatus.FRAVÆR_SYK]: 'fraværModalSykIngress',
    [MeldekortDagStatus.FRAVÆR_SYKT_BARN]: 'fraværModalSyktBarnIngress',
    [MeldekortDagStatus.FRAVÆR_STERKE_VELFERDSGRUNNER_ELLER_JOBBINTERVJU]:
        'fraværModalSterkeVelferdsgrunnerEllerJobbintervjuIngress',
    [MeldekortDagStatus.FRAVÆR_ANNET]: 'fraværModalIkkeGodkjentIngress',
} as const;

export type Fraværstype = keyof typeof fraværIngress;

/**
 * Fyller ut fravær på de første dagene i meldekortet.
 * Et tall gir så mange dager med sykdom; en liste gir én dag per fraværstype i rekkefølge.
 */
export const fyllUtFraværSteg = async (page: Page, fravær: number | Fraværstype[]) => {
    const fraværstyper: Fraværstype[] =
        typeof fravær === 'number'
            ? Array<Fraværstype>(fravær).fill(MeldekortDagStatus.FRAVÆR_SYK)
            : fravær;
    const antallDagerMedFravær = fraværstyper.length;
    const nesteKnapp = page.getByRole('button', {
        name: getTekst({ id: 'neste', locale: 'nb' }),
        exact: true,
    });

    const fraværValgRadio = page.getByRole('radio', {
        name: getTekst({
            id:
                antallDagerMedFravær > 0
                    ? 'fraværHarHattFraværSvarJa'
                    : 'fraværHarHattFraværSvarNei',
            locale: 'nb',
        }),
    });

    await fraværValgRadio.click();

    const velgFraværKnapper = page.getByRole('button', {
        // datoTekst varierer for hver dagså vi matcher på alt utenom den.
        name: getTekst({
            id: 'fraværPanelRegistrerSR',
            locale: 'nb',
            resolverProps: { datoTekst: '' },
        }),
        exact: false,
    });
    const lagreKnapp = page.getByRole('button', {
        name: getTekst({ id: 'lagre', locale: 'nb' }),
        exact: true,
    });
    const fraværModal = page.getByRole('dialog');

    if (antallDagerMedFravær > 0) {
        for (let i = 0; i < antallDagerMedFravær; ++i) {
            await expect(velgFraværKnapper.nth(i)).toHaveText(
                getTekst({ id: 'fraværPanelRegistrer', locale: 'nb' }),
            );
            await velgFraværKnapper.nth(i).click();
            await expect(fraværModal).toBeVisible();
            await page
                .getByRole('radio', {
                    name: getTekst({ id: fraværIngress[fraværstyper[i]], locale: 'nb' }),
                })
                .click();
            await lagreKnapp.click();
        }
    }

    await nesteKnapp.click();
};

export const fyllUtLønnSteg = async (page: Page, antallDagerMedLønn: number) => {
    const nesteKnapp = page.getByRole('button', {
        name: getTekst({ id: 'neste', locale: 'nb' }),
        exact: true,
    });
    const lønnValgRadio = page.getByRole('radio', {
        name: getTekst({
            id: antallDagerMedLønn > 0 ? 'lønnHarMottattLønnSvarJa' : 'lønnHarMottattLønnSvarNei',
            locale: 'nb',
        }),
    });
    const lønnCheckboxes = page.getByRole('checkbox', {
        name: getTekst({ id: 'lønnDagPrefix', locale: 'nb' }),
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
 * Bekreft og send inn fra oppsummeringen. Returnerer det som ble sendt til serveren.
 */
export const sendInn = async (page: Page): Promise<MeldekortUtfyltDTO> => {
    await expect(page).toHaveURL(/send-inn$/);

    const sendInnKnapp = page.getByRole('button', {
        name: getTekst({ id: 'sendInn', locale: 'nb' }),
    });
    const bekreftCheckbox = page.getByRole('checkbox', {
        name: getTekst({ id: 'oppsummeringBekrefter', locale: 'nb' }),
    });
    const bekreftVarsel = page.getByText(
        getTekst({ id: 'oppsummeringBekrefterFeil', locale: 'nb' }),
    );

    await sendInnKnapp.click();

    // Må bekrefte før innsending
    await expect(bekreftVarsel).toBeVisible();
    await bekreftCheckbox.click();
    await expect(bekreftVarsel).not.toBeVisible();

    const sendInnPromise: Promise<MeldekortUtfyltDTO> = page
        .waitForRequest((request) => request.url().endsWith('/api/send-inn'))
        .then((request) => request.postDataJSON());

    await sendInnKnapp.click();

    await expect(page).toHaveURL(/kvittering$/);

    return sendInnPromise;
};

/**
 * Bekreft innsending og assert at det som sendes er som forventet
 */
export const sendInnOgAssertInnsending = async (page: Page, antall: Antall) => {
    const sendInnData = await sendInn(page);

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
