import { Alert, BodyLong } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { formatterDato, formatterDatoTid } from '@utils/datetime';
import { MeldekortUtfylling } from '../../../../commonSrc/typer/meldekort-utfylling.ts';

import style from './SisteMeldekortStatus.module.css';

type Props = {
    meldekort: MeldekortUtfylling;
};

export const SisteMeldekortStatus = ({ meldekort }: Props) => {
    return (
        <Alert variant={'info'} contentMaxWidth={false} className={style.status}>
            <BodyLong spacing>
                <Tekst id={'forsideIngenMeldekort'} />
            </BodyLong>
            {meldekort.innsendt && (
                <BodyLong>
                    {'Din siste innsending var '}
                    <strong>{formatterDatoTid(meldekort.innsendt)}</strong>
                    {' for perioden '}
                    <strong>{formatterDato({ dato: meldekort.periode.fraOgMed })}</strong>
                    {' til '}
                    <strong>{formatterDato({ dato: meldekort.periode.tilOgMed })}</strong>
                </BodyLong>
            )}
        </Alert>
    );
};
