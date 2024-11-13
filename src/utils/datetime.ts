import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';

type Ukedag = {
    kort: string;
    lang: string;
};

const getUkedager = (locale: string): Ukedag[] =>
    Array.from({ length: 7 }).map((_, index) => {
        const date = new Date(Date.UTC(2017, 0, 2 + index)); // 2017-01-02 is just a random Monday
        return {
            kort: date.toLocaleDateString(locale, { weekday: 'short' }).replace('.', ''),
            lang: date.toLocaleDateString(locale, { weekday: 'long' }),
        };
    });

export const Ukedager = {
    nb: getUkedager('no-nb'),
} as const;

export const formatterDato = (dato: string, medStorForbokstav?: boolean) => {
    const formattert = format(dato, 'EEEE d. MMMM', { locale: nb });

    return medStorForbokstav
        ? formattert.replace(/^./, (match) => match.toUpperCase())
        : formattert;
};
