import { format } from 'date-fns/format';
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

type FormatterDatoProps = {
    dato: string;
    medUkeDag?: boolean;
    medStorForbokstav?: boolean;
};

export const formatterDato = ({
    dato,
    medUkeDag,
    medStorForbokstav = true,
}: FormatterDatoProps) => {
    const formatStr = `${medUkeDag ? 'EEEE ' : ''}d. MMMM`;
    const formattert = format(dato, formatStr, { locale: nb });

    return medStorForbokstav
        ? formattert.replace(/^./, (match) => match.toUpperCase())
        : formattert;
};

export const formatterDatoTid = (datoTid: string) => {
    return format(datoTid, "d.MM.yyyy 'kl.' HH:mm", { locale: nb });
};
