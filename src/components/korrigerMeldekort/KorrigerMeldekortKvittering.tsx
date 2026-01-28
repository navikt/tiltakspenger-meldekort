import { getPath, siteRoutePaths } from '@common/siteRoutePaths.ts';
import { Meldekort } from '@common/typer/MeldekortBruker';
import { InternLenke } from '@components/lenke/InternLenke';
import { PageHeader } from '@components/page-header/PageHeader';
import { Undertekst } from '@components/page-header/Undertekst';
import { Tekst } from '@components/tekst/Tekst';
import { Alert, BodyShort, HStack, VStack } from '@navikt/ds-react';
import { formatterDato } from '@utils/datetime';
import { useValgtSpråk } from '@context/SpråkvelgerContext.tsx';

const KorrigerMeldekortKvittering = (props: { originaleMeldekort: Meldekort }) => {
    const { valgtSpråk } = useValgtSpråk();
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
                            tekst={`(${formatterDato({ dato: props.originaleMeldekort.fraOgMed, locale: valgtSpråk })} til ${formatterDato({ dato: props.originaleMeldekort.tilOgMed, locale: valgtSpråk })})`}
                        />
                    </HStack>
                }
            />

            <VStack gap="2">
                <Alert variant="success">
                    <BodyShort>Endringer på meldekortet er sendt inn.</BodyShort>
                </Alert>
                <InternLenke path={getPath(siteRoutePaths.forside)}>
                    <Tekst id={'kvitteringTilbake'} />
                </InternLenke>
            </VStack>
        </div>
    );
};

export default KorrigerMeldekortKvittering;
