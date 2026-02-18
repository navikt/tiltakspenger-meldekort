import { PageHeader } from '@components/page-header/PageHeader';
import { Undertekst } from '@components/page-header/Undertekst';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import {
    Accordion,
    Alert,
    BodyLong,
    BodyShort,
    Button,
    Heading,
    HStack,
    Label,
    Select,
    VStack,
} from '@navikt/ds-react';
import { useRouting } from '@routing/useRouting';
import { formatterDato } from '@utils/datetime';
import React, { Fragment, useEffect, useState } from 'react';
import { getPath, siteRoutePaths } from '@common/siteRoutePaths.ts';
import { useKorrigerMeldekortContext } from '@context/korriger/KorrigerMeldekortContext.tsx';
import {
    KorrigerMeldekortValideringResultat,
    validerMeldekortKorrigering,
} from './validering/korrigerMeldekortValideringUtils.ts';
import { MeldekortDag, MeldekortDagStatus } from '@common/typer/MeldekortBruker';
import { KorrigeringMeldekortUtfyllingProps } from '@common/typer/KorrigerMeldekort.ts';
import { classNames } from '@utils/classNames.ts';
import { statusTilTekstId } from '@components/kalender/dag-felles/dagFellesUtils.ts';
import { KorrigerMeldekortValideringFeil } from '@components/korrigerMeldekort/validering/KorrigerMeldekortValideringFeil.tsx';
import { hentAktuelleDager } from '@components/korrigerMeldekort/meldekortKorrigeringUtils.ts';
import { Tekst } from '@components/tekst/Tekst.tsx';

import styles from './KorrigerMeldekort.module.scss';

import { useSpråk } from '@context/språk/useSpråk.ts';

const KorrigerMeldekortUtfylling = (props: KorrigeringMeldekortUtfyllingProps) => {
    const { forrigeMeldekort } = props;
    const { navigate } = useRouting();
    const { valgtSpråk, getTekstForSpråk } = useSpråk();

    useEffect(() => {
        scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!props.kanKorrigeres) {
            navigate(getPath(siteRoutePaths.forside));
        }
    }, [props.kanKorrigeres, navigate]);

    return (
        <>
            <PageHeader
                tekstId={'sideTittel'}
                underTekst={
                    <HStack gap="space-16">
                        <Undertekst
                            tekst={getTekstForSpråk({
                                id: 'undertekstUker',
                                resolverProps: {
                                    uke1: forrigeMeldekort.uke1,
                                    uke2: forrigeMeldekort.uke2,
                                },
                            })}
                            weight={'semibold'}
                        />
                        <Undertekst
                            tekst={`(${getTekstForSpråk({
                                id: 'undertekstDatoer',
                                resolverProps: {
                                    fraOgMed: formatterDato({
                                        dato: forrigeMeldekort.fraOgMed,
                                        medUkeDag: false,
                                        locale: valgtSpråk,
                                    }),
                                    tilOgMed: formatterDato({
                                        dato: forrigeMeldekort.tilOgMed,
                                        medUkeDag: false,
                                        locale: valgtSpråk,
                                    }),
                                },
                            })})`}
                        />
                    </HStack>
                }
            />
            <VStack gap="space-32">
                <Heading size="large" level="3">
                    {getTekstForSpråk({ id: 'korrigeringTittel' })}
                </Heading>

                <InformasjonOmKorrigeringAvMeldekort />

                <KorrigeringAvMeldekort {...props} />
            </VStack>
        </>
    );
};

export default KorrigerMeldekortUtfylling;

