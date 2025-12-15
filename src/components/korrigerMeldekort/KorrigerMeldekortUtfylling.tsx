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
    erKorrigerteDagerGyldig,
    hentGyldigeDagerFraMeldekortDager,
} from './KorrigerMeldekortUtils';
import { MeldekortDag, MeldekortDagStatus } from '@common/typer/MeldekortBruker';
import { harDagerSomIkkeGirRett } from '@utils/MeldeperiodeUtils';
import { getTekst, getTekster } from '@tekster/tekster.ts';
import { KorrigeringMeldekortUtfyllingProps } from '@common/typer/KorrigerMeldekort.ts';
import { classNames } from '@utils/classNames.ts';
import { statusTilTekstId } from '@components/kalender/dag-felles/dagFellesUtils.ts';

import styles from './KorrigerMeldekort.module.scss';

/**
 * TODO - skal vi ha noe form for validering her?
 */
const KorrigerMeldekortUtfylling = (props: KorrigeringMeldekortUtfyllingProps) => {
    const { forrigeMeldekort } = props;
    const { navigate } = useRouting();

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
                    {getTekst({ id: 'korrigeringTittel' })}
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
    const [harUgyldigUtfylling, setHarUgyldigUtfylling] = useState(false);
    const {
        // Default dager for SSR/first render
        // Litt skittent, burde sette dette som en default via provideren, men litt tricky å få til på tvers av routes
        dager = tilUtfylling.dager,
        setUtfylling,
        oppdaterDag,
        meldeperiodeId,
    } = useKorrigerMeldekortContext();

    useEffect(() => {
        setHarUgyldigUtfylling(false);
    }, [dager]);

    useEffect(() => {
        if (meldeperiodeId !== tilUtfylling.meldeperiodeId) {
            setUtfylling(tilUtfylling);
        }
    }, [tilUtfylling, setUtfylling, meldeperiodeId]);

    return (
        <VStack gap="8">
            {tilUtfylling.meldeperiodeId !== forrigeMeldekort.meldeperiodeId && (
                <Alert variant="info">{getTekst({ id: 'korrigeringOppdatertAlert' })}</Alert>
            )}

            <Heading size="medium" level="4">
                {getTekst({ id: 'korrigeringBeskrivelseIngress' })}
            </Heading>
            <BodyLong>{getTekst({ id: 'korrigeringBeskrivelse' })}</BodyLong>

            <MeldekortUkeBehandling
                dager={dager}
                kanSendeInnHelg={tilUtfylling.kanSendeInnHelg}
                onChange={(dag, nyStatus) => oppdaterDag(dag, nyStatus)}
            />

            {harUgyldigUtfylling && (
                <Alert variant="error">
                    <VStack gap="4">
                        {hentGyldigeDagerFraMeldekortDager(dager).length >
                        tilUtfylling.maksAntallDagerForPeriode ? (
                            <BodyShort>
                                Du har registrert for mange dager. Maks antall er{' '}
                                {tilUtfylling.maksAntallDagerForPeriode} dager.
                            </BodyShort>
                        ) : (
                            <BodyShort>
                                Kun {hentGyldigeDagerFraMeldekortDager(dager).length} av{' '}
                                {tilUtfylling.maksAntallDagerForPeriode} dager besvart
                            </BodyShort>
                        )}

                        <VStack>
                            <BodyShort>Merk: Følgende dager blir ikke regnet med:</BodyShort>
                            <ul className={styles.valideringErrorListe}>
                                <li>Ikke besvart</li>
                                <li>Ikke tiltaksdag</li>
                            </ul>
                        </VStack>
                    </VStack>
                </Alert>
            )}

            <VStack gap="2">
                <Button
                    className={styles.button}
                    onClick={() => {
                        const erDagerFylltUtGyldig = erKorrigerteDagerGyldig({
                            dager: dager,
                            antallDager: tilUtfylling.maksAntallDagerForPeriode,
                            harMeldeperiodeForMeldekortDagerSomIkkeGirRett:
                                harDagerSomIkkeGirRett(tilUtfylling),
                        });

                        if (erDagerFylltUtGyldig) {
                            navigate(
                                getPath(siteRoutes.korrigerMeldekortOppsummering, {
                                    meldekortId: forrigeMeldekort.id,
                                }),
                            );
                        } else {
                            setHarUgyldigUtfylling(true);
                        }
                    }}
                    iconPosition="right"
                    icon={<ArrowRightIcon title="pil-høyre" fontSize="1.5rem" />}
                >
                    {getTekst({ id: 'neste' })}
                </Button>
                <Button
                    variant="tertiary"
                    className={styles.button}
                    onClick={() => {
                        navigate(getPath(siteRoutes.forside));
                    }}
                >
                    {getTekst({ id: 'avbrytEndring' })}
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

const MeldekortUkeBehandling = ({
    dager,
    kanSendeInnHelg,
    onChange,
}: {
    dager: MeldekortDag[];
    kanSendeInnHelg: boolean;
    onChange: (dag: string, nyStatus: MeldekortDagStatus) => void;
}) => {
    const dagerMedEllerUtenHelg = kanSendeInnHelg
        ? dager
        : [...dager.slice(0, 5), ...dager.slice(7, 12)];

    return (
        <VStack
            gap="4"
            width={'85%'}
            className={classNames(styles.dagSelectContainer, kanSendeInnHelg && styles.medHelg)}
        >
            {dagerMedEllerUtenHelg.map((meldekortDag) => {
                const { status, dag } = meldekortDag;

                const ikkeRett = status === MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER;

                return (
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
                            <option key={status} value={status}>
                                {getTekst({ id: statusTilTekstId[status] })}
                            </option>
                        ) : (
                            gyldigeStatusValg.map((status) => (
                                <option key={status} value={status}>
                                    {getTekst({ id: statusTilTekstId[status] })}
                                </option>
                            ))
                        )}
                    </Select>
                );
            })}
        </VStack>
    );
};

