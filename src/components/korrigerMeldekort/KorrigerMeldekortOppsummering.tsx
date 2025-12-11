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
import { useKorrigerMeldekortContext } from '@context/korriger/KorrigerMeldekortContext.tsx';
import { Link } from 'wouter';
import { useState } from 'react';
import { FlashingButton } from '@components/flashing-button/FlashingButton';
import { Tekst } from '@components/tekst/Tekst';
import { MeldekortdagOppsummering } from '@components/kalender/statisk-dag/StatiskDagPanel';
import { Meldekort, MeldekortDag } from '@common/typer/MeldekortBruker';
import { getTekst } from '@tekster/tekster.ts';
import { ErrorCodes, useApiClient } from '@utils/apiClient';

const KorrigerMeldekortOppsummering = (props: { originaleMeldekort: Meldekort }) => {
    const { navigate, base } = useRouting();
    const [visFeil, setVisFeil] = useState(false);
    const [harBekreftet, setHarBekreftet] = useState(false);

    const { dager = [] } = useKorrigerMeldekortContext();

    const apiClient = useApiClient<Meldekort>({ url: `${base}/api/korriger`, method: 'PATCH' });

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
                            tekst={`(${formatterDato({ dato: props.originaleMeldekort.fraOgMed })} til ${formatterDato({ dato: props.originaleMeldekort.tilOgMed })})`}
                        />
                    </HStack>
                }
            />

            <VStack gap="8" style={{}}>
                <Heading size="large" level="3">
                    Oppsummering av endret meldekort
                </Heading>
                {/* Denne vil kun slå ut hvis brukeren går direkte til oppsummeringen uten å laste korrigeringssiden først for å populere dagene */}
                {/* TODO: burde validere om det faktisk er endringer på dagene */}
                {dager.length === 0 ? (
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
                        <OppsummeringAvKorrigertMeldekortDager dager={dager} />
                        <ConfirmationPanel
                            label={getTekst({ id: 'oppsummeringBekrefter' })}
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

                        {apiClient.response?.status === 'error' && (
                            <Alert variant="error">
                                <BodyShort>{apiClient.response.error.errorBody.melding}</BodyShort>
                                {apiClient.response.error.errorBody.kode ===
                                    ErrorCodes.meldekort_allerede_korrigert_og_ikke_lenger_gyldig && (
                                    <Link to={getPath(siteRoutes.forside)}>
                                        {getTekst({ id: 'tilbakeTilOversiktForNyKorrigering' })}
                                    </Link>
                                )}
                            </Alert>
                        )}
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
                                {getTekst({ id: 'forrige' })}
                            </Button>
                            <FlashingButton
                                loading={apiClient.apiStatus === 'loading'}
                                onClick={() => {
                                    if (!harBekreftet) {
                                        setVisFeil(true);
                                        return false;
                                    }

                                    apiClient.callApi({
                                        body: {
                                            meldekortId: props.originaleMeldekort.id,
                                            korrigerteDager: dager.map((dag) => ({
                                                dato: dag.dag,
                                                status: dag.status,
                                            })),
                                        },
                                        onSuccess: () => {
                                            navigate(
                                                getPath(siteRoutes.korrigerMeldekortKvittering, {
                                                    meldekortId: props.originaleMeldekort.id,
                                                }),
                                            );
                                        },
                                    });

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
                            onClick={() => {
                                navigate(getPath(siteRoutes.forside));
                            }}
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

const OppsummeringAvKorrigertMeldekortDager = (props: { dager: MeldekortDag[] }) => {
    const manTilFreUke1 = props.dager.slice(0, 5);
    const manTilFreUke2 = props.dager.slice(7, 12);
    return (
        <ul className={styles.dagOppsummeringContainer}>
            {[...manTilFreUke1, ...manTilFreUke2].map((dag) => (
                <li key={`${dag.dag}`}>
                    <MeldekortdagOppsummering dag={dag} />
                </li>
            ))}
        </ul>
    );
};
