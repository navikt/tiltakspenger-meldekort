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
import { useKorrigerMeldekortContext } from '../../context/korriger/KorrigerMeldekortContext';
import { Link } from 'wouter';
import { useCallback, useEffect, useState } from 'react';
import { FlashingButton } from '@components/flashing-button/FlashingButton';
import { Tekst } from '@components/tekst/Tekst';
import { MeldekortdagOppsummering } from '@components/kalender/statisk-dag/StatiskDagPanel';
import { Meldekort, MeldekortDag } from '@common/typer/MeldekortBruker';

const useSendKorrigerteDager = (
    meldekortId: string,
    korrigerteDager: MeldekortDag[],
    baseUrl: string,
): {
    status: 'success' | 'error' | 'loading' | 'initial';
    response: unknown;
    callFn: (args: { onSuccess?: () => void; onError?: () => void }) => void;
} => {
    const [response, setResponse] = useState<unknown>(null);
    const [status, setStatus] = useState<'success' | 'error' | 'loading' | 'initial'>('initial');

    const callFn = useCallback(
        ({ onSuccess, onError }: { onSuccess?: () => void; onError?: () => void }) => {
            setStatus('loading');
            fetch(`${baseUrl}/api/korriger`, {
                method: 'PATCH',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    meldekortId: meldekortId,
                    korrigerteDager: korrigerteDager.map((dag) => ({
                        dato: dag.dag,
                        status: dag.status,
                    })),
                }),
            })
                .then((res) => {
                    if (res.ok) {
                        setStatus('success');
                        setResponse(res);
                        onSuccess?.();
                    } else {
                        console.error(`Feil-response ved innsending - ${res.status}`);
                        setStatus('error');
                        setResponse(res);
                        onError?.();
                    }
                })
                .catch((e) => {
                    console.error(`Innsending feilet - ${e}`);
                    setStatus('error');
                });
        },
        [meldekortId, korrigerteDager, baseUrl],
    );

    return { status, response, callFn };
};

const KorrigerMeldekortOppsummering = (props: { originaleMeldekort: Meldekort }) => {
    const { navigate, base } = useRouting();

    const [visFeil, setVisFeil] = useState(false);
    const [harBekreftet, setHarBekreftet] = useState(false);
    const korrigerMeldekortContext = useKorrigerMeldekortContext();
    const [innsendingFeilet, setInnsendingFeilet] = useState(false);
    const { status, response, callFn } = useSendKorrigerteDager(
        props.originaleMeldekort.id,
        korrigerMeldekortContext.dager,
        base,
    );

    useEffect(() => {
        if (status === 'loading') {
            setInnsendingFeilet(false);
        }
    }, [status]);

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

                        {innsendingFeilet && (
                            <Alert variant="error">
                                Innsending av meldekortet feilet. Prøv igjen
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
                                Forrige steg
                            </Button>
                            <FlashingButton
                                loading={status === 'loading'}
                                onClick={() => {
                                    if (!harBekreftet) {
                                        setVisFeil(true);
                                        return false;
                                    }

                                    callFn({
                                        onSuccess: () => {
                                            navigate(
                                                getPath(siteRoutes.korrigerMeldekortKvittering, {
                                                    meldekortId: props.originaleMeldekort.id,
                                                }),
                                            );
                                        },
                                        onError: () => {
                                            setInnsendingFeilet(true);
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

const OppsummeringAvKorrigertMeldekortDager = (props: { dager: MeldekortDag[] }) => {
    return (
        <ul className={styles.dagOppsummeringContainer}>
            {props.dager.map((dag) => (
                <li key={`${dag.dag}`}>
                    <MeldekortdagOppsummering dag={dag} />
                </li>
            ))}
        </ul>
    );
};
