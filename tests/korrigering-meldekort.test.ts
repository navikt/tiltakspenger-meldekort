import { Page } from '@playwright/test';
import { ApiScenario, expect, MockApi, test } from './helpers/mockApi';
import { checkbox, gåTil, knapp, lenke, tekst, testsBaseUrl } from './helpers/utils';
import { Meldekort, MeldekortDagStatus } from '../packages/common/src/typer/MeldekortBruker';
import { TekstId } from '../packages/client/src/tekster/typer';
import { ErrorCodes } from '../packages/client/src/utils/apiClient';
import { lagDager, nyUtfylltMeldekort } from './test-data-generators/MeldekortTestData';
import { nyKorrigering } from './test-data-generators/MeldekortKorrigeringTestData';

const {
    DELTATT_UTEN_LØNN_I_TILTAKET,
    DELTATT_MED_LØNN_I_TILTAKET,
    FRAVÆR_SYK,
    FRAVÆR_SYKT_BARN,
    FRAVÆR_ANNET,
    FRAVÆR_STERKE_VELFERDSGRUNNER_ELLER_JOBBINTERVJU,
    IKKE_BESVART,
    IKKE_RETT_TIL_TILTAKSPENGER,
} = MeldekortDagStatus;

// Innsendt meldekort for 2. - 15. januar 2023, uke 1 - 2
const innsendtMeldekort = nyUtfylltMeldekort();

type KorrigeringSteg = 'utfylling' | 'oppsummering' | 'kvittering';

const korrigeringUrl = (steg: KorrigeringSteg, meldekort: Meldekort = innsendtMeldekort) =>
    `${testsBaseUrl}/${meldekort.id}/korrigering/${steg}`;

const forventSteg = (page: Page, steg: KorrigeringSteg) =>
    expect(page).toHaveURL(korrigeringUrl(steg));

const forventForsiden = (page: Page) => expect(page).toHaveURL(`${testsBaseUrl}/`);

/**
 * Går fra innsendte meldekort til korrigering av meldekortet
 */
const åpneKorrigering = async (
    page: Page,
    mockApi: MockApi,
    {
        forrigeMeldekort = innsendtMeldekort,
        ...scenario
    }: ApiScenario & { forrigeMeldekort?: Meldekort } = {},
) => {
    await mockApi({
        innsendte: [forrigeMeldekort],
        korrigeringer: [nyKorrigering(forrigeMeldekort)],
        ...scenario,
    });
    await gåTil(page, '/innsendte');

    await page
        .getByText(`Meldekort uke ${forrigeMeldekort.uke1} - ${forrigeMeldekort.uke2}`)
        .click();
    await knapp(page, 'endreMeldekort').click();
};

const startKorrigering = async (...args: Parameters<typeof åpneKorrigering>) => {
    await åpneKorrigering(...args);
    await forventSteg(args[0], 'utfylling');
};

const velgStatuser = async (page: Page, statuser: Record<string, MeldekortDagStatus>) => {
    for (const [dato, status] of Object.entries(statuser)) {
        await page.selectOption(`#select-${dato}`, { value: status });
    }
};

const forventStatuser = async (page: Page, statuser: Record<string, MeldekortDagStatus>) => {
    for (const [dato, status] of Object.entries(statuser)) {
        await expect(page.locator(`#select-${dato}`)).toHaveValue(status);
    }
};

const gåTilOppsummering = async (page: Page) => {
    await knapp(page, 'neste', false).click();
    await forventSteg(page, 'oppsummering');
};

const bekreftOgSendKorrigering = async (page: Page) => {
    await checkbox(page, 'oppsummeringBekrefter').click();
    await knapp(page, 'korrigeringSendMeldekortet', false).click();
};

const forventKvittering = async (page: Page) => {
    await forventSteg(page, 'kvittering');
    await expect(page.getByText('Du har sendt inn endringene på meldekortet.')).toBeVisible();
};

// En endring på 2. januar, slik at korrigeringen kan sendes inn
const enEndring = { '2023-01-02': FRAVÆR_SYK };

