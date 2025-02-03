import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(weekOfYear);
dayjs.extend(localizedFormat);

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
    const formattert = dayjs(dato)
        .locale('nb')
        .format(`${medUkeDag ? 'dddd ' : ''}D. MMMM`);

    return medStorForbokstav
        ? formattert.replace(/^./, (match) => match.toUpperCase())
        : formattert;
};

export const formatterDatoTid = (datoTid: string) => {
    return dayjs(datoTid).locale('nb').format("D.M.YYYY [kl.] H:mm");
};

export const getUkenummer = (datoTid: string) => {
    return dayjs(datoTid).locale('nb').week();
};
