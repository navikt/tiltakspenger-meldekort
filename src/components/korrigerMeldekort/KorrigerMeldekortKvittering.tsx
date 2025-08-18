import { getPath, siteRoutes } from '@common/siteRoutes';
import { Meldekort } from '@common/typer/MeldekortBruker';
import { InternLenke } from '@components/lenke/InternLenke';
import { PageHeader } from '@components/page-header/PageHeader';
import { Undertekst } from '@components/page-header/Undertekst';
import { Tekst } from '@components/tekst/Tekst';
import { Alert, BodyShort, HStack } from '@navikt/ds-react';
import { formatterDato } from '@utils/datetime';

const KorrigerMeldekortKvittering = (props: { originaleMeldekort: Meldekort }) => {
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

            <Alert variant="success">
                <BodyShort>Endringer på meldekortet er sendt inn.</BodyShort>
            </Alert>
            <InternLenke path={getPath(siteRoutes.forside)}>
                <Tekst id={'kvitteringTilbake'} />
            </InternLenke>
        </div>
    );
};

export default KorrigerMeldekortKvittering;
