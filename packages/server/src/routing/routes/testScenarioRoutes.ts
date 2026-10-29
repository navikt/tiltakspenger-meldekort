import { Router } from 'express';
import { appConfig } from '@meldekort/common/appConfig';
import { TestScenario, testScenarioIdRegex } from '@meldekort/common/testScenario';
import { lagreTestScenario, slettTestScenario, testScenarioErAktivert } from '@fetch/testScenario';

export const setupTestScenarioRoutes = (router: Router) => {
    if (!testScenarioErAktivert()) {
        return;
    }

    const path = `${appConfig.demoRoutePrefix}/test-scenario/:id`;

    router.put<{ id: string }>(path, (req, res) => {
        const { id } = req.params;
        if (!testScenarioIdRegex.test(id)) {
            return res.status(400).send();
        }

        lagreTestScenario(id, req.body as TestScenario);
        return res.status(204).send();
    });

    router.delete<{ id: string }>(path, (req, res) => {
        slettTestScenario(req.params.id);
        return res.status(204).send();
    });
};
