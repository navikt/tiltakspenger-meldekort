import { MeldekortDagStatus, MeldekortUtfylling } from '@common/typer/meldekort-utfylling';
import { PageHeader } from '@components/page-header/PageHeader';
import { Undertekst } from '@components/page-header/Undertekst';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import {
    Accordion,
    BodyLong,
    Button,
    Heading,
    HStack,
    Label,
    Select,
    VStack,
} from '@navikt/ds-react';
import { useRouting } from '@routing/useRouting';
import { formatterDato } from '@utils/datetime';
import { useEffect } from 'react';
import styles from './KorrigerMeldekort.module.css';
import { getPath, siteRoutes } from '@common/siteRoutes';
import { useKorrigerMeldekortContext } from './KorrigerMeldekortContext';

const KorrigerMeldekort = (props: { meldekort: MeldekortUtfylling }) => {
    const { navigate } = useRouting();
    const { dager, setDager, oppdaterDag } = useKorrigerMeldekortContext();

    useEffect(() => {
        scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (dager.length === 0) {
            setDager(props.meldekort.dager);
        }
    }, [props.meldekort.dager, setDager, dager]);

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
                            tekst={`(${formatterDato({ dato: props.meldekort.periode.fraOgMed })} til ${formatterDato({ dato: props.meldekort.periode.tilOgMed })})`}
                        />
                    </HStack>
                }
            />
            <VStack gap="8">
                <Heading size="large" level="3">
                    Endre meldekort
                </Heading>
                <InformasjonOmKorrigeringAvMeldekort />

                <Heading size="medium" level="4">
                    Slik endrer du meldekortet
                </Heading>
                <BodyLong>
                    Nedenfor ser du hva du har tidligere registrert i meldekortet. Endre valgene på
                    de dagene som er feilregistrert. Etter du har sendt inn endringen vil endringen
                    saksbehandles før det eventuelt blir endringer i utbetalingen din.
                </BodyLong>

                <MeldekortUkeBehandling
                    dager={dager.map((dag) => ({
                        dato: dag.dato,
                        status: dag.status,
                    }))}
                    onChange={(dag, nyStatus) => {
                        oppdaterDag(dag, nyStatus);
                    }}
                />

                <VStack gap="2">
                    <Button
                        className={styles.button}
                        onClick={() => {
                            navigate(
                                getPath(siteRoutes.korrigerMeldekortOppsummering, {
                                    meldekortId: props.meldekort.id,
                                }),
                            );
                        }}
                        iconPosition="right"
                        icon={<ArrowRightIcon title="pil-høyre" fontSize="1.5rem" />}
                    >
                        Neste steg
                    </Button>
                    <Button
                        variant="tertiary"
                        className={styles.button}
                        onClick={() => navigate(getPath(siteRoutes.forside))}
                    >
                        Avbryt endring
                    </Button>
                </VStack>
            </VStack>
        </div>
    );
};

export default KorrigerMeldekort;

export const MeldekortUkeBehandling = (props: {
    dager: Array<{ dato: string; status: MeldekortDagStatus }>;
    onChange: (dag: string, nyStatus: MeldekortDagStatus) => void;
}) => {
    const dagerUke1 = props.dager.slice(0, 7);
    const dagerUke2 = props.dager.slice(7, 14);

    return (
        <VStack>
            <HStack gap="24">
                <VStack gap="4">
                    {dagerUke1.map((dag) => (
                        <Select
                            key={`uke1-${dag.dato}`}
                            label={formatterDato({ medUkeDag: true, dato: dag.dato })}
                            value={dag.status}
                            onChange={(e) => {
                                props.onChange(dag.dato, e.target.value as MeldekortDagStatus);
                            }}
                        >
                            {getDagStatusOptions()}
                        </Select>
                    ))}
                </VStack>

                <VStack gap="4">
                    {dagerUke2.map((dag) => (
                        <Select
                            key={`uke2-${dag.dato}`}
                            label={formatterDato({ medUkeDag: true, dato: dag.dato })}
                            value={dag.status}
                            onChange={(e) => {
                                props.onChange(dag.dato, e.target.value as MeldekortDagStatus);
                            }}
                        >
                            {getDagStatusOptions()}
                        </Select>
                    ))}
                </VStack>
            </HStack>
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
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

const getDagStatusOptions = () => {
    return Object.values(MeldekortDagStatus).map((status) => (
        <option key={status} value={status}>
            {dagStatusTekstMapper(status)}
        </option>
    ));
};

//TODO - kan vi virkelig forvente alle disse statusene ved endring av meldekort?
//TODO - vi må ha 'ikke tiltaksdag' fra brukersperspektiv. Hvordan skal vi mappe disse til / fra backend
const dagStatusTekstMapper = (status: MeldekortDagStatus): string => {
    switch (status) {
        case MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET:
            return 'Mottatt lønn';
        case MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET:
            return 'Deltatt';
        case MeldekortDagStatus.FRAVÆR_SYK:
            return 'Syk';
        case MeldekortDagStatus.FRAVÆR_SYKT_BARN:
            return 'Syk barn eller syk barnepasser';
        case MeldekortDagStatus.FRAVÆR_GODKJENT_AV_NAV:
            return 'Fravær godkjent av NAV';
        case MeldekortDagStatus.FRAVÆR_ANNET:
            return 'Annet fravær';
        case MeldekortDagStatus.IKKE_BESVART:
            return 'Ikke besvart';
        default:
            return 'Ukjent status';
    }
};
