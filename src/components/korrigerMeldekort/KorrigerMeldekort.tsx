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
import styles from './KorrigerMeldekort.module.css';
import { getPath, siteRoutes } from '@common/siteRoutes';
import { useKorrigerMeldekortContext } from '../../context/korriger/KorrigerMeldekortContext';
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

/**
 * TODO - skal vi ha noe form for validering her?
 */
const KorrigerMeldekort = (props: { meldekort: Meldekort }) => {
    const { meldeperiodeForPeriode, setMeldeperiodeForPeriode } =
        useMeldeperiodeForPeriodeContext();

    //TODO - kan sikkert flytte denne hentingen til server-side
    const { trigger, error, isLoading } = useApi<Periode, MeldeperiodeForPeriodeResponse>({
        path: '/meldeperiode',
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
                    Endre meldekort
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
                        <BodyShort>
                            Vi får ikke innhentet siste opplysninger om meldekortet ditt. Prøv igjen
                            senere. Hvis problemet vedvarer, kontakt Nav.
                        </BodyShort>
                        <Link href={`/`}>Tilbake til forsiden</Link>
                    </Alert>
                )}

                {meldeperiodeForPeriode &&
                    meldeperiodeForPeriode.meldeperiodeId !== props.meldekort.meldeperiodeId && (
                        <Alert variant="info">
                            Meldekortet ditt har blitt oppdatert - Meldekortet inneholder nå de
                            seneste opplysningene registrert. Verifiser at disse er korrekt, eller
                            endre valgene på de dagene som er feilregistrert.
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
                <Alert variant="info">
                    Meldekortet ditt har blitt oppdatert - Meldekortet inneholder nå den seneste
                    dataen registrert.
                </Alert>
            )}

            <Heading size="medium" level="4">
                Slik endrer du meldekortet
            </Heading>
            <BodyLong>
                Nedenfor ser du hva du har tidligere registrert i meldekortet. Endre valgene på de
                dagene som er feilregistrert. Etter du har sendt inn endringen vil endringen
                saksbehandles før det eventuelt blir endringer i utbetalingen din.
            </BodyLong>

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
                    Neste steg
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
                    Avbryt endring
                </Button>
            </VStack>
        </VStack>
    );
};

const MeldekortUkeBehandling = (props: {
    dager: MeldekortDag[];
    onChange: (dag: string, nyStatus: MeldekortDagStatus) => void;
}) => {
    return (
        <VStack>
            <VStack gap="4" width={'85%'} className={styles.dagSelectContainer}>
                {props.dager.map((dag) => (
                    <Select
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
        </VStack>
    );
};

const InformasjonOmKorrigeringAvMeldekort = () => {
    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>Når skal jeg velge mottatt lønn?</Accordion.Header>
                <Accordion.Content>
                    <Label>Når skal du velge “Lønn”?</Label>
                    <ul>
                        <li>
                            Hvis du får lønn for arbeid som er en del av tiltaket ditt, skal du
                            registrere det som lønn. Arbeid er en del av tiltaket når dette er en
                            avtalt aktivet. Det gjelder uansett om du har arbeidet hele dagen eller
                            bare noen timer. Tiltakspenger fra Nav regnes ikke som lønn.
                        </li>
                        <li>Du kan ikke få tiltakspenger for dager du får lønn.</li>
                        <li>
                            Har du arbeidet i stedet for å delta på tiltaket, skal du føre “annet
                            fravær” fra tiltaket i forrige steg.
                        </li>
                        <li>
                            Hvis du er usikker på hva du skal fylle inn i meldekortet, ta kontakt
                            med Nav.
                        </li>
                    </ul>
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>Når skal jeg velge sykdom?</Accordion.Header>
                <Accordion.Content>
                    <Label>Når skal du velge “syk”?</Label>
                    <ul>
                        <li>
                            Du skal velge «syk» hvis du har vært for syk til å kunne delta på
                            tiltaksdagen. Du kan ha rett til tiltakspenger når du er syk. Det er
                            derfor viktig at du melder om dette.
                        </li>
                        <li>
                            Du får utbetalt full stønad de 3 første dagene du er syk. Er du syk mer
                            enn 3 dager, får du utbetalt 75 % av full stønad resten av
                            arbeidsgiverperioden. En arbeidsgiverperiode er på til sammen 16
                            virkedager.
                        </li>
                        <li>
                            Du må ha sykmelding fra lege for å ha rett på tiltakspenger i mer enn 3
                            dager.
                        </li>
                    </ul>

                    <Label>Når skal du velge “Sykt barn” eller “Syk barnepasser”?</Label>
                    <ul>
                        <li>
                            Du skal velge «sykt barn eller syk barnepasser» hvis du ikke kunne delta
                            på tiltaksdagen fordi barnet ditt eller barnets barnepasser var syk.
                        </li>
                        <li>
                            Det er de samme reglene som gjelder for sykt barn/barnepasser som ved
                            egen sykdom. Det vil si at du har rett til full utbetaling de tre første
                            dagene og 75 % resten av arbeidsgiverperioden.
                        </li>
                        <li>
                            Du må sende legeerklæring for barnet ditt eller bekreftelse fra
                            barnepasseren fra dag 4 for å ha rett på tiltakspenger i mer enn 3
                            dager.
                        </li>
                    </ul>
                </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>Når skal jeg velge fravær?</Accordion.Header>
                <Accordion.Content>
                    <Label>Når skal du velge “Fravær godkjent av Nav”?</Label>
                    <ul>
                        <li>
                            Du kan ha rett til tiltakspenger selv om du har hatt fravær. Det gjelder
                            hvis fraværet skyldes aktiviteter som du har avtalt med veilederen din.
                        </li>
                        <li>
                            Godkjente årsaker til fravær, som fortsatt gir deg tiltakspenger, er for
                            eksempel:
                            <ul>
                                <li>jobbintervju</li>
                                <li>timeavtale i det offentlige hjelpeapparatet</li>
                                <li>alvorlig sykdom/begravelse i nærmeste familie</li>
                            </ul>
                        </li>
                        <li>
                            Ta kontakt med veilederen din for å dokumentere årsaken til fraværet og
                            få det godkjent.
                        </li>
                    </ul>

                    <Label>Når skal du velge “Annet fravær”?</Label>
                    <ul>
                        <li>
                            Du skal velge «annet fravær» hvis du har vært fraværende hele eller
                            deler av den aktuelle tiltaksdagen.
                        </li>
                        <li>
                            Du skal velge «annet fravær» hvis du har arbeidet i stedet for å delta
                            på tiltaket. For eksempel: Du har avtalt tiltakstid 09-15 og arbeidet
                            fra 09-10 i stedet for å delta hele den avtalte tiden på tiltaket.
                        </li>
                        <li>
                            Du skal velge «annet fravær» hvis du har hatt fri/ferie utenom planlagt
                            ferieperiode for tiltaket.
                        </li>
                        <li>
                            Du skal velge «annet fravær» hvis du venter på godkjenning av fravær. Du
                            kan endre meldekortet senere når fraværet er godkjent av Nav-veilederen
                            din.
                        </li>
                    </ul>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
