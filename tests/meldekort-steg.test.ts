import { Page } from '@playwright/test';
import { ApiScenario, expect, MockApi, test } from './helpers/mockApi';
import {
    axeTestUtenDekoratøren,
    checkbox,
    gåTil,
    knapp,
    lenke,
    radio,
    tekst,
    tekstSegmenter,
    testsBaseUrl,
} from './helpers/utils';
import {
    antallDagerMedStatus,
    fyllUtDeltattSteg,
    fyllUtFraværSteg,
    fyllUtLønnSteg,
    fyllUtSteg,
    sendInn,
} from './helpers/utfylling';
import { MeldekortDagStatus } from '../packages/common/src/typer/MeldekortBruker';
import { MeldekortUtfyltDTO } from '../packages/common/src/typer/BrukersMeldekortUtfylling';
import { ErrorCodes } from '../packages/client/src/utils/apiClient';
import { nyMeldekortTilUtfylling } from './test-data-generators/MeldekortTestData';
import { nyMeldekortBruker } from './test-data-generators/MeldekortBrukerTestData';

// 14 dager uten noen besvarte, og maks 10 dager som kan fylles ut
const meldekort = nyMeldekortTilUtfylling();

const startUtfylling = async (page: Page, mockApi: MockApi, scenario: ApiScenario = {}) => {
    await mockApi({ meldekort: [meldekort], ...scenario });
    await gåTil(page, `/${meldekort.id}/fraver`);
};

test.describe('Meldekort steg', () => {
    test.beforeEach(async ({ page, mockApi }) => {
        await startUtfylling(page, mockApi);
    });

    test('Kan ikke gå videre uten å velge fravær/ikke fravær', async ({ page }) => {
        await knapp(page, 'neste').click();

        await expect(page.getByText(tekst('fraværSpørsmålIkkeValgt'))).toBeVisible();
        await axeTestUtenDekoratøren(page, 'Fylt ut deltagelse uten bekreftelse');
    });

    test('Går til send-inn med akseptabelt antall dager utfylt og ingen fravær eller lønn valgt', async ({
        page,
    }) => {
        await fyllUtSteg(page, { fravær: 0, lønn: 0, deltatt: 10 });

        await expect(knapp(page, 'sendInn')).toBeVisible();
        await axeTestUtenDekoratøren(page, 'Send inn uten fravær eller lønn');
    });

    test('Kan fylle ut fravær og gå til send-inn', async ({ page }) => {
        await fyllUtSteg(page, { fravær: 2, lønn: 0, deltatt: 8 });

        await expect(knapp(page, 'sendInn')).toBeVisible();
        await axeTestUtenDekoratøren(page, 'Send inn med fravær');
    });

    test('Kan sende inn et meldekort', async ({ page }) => {
        await fyllUtSteg(page, { fravær: 0, lønn: 0, deltatt: 10 });

        const innsendt = await sendInn(page);

        forventAntallDager(innsendt, { deltatt: 10, fravær: 0, lønn: 0, ikkeBesvart: 4 });
        await axeTestUtenDekoratøren(page, 'Kvittering etter innsending');
    });

    test('Utfylt fravær fjernes om bruker velger at de ikke har hatt fravær', async ({ page }) => {
        await fyllUtFraværSteg(page, 3);

        await knapp(page, 'forrige').click();
        await expect(page).toHaveURL(/fraver$/);
        await radio(page, 'fraværHarHattFraværSvarNei').click();
        await knapp(page, 'neste').click();

        await fyllUtLønnSteg(page, 0);
        await fyllUtDeltattSteg(page, 10);

        const innsendt = await sendInn(page);
        forventAntallDager(innsendt, { deltatt: 10, fravær: 0, lønn: 0, ikkeBesvart: 4 });
    });

    test('Utfylt lønn fjernes om bruker velger at de ikke har hatt lønn', async ({ page }) => {
        await fyllUtFraværSteg(page, 0);
        await fyllUtLønnSteg(page, 3);

        await knapp(page, 'forrige').click();
        await expect(page).toHaveURL(/lonn$/);
        await radio(page, 'lønnHarMottattLønnSvarNei').click();
        await knapp(page, 'neste').click();

        await fyllUtDeltattSteg(page, 10);

        const innsendt = await sendInn(page);
        forventAntallDager(innsendt, { deltatt: 10, fravær: 0, lønn: 0, ikkeBesvart: 4 });
    });
});

