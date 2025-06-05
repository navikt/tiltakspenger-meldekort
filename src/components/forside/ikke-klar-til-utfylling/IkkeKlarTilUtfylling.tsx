import { Alert, BodyLong } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { formatterDato, formatterDatoTid } from '@utils/datetime';
import { MeldekortBrukerMedSak } from '@common/typer/meldekort-bruker.ts';
import { MeldekortStatus } from '@common/typer/meldekort-utfylling.ts';

import style from './IkkeKlarTilUtfylling.module.css';

type Props = {
    meldekortBruker: MeldekortBrukerMedSak;
};

export const IkkeKlarTilUtfylling = ({ meldekortBruker }: Props) => {
    const { forrigeMeldekort, nesteMeldekort, harSoknadUnderBehandling } = meldekortBruker;

    return (
        <Alert variant={'info'} contentMaxWidth={false} className={style.wrapper}>
            {harSoknadUnderBehandling && (
                <BodyLong>
                    <Tekst id={'forsideIngenMeldekortSoknadUnderBehandling'} />
                </BodyLong>
            )}
            {!harSoknadUnderBehandling && (
                <BodyLong>
                    <Tekst id={'forsideIngenMeldekort'} />
                    {nesteMeldekort?.status === MeldekortStatus.IKKE_KLAR &&
                        nesteMeldekort.kanSendes && (
                            <>
                                <Tekst id={'forsideNesteMeldekort1'} />
                                <strong>{formatterDato({ dato: nesteMeldekort.kanSendes })}</strong>
                                <Tekst id={'forsideNesteMeldekort2'} />
                                <strong>
                                    {formatterDato({ dato: nesteMeldekort.periode.fraOgMed })}
                                    {'-'}
                                    {formatterDato({ dato: nesteMeldekort.periode.tilOgMed })}
                                </strong>
                                {'.'}
                            </>
                        )}
                </BodyLong>
            )}
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
