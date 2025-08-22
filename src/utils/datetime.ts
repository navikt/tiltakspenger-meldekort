import dayjs from 'dayjs';
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

    const formattert = dayjs(dato)
        .locale('nb')
        .format(`${ukeDag}D. ${kort ? 'MMM' : 'MMMM'}`);

    return medStorForbokstav
        ? formattert.replace(/^./, (match) => match.toUpperCase())
        : formattert;
};

export const formatterDatoTid = (datoTid: string) => {
    return dayjs(datoTid).locale('nb').format('D[.] MMMM YYYY [kl.] H:mm');
};

export const getUkenummer = (datoTid: string) => {
    return dayjs(datoTid).locale('nb').week();
};
