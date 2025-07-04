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
import { OppsummeringError } from '@components/fyll-ut/steg-4-oppsummering/OppsummeringError.tsx';
import { TekstId } from '@tekster/typer.ts';

type SSRProps = {
    meldekort: MeldekortUtfylling;
};

type ErrorSummaryItem = {
    tekstId: TekstId;
    onClick?: () => void;
    href?: string;
};

export const Steg4_Oppsummering = ({ meldekort }: SSRProps) => {
    const { base, navigate } = useRouting();
    const { meldekortUtfylling, setMeldekortSteg, harHattFravær, harMottattLønn } =
        useMeldekortUtfylling();
    const varselRef = useRef<HTMLDivElement>(null);
    const [harBekreftet, setHarBekreftet] = useState(false);
    const [visFeil, setVisFeil] = useState(false);
    const [innsendingFeilet, setInnsendingFeilet] = useState(false);
    const errorRef = React.useRef<HTMLDivElement>(null);
    const [errors, setErrors] = useState<ErrorSummaryItem[]>([]);

    useInitMeldekortSteg(meldekort, 'oppsummering');

    if (!meldekortUtfylling) return;
    const {
        harIngenDagerMedFravær,
        harIngenDagerMedLønn,
        harIngenDagerBesvart,
        harForMangeDagerBesvart,
    } = antallDagerValidering(meldekortUtfylling);

    const kanIkkeSendeInnPgaFravær = harIngenDagerMedFravær && harHattFravær;
    const kanIkkeSendeInnPgaLønn = harIngenDagerMedLønn && harMottattLønn;

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

    const redirectTilFraværSteg = () => {
        setMeldekortSteg('fravær');
        navigate(getPathForMeldekortSteg('fravær', meldekortUtfylling.id));
    };

    const redirectTilLønnSteg = () => {
        setMeldekortSteg('lønn');
        navigate(getPathForMeldekortSteg('lønn', meldekortUtfylling.id));
    };

    const validerMeldekortUtfylling = () => {
        const currentValidationErrors: ErrorSummaryItem[] = [];

        if (harIngenDagerBesvart) {
            currentValidationErrors.push({
                href: '#oppsummering',
                tekstId: 'ingenDagerFyltUt',
            });
        }
        if (harForMangeDagerBesvart) {
            currentValidationErrors.push({
                onClick: redirectTilFraværSteg,
                tekstId: 'forMangeDagerEnkel',
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
            <Kalender meldekort={meldekortUtfylling} steg={'oppsummering'} />
            <ConfirmationPanel
                id={'bekreft'}
                onChange={() => {
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
            {visFeil && errors.length > 0 && (
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
                        setVisFeil(true);
                        return false;
                    }

                    const currentValidationErrors = validerMeldekortUtfylling();

                    if (currentValidationErrors.length > 0) {
                        setVisFeil(true);
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
                    navigate(getPath(siteRoutes.forside));
                }}
            />
        </MeldekortStegWrapper>
    );
};
