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
    korrigerMeldekortStatusTextMapper,
} from './KorrigerMeldekortUtils';
import { MeldekortDag, MeldekortDagStatus } from '@common/typer/MeldekortBruker';
import { harDagerSomIkkeGirRett } from '@utils/MeldeperiodeUtils';
import { getTekst, getTekster } from '@tekster/tekster.ts';
import { KorrigeringMeldekortUtfyllingProps } from '@common/typer/KorrigerMeldekort.ts';

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

const MeldekortUkeBehandling = (props: {
    dager: MeldekortDag[];
    onChange: (dag: string, nyStatus: MeldekortDagStatus) => void;
}) => {
    const manTilFreUke1 = props.dager.slice(0, 5);
    const manTilFreUke2 = props.dager.slice(7, 12);
    return (
        <VStack gap="4" width={'85%'} className={styles.dagSelectContainer}>
            {[...manTilFreUke1, ...manTilFreUke2].map((dag) => (
                <Select
                    className={statusClassMap[dag.status]}
                    id={`select-${dag.dag}`}
                    key={dag.dag}
                    label={formatterDato({ medUkeDag: true, dato: dag.dag })}
                    value={dag.status}
                    onChange={(e) => {
                        props.onChange(dag.dag, e.target.value as MeldekortDagStatus);
                    }}
                    readOnly={dag.status === MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER}
                >
                    {dag.status !== MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER ? (
                        Object.values(MeldekortDagStatus).map((status) => (
                            <option
                                hidden={
                                    status === MeldekortDagStatus.IKKE_BESVART ||
                                    status === MeldekortDagStatus.IKKE_RETT_TIL_TILTAKSPENGER
                                }
                                key={status}
                                value={status}
                            >
                                {korrigerMeldekortStatusTextMapper(status)}
                            </option>
                        ))
                    ) : (
                        <option value={dag.status}>Ikke rett på tiltakspenger</option>
                    )}
                </Select>
            ))}
        </VStack>
    );
};

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
                        <li>{getTekster({ id: 'fraværHjelpLesMerFraværGodkjentListeSlutt' })}</li>
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
