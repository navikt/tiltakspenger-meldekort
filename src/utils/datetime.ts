import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/nb.js';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
import { TeksterLocale } from '@common/locale.ts';

dayjs.extend(weekOfYear);
dayjs.extend(localizedFormat);

type FormatterDatoProps = {
    dato: string;
    medUkeDag?: boolean;
    medStorForbokstav?: boolean;
    medÅr?: boolean;
    kort?: boolean;
    locale: TeksterLocale;
};

export const formatterDato = ({
    dato,
    medUkeDag,
    medStorForbokstav = true,
    kort = false,
    medÅr = false,
    locale,
}: FormatterDatoProps) => {
    const ukeDag = medUkeDag ? (kort ? 'ddd ' : 'dddd ') : '';

    const template =
        locale === 'en'
            ? `${ukeDag}D ${kort ? 'MMM' : 'MMMM'}${medÅr ? ' YYYY' : ''}`
            : `${ukeDag}D. ${kort ? 'MMM' : 'MMMM'}${medÅr ? ' YYYY' : ''}`;
    const formattert = lokalTid(dato, locale).format(template);

    return medStorForbokstav
        ? formattert.replace(/^./, (match) => match.toUpperCase())
        : formattert;
};

export const formatterDatoTid = (datoTid: string, locale: TeksterLocale) => {
    const template = locale === 'en' ? 'D MMMM YYYY [at] H:mm' : 'D[.] MMMM YYYY [kl.] H:mm';
    return lokalTid(datoTid, locale).format(template);
};

export const getUkenummer = (datoTid: string) => {
    return dayjs(datoTid).week();
};

export const lokalTid = (date: string, locale: TeksterLocale): Dayjs => {
    return dayjs(date).locale(locale);
};
