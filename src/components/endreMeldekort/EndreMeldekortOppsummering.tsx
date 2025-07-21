import { MeldekortDag, MeldekortUtfylling } from '@common/typer/meldekort-utfylling';
import { StatiskDagPanel } from '@components/kalender/statisk-dag/StatiskDagPanel';
import { PageHeader } from '@components/page-header/PageHeader';
import { Undertekst } from '@components/page-header/Undertekst';
import {
    Alert,
    BodyShort,
    Button,
    Checkbox,
    ConfirmationPanel,
    Heading,
    HStack,
    VStack,
} from '@navikt/ds-react';
import { formatterDato } from '@utils/datetime';
import styles from './EndreMeldekortOppsummering.module.css';
import { ArrowLeftIcon, PaperplaneIcon } from '@navikt/aksel-icons';

const EndreMeldekortOppsummering = (props: { meldekort: MeldekortUtfylling }) => {
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
                    Oppsummering av endret meldekort
                </Heading>
                <OppsummeringAvMeldekortDager dager={props.meldekort.dager} />
                <ConfirmationPanel label={'Jeg bekrefter at disse opplysningene stemmer'} />

                <Alert className={styles.alertInfo} variant="info">
                    Meldekortet er ikke sendt inn.
                </Alert>

                <HStack gap="2">
                    <Button
                        variant="secondary"
                        icon={<ArrowLeftIcon title="pil-venstre" fontSize="1.5rem" />}
                        onClick={() => {
                            console.log('Går tilbake til forrige steg');
                        }}
                    >
                        Forrige steg
                    </Button>
                    <Button
                        onClick={() => {
                            console.log('Sender inn meldekortet');
                        }}
                        icon={<PaperplaneIcon title="pil-høyre" fontSize="1.5rem" />}
                        iconPosition="right"
                    >
                        Send meldekortet
                    </Button>
                </HStack>
                <Button
                    className={styles.avbrytEndringButton}
                    variant="tertiary"
                    onClick={() => {
                        console.log('Avbryter endring');
                    }}
                >
                    Avbryt endring
                </Button>
            </VStack>
        </div>
    );
};

export default EndreMeldekortOppsummering;

const OppsummeringAvMeldekortDager = (props: { dager: MeldekortDag[] }) => {
    return (
        <HStack className={styles.meldekortDagerContainer}>
            <OppsummeringAvMeldekortUke dager={props.dager} ukeNummer="1" />
            <OppsummeringAvMeldekortUke dager={props.dager} ukeNummer="2" />
        </HStack>
    );
};

const OppsummeringAvMeldekortUke = (props: { dager: MeldekortDag[]; ukeNummer: '1' | '2' }) => {
    const uke1 = props.dager.slice(0, 7);
    const uke2 = props.dager.slice(7, 14);

    return (
        <ul className={styles.oppsummeringUkeContainer}>
            {props.ukeNummer === '1'
                ? uke1.map((dag) => (
                      <li key={`uke1-${dag.dato}`}>
                          <StatiskDagPanel key={dag.dato} dag={dag} />
                      </li>
                  ))
                : null}
            {props.ukeNummer === '2'
                ? uke2.map((dag) => (
                      <li key={`uke2-${dag.dato}`}>
                          <StatiskDagPanel key={dag.dato} dag={dag} />
                      </li>
                  ))
                : null}
        </ul>
    );
};