const endringerUke1Og2 = {
    '2023-01-02': DELTATT_UTEN_LØNN_I_TILTAKET,
    '2023-01-04': DELTATT_UTEN_LØNN_I_TILTAKET,
    '2023-01-05': DELTATT_UTEN_LØNN_I_TILTAKET,
    '2023-01-09': DELTATT_MED_LØNN_I_TILTAKET,
    '2023-01-10': FRAVÆR_SYKT_BARN,
    '2023-01-11': FRAVÆR_ANNET,
    '2023-01-12': DELTATT_UTEN_LØNN_I_TILTAKET,
    '2023-01-13': FRAVÆR_STERKE_VELFERDSGRUNNER_ELLER_JOBBINTERVJU,
};

test('kan korrigere meldekort', async ({ page, mockApi }) => {
    await startKorrigering(page, mockApi);

    // 3. januar er allerede deltatt og 6. januar allerede syk
    await velgStatuser(page, endringerUke1Og2);
    await gåTilOppsummering(page);

    const forventetOppsummering: [string, TekstId][] = [
        ['Mandag 2. januar', 'statusDeltatt'],
        ['Tirsdag 3. januar', 'statusDeltatt'],
        ['Onsdag 4. januar', 'statusDeltatt'],
        ['Torsdag 5. januar', 'statusDeltatt'],
        ['Fredag 6. januar', 'statusSyk'],
        ['Mandag 9. januar', 'statusDeltattMedLønn'],
        ['Tirsdag 10. januar', 'statusSyktBarn'],
        ['Onsdag 11. januar', 'statusAnnetFravær'],
        ['Torsdag 12. januar', 'statusDeltatt'],
        ['Fredag 13. januar', 'statusSterkeVelferdsgrunnerEllerJobbintervju'],
    ];
    for (const [dag, status] of forventetOppsummering) {
        await expect(page.getByText(`${dag}: ${tekst(status)}`)).toBeVisible();
    }

    await bekreftOgSendKorrigering(page);
    await forventKvittering(page);
});

test.describe('kan avbryte korrigering av et meldekort', () => {
    test('fra korrigering', async ({ page, mockApi }) => {
        await startKorrigering(page, mockApi);

        await knapp(page, 'avbrytEndring').click();
        await forventForsiden(page);
    });

    test('fra oppsummering', async ({ page, mockApi }) => {
        await startKorrigering(page, mockApi);
        await velgStatuser(page, enEndring);
        await gåTilOppsummering(page);

        await knapp(page, 'avbrytEndring').click();
        await forventForsiden(page);
    });
});

test('kan ikke gå videre uten endringer', async ({ page, mockApi }) => {
    await startKorrigering(page, mockApi);

    await knapp(page, 'neste', false).click();

    await expect(page.getByText(tekst('korrigeringUtfyllingFeilIngenEndring'))).toBeVisible();
    await forventSteg(page, 'utfylling');
});

test('kan ikke sende inn meldekort uten å bekrefte', async ({ page, mockApi }) => {
    await startKorrigering(page, mockApi);
    await velgStatuser(page, enEndring);
    await gåTilOppsummering(page);

    await knapp(page, 'korrigeringSendMeldekortet', false).click();
    await expect(page.getByText(tekst('forsideBekrefterFeil'))).toBeVisible();
    await forventSteg(page, 'oppsummering');

    await bekreftOgSendKorrigering(page);
    await forventKvittering(page);
});

test('forrige steg på oppsummering tar deg tilbake til korrigering med den korrigerte dataen', async ({
    page,
    mockApi,
}) => {
    const endringer = { ...endringerUke1Og2, '2023-01-06': DELTATT_UTEN_LØNN_I_TILTAKET };

    await startKorrigering(page, mockApi);
    await velgStatuser(page, endringer);
    await gåTilOppsummering(page);

    await knapp(page, 'forrige', false).click();

    await forventSteg(page, 'utfylling');
    await forventStatuser(page, endringer);
});

test('dager som ikke har rett skal ikke kunne endres', async ({ page, mockApi }) => {
    const meldekortMedDagerUtenRett = nyUtfylltMeldekort({
        dager: lagDager('2023-01-02', [
            IKKE_RETT_TIL_TILTAKSPENGER,
            IKKE_RETT_TIL_TILTAKSPENGER,
            FRAVÆR_SYKT_BARN,
            DELTATT_MED_LØNN_I_TILTAKET,
            DELTATT_UTEN_LØNN_I_TILTAKET,
            IKKE_BESVART,
            IKKE_BESVART,
            FRAVÆR_STERKE_VELFERDSGRUNNER_ELLER_JOBBINTERVJU,
            ...Array<MeldekortDagStatus>(6).fill(IKKE_BESVART),
        ]),
    });

    await startKorrigering(page, mockApi, { forrigeMeldekort: meldekortMedDagerUtenRett });

    // Vi har ikke en god måte å teste at dagen ikke kan endres, så vi sjekker at feltet er readonly
    const formField = page.locator('label[for="select-2023-01-02"]').locator('..');
    await expect(formField).toHaveClass(/aksel-form-field--readonly/);
});

