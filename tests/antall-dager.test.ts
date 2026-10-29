import test, { expect } from '@playwright/test';
import { checkbox, gåTil, knapp, tekst, testsBaseUrl } from './helpers/utils';
import {
    antallDagerMedStatus,
    Fraværstype,
    fyllUtSteg,
    sendInn,
    Utfylling,
} from './helpers/utfylling';
import { MeldekortDagStatus } from '../packages/common/src/typer/MeldekortBruker';
import { demoInnvilgelseCookieNavn, serialiserDemoInnvilgelse } from '../packages/common/src/demo';

const {
    FRAVÆR_SYK,
    FRAVÆR_SYKT_BARN,
    FRAVÆR_STERKE_VELFERDSGRUNNER_ELLER_JOBBINTERVJU,
    FRAVÆR_ANNET,
} = MeldekortDagStatus;

// Vedtak med færre dager enn 10 per meldeperiode, slik brukere får etter en revurdering.
// Demo-serveren lager da ett meldekort (meldekort_2) der alle 14 dagene gir rett, men bare 4 kan fylles ut.
const antallDager = 4;
const innvilgelse = { fraOgMed: '2026-10-12', tilOgMed: '2026-10-25', antallDager };

type UtfyllingMedFraværstyper = Utfylling & { fravær: Fraværstype[] };

const kanSendesInn: Array<{ navn: string } & UtfyllingMedFraværstyper> = [
    { navn: 'bare deltakelse', fravær: [], lønn: 0, deltatt: 4 },
    {
        navn: 'eget fravær og barns fravær',
        fravær: [FRAVÆR_SYK, FRAVÆR_SYKT_BARN],
        lønn: 0,
        deltatt: 2,
    },
    {
        navn: 'barns fravær, velferd og lønn',
        fravær: [
            FRAVÆR_SYKT_BARN,
            FRAVÆR_SYKT_BARN,
            FRAVÆR_STERKE_VELFERDSGRUNNER_ELLER_JOBBINTERVJU,
        ],
        lønn: 1,
        deltatt: 0,
    },
    {
        navn: 'bare fravær av alle typer',
        fravær: [
            FRAVÆR_SYK,
            FRAVÆR_SYKT_BARN,
            FRAVÆR_STERKE_VELFERDSGRUNNER_ELLER_JOBBINTERVJU,
            FRAVÆR_ANNET,
        ],
        lønn: 0,
        deltatt: 0,
    },
];

const stoppes: Array<{ navn: string; feil: 'forMangeDagerEnkel' | 'forFaDagerEnkel' } & Utfylling> =
    [
        {
            navn: '10 dager som før revurderingen',
            fravær: [],
            lønn: 0,
            deltatt: 10,
            feil: 'forMangeDagerEnkel',
        },
        {
            navn: 'én dag for mye med fravær',
            fravær: [FRAVÆR_SYK, FRAVÆR_SYKT_BARN],
            lønn: 0,
            deltatt: 3,
            feil: 'forMangeDagerEnkel',
        },
        {
            navn: 'én dag for lite',
            fravær: [FRAVÆR_SYKT_BARN],
            lønn: 0,
            deltatt: 2,
            feil: 'forFaDagerEnkel',
        },
    ];

test.describe(`Meldekort med vedtak om ${antallDager} dager per meldeperiode`, () => {
    test.beforeEach(async ({ page, context }) => {
        await context.addCookies([
            {
                name: demoInnvilgelseCookieNavn,
                value: serialiserDemoInnvilgelse(innvilgelse),
                url: testsBaseUrl,
            },
        ]);
        await gåTil(page, '/meldekort_2/fraver');
    });

    for (const utfylling of kanSendesInn) {
        test(`kan sendes inn: ${utfylling.navn}`, async ({ page }) => {
            await fyllUtSteg(page, utfylling);

            const innsendt = await sendInn(page);
            const antallMedStatus = (status: MeldekortDagStatus) =>
                antallDagerMedStatus(innsendt, status);

            for (const status of new Set(utfylling.fravær)) {
                expect(antallMedStatus(status), status).toBe(
                    utfylling.fravær.filter((f) => f === status).length,
                );
            }
            expect(antallMedStatus(MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET)).toBe(
                utfylling.lønn,
            );
            expect(antallMedStatus(MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET)).toBe(
                utfylling.deltatt,
            );
            expect(innsendt.dager.length - antallMedStatus(MeldekortDagStatus.IKKE_BESVART)).toBe(
                antallDager,
            );
        });
    }

    for (const utfylling of stoppes) {
        test(`stoppes med ${utfylling.feil}: ${utfylling.navn}`, async ({ page }) => {
            const innsendinger: string[] = [];
            page.on('request', (request) => {
                if (request.url().endsWith('/api/send-inn')) innsendinger.push(request.url());
            });

            await fyllUtSteg(page, utfylling);
            await expect(page).toHaveURL(/send-inn$/);

            await checkbox(page, 'oppsummeringBekrefter').click();
            await knapp(page, 'sendInn').click();

            await expect(page.getByText(tekst(utfylling.feil))).toBeVisible();
            await expect(page).toHaveURL(/send-inn$/);
            expect(innsendinger).toHaveLength(0);
        });
    }
});

test('demoen lar deg velge antall dager per meldeperiode', async ({ page, context }) => {
    await gåTil(page, '');

    await page.getByRole('radio', { name: 'Jul' }).click();
    await page.getByLabel('Antall dager per meldeperiode').selectOption(String(antallDager));

    await expect(page.getByText(`${antallDager} dager per meldeperiode.`)).toBeVisible();
    const cookie = (await context.cookies(testsBaseUrl)).find(
        (kandidat) => kandidat.name === demoInnvilgelseCookieNavn,
    );
    expect(cookie?.value).toMatch(new RegExp(`_${antallDager}$`));
});
