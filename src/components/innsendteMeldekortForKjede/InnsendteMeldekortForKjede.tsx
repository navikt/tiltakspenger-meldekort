import { getPath, siteRoutes } from '@common/siteRoutes';
import { MeldekortForKjedeResponse } from '@common/typer/MeldeperiodeKjede';
import { Kalender } from '@components/kalender/Kalender';
import { InternLenke } from '@components/lenke/InternLenke';
import { PageHeader } from '@components/page-header/PageHeader';
import { Tekst } from '@components/tekst/Tekst';
import { Button, Heading, HStack, Label, VStack } from '@navikt/ds-react';
import { formatterDatoTid } from '@utils/datetime';

import styles from './InnsendteMeldekortForKjede.module.css';

const InnsendteMeldekortForKjede = (props: {
    meldekortForKjede: MeldekortForKjedeResponse;
    kanSendeInnHelgForMeldekort: boolean;
}) => {
    const sorterteMeldekort = props.meldekortForKjede.meldekort.toSorted((a, b) => {
        if (a.innsendt && b.innsendt) {
            return b.innsendt.localeCompare(a.innsendt);
        }
        return -1;
    });

    const [sisteInnsendteMeldekort, ...rest] = sorterteMeldekort;

    return (
        <div>
            <PageHeader
                tekstId={'innsendteTittel'}
                underTekst={
                    <VStack>
                        {props.meldekortForKjede.periode && (
                            <Tekst
                                id={'meldekortForKjedeHeaderUndertekst'}
                                resolverProps={{ periode: props.meldekortForKjede.periode }}
                            />
                        )}

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
                            <Tekst id={'tilbakeTilInnsendte'} />
                        </InternLenke>
                    </VStack>
                ) : (
                    <VStack gap="6">
                        <VStack>
                            <Heading size="medium" level="3">
                                <Tekst id={'sisteInnsendteMeldekortForPerioden'} />
                            </Heading>

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
                                        type={'button'}
                                        variant={'secondary'}
                                        as={InternLenke}
                                        path={getPath(siteRoutes.korrigerMeldekort, {
                                            meldekortId: sisteInnsendteMeldekort.id,
                                        })}
                                    >
                                        <Tekst id={'endreMeldekort'} />
                                    </Button>
                                </HStack>
                            ) : (
                                <Tekst id={'ikkeInnsendt'} />
                            )}
                            <Kalender
                                meldekort={sisteInnsendteMeldekort}
                                steg="kvittering"
                                kanFylleUtHelg={props.kanSendeInnHelgForMeldekort}
                            />
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
                                        <Kalender
                                            meldekort={meldekort}
                                            steg="kvittering"
                                            kanFylleUtHelg={props.kanSendeInnHelgForMeldekort}
                                        />
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
