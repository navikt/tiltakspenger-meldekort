import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling';

import { PageHeader } from '@components/page-header/PageHeader';
import { Undertekst } from '@components/page-header/Undertekst';
import {
    Alert,
    BodyShort,
    Button,
    ConfirmationPanel,
    Heading,
    HStack,
    VStack,
} from '@navikt/ds-react';
import { formatterDato } from '@utils/datetime';
import styles from './KorrigerMeldekortOppsummering.module.css';
import { ArrowLeftIcon, PaperplaneIcon } from '@navikt/aksel-icons';
import { useRouting } from '@routing/useRouting';
import { getPath, siteRoutes } from '@common/siteRoutes';
import { useKorrigerMeldekortContext } from './KorrigerMeldekortContext';
import { Link } from 'wouter';
import { useState } from 'react';
import { FlashingButton } from '@components/flashing-button/FlashingButton';
import { Tekst } from '@components/tekst/Tekst';
import { KorrigertMeldekortDag } from './KorrigerMeldekortUtils';
import { OppsummeringAvKorrigertMeldekortDag } from './oppsummeringAvKorrigertMeldekortDag/OppsummeringAvKorrigertMeldekortDag';

const KorrigerMeldekortOppsummering = (props: { originaleMeldekort: MeldekortUtfylling }) => {
    const { navigate } = useRouting();
    const [visFeil, setVisFeil] = useState(false);
    const [harBekreftet, setHarBekreftet] = useState(false);
    const korrigerMeldekortContext = useKorrigerMeldekortContext();

    return (
        <div>
            <PageHeader
                tekstId={'sideTittel'}
                underTekst={
                    <HStack gap="4">
                        <Undertekst
                            tekst={`Uke ${props.originaleMeldekort.uke1} og ${props.originaleMeldekort.uke2}`}
                            weight={'semibold'}
                        />
                        <Undertekst
                            tekst={`(${formatterDato({ dato: props.originaleMeldekort.periode.fraOgMed })} til ${formatterDato({ dato: props.originaleMeldekort.periode.tilOgMed })})`}
                        />
                    </HStack>
                }
            />

            <VStack gap="8" style={{}}>
                <Heading size="large" level="3">
                    Oppsummering av endret meldekort
                </Heading>
                {korrigerMeldekortContext.dager.length === 0 ? (
                    <Alert variant="info">
                        <BodyShort>
                            Du har ikke gjort noen endringer på dette meldekortet.
                        </BodyShort>
                        <Link
                            to={getPath(siteRoutes.korrigerMeldekort, {
                                meldekortId: props.originaleMeldekort.id,
                            })}
                        >
                            Gå tilbake til korrigering av meldekortet
                        </Link>
                    </Alert>
                ) : (
                    <>
                        <OppsummeringAvKorrigertMeldekortDager
                            dager={korrigerMeldekortContext.dager}
                        />
                        <ConfirmationPanel
                            label={'Jeg bekrefter at disse opplysningene stemmer'}
                            checked={harBekreftet}
                            onChange={() => {
                                setVisFeil(false);
                                setHarBekreftet(!harBekreftet);
                            }}
                            error={visFeil && <Tekst id={'forsideBekrefterFeil'} />}
                        />

                        <Alert className={styles.alertInfo} variant="info">
                            Meldekortet er ikke sendt inn.
                        </Alert>

                        <HStack gap="2">
                            <Button
                                variant="secondary"
                                icon={<ArrowLeftIcon title="pil-venstre" fontSize="1.5rem" />}
                                onClick={() =>
                                    navigate(
                                        getPath(siteRoutes.korrigerMeldekort, {
                                            meldekortId: props.originaleMeldekort.id,
                                        }),
                                    )
                                }
                            >
                                Forrige steg
                            </Button>
                            <FlashingButton
                                onClick={() => {
                                    console.log('Sender inn meldekortet');
                                    if (!harBekreftet) {
                                        setVisFeil(true);
                                        return false;
                                    }

                                    navigate(
                                        getPath(siteRoutes.korrigerMeldekortKvittering, {
                                            meldekortId: props.originaleMeldekort.id,
                                        }),
                                    );
                                    return true;
                                }}
                                icon={<PaperplaneIcon title="pil-høyre" fontSize="1.5rem" />}
                                iconPosition="right"
                            >
                                Send meldekortet
                            </FlashingButton>
                        </HStack>
                        <Button
                            className={styles.avbrytEndringButton}
                            variant="tertiary"
                            onClick={() => navigate(getPath(siteRoutes.forside))}
                        >
                            Avbryt endring
                        </Button>
                    </>
                )}
            </VStack>
        </div>
    );
};

export default KorrigerMeldekortOppsummering;

const OppsummeringAvKorrigertMeldekortDager = (props: { dager: KorrigertMeldekortDag[] }) => {
    return (
        <HStack className={styles.meldekortDagerContainer}>
            <OppsummeringAvMeldekortUke dager={props.dager} ukeNummer="1" />
            <OppsummeringAvMeldekortUke dager={props.dager} ukeNummer="2" />
        </HStack>
    );
};

const OppsummeringAvMeldekortUke = (props: {
    dager: KorrigertMeldekortDag[];
    ukeNummer: '1' | '2';
}) => {
    const uke1 = props.dager.slice(0, 7);
    const uke2 = props.dager.slice(7, 14);

    return (
        <ul className={styles.oppsummeringUkeContainer}>
            {props.ukeNummer === '1'
                ? uke1.map((dag) => (
                      <li key={`uke1-${dag.dato}`}>
                          <OppsummeringAvKorrigertMeldekortDag dag={dag} />
                      </li>
                  ))
                : null}
            {props.ukeNummer === '2'
                ? uke2.map((dag) => (
                      <li key={`uke2-${dag.dato}`}>
                          <OppsummeringAvKorrigertMeldekortDag dag={dag} />
                      </li>
                  ))
                : null}
        </ul>
    );
};
