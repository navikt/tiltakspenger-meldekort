import { getPath, siteRoutes } from '@common/siteRoutes';
import { MeldeperiodeForPeriodeResponse } from '@common/typer/Meldeperiode';
import { MeldekortForKjedeResponse } from '@common/typer/MeldeperiodeKjede';
import { Periode } from '@common/typer/periode';
import { Kalender } from '@components/kalender/Kalender';
import { InternLenke } from '@components/lenke/InternLenke';
import { PageHeader } from '@components/page-header/PageHeader';
import { Tekst } from '@components/tekst/Tekst';
import { useMeldeperiodeForPeriodeContext } from '@context/meldeperiodeForPeriode/MeldeperiodeForPeriodeContext';
import { Alert, Button, Heading, HStack, Label, VStack } from '@navikt/ds-react';
import { useRouting } from '@routing/useRouting';
import { formatterDatoTid } from '@utils/datetime';
import { apiFetcher, useApi } from '@utils/fetch';
import styles from './InnsendteMeldekortForKjede.module.css';

const InnsendteMeldekortForKjede = (props: { meldekortForKjede: MeldekortForKjedeResponse }) => {
    const { navigate } = useRouting();
    const { setMeldeperiodeForPeriode } = useMeldeperiodeForPeriodeContext();

    const sorterteMeldekort = props.meldekortForKjede.meldekort.toSorted((a, b) => {
        if (a.innsendt && b.innsendt) {
            return b.innsendt.localeCompare(a.innsendt);
        }
        return -1;
    });

    const sisteInnsendteMeldekort = sorterteMeldekort[0];
    const rest = sorterteMeldekort.slice(1);

    const { trigger, isLoading, error } = useApi<Periode, MeldeperiodeForPeriodeResponse>({
        path: '/meldeperiode',
        handler: (payload) =>
            apiFetcher({
                url: 'meldeperiode',
                method: 'POST',
                body: payload,
            }),
    });

    return (
        <div>
            <PageHeader
                tekstId={'innsendteTittel'}
                underTekst={
                    <VStack>
                        {props.meldekortForKjede.periode ? (
                            <Tekst
                                id={'meldekortForKjedeHeaderUndertekst'}
                                resolverProps={{ periode: props.meldekortForKjede.periode }}
                            />
                        ) : null}

                        <InternLenke path={getPath(siteRoutes.innsendte)}>
                            <Tekst id={'sideForInnsendteMeldekort'} />
                        </InternLenke>
                    </VStack>
                }
            />

            <div>
                {props.meldekortForKjede.meldekort.length === 0 ? (
                    <VStack gap="2">
                        <Tekst id={'ingenInnsendteMeldekortForPerioden'} />
                        <InternLenke path={getPath(siteRoutes.innsendte)}>
                            Tilbake til innsendte meldekort.
                        </InternLenke>
                    </VStack>
                ) : (
                    <VStack gap="6">
                        <VStack>
                            <Heading size="medium" level="3">
                                <Tekst id={'sisteInnsendteMeldekortForPerioden'} />
                            </Heading>

                            {error && (
                                <Alert variant="error" size="small">
                                    <Tekst id={'feilSisteMeldekortOpplysninger'} />
                                </Alert>
                            )}

                            {sisteInnsendteMeldekort.innsendt ? (
                                <HStack justify="space-between">
                                    <Label>
                                        <Tekst
                                            id={'alleInnsendt'}
                                            resolverProps={{
                                                dato: formatterDatoTid(
                                                    sisteInnsendteMeldekort.innsendt,
                                                ),
                                            }}
                                        />
                                    </Label>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        loading={isLoading}
                                        onClick={() => {
                                            trigger(
                                                {
                                                    fraOgMed: sisteInnsendteMeldekort.fraOgMed,
                                                    tilOgMed: sisteInnsendteMeldekort.tilOgMed,
                                                },
                                                {
                                                    onSuccess: (response) => {
                                                        setMeldeperiodeForPeriode(response);
                                                        navigate(
                                                            getPath(siteRoutes.korrigerMeldekort, {
                                                                meldekortId:
                                                                    sisteInnsendteMeldekort.id,
                                                            }),
                                                        );
                                                    },
                                                },
                                            );
                                        }}
                                    >
                                        <Tekst id={'endreMeldekort'} />
                                    </Button>
                                </HStack>
                            ) : (
                                <Tekst id={'ikkeInnsendt'} />
                            )}
                            <Kalender meldekort={sisteInnsendteMeldekort} steg="kvittering" />
                        </VStack>

                        <div className={styles.separator}></div>

                        <div className={styles.tidligereInnsendteMeldekortContainer}>
                            <Heading size="medium" level="3">
                                <Tekst id={'tidligereInnsendteMeldekortForPerioden'} />
                            </Heading>

                            <ul className={styles.tidligereInnsendteMeldekortContainer}>
                                {rest.map((meldekort) => (
                                    <li key={meldekort.id}>
                                        {meldekort.innsendt && (
                                            <Label>
                                                <Tekst
                                                    id={'alleInnsendt'}
                                                    resolverProps={{
                                                        dato: formatterDatoTid(meldekort.innsendt),
                                                    }}
                                                />
                                            </Label>
                                        )}
                                        <Kalender meldekort={meldekort} steg="kvittering" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </VStack>
                )}
            </div>
        </div>
    );
};

export default InnsendteMeldekortForKjede;
