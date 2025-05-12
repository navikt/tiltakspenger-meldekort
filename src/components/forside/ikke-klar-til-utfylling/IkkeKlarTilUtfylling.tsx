import { Alert, BodyLong } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { formatterDato, formatterDatoTid } from '@utils/datetime';
import { MeldekortBrukerMedSak } from '@common/typer/meldekort-bruker.ts';

import style from './IkkeKlarTilUtfylling.module.css';

type Props = {
    meldekortBruker: MeldekortBrukerMedSak;
};

export const IkkeKlarTilUtfylling = ({ meldekortBruker }: Props) => {
    const { forrigeMeldekort, nesteMeldeperiode } = meldekortBruker;

    return (
        <Alert variant={'info'} contentMaxWidth={false} className={style.wrapper}>
            <BodyLong>
                <Tekst id={'forsideIngenMeldekort'} />
                {nesteMeldeperiode && (
                    <>
                        <Tekst id={'forsideNesteMeldekort1'} />
                        <strong>{formatterDato({ dato: nesteMeldeperiode.kanSendes })}</strong>
                        <Tekst id={'forsideNesteMeldekort2'} />
                        <strong>
                            {formatterDato({ dato: nesteMeldeperiode.periode.fraOgMed })}
                            {'-'}
                            {formatterDato({ dato: nesteMeldeperiode.periode.tilOgMed })}
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
