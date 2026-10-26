export const demoInnvilgelseCookieNavn = 'tp-meldekort-demo-innvilgelse';

export type DemoInnvilgelsesperiode = {
    fraOgMed: string;
    tilOgMed: string;
    /** Antall dager per meldeperiode fra vedtaket. Uten verdi brukes 10. */
    antallDager?: number;
};

const cookieVerdiRegex = /^(\d{4}-\d{2}-\d{2})_(\d{4}-\d{2}-\d{2})(?:_(\d{1,2}))?$/;

export const serialiserDemoInnvilgelse = (periode: DemoInnvilgelsesperiode) =>
    `${periode.fraOgMed}_${periode.tilOgMed}${periode.antallDager ? `_${periode.antallDager}` : ''}`;

export const parseDemoInnvilgelse = (verdi: string): DemoInnvilgelsesperiode | null => {
    const match = cookieVerdiRegex.exec(verdi);
    if (!match) {
        return null;
    }

    const [, fraOgMed, tilOgMed, antallDagerTekst] = match;
    const antallDager = antallDagerTekst ? Number(antallDagerTekst) : undefined;

    // ISO-datoer sorterer leksikografisk, så strengsammenligning holder her
    if (fraOgMed > tilOgMed) {
        return null;
    }

    if (antallDager !== undefined && (antallDager < 1 || antallDager > 14)) {
        return null;
    }

    return { fraOgMed, tilOgMed, antallDager };
};
