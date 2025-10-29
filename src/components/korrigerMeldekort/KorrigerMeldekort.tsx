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
    Skeleton,
    VStack,
} from '@navikt/ds-react';
import { useRouting } from '@routing/useRouting';
import { formatterDato } from '@utils/datetime';
import { useEffect, useState } from 'react';
import styles from './KorrigerMeldekort.module.scss';
import { getPath, siteRoutes } from '@common/siteRoutes';
import { useKorrigerMeldekortContext } from '@context/korriger/KorrigerMeldekortContext.tsx';
import {
    erKorrigerteDagerGyldig,
    hentGyldigeDagerFraMeldekortDager,
    korrigerMeldekortStatusTextMapper,
} from './KorrigerMeldekortUtils';
import { useMeldeperiodeForPeriodeContext } from '@context/meldeperiodeForPeriode/MeldeperiodeForPeriodeContext';
import { apiFetcher, useApi } from '@utils/fetch';
import { Periode } from '@common/typer/periode';
import { MeldeperiodeForPeriodeResponse } from '@common/typer/Meldeperiode';
import { Meldekort, MeldekortDag, MeldekortDagStatus } from '@common/typer/MeldekortBruker';
import { Link } from 'wouter';
import { harDagerSomIkkeGirRett } from '@utils/MeldeperiodeUtils';
import { getTekst, getTekster } from '@tekster/tekster.ts';

/**
 * TODO - skal vi ha noe form for validering her?
 */
const KorrigerMeldekort = (props: { meldekort: Meldekort }) => {
    const { meldeperiodeForPeriode, setMeldeperiodeForPeriode } =
        useMeldeperiodeForPeriodeContext();

    //TODO - kan sikkert flytte denne hentingen til server-side
    const { trigger, error, isLoading } = useApi<Periode, MeldeperiodeForPeriodeResponse>({
        key: '/meldeperiode',
        handler: (payload) =>
            apiFetcher({
                url: 'meldeperiode',
                method: 'POST',
                body: payload,
            }),
    });

    useEffect(() => {
        scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!meldeperiodeForPeriode) {
            trigger(
                { fraOgMed: props.meldekort.fraOgMed, tilOgMed: props.meldekort.tilOgMed },
                {
                    onSuccess: (response) => {
                        setMeldeperiodeForPeriode(response);
                    },
                },
            );
        }
    }, [
        props.meldekort.fraOgMed,
        props.meldekort.tilOgMed,
        trigger,
        meldeperiodeForPeriode,
        setMeldeperiodeForPeriode,
    ]);

    return (
        <div>
            <PageHeader
                tekstId={'sideTittel'}
                underTekst={
                    <HStack gap="4">
                        <Undertekst
                            tekst={`Uke ${props.meldekort.uke1} og ${props.meldekort.uke2}`}
                            weight={'semibold'}
                        />
                        <Undertekst
                            tekst={`(${formatterDato({ dato: props.meldekort.fraOgMed })} til ${formatterDato({ dato: props.meldekort.tilOgMed })})`}
                        />
                    </HStack>
                }
            />
            <VStack gap="8">
                <Heading size="large" level="3">
                    {getTekst({ id: 'korrigeringTittel' })}
                </Heading>

                <InformasjonOmKorrigeringAvMeldekort />

                {isLoading && (
                    <VStack gap="4" width={'85%'} className={styles.dagSelectContainer}>
                        {Array.from({ length: props.meldekort.dager.length }).map((_, index) => (
                            <Skeleton height="80px" width="300px" key={`skeleton-${index}`} />
                        ))}
                    </VStack>
                )}

                {error && (
                    <Alert variant="error">
                        <BodyShort>{getTekst({ id: 'korrigeringErrorPrøvIgjenSenere' })}</BodyShort>
                        <Link href={`/`}>Tilbake til forsiden</Link>
                    </Alert>
                )}

                {meldeperiodeForPeriode &&
                    meldeperiodeForPeriode.meldeperiodeId !== props.meldekort.meldeperiodeId && (
                        <Alert variant="info">
                            {getTekst({ id: 'korrigeringOppdatertAlert' })}
                        </Alert>
                    )}

                {meldeperiodeForPeriode && (
                    <KorrigeringAvMeldekort
                        meldekort={props.meldekort}
                        sisteMeldeperiode={meldeperiodeForPeriode}
                    />
                )}
            </VStack>
        </div>
    );
};

export default KorrigerMeldekort;

const KorrigeringAvMeldekort = (props: {
    meldekort: Meldekort;
    sisteMeldeperiode: MeldeperiodeForPeriodeResponse;
}) => {
    const { navigate } = useRouting();
    const [harUgyldigUtfylling, setHarUgyldigUtfylling] = useState(false);
    const { dager, setDager, oppdaterDag } = useKorrigerMeldekortContext();
    const { setMeldeperiodeForPeriode } = useMeldeperiodeForPeriodeContext();

    useEffect(() => {
        setHarUgyldigUtfylling(false);
    }, [dager]);

    useEffect(() => {
        if (dager.length === 0) {
            if (props.sisteMeldeperiode.meldeperiodeId !== props.meldekort.meldeperiodeId) {
                setDager(props.sisteMeldeperiode.dager);
            } else {
                setDager(props.meldekort.dager);
            }
        }
    }, [
        props.sisteMeldeperiode.meldeperiodeId,
        props.sisteMeldeperiode,
        props.meldekort.meldeperiodeId,
        props.meldekort.dager,
        setDager,
        dager,
    ]);

    return (
        <VStack gap="8">
            {props.sisteMeldeperiode.meldeperiodeId !== props.meldekort.meldeperiodeId && (
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
                        props.meldekort.maksAntallDager ? (
                            <BodyShort>
                                Du har registrert for mange dager. Maks antall er{' '}
                                {props.meldekort.maksAntallDager} dager.
                            </BodyShort>
                        ) : (
                            <BodyShort>
                                Kun {hentGyldigeDagerFraMeldekortDager(dager).length} av{' '}
                                {props.meldekort.maksAntallDager} dager besvart
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
                            antallDager: props.meldekort.maksAntallDager,
                            harMeldeperiodeForMeldekortDagerSomIkkeGirRett: harDagerSomIkkeGirRett(
                                props.sisteMeldeperiode,
                            ),
                        });

                        if (erDagerFylltUtGyldig) {
                            navigate(
                                getPath(siteRoutes.korrigerMeldekortOppsummering, {
                                    meldekortId: props.meldekort.id,
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
                        setDager([]);
                        setMeldeperiodeForPeriode(null);
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
                        <option>Ikke rett på tiltakspenger</option>
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
