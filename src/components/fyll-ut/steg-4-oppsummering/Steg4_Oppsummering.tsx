import React, { useRef, useState } from 'react';
import style from './Steg4_Oppsummering.module.css';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Alert, ConfirmationPanel, ErrorSummary, VStack } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';

import { useRouting } from '@routing/useRouting.ts';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper.tsx';

import { getPath, getPathForMeldekortSteg, siteRoutePaths } from '@common/siteRoutePaths.ts';
import { MeldekortStegButtons } from '@components/fyll-ut/MeldekortStegButtons.tsx';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import { antallDagerValidering } from '@utils/utfyllingValidering.ts';
import { useInitMeldekortSteg } from '@components/fyll-ut/useInitMeldekortSteg.tsx';
import { OppsummeringError } from '@components/fyll-ut/steg-4-oppsummering/OppsummeringError.tsx';
import { TekstId } from '@tekster/typer.ts';
import { Meldekort } from '@common/typer/MeldekortBruker';
import { DagerUtfyltTeller } from '../dager-utfylt-teller/DagerUtfyltTeller';
import { useApiClient } from '@utils/apiClient';

type SSRProps = {
    brukersMeldekort: Meldekort;
    kanFylleUtHelg: boolean;
};

type ErrorSummaryItem = {
    tekstId: TekstId;
    onClick?: () => void;
    href?: string;
};

