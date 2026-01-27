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
import { useEffect, useState } from 'react';
import { getPath, siteRoutes } from '@common/siteRoutes';
import { useKorrigerMeldekortContext } from '@context/korriger/KorrigerMeldekortContext.tsx';
import {
    validerMeldekortKorrigering,
    KorrigerMeldekortValideringResultat,
} from './validering/korrigerMeldekortValideringUtils.ts';
import { MeldekortDag, MeldekortDagStatus } from '@common/typer/MeldekortBruker';
import { getTekst, getTekster } from '@tekster/tekster.ts';
import { KorrigeringMeldekortUtfyllingProps } from '@common/typer/KorrigerMeldekort.ts';
import { classNames } from '@utils/classNames.ts';
import { statusTilTekstId } from '@components/kalender/dag-felles/dagFellesUtils.ts';
import { KorrigerMeldekortValideringFeil } from '@components/korrigerMeldekort/validering/KorrigerMeldekortValideringFeil.tsx';
import { hentAktuelleDager } from '@components/korrigerMeldekort/meldekortKorrigeringUtils.ts';
import { Tekst } from '@components/tekst/Tekst.tsx';

import styles from './KorrigerMeldekort.module.scss';
import { useValgtSpråk } from '@context/SpråkvelgerContext.tsx';

const KorrigerMeldekortUtfylling = (props: KorrigeringMeldekortUtfyllingProps) => {
    const { forrigeMeldekort } = props;
    const { navigate } = useRouting();
    const { valgtSpråk } = useValgtSpråk();

    useEffect(() => {
        scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!props.kanKorrigeres) {
            navigate(getPath(siteRoutes.forside));
        }
    }, [props.kanKorrigeres, navigate]);

    return (
        <>
            <PageHeader
                tekstId={'sideTittel'}
                underTekst={
                    <HStack gap="4">
                        <Undertekst
                            tekst={`Uke ${forrigeMeldekort.uke1} og ${forrigeMeldekort.uke2}`}
                            weight={'semibold'}
                        />
                        <Undertekst
                            tekst={`(${formatterDato({ dato: forrigeMeldekort.fraOgMed })} til ${formatterDato({ dato: forrigeMeldekort.tilOgMed })})`}
                        />
                    </HStack>
                }
            />
            <VStack gap="8">
                <Heading size="large" level="3">
                    {getTekst({ id: 'korrigeringTittel', locale: valgtSpråk })}
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
    const { valgtSpråk } = useValgtSpråk();

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
        <VStack gap="8">
            {tilUtfylling.meldeperiodeId !== forrigeMeldekort.meldeperiodeId && (
                <Alert variant="info">
                    {getTekst({ id: 'korrigeringOppdatertAlert', locale: valgtSpråk })}
                </Alert>
            )}

            <Heading size="medium" level="4">
                {getTekst({ id: 'korrigeringBeskrivelseIngress', locale: valgtSpråk })}
            </Heading>
            <BodyLong>{getTekst({ id: 'korrigeringBeskrivelse', locale: valgtSpråk })}</BodyLong>

            <KorrigeringDager
                dager={dager}
                forrigeDager={tilUtfylling.dager}
                kanSendeInnHelg={tilUtfylling.kanSendeInnHelg}
                onChange={(dag, nyStatus) => oppdaterDag(dag, nyStatus)}
            />

            <KorrigerMeldekortValideringFeil resultat={valideringResultat} />

            <VStack gap="2">
                <Button
                    className={styles.button}
                    onClick={() => {
                        const valideringResultat = validerMeldekortKorrigering(dager, tilUtfylling);

                        setValideringResultat(valideringResultat);

                        if (valideringResultat.feil.size === 0) {
                            navigate(
                                getPath(siteRoutes.korrigerMeldekortOppsummering, {
                                    meldekortId: forrigeMeldekort.id,
                                }),
                            );
                        }
                    }}
                    iconPosition="right"
                    icon={<ArrowRightIcon title="pil-høyre" fontSize="1.5rem" />}
                >
                    {getTekst({ id: 'neste', locale: valgtSpråk })}
                </Button>
                <Button
                    variant="tertiary"
                    className={styles.button}
                    onClick={() => {
                        navigate(getPath(siteRoutes.forside));
                    }}
                >
                    {getTekst({ id: 'avbrytEndring', locale: valgtSpråk })}
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
    const { valgtSpråk } = useValgtSpråk();
    const dagerForUtfylling = hentAktuelleDager(dager, kanSendeInnHelg);
    const dagerFraForrigeMeldekort = hentAktuelleDager(forrigeDager, kanSendeInnHelg);

    return (
        <VStack
            gap={'4'}
            className={classNames(styles.dagSelectContainer, kanSendeInnHelg && styles.medHelg)}
        >
            {dagerForUtfylling.map((meldekortDag, index) => {
                const erUkeStart = index % (dagerForUtfylling.length / 2) === 0;
                const forrigeStatus = dagerFraForrigeMeldekort[index].status;
                const { status, dag } = meldekortDag;

                const ikkeRett = status === MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER;

                return (
                    <>
                        {erUkeStart && (
                            <BodyShort weight={'semibold'} className={classNames(styles.ukenr)}>
                                <Tekst id={'ukeMedNummer'} resolverProps={{ dato: dag }} />
                            </BodyShort>
                        )}
                        <Select
                            className={statusClassMap[status]}
                            id={`select-${dag}`}
                            key={dag}
                            label={formatterDato({ medUkeDag: true, dato: dag })}
                            value={status}
                            onChange={(e) => {
                                onChange(dag, e.target.value as MeldekortDagStatus);
                            }}
                            readOnly={ikkeRett}
                        >
                            {ikkeRett ? (
                                <option value={status}>
                                    {getTekst({ id: statusTilTekstId[status], locale: valgtSpråk })}
                                </option>
                            ) : (
                                gyldigeStatusValg.map((statusValg) => {
                                    const erUendret = forrigeStatus === statusValg;
                                    const statusTekst = getTekst({
                                        id: statusTilTekstId[statusValg],
                                        locale: valgtSpråk,
                                    });
                                    const uendretTekst = erUendret
                                        ? ` (${getTekst({ id: 'korrigeringDagIngenEndring', locale: valgtSpråk })})`
                                        : '';

                                    return (
                                        <option key={statusValg} value={statusValg}>
                                            {`${statusTekst}${uendretTekst}`}
                                        </option>
                                    );
                                })
                            )}
                        </Select>
                    </>
                );
            })}
        </VStack>
    );
};

