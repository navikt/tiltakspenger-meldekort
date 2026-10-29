import { test as base, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import {
    TestScenario,
    testScenarioCookieNavn,
    TestScenarioSvar,
} from '../../packages/common/src/testScenario';
import { Meldekort } from '../../packages/common/src/typer/MeldekortBruker';
import { MeldekortBrukerDTO } from '../../packages/common/src/typer/meldekort-bruker';
import { InnsendteMeldekortDTO } from '../../packages/common/src/typer/alle-meldekort';
import { MeldekortForKjedeResponse } from '../../packages/common/src/typer/MeldeperiodeKjede';
import { KorrigerMeldekortResponse } from '../../packages/common/src/typer/KorrigerMeldekort';
import { nyMeldekortBruker } from '../test-data-generators/MeldekortBrukerTestData';
import { nyUtfylltMeldekortMedSisteMeldeperiode } from '../test-data-generators/MeldekortTestData';
import { Korrigering } from '../test-data-generators/MeldekortKorrigeringTestData';
import { testsBaseUrl } from './utils';

/**
 * Svarene meldekort-api skal gi i en test. Alt som ikke er definert her svarer med 404.
 */
export type ApiScenario = {
    bruker?: MeldekortBrukerDTO;
    meldekort?: Meldekort[];
    innsendte?: Meldekort[];
    kjeder?: MeldekortForKjedeResponse[];
    korrigeringer?: Korrigering[];
    sendInnSvar?: TestScenarioSvar;
    korrigerSvar?: TestScenarioSvar;
};

const ok = (body: unknown = {}): TestScenarioSvar => ({ status: 200, body });

const tilTestScenario = ({
    bruker = nyMeldekortBruker(),
    meldekort = [],
    innsendte = [],
    kjeder = [],
    korrigeringer = [],
    sendInnSvar = ok(),
    korrigerSvar = ok(),
}: ApiScenario): TestScenario => ({
    bruker: ok(bruker),
    'meldekort/innsendte': ok({
        bruker,
        meldekortMedSisteMeldeperiode: innsendte.map(nyUtfylltMeldekortMedSisteMeldeperiode),
    } satisfies InnsendteMeldekortDTO),
    'send-inn': sendInnSvar,
    ...Object.fromEntries(meldekort.map((mk) => [`meldekort/${mk.id}`, ok(mk)])),
    ...Object.fromEntries(kjeder.map((kjede) => [`kjede/${kjede.kjedeId}`, ok(kjede)])),
    ...Object.fromEntries(
        korrigeringer.flatMap(({ forrigeMeldekort, tilUtfylling, kanKorrigeres }) => {
            const { id } = forrigeMeldekort;
            return [
                [
                    `korrigering/${id}`,
                    ok({ forrigeMeldekort, tilUtfylling } satisfies KorrigerMeldekortResponse),
                ],
                [`${id}/kan-korrigeres`, ok({ kanKorrigeres })],
                [`${id}/korriger`, korrigerSvar],
            ];
        }),
    ),
});

export type MockApi = (scenario: ApiScenario) => Promise<void>;

/**
 * Utvidet test der `mockApi` bestemmer hva serveren svarer på kall mot meldekort-api,
 * både ved server-side rendering og klientens datahenting.
 * Kan kalles flere ganger i en test for å endre svarene underveis.
 */
export const test = base.extend<{ mockApi: MockApi }>({
    mockApi: async ({ page, request }, use) => {
        const scenarioId = randomUUID();
        const scenarioUrl = `${testsBaseUrl}/test-scenario/${scenarioId}`;

        await page.context().addCookies([
            {
                name: testScenarioCookieNavn,
                value: scenarioId,
                domain: new URL(testsBaseUrl).hostname,
                path: '/',
            },
        ]);

        await use(async (scenario) => {
            const response = await request.put(scenarioUrl, { data: tilTestScenario(scenario) });
            expect(
                response.ok(),
                'Kunne ikke registrere testscenario på serveren - er appen bygget med `pnpm run build:test`?',
            ).toBe(true);
        });

        await request.delete(scenarioUrl);
    },
});

export { expect };
