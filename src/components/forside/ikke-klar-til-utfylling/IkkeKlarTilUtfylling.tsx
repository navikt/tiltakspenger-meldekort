import { Alert, BodyLong } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { formatterDato, formatterDatoTid } from '@utils/datetime';
import { MeldekortBrukerMedSak } from '@common/typer/meldekort-bruker.ts';

import style from './IkkeKlarTilUtfylling.module.css';
import { MeldekortStatus } from '@common/typer/MeldekortBruker';

type Props = {
    meldekortBruker: MeldekortBrukerMedSak;
};

export const IkkeKlarTilUtfylling = ({ meldekortBruker }: Props) => {
    const { forrigeMeldekort, nesteMeldekort, harSoknadUnderBehandling } = meldekortBruker;

    return (
        <Alert variant={'info'} contentMaxWidth={false} className={style.wrapper}>
            {harSoknadUnderBehandling && !nesteMeldekort && (
                <BodyLong>
                    <Tekst id={'forsideIngenMeldekortSoknadUnderBehandling'} />
                </BodyLong>
            )}
            {(!harSoknadUnderBehandling || nesteMeldekort) && (
                <BodyLong>
                    <Tekst id={'forsideIngenMeldekort'} />
                    {nesteMeldekort?.status === MeldekortStatus.IKKE_KLAR &&
                        nesteMeldekort.kanSendes && (
                            <>
                                <Tekst id={'forsideNesteMeldekort1'} />
                                <strong>{formatterDato({ dato: nesteMeldekort.kanSendes })}</strong>
                                <Tekst id={'forsideNesteMeldekort2'} />
                                <strong>
                                    {formatterDato({ dato: nesteMeldekort.fraOgMed })}
                                    {'-'}
                                    {formatterDato({ dato: nesteMeldekort.tilOgMed })}
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
                        {formatterDato({ dato: forrigeMeldekort.fraOgMed })}
                        {'-'}
                        {formatterDato({ dato: forrigeMeldekort.tilOgMed })}
                    </strong>
                    {'.'}
                </BodyLong>
            )}
        </Alert>
    );
};
