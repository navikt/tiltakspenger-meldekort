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
import React, { useEffect, useState } from 'react';
import { FlashingButton } from '@components/flashing-button/FlashingButton.tsx';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { Meldekort } from '@common/typer/MeldekortBruker.ts';
import { ErrorCodes, useApiClient } from '@utils/apiClient.ts';
import { KorrigerMeldekortOppsummeringProps } from '@common/typer/KorrigerMeldekort.ts';
import { KorrigerMeldekortOppsummering } from '@components/korrigerMeldekort/send-inn/oppsummering/KorrigerMeldekortOppsummering.tsx';

import { useSpråk } from '@context/språk/useSpråk.ts';
import { addLocaleSuffix } from '@common/urls.ts';

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
                    <HStack gap="space-16">
                        <Undertekst
                            tekst={getTekstForSpråk({
                                id: 'undertekstUker',
                                resolverProps: {
                                    uke1: originaleMeldekort.uke1,
                                    uke2: originaleMeldekort.uke2,
                                },
                            })}
                            weight={'semibold'}
                        />
                        <Undertekst
                            tekst={`(${getTekstForSpråk({
                                id: 'undertekstDatoer',
                                resolverProps: {
                                    fraOgMed: formatterDato({
                                        dato: originaleMeldekort.fraOgMed,
                                        medUkeDag: false,
                                        locale: valgtSpråk,
                                    }),
                                    tilOgMed: formatterDato({
                                        dato: originaleMeldekort.tilOgMed,
                                        medUkeDag: false,
                                        locale: valgtSpråk,
                                    }),
                                },
                            })})`}
                        />
                    </HStack>
                }
            />
            <VStack gap="space-20">
                <Heading size="large" level="3">
                    {getTekstForSpråk({ id: 'korrigeringOppsummering' })}
                </Heading>
                {/* Denne vil kun slå ut hvis brukeren går direkte til oppsummeringen uten å laste korrigeringssiden først for å populere dagene */}
                {dager.length === 0 ? (
                    <Alert variant="info">
                        <Tekst id={'korrigeringIngenEndringer'} />
                        <Link
                            to={addLocaleSuffix(
                                getPath(siteRoutePaths.korrigerMeldekortUtfylling, {
                                    meldekortId: originaleMeldekort.id,
                                }),
                                valgtSpråk,
                            )}
                        >
                            {getTekstForSpråk({ id: 'korrigeringIngenEndringerTilbake' })}
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
                            {getTekstForSpråk({ id: 'korrigeringIkkeSendt' })}
                        </Alert>

                        {apiClient.response?.status === 'error' && (
                            <Alert variant="error">
                                <BodyShort>{apiClient.response.error.errorBody.melding}</BodyShort>
                                {apiClient.response.error.errorBody.kode ===
                                    ErrorCodes.meldekort_allerede_korrigert_og_ikke_lenger_gyldig && (
                                    <Link
                                        to={addLocaleSuffix(
                                            getPath(siteRoutePaths.forside),
                                            valgtSpråk,
                                        )}
                                    >
                                        {getTekstForSpråk({
                                            id: 'tilbakeTilOversiktForNyKorrigering',
                                        })}
                                    </Link>
                                )}
                            </Alert>
                        )}
                        <HStack gap="space-8">
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
                                            locale: valgtSpråk,
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
                                {getTekstForSpråk({ id: 'korrigeringSendMeldekortet' })}
                            </FlashingButton>
                        </HStack>
                        <Button
                            className={styles.avbrytEndringButton}
                            variant="tertiary"
                            onClick={() => {
                                navigate(getPath(siteRoutePaths.forside));
                            }}
                        >
                            {getTekstForSpråk({ id: 'avbrytEndring' })}
                        </Button>
                    </>
                )}
            </VStack>
        </div>
    );
};
