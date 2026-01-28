import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/nb.js';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
import { TeksterLocale } from '@common/typer/locale.ts';

dayjs.extend(weekOfYear);
dayjs.extend(localizedFormat);

type FormatterDatoProps = {
    dato: string;
    medUkeDag?: boolean;
    medStorForbokstav?: boolean;
    kort?: boolean;
    locale: TeksterLocale;
};

export const formatterDato = ({
    dato,
    medUkeDag,
    medStorForbokstav = true,
    kort = false,
    locale,
}: FormatterDatoProps) => {
    const ukeDag = medUkeDag ? (kort ? 'ddd ' : 'dddd ') : '';

    const formattert = lokalTid(dato, locale).format(`${ukeDag}D. ${kort ? 'MMM' : 'MMMM'}`);

    return medStorForbokstav
        ? formattert.replace(/^./, (match) => match.toUpperCase())
        : formattert;
};

export const formatterDatoTid = (datoTid: string, locale: TeksterLocale) => {
    return lokalTid(datoTid, locale).format('D[.] MMMM YYYY [kl.] H:mm');
};

export const getUkenummer = (datoTid: string, locale: TeksterLocale) => {
    return lokalTid(datoTid, locale).week();
};

export const lokalTid = (date: string, locale: TeksterLocale): Dayjs => {
    return dayjs(date).locale(locale);
};