const gyldigeStatusValg = Object.values(MeldekortDagStatus).filter(
    (status) => status !== MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER,
);

const InformasjonOmKorrigeringAvMeldekort = () => {
    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>{getTekst({ id: 'korrigeringLønnHeader' })}</Accordion.Header>
                <Accordion.Content>
                    {getTekst({ id: 'korrigeringLønnBeskrivelse' })}
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>{getTekst({ id: 'korrigeringSykdomHeader' })}</Accordion.Header>
                <Accordion.Content>
                    <Label>{getTekst({ id: 'statusSyk' })}</Label>
                    <ul>
                        {getTekster({ id: 'fraværHjelpLesMerSykListe' }).map((tekst) => (
                            <li key={tekst}>{tekst}</li>
                        ))}
                    </ul>
                    <Label>{getTekst({ id: 'statusSyktBarn' })}</Label>
                    <ul>
                        {getTekster({ id: 'fraværHjelpLesMerSyktBarnListe' }).map((tekst) => (
                            <li key={tekst}>{tekst}</li>
                        ))}
                    </ul>
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>{getTekst({ id: 'korrigeringFraværHeader' })}</Accordion.Header>
                <Accordion.Content>
                    <Label>{getTekst({ id: 'statusGodkjentFravær' })}</Label>
                    <ul>
                        {getTekster({ id: 'fraværHjelpLesMerFraværGodkjentListeStart' }).map(
                            (tekst) => (
                                <li key={tekst}>{tekst}</li>
                            ),
                        )}
                        <ul>
                            {getTekster({ id: 'fraværHjelpLesMerFraværGodkjentListeÅrsaker' }).map(
                                (tekst) => (
                                    <li key={tekst}>{tekst}</li>
                                ),
                            )}
                        </ul>
                        {getTekster({ id: 'fraværHjelpLesMerFraværGodkjentListeSlutt' }).map(
                            (tekst) => (
                                <li key={tekst}>{tekst}</li>
                            ),
                        )}
                    </ul>

                    <Label>{getTekst({ id: 'statusAnnetFravær' })}</Label>
                    <ul>
                        {getTekster({ id: 'fraværHjelpLesMerFraværAnnetListe' }).map((tekst) => (
                            <li key={tekst}>{tekst}</li>
                        ))}
                    </ul>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