const KorrigeringAvMeldekort = ({
    forrigeMeldekort,
    tilUtfylling,
}: KorrigeringMeldekortUtfyllingProps) => {
    const { navigate } = useRouting();
    const [valideringResultat, setValideringResultat] =
        useState<KorrigerMeldekortValideringResultat | null>(null);
    const { getTekstForSpråk } = useSpråk();

    const {
        // Default dager for SSR/first render
        // Litt skittent, burde sette dette som en default via provideren, men litt tricky å få til på tvers av routes
        dager = tilUtfylling.dager,
        setUtfylling,
        oppdaterDag,
        meldeperiodeId,
    } = useKorrigerMeldekortContext();

    useEffect(() => {
        setValideringResultat(null);
    }, [dager]);

    useEffect(() => {
        if (meldeperiodeId !== tilUtfylling.meldeperiodeId) {
            setUtfylling(tilUtfylling);
        }
    }, [tilUtfylling, setUtfylling, meldeperiodeId]);

    return (
        <VStack gap="space-32">
            {tilUtfylling.meldeperiodeId !== forrigeMeldekort.meldeperiodeId && (
                <Alert variant="info">
                    {getTekstForSpråk({ id: 'korrigeringOppdatertAlert' })}
                </Alert>
            )}

            <Heading size="medium" level="4">
                {getTekstForSpråk({ id: 'korrigeringBeskrivelseIngress' })}
            </Heading>
            <BodyLong>{getTekstForSpråk({ id: 'korrigeringBeskrivelse' })}</BodyLong>

            <KorrigeringDager
                dager={dager}
                forrigeDager={tilUtfylling.dager}
                kanSendeInnHelg={tilUtfylling.kanSendeInnHelg}
                onChange={(dag, nyStatus) => oppdaterDag(dag, nyStatus)}
            />
            <KorrigerMeldekortValideringFeil resultat={valideringResultat} />
            <VStack gap="space-8">
                <Button
                    className={styles.button}
                    onClick={() => {
                        const valideringResultat = validerMeldekortKorrigering(dager, tilUtfylling);

                        setValideringResultat(valideringResultat);

                        if (valideringResultat.feil.size === 0) {
                            navigate(
                                getPath(siteRoutePaths.korrigerMeldekortOppsummering, {
                                    meldekortId: forrigeMeldekort.id,
                                }),
                            );
                        }
                    }}
                    iconPosition="right"
                    icon={<ArrowRightIcon title="pil-høyre" fontSize="1.5rem" />}
                >
                    {getTekstForSpråk({ id: 'neste' })}
                </Button>
                <Button
                    variant="tertiary"
                    className={styles.button}
                    onClick={() => {
                        navigate(getPath(siteRoutePaths.forside));
                    }}
                >
                    {getTekstForSpråk({ id: 'avbrytEndring' })}
                </Button>
            </VStack>
        </VStack>
    );
};

const statusClassMap: Record<MeldekortDagStatus, string> = {
    IKKE_TILTAKSDAG: styles.ikkeTiltaksdag,
    //Vi setter ikke en farge på ikke besvart fordi det blir vanskelig å skille den med ikke_rett
    IKKE_BESVART: '',
    DELTATT_UTEN_LØNN_I_TILTAKET: styles.deltattUtenLønn,
    FRAVÆR_STERKE_VELFERDSGRUNNER_ELLER_JOBBINTERVJU: styles.sterkeVelferdsgrunnerEllerJobbintervju,
    FRAVÆR_GODKJENT_AV_NAV: styles.fraværGodkjentAvNav,
    DELTATT_MED_LØNN_I_TILTAKET: styles.deltattMedLønn,
    FRAVÆR_SYK: styles.syk,
    FRAVÆR_SYKT_BARN: styles.syktBarn,
    FRAVÆR_ANNET: styles.fraværAnnet,
    IKKE_RETT_TIL_TILTAKSPENGER: styles.ikkeTiltaksdag,
};

const KorrigeringDager = ({
    dager,
    forrigeDager,
    kanSendeInnHelg,
    onChange,
}: {
    dager: MeldekortDag[];
    forrigeDager: MeldekortDag[];
    kanSendeInnHelg: boolean;
    onChange: (dag: string, nyStatus: MeldekortDagStatus) => void;
}) => {
    const { valgtSpråk, getTekstForSpråk } = useSpråk();
    const dagerForUtfylling = hentAktuelleDager(dager, kanSendeInnHelg);
    const dagerFraForrigeMeldekort = hentAktuelleDager(forrigeDager, kanSendeInnHelg);

    return (
        <VStack
            gap={'space-16'}
            className={classNames(styles.dagSelectContainer, kanSendeInnHelg && styles.medHelg)}
        >
            {dagerForUtfylling.map((meldekortDag, index) => {
                const erUkeStart = index % (dagerForUtfylling.length / 2) === 0;
                const forrigeStatus = dagerFraForrigeMeldekort[index].status;
                const { status, dag } = meldekortDag;

                const ikkeRett = status === MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER;

                return (
                    <Fragment key={dag}>
                        {erUkeStart && (
                            <BodyShort weight={'semibold'} className={classNames(styles.ukenr)}>
                                <Tekst id={'ukeMedNummer'} resolverProps={{ dato: dag }} />
                            </BodyShort>
                        )}
                        <Select
                            className={statusClassMap[status]}
                            id={`select-${dag}`}
                            key={dag}
                            label={formatterDato({
                                medUkeDag: true,
                                dato: dag,
                                locale: valgtSpråk,
                            })}
                            value={status}
                            onChange={(e) => {
                                onChange(dag, e.target.value as MeldekortDagStatus);
                            }}
                            readOnly={ikkeRett}
                        >
                            {ikkeRett ? (
                                <option value={status}>
                                    {getTekstForSpråk({ id: statusTilTekstId[status] })}
                                </option>
                            ) : (
                                gyldigeStatusValg(dagerFraForrigeMeldekort).map((statusValg) => {
                                    const erUendret = forrigeStatus === statusValg;
                                    const statusTekst = getTekstForSpråk({
                                        id: statusTilTekstId[statusValg],
                                    });
                                    const uendretTekst = erUendret
                                        ? ` (${getTekstForSpråk({ id: 'korrigeringDagIngenEndring' })})`
                                        : '';

                                    return (
                                        <option key={statusValg} value={statusValg}>
                                            {`${statusTekst}${uendretTekst}`}
                                        </option>
                                    );
                                })
                            )}
                        </Select>
                    </Fragment>
                );
            })}
        </VStack>
    );
};

