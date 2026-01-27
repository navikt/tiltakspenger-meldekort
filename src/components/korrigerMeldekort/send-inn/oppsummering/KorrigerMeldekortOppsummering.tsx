import { MeldekortDag, MeldekortDagStatus } from '@common/typer/MeldekortBruker.ts';
import { hentAktuelleDager } from '@components/korrigerMeldekort/meldekortKorrigeringUtils.ts';
import { classNames } from '@utils/classNames.ts';
import { getTekst } from '@tekster/tekster.ts';
import {
    meldekortStatusTilStyle,
    statusTilIkon,
    statusTilTekstId,
} from '@components/kalender/dag-felles/dagFellesUtils.ts';
import { BodyLong, BodyShort, HStack, VStack } from '@navikt/ds-react';
import { formatterDato } from '@utils/datetime.ts';
import { Tekst } from '@components/tekst/Tekst.tsx';

import style from './KorrigerMeldekortOppsummering.module.css';
import { useValgtSpråk } from '@context/SpråkvelgerContext.tsx';

type Props = {
    dager: MeldekortDag[];
    forrigeDager: MeldekortDag[];
    kanSendeInnHelg: boolean;
};

export const KorrigerMeldekortOppsummering = ({ dager, forrigeDager, kanSendeInnHelg }: Props) => {
    const korrigerteDager = hentAktuelleDager(dager, kanSendeInnHelg);
    const dagerFraForrigeMeldekort = hentAktuelleDager(forrigeDager, kanSendeInnHelg);

    return (
        <ul className={classNames(style.dager, kanSendeInnHelg && style.medHelg)}>
            {korrigerteDager.map((dag, index) => {
                const erUkeStart = index % (korrigerteDager.length / 2) === 0;

                return (
                    <>
                        {erUkeStart && (
                            <BodyShort weight={'semibold'} className={classNames(style.ukenr)}>
                                <Tekst id={'ukeMedNummer'} resolverProps={{ dato: dag.dag }} />
                            </BodyShort>
                        )}
                        <OppsummertDag
                            dag={dag}
                            forrigeStatus={dagerFraForrigeMeldekort[index].status}
                            key={dag.dag}
                        />
                    </>
                );
            })}
        </ul>
    );
};

type DagProps = {
    dag: MeldekortDag;
    forrigeStatus: MeldekortDagStatus;
};

const OppsummertDag = ({ dag, forrigeStatus }: DagProps) => {
    const { status, dag: dato } = dag;
    const { valgtSpråk } = useValgtSpråk();

    const IkonKomponent = statusTilIkon[status];
    const statusStyle = meldekortStatusTilStyle[status];

    const erEndret = forrigeStatus !== status;
    const datoTekst = formatterDato({ dato, medUkeDag: true, medStorForbokstav: true });

    return (
        <VStack className={classNames(style.dag, statusStyle)} as={'li'}>
            <HStack gap={'1'} align={'center'} className={classNames(style.over, statusStyle)}>
                <IkonKomponent aria-hidden={true} />
                <BodyLong>
                    {`${datoTekst}: `}
                    <strong>
                        <Tekst id={statusTilTekstId[status]} />
                    </strong>
                </BodyLong>
            </HStack>
            {status !== MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER && (
                <HStack className={classNames(style.under)}>
                    <span />
                    <BodyLong size={'small'}>
                        {erEndret ? (
                            <>
                                {`${getTekst({ id: 'korrigeringDagEndretFra', locale: valgtSpråk })}: `}
                                <strong>
                                    {getTekst({
                                        id: statusTilTekstId[forrigeStatus],
                                        locale: valgtSpråk,
                                    })}
                                </strong>
                            </>
                        ) : (
                            getTekst({ id: 'korrigeringDagIkkeEndret', locale: valgtSpråk })
                        )}
                    </BodyLong>
                </HStack>
            )}
        </VStack>
    );
};
