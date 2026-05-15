import { MeldekortDag, MeldekortDagStatus } from '@meldekort/common/typer/MeldekortBruker';
import { hentAktuelleDager } from '@components/korrigerMeldekort/meldekortKorrigeringUtils';
import { classNames } from '@utils/classNames';
import {
    meldekortStatusTilStyle,
    statusTilIkon,
    statusTilTekstId,
} from '@components/kalender/meldekortDagUtils';
import { BodyLong, BodyShort, HStack, VStack } from '@navikt/ds-react';
import { formatterDato } from '@utils/datetime';
import { Tekst } from '@components/tekst/Tekst';

import style from './KorrigerMeldekortOppsummering.module.css';

import { useSpråk } from '@context/språk/useSpråk';

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
    const { valgtSpråk, getTekstForSpråk } = useSpråk();

    const IkonKomponent = statusTilIkon[status];
    const statusStyle = meldekortStatusTilStyle[status];

    const erEndret = forrigeStatus !== status;
    const datoTekst = formatterDato({
        dato,
        medUkeDag: true,
        medStorForbokstav: true,
        locale: valgtSpråk,
    });

    return (
        <VStack className={classNames(style.dag, statusStyle)} as={'li'}>
            <HStack
                gap={'space-4'}
                align={'center'}
                className={classNames(style.over, statusStyle)}
            >
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
                                {`${getTekstForSpråk({ id: 'korrigeringDagEndretFra' })}: `}
                                <strong>
                                    {getTekstForSpråk({
                                        id: statusTilTekstId[forrigeStatus],
                                    })}
                                </strong>
                            </>
                        ) : (
                            getTekstForSpråk({ id: 'korrigeringDagIkkeEndret' })
                        )}
                    </BodyLong>
                </HStack>
            )}
        </VStack>
    );
};
