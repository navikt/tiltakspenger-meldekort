import { Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { formatterDatoTid } from '@utils/datetime.ts';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { getPath, siteRoutePaths } from '@common/siteRoutePaths.ts';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { Meldekort } from '@common/typer/MeldekortBruker.ts';

import style from './SisteInnsendteMeldekort.module.css';

import { useSpråk } from '@context/språk/useSpråk.ts';

type Props = {
    meldekort: Meldekort;
    visHelg: boolean;
};

export const SisteInnsendteMeldekort = ({ meldekort, visHelg }: Props) => {
    const { valgtSpråk } = useSpråk();
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
                    <Button
                        type={'button'}
                        variant={'secondary'}
                        as={InternLenke}
                        path={getPath(siteRoutePaths.korrigerMeldekortUtfylling, {
                            meldekortId: meldekort.id,
                        })}
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
