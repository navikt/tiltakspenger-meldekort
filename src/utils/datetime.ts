import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/nb.js';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';

dayjs.extend(weekOfYear);
dayjs.extend(localizedFormat);

type FormatterDatoProps = {
    dato: string;
    medUkeDag?: boolean;
    medStorForbokstav?: boolean;
    kort?: boolean;
};

export const formatterDato = ({
    dato,
    medUkeDag,
    medStorForbokstav = true,
    kort = false,
}: FormatterDatoProps) => {
    const ukeDag = medUkeDag ? (kort ? 'ddd ' : 'dddd ') : '';

    const formattert = lokalTid(dato).format(`${ukeDag}D. ${kort ? 'MMM' : 'MMMM'}`);

    return medStorForbokstav
        ? formattert.replace(/^./, (match) => match.toUpperCase())
        : formattert;
};

export const formatterDatoTid = (datoTid: string) => {
    return lokalTid(datoTid).format('D[.] MMMM YYYY [kl.] H:mm');
};

export const getUkenummer = (datoTid: string) => {
    return lokalTid(datoTid).week();
};

export const lokalTid = (date: string): Dayjs => {
    return dayjs(date).locale('nb');
};
