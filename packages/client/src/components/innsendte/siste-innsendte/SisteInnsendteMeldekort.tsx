import { Alert, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { formatterDatoTid } from '@utils/datetime';
import { InternLenke } from '@components/lenke/InternLenke';
import { getPath, siteRoutePaths } from '@meldekort/common/siteRoutePaths';
import { Kalender } from '@components/kalender/Kalender';

import style from './SisteInnsendteMeldekort.module.css';

import { useSpråk } from '@context/språk/useSpråk';
import { Meldekort } from '@meldekort/common/typer/MeldekortBruker';

type Props = {
    meldekort: Meldekort;
    visHelg: boolean;
    finnesNyereMeldeperiode?: boolean;
};

export const SisteInnsendteMeldekort = ({ meldekort, visHelg, finnesNyereMeldeperiode }: Props) => {
    const { valgtSpråk, getTekstForSpråk } = useSpråk();
    return (
        <VStack gap={'space-16'}>
            <Heading size="medium" level="3">
                <Tekst id={'sisteInnsendteMeldekortForPerioden'} />
            </Heading>
            {meldekort.innsendt ? (
                <HStack justify="space-between">
                    <Tekst
                        id={'alleInnsendt'}
                        resolverProps={{
                            dato: formatterDatoTid(meldekort.innsendt, valgtSpråk),
                        }}
                    />
                    {finnesNyereMeldeperiode && (
                        <Alert variant="info">
                            {getTekstForSpråk({ id: 'korrigeringOppdatertAlert' })}
                        </Alert>
                    )}
                    <Button
                        type={'button'}
                        variant={'secondary'}
                        as={InternLenke}
                        path={getPath(siteRoutePaths.korrigerMeldekortUtfylling, {
                            meldekortId: meldekort.id,
                        })}
                        locale={valgtSpråk}
                        className={style.knapp}
                    >
                        <Tekst id={'endreMeldekort'} />
                    </Button>
                </HStack>
            ) : (
                <Tekst id={'ikkeInnsendt'} />
            )}
            <Kalender meldekort={meldekort} steg={'kvittering'} kanFylleUtHelg={visHelg} />
        </VStack>
    );
};
