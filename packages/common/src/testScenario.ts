// Lar e2e-testene definere egne svar fra meldekort-api for demo-rutene, i stedet for demo-dataene.
// Testen registrerer et scenario på serveren og setter cookien med scenario-id'en.
// Kun med i serverbygget fra `pnpm run build:test` (og dev/watch), aldri i bygget som deployes.

export const testScenarioCookieNavn = 'tp-meldekort-test-scenario';

export const testScenarioIdRegex = /^[\w-]{1,64}$/;

export type TestScenarioSvar = {
    status: number;
    body?: unknown;
};

// Nøkkelen er api-pathen (uten query-parametre), f.eks. "bruker" eller "meldekort/123"
export type TestScenario = Record<string, TestScenarioSvar>;
