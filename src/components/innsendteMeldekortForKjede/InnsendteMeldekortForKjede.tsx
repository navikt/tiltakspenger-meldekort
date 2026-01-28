import { getPath, siteRoutePaths } from '@common/siteRoutePaths.ts';
import { MeldekortForKjedeResponse } from '@common/typer/MeldeperiodeKjede';
import { Kalender } from '@components/kalender/Kalender';
import { InternLenke } from '@components/lenke/InternLenke';
import { PageHeader } from '@components/page-header/PageHeader';
import { Tekst } from '@components/tekst/Tekst';
import { Heading, VStack } from '@navikt/ds-react';
import { formatterDatoTid } from '@utils/datetime';
import { SisteInnsendteMeldekort } from '@components/innsendte/siste-innsendte/SisteInnsendteMeldekort.tsx';

import styles from './InnsendteMeldekortForKjede.module.css';

import { useSpråk } from '@context/språk/useSpråk.ts';

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

    const [sisteInnsendteMeldekort, ...tidligereMeldekort] = sorterteMeldekort;
    const { valgtSpråk } = useSpråk();

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

                        <InternLenke path={getPath(siteRoutePaths.innsendte)}>
                            <Tekst id={'sideForInnsendteMeldekort'} />
                        </InternLenke>
                    </VStack>
                }
            />

            <div>
                {props.meldekortForKjede.meldekort.length === 0 ? (
                    <VStack gap="2">
                        <Tekst id={'ingenInnsendteMeldekortForPerioden'} />
                        <InternLenke path={getPath(siteRoutePaths.innsendte)}>
                            <Tekst id={'tilbakeTilInnsendte'} />
                        </InternLenke>
                    </VStack>
                ) : (
                    <VStack gap="6">
                        <SisteInnsendteMeldekort
                            meldekort={sisteInnsendteMeldekort}
                            visHelg={props.kanSendeInnHelgForMeldekort}
                        />

                        <div className={styles.separator}></div>

                        <div className={styles.tidligereInnsendteMeldekortContainer}>
                            <Heading size="medium" level="3">
                                <Tekst id={'tidligereInnsendteMeldekortForPerioden'} />
                            </Heading>

                            <ul className={styles.tidligereInnsendteMeldekortContainer}>
                                {tidligereMeldekort.map((meldekort) => (
                                    <li key={meldekort.id}>
                                        {meldekort.innsendt && (
                                            <Tekst
                                                id={'alleInnsendt'}
                                                resolverProps={{
                                                    dato: formatterDatoTid(
                                                        meldekort.innsendt,
                                                        valgtSpråk,
                                                    ),
                                                }}
                                            />
                                        )}
                                        <Kalender
                                            meldekort={meldekort}
                                            steg={'kvittering'}
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