test.describe('validerer korrigering av meldekort', () => {
    const forMangeDagerFeil = 'Du har registrert for mange dager (10). Maks antall er 9 dager.';

    test('Validerer min og maks antall dager der alle dager gir rett til tiltakspenger', async ({
        page,
        mockApi,
    }) => {
        const ikkeRegnetMedMerknad = page.getByText(tekst('korrigeringUtfyllingFeilStatusMerknad'));

        await startKorrigering(page, mockApi);

        await velgStatuser(page, { '2023-01-02': IKKE_BESVART });
        await knapp(page, 'neste', false).click();
        await expect(ikkeRegnetMedMerknad).toBeVisible();

        await velgStatuser(page, { '2023-01-02': DELTATT_UTEN_LØNN_I_TILTAKET });
        await expect(ikkeRegnetMedMerknad).toBeHidden();

        await gåTilOppsummering(page);
    });

    test('Valider kun maks der minst en dag ikke gir rett til tiltakspenger', async ({
        page,
        mockApi,
    }) => {
        const meldekort = nyUtfylltMeldekort({
            fraOgMed: '2025-01-06',
            tilOgMed: '2025-01-19',
            maksAntallDager: 9,
            dager: lagDager('2025-01-06', [
                ...Array<MeldekortDagStatus>(4).fill(DELTATT_UTEN_LØNN_I_TILTAKET),
                IKKE_BESVART,
                IKKE_BESVART,
                IKKE_BESVART,
                ...Array<MeldekortDagStatus>(5).fill(DELTATT_UTEN_LØNN_I_TILTAKET),
                IKKE_BESVART,
                IKKE_BESVART,
            ]),
        });

        await startKorrigering(page, mockApi, { forrigeMeldekort: meldekort });

        await velgStatuser(page, { '2025-01-10': DELTATT_UTEN_LØNN_I_TILTAKET });
        await knapp(page, 'neste', false).click();
        await expect(page.getByText(forMangeDagerFeil)).toBeVisible();

        await velgStatuser(page, { '2025-01-10': MeldekortDagStatus.IKKE_TILTAKSDAG });
        await expect(page.getByText(forMangeDagerFeil)).toBeHidden();

        await gåTilOppsummering(page);
    });
});

test('får melding om at meldekortet er allerede korrigert - og en lenke til oversikten', async ({
    page,
    mockApi,
}) => {
    const melding =
        'Dette meldekortet er allerede korrigert, og er ikke lenger gyldig. Et nyere meldekort finnes.';

    await startKorrigering(page, mockApi, {
        korrigerSvar: {
            status: 400,
            body: {
                kode: ErrorCodes.meldekort_allerede_korrigert_og_ikke_lenger_gyldig,
                melding,
            },
        },
    });
    await velgStatuser(page, enEndring);
    await gåTilOppsummering(page);
    await bekreftOgSendKorrigering(page);

    await expect(page.getByText(melding)).toBeVisible();

    await lenke(page, 'tilbakeTilOversiktForNyKorrigering').click();
    await forventForsiden(page);
});

test.describe('navigerer til forsiden dersom man prøver å korrigere et meldekort som ikke kan korrigeres', () => {
    test('fra utfyllingssiden', async ({ page, mockApi }) => {
        await åpneKorrigering(page, mockApi, {
            korrigeringer: [nyKorrigering(innsendtMeldekort, false)],
        });

        await forventForsiden(page);
    });

    test('fra oppsummeringssiden', async ({ page, mockApi }) => {
        await startKorrigering(page, mockApi);
        await velgStatuser(page, enEndring);

        await mockApi({
            innsendte: [innsendtMeldekort],
            korrigeringer: [nyKorrigering(innsendtMeldekort, false)],
        });
        await knapp(page, 'neste', false).click();

        await forventForsiden(page);
    });
});
