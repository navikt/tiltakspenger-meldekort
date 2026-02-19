import { getPath, siteRoutePaths } from '@common/siteRoutePaths.ts';
import { Meldekort } from '@common/typer/MeldekortBruker';
import { InternLenke } from '@components/lenke/InternLenke';
import { PageHeader } from '@components/page-header/PageHeader';
import { Undertekst } from '@components/page-header/Undertekst';
import { Tekst } from '@components/tekst/Tekst';
import { Alert, HStack, VStack } from '@navikt/ds-react';
import { formatterDato } from '@utils/datetime';

import { useSpråk } from '@context/språk/useSpråk.ts';
import React from 'react';

const KorrigerMeldekortKvittering = (props: { originaleMeldekort: Meldekort }) => {
    const { valgtSpråk, getTekstForSpråk } = useSpråk();
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
                                    uke1: props.originaleMeldekort.uke1,
                                    uke2: props.originaleMeldekort.uke2,
                                },
                            })}
                            weight={'semibold'}
                        />
                        <Undertekst
                            tekst={`(${getTekstForSpråk({
                                id: 'undertekstDatoer',
                                resolverProps: {
                                    fraOgMed: formatterDato({
                                        dato: props.originaleMeldekort.fraOgMed,
                                        medUkeDag: false,
                                        locale: valgtSpråk,
                                    }),
                                    tilOgMed: formatterDato({
                                        dato: props.originaleMeldekort.tilOgMed,
                                        medUkeDag: false,
                                        locale: valgtSpråk,
                                    }),
                                },
                            })})`}
                        />
                    </HStack>
                }
            />
            <VStack gap="space-8">
                <Alert variant="success">
                    <Tekst id={'korrigeringKvittering'} />
                </Alert>
                <InternLenke path={getPath(siteRoutePaths.forside)} locale={valgtSpråk}>
                    <Tekst id={'kvitteringTilbake'} />
                </InternLenke>
            </VStack>
        </div>
    );
};

export default KorrigerMeldekortKvittering;
