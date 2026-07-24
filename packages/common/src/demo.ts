export const demoInnvilgelseCookieNavn = 'tp-meldekort-demo-innvilgelse';

export type DemoInnvilgelsesperiode = {
    fraOgMed: string;
    tilOgMed: string;
};

const cookieVerdiRegex = /^(\d{4}-\d{2}-\d{2})_(\d{4}-\d{2}-\d{2})$/;

export const serialiserDemoInnvilgelse = (periode: DemoInnvilgelsesperiode) =>
    `${periode.fraOgMed}_${periode.tilOgMed}`;

export const parseDemoInnvilgelse = (verdi: string): DemoInnvilgelsesperiode | null => {
    const match = cookieVerdiRegex.exec(verdi);
    if (!match) {
        return null;
    }

    const [, fraOgMed, tilOgMed] = match;

    // ISO-datoer sorterer leksikografisk, så strengsammenligning holder her
    if (fraOgMed > tilOgMed) {
        return null;
    }

    return { fraOgMed, tilOgMed };
};
