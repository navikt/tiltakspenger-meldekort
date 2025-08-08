import { Accordion, BodyLong, Button, Heading, HStack, Link } from '@navikt/ds-react';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { formatterDato, formatterDatoTid } from '@utils/datetime';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { AlleMeldekortProps } from '@common/typer/alle-meldekort.ts';
import { useEffect, useState } from 'react';
import { getPath, siteRoutes } from '@common/siteRoutes.ts';
import { appConfig } from '@common/appConfig.ts';
import { ArenaMeldekortStatus } from '@common/typer/meldekort-bruker.ts';

import style from './AlleMeldekort.module.css';
import { useRouting } from '@routing/useRouting';
import { Periode } from '@common/typer/periode';
import { apiFetcher, useApi } from '@utils/fetch';
import { MeldeperiodeForPeriodeResponse } from '@common/typer/Meldeperiode';
import { useMeldeperiodeForPeriodeContext } from '@context/meldeperiodeForPeriode/MeldeperiodeForPeriodeContext';

type Props = AlleMeldekortProps;

export const AlleMeldekort = ({ meldekort: meldekortListe, arenaMeldekortStatus }: Props) => {
    const { navigate } = useRouting();
    const { setMeldeperiodeForPeriode } = useMeldeperiodeForPeriodeContext();
    const [meldekortTilKorrigering, setMeldekortTilKorrigering] = useState<string | null>(null);
    const { trigger, isLoading } = useApi<Periode, MeldeperiodeForPeriodeResponse>({
        path: '/meldeperiode',
        handler: (payload) =>
            apiFetcher({
                url: 'meldeperiode',
                method: 'POST',
                body: payload,
            }),
    });

    useEffect(() => {
        scrollTo(0, 0);
    }, []);

    return (
        <>
            <PageHeader tekstId={'alleTittel'} />
            <div className={style.header}>
                <Heading size={'medium'} level={'2'}>
                    <Tekst id={'alleHeading'} />
                </Heading>
                <InternLenke path={getPath(siteRoutes.forside)}>
                    <Tekst id={'alleTilbake'} />
                </InternLenke>
            </div>
            {meldekortListe.map((meldekort) => (
                <Accordion key={meldekort.id}>
                    <Accordion.Item>
                        <Accordion.Header>
                            <Tekst
                                id={'allePerMeldekortOverskrift'}
                                resolverProps={{
                                    uke1: meldekort.uke1,
                                    uke2: meldekort.uke2,
                                    fraOgMed: formatterDato({ dato: meldekort.fraOgMed }),
                                    tilOgMed: formatterDato({ dato: meldekort.tilOgMed }),
                                }}
                            />
                        </Accordion.Header>
                        <Accordion.Content>
                            <div>
                                {meldekort.innsendt ? (
                                    <HStack justify="space-between">
                                        <Tekst
                                            id={'alleInnsendt'}
                                            resolverProps={{
                                                dato: formatterDatoTid(meldekort.innsendt),
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            loading={
                                                isLoading &&
                                                meldekortTilKorrigering === meldekort.id
                                            }
                                            onClick={() => {
                                                setMeldekortTilKorrigering(meldekort.id);
                                                trigger(
                                                    {
                                                        fraOgMed: meldekort.fraOgMed,
                                                        tilOgMed: meldekort.tilOgMed,
                                                    },
                                                    {
                                                        onSuccess: (response) => {
                                                            setMeldeperiodeForPeriode(response);
                                                            navigate(
                                                                getPath(
                                                                    siteRoutes.korrigerMeldekort,
                                                                    { meldekortId: meldekort.id },
                                                                ),
                                                            );
                                                        },
                                                    },
                                                );
                                            }}
                                        >
                                            Endre meldekort
                                        </Button>
                                    </HStack>
                                ) : (
                                    <Tekst id={'alleIkkeInnsendt'} />
                                )}
                            </div>
                            <Kalender meldekort={meldekort} steg="kvittering" />
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            ))}

            <BodyLong className={style.arenaLenke}>
                <Tekst
                    id={
                        arenaMeldekortStatus === ArenaMeldekortStatus.HAR_MELDEKORT
                            ? 'alleHarArenaMeldekort'
                            : 'alleUkjentArenaMeldekort'
                    }
                />
                <Link href={appConfig.arenaUrl} inlineText={true}>
                    <Tekst id={'alleArenaLenke'} />
                </Link>
                {'.'}
            </BodyLong>
        </>
    );
};
