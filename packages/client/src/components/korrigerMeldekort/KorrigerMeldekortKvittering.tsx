import { getPath, siteRoutePaths } from '@meldekort/common/siteRoutePaths';
import { Meldekort } from '@meldekort/common/typer/MeldekortBruker';
import { InternLenke } from '@components/lenke/InternLenke';
import { PageHeader } from '@components/page-header/PageHeader';
import { Undertekst } from '@components/page-header/Undertekst';
import { Tekst } from '@components/tekst/Tekst';
import { HStack, VStack } from '@navikt/ds-react';
import { Infokort } from '@components/infokort/Infokort';
import { formatterDato } from '@utils/datetime';

import { useSpråk } from '@context/språk/useSpråk';
import { EksternLenke } from '@components/lenke/EksternLenke';

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
                <Infokort variant={'suksess'}>
                    <Tekst id={'korrigeringKvittering'} />
                    <br />
                    <br />
                    <Tekst id={'korrigeringKvitteringMeldingSaksbehandler'} />
                    <EksternLenke href={'https://www.nav.no/minside'}>
                        {getTekstForSpråk({ id: 'korrigeringKvitteringForsideLenke' })}
                    </EksternLenke>
                    <Tekst id={'korrigeringKvitteringUtbetaling'} />
                    <EksternLenke href={'https://www.nav.no/minside/utbetalinger'}>
                        {getTekstForSpråk({ id: 'korrigeringKvitteringUtbetalingerLenke' })}
                    </EksternLenke>
                    {'.'}
                </Infokort>
                <InternLenke path={getPath(siteRoutePaths.forside)} locale={valgtSpråk}>
                    <Tekst id={'kvitteringTilbake'} />
                </InternLenke>
            </VStack>
        </div>
    );
};

export default KorrigerMeldekortKvittering;
