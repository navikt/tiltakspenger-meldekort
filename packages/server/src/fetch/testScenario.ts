import { Request } from 'express';
import {
    TestScenario,
    testScenarioCookieNavn,
    testScenarioIdRegex,
} from '@meldekort/common/testScenario';
import { isProd } from '@utils/env';
import { lesCookie, mockResponse } from '@fetch/mockUtils';

const maksAntallScenarioer = 500;

const scenarioer = new Map<string, TestScenario>();

export const testScenarioErAktivert = () => !isProd();

export const hentTestScenarioId = (req: Request): string | null => {
    if (!testScenarioErAktivert()) {
        return null;
    }

    const id = lesCookie(req, testScenarioCookieNavn);
    return id && testScenarioIdRegex.test(id) ? id : null;
};

export const svarFraTestScenario = (scenarioId: string, path: string) => {
    const pathUtenQuery = path.split('?')[0];
    const svar = scenarioer.get(scenarioId)?.[pathUtenQuery];

    if (!svar) {
        console.log(`Testscenario ${scenarioId} mangler svar for ${pathUtenQuery}`);
        return mockResponse(404, null);
    }

    return mockResponse(svar.status, svar.body);
};

export const lagreTestScenario = (id: string, scenario: TestScenario) => {
    scenarioer.delete(id);
    scenarioer.set(id, scenario);

    // Map itererer i innsettingsrekkefølge, så den første nøkkelen er den eldste
    if (scenarioer.size > maksAntallScenarioer) {
        scenarioer.delete(scenarioer.keys().next().value!);
    }
};

export const slettTestScenario = (id: string) => {
    scenarioer.delete(id);
};
