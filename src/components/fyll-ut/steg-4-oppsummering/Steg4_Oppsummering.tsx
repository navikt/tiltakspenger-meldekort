import React, { useRef, useState } from 'react';
import style from './Steg4_Oppsummering.module.css';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Alert, ConfirmationPanel, ErrorSummary } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { fetchSendInn } from '@utils/fetch.ts';
import { useRouting } from '@routing/useRouting.ts';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper.tsx';
import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling.ts';
import { getPath, getPathForMeldekortSteg, siteRoutes } from '@common/siteRoutes.ts';
import { MeldekortStegButtons } from '@components/fyll-ut/MeldekortStegButtons.tsx';
import { PaperplaneIcon } from '@navikt/aksel-icons';
import { antallDagerValidering } from '@utils/utfyllingValidering.ts';
import { useInitMeldekortSteg } from '@components/fyll-ut/useInitMeldekortSteg.tsx';

type SSRProps = {
    meldekort: MeldekortUtfylling;
};

export const Steg4_Oppsummering = ({ meldekort }: SSRProps) => {
    const { base, navigate } = useRouting();
    const { meldekortUtfylling, setMeldekortSteg, harHattFravær, harMottattLønn } =
        useMeldekortUtfylling();
    const varselRef = useRef<HTMLDivElement>(null);
    const [harBekreftet, setHarBekreftet] = useState(false);
    const [visFeil, setVisFeil] = useState(false);
    const [innsendingFeilet, setInnsendingFeilet] = useState(false);
    const errorRef = React.useRef(null);

    useInitMeldekortSteg(meldekort, 'oppsummering');

    if (!meldekortUtfylling) return;
    const { harIngenDagerMedFravær, harIngenDagerMedLønn } =
        antallDagerValidering(meldekortUtfylling);

    const kanIkkeSendeInnPgaFravær = harIngenDagerMedFravær && harHattFravær;
    const kanIkkeSendeInnPgaLønn = harIngenDagerMedLønn && harMottattLønn;
    const kanIkkeSendeInnFeilIAndreSteg = kanIkkeSendeInnPgaFravær || kanIkkeSendeInnPgaLønn;

    const sendInn = () => {
        setMeldekortSteg('kvittering');
        fetchSendInn(meldekortUtfylling, base).then((bleSendt) => {
            if (bleSendt) {
                navigate(getPathForMeldekortSteg('kvittering', meldekortUtfylling.id));
            } else {
                setInnsendingFeilet(true);
                setMeldekortSteg('oppsummering');
                varselRef.current?.focus();
            }
        });
    };

    return (
        <MeldekortStegWrapper>
            <Tekst id="oppsummeringIngress" />
            <Alert variant="info" className={style.varsel}>
                <TekstSegmenter id={'oppsummeringIkkeSendtEnnå'} />
            </Alert>
            <Kalender meldekort={meldekortUtfylling} steg={'oppsummering'} />
            <ConfirmationPanel
                onChange={() => {
                    setVisFeil(false);
                    setHarBekreftet(!harBekreftet);
                }}
                checked={harBekreftet}
                value={harBekreftet}
                label={<Tekst id={'oppsummeringBekrefter'} />}
                error={!harBekreftet && visFeil && <Tekst id={'oppsummeringBekrefterFeil'} />}
            />
            {innsendingFeilet && (
                <Alert variant="error" className={style.varsel} ref={varselRef} tabIndex={-1}>
                    <TekstSegmenter id="oppsummeringInnsendingFeilet" />
                </Alert>
            )}
            {visFeil && kanIkkeSendeInnFeilIAndreSteg && (
                <ErrorSummary className={style.varsel} ref={errorRef}>
                    {kanIkkeSendeInnPgaFravær && (
                        <ErrorSummary.Item
                            as="button"
                            className={style.errorSummaryItemAsLink}
                            onClick={() => {
                                setMeldekortSteg('fravær');
                                navigate(getPathForMeldekortSteg('fravær', meldekortUtfylling.id));
                            }}
                        >
                            <Tekst id={'oppsummeringIngenDagerMedFravær'} />
                        </ErrorSummary.Item>
                    )}
                    {kanIkkeSendeInnPgaLønn && (
                        <ErrorSummary.Item
                            as="button"
                            className={style.errorSummaryItemAsLink}
                            onClick={() => {
                                setMeldekortSteg('lønn');
                                navigate(getPathForMeldekortSteg('lønn', meldekortUtfylling.id));
                            }}
                        >
                            <Tekst id={'oppsummeringIngenDagerMedLønn'} />
                        </ErrorSummary.Item>
                    )}
                </ErrorSummary>
            )}
            <MeldekortStegButtons
                onNesteClick={() => {
                    if (!harBekreftet) {
                        setVisFeil(true);
                        return false;
                    }

                    if (kanIkkeSendeInnFeilIAndreSteg) {
                        setVisFeil(true);
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
                    navigate(getPath(siteRoutes.forside));
                }}
            />
        </MeldekortStegWrapper>
    );
};
