import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Undertekst } from '@components/page-header/Undertekst.tsx';
import {
    Alert,
    BodyShort,
    Button,
    ConfirmationPanel,
    Heading,
    HStack,
    VStack,
} from '@navikt/ds-react';
import { formatterDato } from '@utils/datetime.ts';
import styles from './KorrigerMeldekortSendInn.module.css';
import { ArrowLeftIcon, PaperplaneIcon } from '@navikt/aksel-icons';
import { useRouting } from '@routing/useRouting.ts';
import { getPath, siteRoutePaths } from '@common/siteRoutePaths.ts';
import { useKorrigerMeldekortContext } from '@context/korriger/KorrigerMeldekortContext.tsx';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { FlashingButton } from '@components/flashing-button/FlashingButton.tsx';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { Meldekort } from '@common/typer/MeldekortBruker.ts';
import { ErrorCodes, useApiClient } from '@utils/apiClient.ts';
import { KorrigerMeldekortOppsummeringProps } from '@common/typer/KorrigerMeldekort.ts';
import { KorrigerMeldekortOppsummering } from '@components/korrigerMeldekort/send-inn/oppsummering/KorrigerMeldekortOppsummering.tsx';

import { useSpråk } from '@context/språk/useSpråk.ts';

export const KorrigerMeldekortSendInn = ({
    originaleMeldekort,
    kanKorrigeres,
}: KorrigerMeldekortOppsummeringProps) => {
    const { navigate, base } = useRouting();
    const { valgtSpråk, getTekstForSpråk } = useSpråk();
    const [visFeil, setVisFeil] = useState(false);
    const [harBekreftet, setHarBekreftet] = useState(false);

    const { dager = [], kanSendeInnHelg } = useKorrigerMeldekortContext();

    const apiClient = useApiClient<Meldekort>({ url: `${base}/api/korriger`, method: 'PATCH' });

    useEffect(() => {
        if (!kanKorrigeres) {
            navigate(getPath(siteRoutePaths.forside));
        }
    }, [kanKorrigeres, navigate]);

    return (
        <div>
            <PageHeader
                tekstId={'sideTittel'}
                underTekst={
                    <HStack gap="4">
                        <Undertekst
                            tekst={`Uke ${originaleMeldekort.uke1} og ${originaleMeldekort.uke2}`}
                            weight={'semibold'}
                        />
                        <Undertekst
                            tekst={`(${formatterDato({ dato: originaleMeldekort.fraOgMed, locale: valgtSpråk })} til ${formatterDato({ dato: originaleMeldekort.tilOgMed, locale: valgtSpråk })})`}
                        />
                    </HStack>
                }
            />

            <VStack gap="5">
                <Heading size="large" level="3">
                    Oppsummering av endret meldekort
                </Heading>
                {/* Denne vil kun slå ut hvis brukeren går direkte til oppsummeringen uten å laste korrigeringssiden først for å populere dagene */}
                {dager.length === 0 ? (
                    <Alert variant="info">
                        <BodyShort>
                            Du har ikke gjort noen endringer på dette meldekortet.
                        </BodyShort>
                        <Link
                            to={getPath(siteRoutePaths.korrigerMeldekortUtfylling, {
                                meldekortId: originaleMeldekort.id,
                            })}
                        >
                            Gå tilbake til korrigering av meldekortet
                        </Link>
                    </Alert>
                ) : (
                    <>
                        <KorrigerMeldekortOppsummering
                            dager={dager}
                            forrigeDager={originaleMeldekort.dager}
                            kanSendeInnHelg={kanSendeInnHelg}
                        />
                        <ConfirmationPanel
                            label={getTekstForSpråk({ id: 'oppsummeringBekrefter' })}
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
                                    <Link to={getPath(siteRoutePaths.forside)}>
                                        {getTekstForSpråk({
                                            id: 'tilbakeTilOversiktForNyKorrigering',
                                        })}
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
                                        getPath(siteRoutePaths.korrigerMeldekortUtfylling, {
                                            meldekortId: originaleMeldekort.id,
                                        }),
                                    )
                                }
                            >
                                {getTekstForSpråk({ id: 'forrige' })}
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
                                            meldekortId: originaleMeldekort.id,
                                            korrigerteDager: dager.map((dag) => ({
                                                dato: dag.dag,
                                                status: dag.status,
                                            })),
                                        },
                                        onSuccess: () => {
                                            navigate(
                                                getPath(
                                                    siteRoutePaths.korrigerMeldekortKvittering,
                                                    {
                                                        meldekortId: originaleMeldekort.id,
                                                    },
                                                ),
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
                                navigate(getPath(siteRoutePaths.forside));
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