const gyldigeStatusValg = Object.values(MeldekortDagStatus).filter(
    (status) => status !== MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER,
);

const InformasjonOmKorrigeringAvMeldekort = () => {
    const { valgtSpråk } = useValgtSpråk();
    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>
                    {getTekst({ id: 'korrigeringLønnHeader', locale: valgtSpråk })}
                </Accordion.Header>
                <Accordion.Content>
                    {getTekst({ id: 'korrigeringLønnBeskrivelse', locale: valgtSpråk })}
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>
                    {getTekst({ id: 'korrigeringSykdomHeader', locale: valgtSpråk })}
                </Accordion.Header>
                <Accordion.Content>
                    <Label>{getTekst({ id: 'statusSyk', locale: valgtSpråk })}</Label>
                    <ul>
                        {getTekster({ id: 'fraværHjelpLesMerSykListe', locale: valgtSpråk }).map(
                            (tekst) => (
                                <li key={tekst}>{tekst}</li>
                            ),
                        )}
                    </ul>
                    <Label>{getTekst({ id: 'statusSyktBarn', locale: valgtSpråk })}</Label>
                    <ul>
                        {getTekster({
                            id: 'fraværHjelpLesMerSyktBarnListe',
                            locale: valgtSpråk,
                        }).map((tekst) => (
                            <li key={tekst}>{tekst}</li>
                        ))}
                    </ul>
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>
                    {getTekst({ id: 'korrigeringFraværHeader', locale: valgtSpråk })}
                </Accordion.Header>
                <Accordion.Content>
                    <Label>{getTekst({ id: 'statusGodkjentFravær', locale: valgtSpråk })}</Label>
                    <ul>
                        {getTekster({
                            id: 'fraværHjelpLesMerFraværGodkjentListeStart',
                            locale: valgtSpråk,
                        }).map((tekst) => (
                            <li key={tekst}>{tekst}</li>
                        ))}
                        <ul>
                            {getTekster({
                                id: 'fraværHjelpLesMerFraværGodkjentListeÅrsaker',
                                locale: valgtSpråk,
                            }).map((tekst) => (
                                <li key={tekst}>{tekst}</li>
                            ))}
                        </ul>
                        {getTekster({
                            id: 'fraværHjelpLesMerFraværGodkjentListeSlutt',
                            locale: valgtSpråk,
                        }).map((tekst) => (
                            <li key={tekst}>{tekst}</li>
                        ))}
                    </ul>

                    <Label>{getTekst({ id: 'statusAnnetFravær', locale: valgtSpråk })}</Label>
                    <ul>
                        {getTekster({
                            id: 'fraværHjelpLesMerFraværAnnetListe',
                            locale: valgtSpråk,
                        }).map((tekst) => (
                            <li key={tekst}>{tekst}</li>
                        ))}
                    </ul>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