const gyldigeStatusValg = (dagerFraForrigeMeldekort: MeldekortDag[]) => {
    const skalViseGodkjentFravaer = skalViseFravaerGodkjentAvNav(dagerFraForrigeMeldekort);
    return Object.values(MeldekortDagStatus).filter(
        (status) =>
            status !== MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER &&
            (skalViseGodkjentFravaer || status !== MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV),
    );
};

const skalViseFravaerGodkjentAvNav = (dagerFraForrigeMeldekort: MeldekortDag[]) => {
    return dagerFraForrigeMeldekort.some(
        (dag) => dag.status === MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV,
    );
};

const InformasjonOmKorrigeringAvMeldekort = () => {
    const { getTekstForSpråk, getTeksterForSpråk } = useSpråk();

    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>
                    {getTekstForSpråk({ id: 'korrigeringLønnHeader' })}
                </Accordion.Header>
                <Accordion.Content>
                    {getTekstForSpråk({ id: 'korrigeringLønnBeskrivelse' })}
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>
                    {getTekstForSpråk({ id: 'korrigeringSykdomHeader' })}
                </Accordion.Header>
                <Accordion.Content>
                    <Label>{getTekstForSpråk({ id: 'statusSyk' })}</Label>
                    <ul>
                        {getTeksterForSpråk({ id: 'fraværHjelpLesMerSykListe' }).map((tekst) => (
                            <li key={tekst}>{tekst}</li>
                        ))}
                    </ul>
                    <Label>{getTekstForSpråk({ id: 'statusSyktBarn' })}</Label>
                    <ul>
                        {getTeksterForSpråk({
                            id: 'fraværHjelpLesMerSyktBarnListe',
                        }).map((tekst) => (
                            <li key={tekst}>{tekst}</li>
                        ))}
                    </ul>
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>
                    {getTekstForSpråk({ id: 'korrigeringFraværHeader' })}
                </Accordion.Header>
                <Accordion.Content>
                    <Label>
                        {getTekstForSpråk({ id: 'statusSterkeVelferdsgrunnerEllerJobbintervju' })}
                    </Label>
                    <ul>
                        {getTeksterForSpråk({
                            id: 'fraværHjelpLesMerSterkeVelferdsgrunnerEllerJobbintervjuListeStart',
                        }).map((tekst) => (
                            <li key={tekst}>{tekst}</li>
                        ))}
                        <ul>
                            {getTeksterForSpråk({
                                id: 'fraværHjelpLesMerSterkeVelferdsgrunnerEllerJobbintervjuListeÅrsaker',
                            }).map((tekst) => (
                                <li key={tekst}>{tekst}</li>
                            ))}
                        </ul>
                        {getTeksterForSpråk({
                            id: 'fraværHjelpLesMerSterkeVelferdsgrunnerEllerJobbintervjuListeSlutt',
                        }).map((tekst) => (
                            <li key={tekst}>{tekst}</li>
                        ))}
                    </ul>

                    <Label>{getTekstForSpråk({ id: 'statusAnnetFravær' })}</Label>
                    <ul>
                        {getTeksterForSpråk({
                            id: 'fraværHjelpLesMerFraværAnnetListe',
                        }).map((tekst) => (
                            <li key={tekst}>{tekst}</li>
                        ))}
                    </ul>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