export const Steg4_Oppsummering = ({ brukersMeldekort, kanFylleUtHelg }: SSRProps) => {
    const { base, navigate } = useRouting();
    const {
        meldekortUtfylling,
        setMeldekortSteg,
        harHattFravær,
        setHarHattFravær,
        harMottattLønn,
        setHarMottattLønn,
        visValideringsfeil,
        setVisValideringsfeil,
    } = useMeldekortUtfylling();
    const varselRef = useRef<HTMLDivElement>(null);
    const [harBekreftet, setHarBekreftet] = useState(false);

    const errorRef = React.useRef<HTMLDivElement>(null);
    const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);

    useInitMeldekortSteg(brukersMeldekort, 'oppsummering');

    const apiClient = useApiClient({ url: `${base}/api/send-inn`, method: 'POST' });

    if (!meldekortUtfylling) return;
    const {
        harIngenDagerMedFravær,
        harIngenDagerMedLønn,
        harIngenDagerBesvart,
        harForMangeDagerBesvart,
        harForFaDagerBesvart,
    } = antallDagerValidering(brukersMeldekort, meldekortUtfylling);

    const kanIkkeSendeInnPgaFravær = harIngenDagerMedFravær && harHattFravær;
    const kanIkkeSendeInnPgaLønn = harIngenDagerMedLønn && harMottattLønn;

    const sendInn = () => {
        setMeldekortSteg('kvittering');
        apiClient.callApi({
            body: meldekortUtfylling,
            onSuccess: () => {
                setVisValideringsfeil(null);
                setHarHattFravær(null);
                setHarMottattLønn(null);

                navigate(getPathForMeldekortSteg('kvittering', meldekortUtfylling!.id));
            },
            onError: () => {
                setMeldekortSteg('oppsummering');
                varselRef.current?.focus();
            },
        });
    };

    const redirectTilFraværSteg = () => {
        setMeldekortSteg('fravær');
        navigate(getPathForMeldekortSteg('fravær', meldekortUtfylling.id));
    };

    const redirectTilLønnSteg = () => {
        setMeldekortSteg('lønn');
        navigate(getPathForMeldekortSteg('lønn', meldekortUtfylling.id));
    };

    const redirectTilDeltakelseSteg = () => {
        setMeldekortSteg('deltatt');
        navigate(getPathForMeldekortSteg('deltatt', meldekortUtfylling.id));
    };

    const validerMeldekortUtfylling = () => {
        const currentValidationErrors: ErrorSummaryItem[] = [];

        if (harIngenDagerBesvart) {
            currentValidationErrors.push({
                onClick: () => {
                    if (harHattFravær || harHattFravær === null) {
                        redirectTilFraværSteg();
                        return;
                    }
                    if (harMottattLønn || harMottattLønn === null) {
                        redirectTilLønnSteg();
                        return;
                    }
                    redirectTilDeltakelseSteg();
                },
                tekstId: 'ingenDagerFyltUt',
            });
        }
        if (harForMangeDagerBesvart) {
            currentValidationErrors.push({
                onClick: () => {
                    if (harHattFravær || harHattFravær === null) {
                        redirectTilFraværSteg();
                        return;
                    }
                    if (harMottattLønn || harMottattLønn === null) {
                        redirectTilLønnSteg();
                        return;
                    }
                    redirectTilDeltakelseSteg();
                },
                tekstId: 'forMangeDagerEnkel',
            });
        }
        if (harForFaDagerBesvart) {
            currentValidationErrors.push({
                onClick: () => {
                    if (harHattFravær || harHattFravær === null) {
                        redirectTilFraværSteg();
                        return;
                    }
                    if (harMottattLønn || harMottattLønn === null) {
                        redirectTilLønnSteg();
                        return;
                    }
                    redirectTilDeltakelseSteg();
                },
                tekstId: 'forFaDagerEnkel',
            });
        }
        if (harHattFravær === null) {
            currentValidationErrors.push({
                onClick: redirectTilFraværSteg,
                tekstId: 'fraværSpørsmålIkkeValgt',
            });
        }
        if (harMottattLønn === null) {
            currentValidationErrors.push({
                onClick: redirectTilLønnSteg,
                tekstId: 'lønnSpørsmålIkkeValgt',
            });
        }
        if (kanIkkeSendeInnPgaFravær) {
            currentValidationErrors.push({
                onClick: redirectTilFraværSteg,
                tekstId: 'oppsummeringIngenDagerMedFravær',
            });
        }
        if (kanIkkeSendeInnPgaLønn) {
            currentValidationErrors.push({
                onClick: redirectTilLønnSteg,
                tekstId: 'oppsummeringIngenDagerMedLønn',
            });
        }
        setErrors(currentValidationErrors);
        return currentValidationErrors;
    };

    return (
        <MeldekortStegWrapper>
            <Tekst id="oppsummeringIngress" />
            <Alert variant="info" className={style.varsel}>
                <TekstSegmenter id={'oppsummeringIkkeSendtEnnå'} />
            </Alert>
            <Kalender
                meldekort={meldekortUtfylling}
                steg={'oppsummering'}
                kanFylleUtHelg={kanFylleUtHelg}
            />
            <VStack gap="2">
                <DagerUtfyltTeller
                    brukersMeldekort={brukersMeldekort}
                    meldekortUtfylling={meldekortUtfylling}
                    className={style.teller}
                    ref={varselRef}
                    ikkeVisDagTeller={true}
                />
                <ConfirmationPanel
                    id={'bekreft'}
                    onChange={() => {
                        setHarBekreftet(!harBekreftet);
                    }}
                    checked={harBekreftet}
                    value={harBekreftet}
                    label={<Tekst id={'oppsummeringBekrefter'} />}
                    error={
                        !harBekreftet &&
                        visValideringsfeil && <Tekst id={'oppsummeringBekrefterFeil'} />
                    }
                />
            </VStack>
            {apiClient.apiStatus === 'error' && (
                <Alert variant="error" className={style.varsel} ref={varselRef} tabIndex={-1}>
                    <TekstSegmenter id="oppsummeringInnsendingFeilet" />
                </Alert>
            )}
            {visValideringsfeil && errors.length > 0 && (
                <ErrorSummary className={style.varsel} ref={errorRef}>
                    {errors.map((error, index) => (
                        <OppsummeringError
                            key={`${index}-${error.tekstId}`}
                            onClick={error.onClick}
                            tekstId={error.tekstId}
                            href={error.href}
                        />
                    ))}
                </ErrorSummary>
            )}
            <MeldekortStegButtons
                onNesteClick={() => {
                    if (!harBekreftet) {
                        setVisValideringsfeil(true);
                        return false;
                    }

                    const currentValidationErrors = validerMeldekortUtfylling();

                    if (currentValidationErrors.length > 0) {
                        setVisValideringsfeil(true);
                        errorRef.current?.focus();
                        return false;
                    }
                    sendInn();
                    return true;
                }}
                nesteButtonTekst={'sendInn'}
                nesteButtonIcon={<PaperplaneIcon fontSize="1.5rem" aria-hidden />}
                onForrigeClick={() => {
                    navigate(getPathForMeldekortSteg('deltatt', meldekortUtfylling.id));
                }}
                onAvbrytClick={() => {
                    setMeldekortSteg('fravær');
                    navigate(getPath(siteRoutePaths.forside));
                }}
            />
        </MeldekortStegWrapper>
    );
};