test.describe('kontroll av helg av meldekortet', () => {
    const ukedag = 'Fredag 10. januar';
    const helgedager = [
        'Lørdag 11. januar',
        'Søndag 12. januar',
        'Lørdag 18. januar',
        'Søndag 19. januar',
    ];

    for (const kanFylleUtHelg of [false, true]) {
        test(`helgedager ${kanFylleUtHelg ? 'kan' : 'kan ikke'} fylles ut når saken ${kanFylleUtHelg ? '' : 'ikke '}tillater det`, async ({
            page,
            mockApi,
        }) => {
            const forventHelgedager = async () => {
                await expect(page.getByText(ukedag)).toBeVisible();
                for (const helgedag of helgedager) {
                    if (kanFylleUtHelg) {
                        await expect(page.getByText(helgedag)).toBeVisible();
                    } else {
                        await expect(page.getByText(helgedag)).toBeHidden();
                    }
                }
            };

            await startUtfylling(page, mockApi, {
                bruker: nyMeldekortBruker({ kanSendeInnHelgForMeldekort: kanFylleUtHelg }),
            });

            await radio(page, 'fraværHarHattFraværSvarJa').click();
            await forventHelgedager();
            await radio(page, 'fraværHarHattFraværSvarNei').click();
            await knapp(page, 'neste').click();

            await expect(page).toHaveURL(/lonn$/);
            await radio(page, 'lønnHarMottattLønnSvarJa').click();
            await forventHelgedager();
            await radio(page, 'lønnHarMottattLønnSvarNei').click();
            await knapp(page, 'neste').click();

            await expect(page).toHaveURL(/deltakelse$/);
            await forventHelgedager();
            await knapp(page, 'neste').click();

            await expect(page).toHaveURL(/send-inn$/);
            await forventHelgedager();
        });
    }
});

test.describe('Send inn - feilmeldinger ved innsending', () => {
    // Backend-meldingen skal IKKE vises til bruker - vi viser vår egen lokaliserte tekst
    const startUtfyllingMedSendInnFeil = async (
        page: Page,
        mockApi: MockApi,
        kode: ErrorCodes,
        status = 409,
    ) =>
        startUtfylling(page, mockApi, {
            sendInnSvar: {
                status,
                body: { kode, melding: 'Intern backend-melding som ikke skal vises' },
            },
        });

    const fyllUtOgSendInn = async (page: Page) => {
        await fyllUtSteg(page, { fravær: 0, lønn: 0, deltatt: 10 });
        await expect(page).toHaveURL(/send-inn$/);
        await checkbox(page, 'oppsummeringBekrefter').click();
        await knapp(page, 'sendInn').click();
    };

    test('viser melding om at meldekortet allerede er sendt inn, med lenke til innsendte meldekort', async ({
        page,
        mockApi,
    }) => {
        await startUtfyllingMedSendInnFeil(page, mockApi, ErrorCodes.meldekort_allerede_mottatt);
        await fyllUtOgSendInn(page);

        await expect(
            page.getByText(tekstSegmenter('innsendingFeiletAlleredeMottatt')[0]),
        ).toBeVisible();

        await lenke(page, 'tilInnsendteMeldekort').click();
        await expect(page).toHaveURL(`${testsBaseUrl}/innsendte`);
    });

    test('viser melding om utdatert meldekort, med lenke tilbake til oversikten', async ({
        page,
        mockApi,
    }) => {
        await startUtfyllingMedSendInnFeil(page, mockApi, ErrorCodes.meldekort_deaktivert);
        await fyllUtOgSendInn(page);

        await expect(
            page.getByText(tekstSegmenter('innsendingFeiletMeldekortUtdatert')[0]),
        ).toBeVisible();

        await lenke(page, 'tilbakeTilOversikten').click();
        await expect(page).toHaveURL(`${testsBaseUrl}/`);
    });

    test('viser generell teknisk feil uten navigasjonslenke, og blir værende på send-inn-steget', async ({
        page,
        mockApi,
    }) => {
        await startUtfyllingMedSendInnFeil(page, mockApi, ErrorCodes.uventet_feil_ved_lagring, 500);
        await fyllUtOgSendInn(page);

        await expect(
            page.getByText(tekstSegmenter('innsendingFeiletTekniskFeil')[0]),
        ).toBeVisible();
        await expect(lenke(page, 'tilbakeTilOversikten')).toBeHidden();
        await expect(lenke(page, 'tilInnsendteMeldekort')).toBeHidden();
        await expect(page).toHaveURL(/send-inn$/);
    });
});

const forventAntallDager = (
    innsendt: MeldekortUtfyltDTO,
    forventet: { deltatt: number; fravær: number; lønn: number; ikkeBesvart: number },
) => {
    const antall = (status: MeldekortDagStatus) => antallDagerMedStatus(innsendt, status);

    expect({
        deltatt: antall(MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET),
        fravær: antall(MeldekortDagStatus.FRAVÆR_SYK),
        lønn: antall(MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET),
        ikkeBesvart: antall(MeldekortDagStatus.IKKE_BESVART),
    }).toEqual(forventet);
};
