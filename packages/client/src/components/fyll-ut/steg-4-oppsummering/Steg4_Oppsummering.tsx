import React, { useRef, useState } from 'react';
import style from './Steg4_Oppsummering.module.css';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Alert, ConfirmationPanel, ErrorSummary, VStack } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { Kalender } from '@components/kalender/Kalender';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter';

import { useRouting } from '@routing/useRouting';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper';

import { getPath, getPathForMeldekortSteg, siteRoutePaths } from '@meldekort/common/siteRoutePaths';
import { InternLenke } from '@components/lenke/InternLenke';
import { MeldekortStegButtons } from '@components/fyll-ut/MeldekortStegButtons';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import { antallDagerValidering } from '@utils/utfyllingValidering';
import { useInitMeldekortSteg } from '@components/fyll-ut/useInitMeldekortSteg';
import { OppsummeringError } from '@components/fyll-ut/steg-4-oppsummering/OppsummeringError';
import { TekstId } from '@tekster/typer';
import { Meldekort } from '@meldekort/common/typer/MeldekortBruker';
import { DagerUtfyltTeller } from '../dager-utfylt-teller/DagerUtfyltTeller';
import { ErrorCodes, useApiClient } from '@utils/apiClient';
import { useSpråk } from '@context/språk/useSpråk';
import { MeldekortUtfyltDTO } from '@meldekort/common/typer/BrukersMeldekortUtfylling';

type SSRProps = {
    brukersMeldekort: Meldekort;
    kanFylleUtHelg: boolean;
};

type ErrorSummaryItem = {
    tekstId: TekstId;
    onClick?: () => void;
    href?: string;
};

/**
 * Oversetter feilkoden fra backend (se SendInnMeldekortRoute i tiltakspenger-meldekort-api)
 * til en brukervennlig tekst. Ukjente/uventede koder faller tilbake til en generell feilmelding.
 */
const innsendingFeilTekstId = (kode?: string): TekstId => {
    switch (kode) {
        case ErrorCodes.meldekort_allerede_mottatt:
            return 'innsendingFeiletAlleredeMottatt';
        case ErrorCodes.meldekort_deaktivert:
        case ErrorCodes.meldekortets_meldeperiode_er_erstattet:
            return 'innsendingFeiletMeldekortUtdatert';
        case ErrorCodes.meldekort_ikke_klart_til_innsending:
            return 'innsendingFeiletIkkeKlart';
        case ErrorCodes.fant_ikke_meldekort:
            return 'innsendingFeiletFantIkkeMeldekort';
        case ErrorCodes.fant_ikke_meldeperiode:
        case ErrorCodes.ugyldig_meldekort_innsending:
        case ErrorCodes.uventet_feil_ved_lagring:
            return 'innsendingFeiletTekniskFeil';
        default:
            return 'oppsummeringInnsendingFeilet';
    }
};

/**
 * Lenke som hjelper brukeren videre for feil der det finnes en naturlig neste handling.
 * Øvrige feil viser ingen lenke (returnerer null).
 */
type InnsendingFeilLenke = { path: string; tekstId: TekstId };

const innsendingFeilLenke = (kode?: string): InnsendingFeilLenke | null => {
    switch (kode) {
        // Meldekortet er utdatert eller borte → tilbake til oversikten for å sende inn nyeste meldekort
        case ErrorCodes.meldekort_deaktivert:
        case ErrorCodes.meldekortets_meldeperiode_er_erstattet:
        case ErrorCodes.fant_ikke_meldekort:
            return { path: getPath(siteRoutePaths.forside), tekstId: 'tilbakeTilOversikten' };
        // Allerede sendt inn → til siden for innsendte meldekort
        case ErrorCodes.meldekort_allerede_mottatt:
            return { path: getPath(siteRoutePaths.innsendte), tekstId: 'tilInnsendteMeldekort' };
        default:
            return null;
    }
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
    const { valgtSpråk } = useSpråk();
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
            body: { ...meldekortUtfylling, locale: valgtSpråk } satisfies MeldekortUtfyltDTO,
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
            <VStack gap="space-8">
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
            {apiClient.apiStatus === 'error' && apiClient.response?.status === 'error' && (
                <Alert variant="error" className={style.varsel} ref={varselRef} tabIndex={-1}>
                    <TekstSegmenter
                        id={innsendingFeilTekstId(apiClient.response.error.errorBody.kode)}
                    />
                    {(() => {
                        const lenke = innsendingFeilLenke(apiClient.response.error.errorBody.kode);
                        return (
                            lenke && (
                                <InternLenke path={lenke.path} locale={valgtSpråk}>
                                    <Tekst id={lenke.tekstId} />
                                </InternLenke>
                            )
                        );
                    })()}
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
