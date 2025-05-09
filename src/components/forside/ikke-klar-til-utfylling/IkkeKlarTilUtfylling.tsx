import { Alert, BodyLong } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { formatterDato, formatterDatoTid } from '@utils/datetime';
import { MeldekortBrukerMedSak } from '@common/typer/meldekort-bruker.ts';

import style from './IkkeKlarTilUtfylling.module.css';

type Props = {
    meldekortBruker: MeldekortBrukerMedSak;
};

export const IkkeKlarTilUtfylling = ({ meldekortBruker }: Props) => {
    const { forrigeMeldekort, nesteInnsending } = meldekortBruker;

    return (
        <Alert variant={'info'} contentMaxWidth={false} className={style.wrapper}>
            <BodyLong>
                <Tekst id={'forsideIngenMeldekort'} />
                {nesteInnsending && (
                    <>
                        <Tekst id={'forsideNesteMeldekort1'} />
                        <strong>{formatterDato({ dato: nesteInnsending.kanSendesDato })}</strong>
                        <Tekst id={'forsideNesteMeldekort2'} />
                        <strong>
                            {formatterDato({ dato: nesteInnsending.periode.fraOgMed })}
                            {'-'}
                            {formatterDato({ dato: nesteInnsending.periode.tilOgMed })}
                        </strong>
                        {'.'}
                    </>
                )}
            </BodyLong>
            {forrigeMeldekort?.innsendt && (
                <BodyLong>
                    <Tekst id={'forsideForrigeMeldekort1'} />
                    <strong>{formatterDatoTid(forrigeMeldekort.innsendt)}</strong>
                    <Tekst id={'forsideForrigeMeldekort2'} />
                    <strong>
                        {formatterDato({ dato: forrigeMeldekort.periode.fraOgMed })}
                        {'-'}
                        {formatterDato({ dato: forrigeMeldekort.periode.tilOgMed })}
                    </strong>
                    {'.'}
                </BodyLong>
            )}
        </Alert>
    );
};
