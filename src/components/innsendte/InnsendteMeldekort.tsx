import {
    Accordion,
    Alert,
    BodyLong,
    Button,
    Heading,
    HStack,
    Link,
    VStack,
} from '@navikt/ds-react';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { formatterDato, formatterDatoTid } from '@utils/datetime';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { InnsendteMeldekortProps } from '@common/typer/alle-meldekort.ts';
import { useEffect, useState } from 'react';
import { getPath, siteRoutes } from '@common/siteRoutes.ts';
import { appConfig } from '@common/appConfig.ts';
import { ArenaMeldekortStatus } from '@common/typer/meldekort-bruker.ts';
import style from './InnsendteMeldekort.module.css';
import { useRouting } from '@routing/useRouting';
import { Periode } from '@common/typer/periode';
import { apiFetcher, useApi } from '@utils/fetch';
import { MeldeperiodeForPeriodeResponse } from '@common/typer/Meldeperiode';
import { useMeldeperiodeForPeriodeContext } from '@context/meldeperiodeForPeriode/MeldeperiodeForPeriodeContext';
import { Meldekort } from '@common/typer/MeldekortBruker';

type Props = InnsendteMeldekortProps;

export const InnsendteMeldekort = ({ meldekort: meldekortListe, arenaMeldekortStatus }: Props) => {
    const { navigate } = useRouting();

    const { setMeldeperiodeForPeriode } = useMeldeperiodeForPeriodeContext();
    const [meldekortTilKorrigering, setMeldekortTilKorrigering] = useState<string | null>(null);
    const { trigger, isLoading, error } = useApi<Periode, MeldeperiodeForPeriodeResponse>({
        key: `/meldeperiode/${crypto.randomUUID()}`,
        handler: (body) =>
            apiFetcher({
                url: 'meldeperiode',
                method: 'POST',
                body: body,
            }),
    });

    useEffect(() => {
        scrollTo(0, 0);
    }, []);

    const meldekortGrupperPåKjede = Object.values(
        Object.groupBy(meldekortListe, (meldekort) => meldekort.kjedeId),
    ).map((meldekortArray) =>
        //object.values har loose typing som gjør at den gir ut undefined som en del av typen
        //dette er i realiteten ikke et problem fordi en tom liste gir {} i groupBy, og Object.values({}) gir da ut en tom liste
        (meldekortArray as Meldekort[]).toSorted((a, b) => {
            if (a.innsendt && b.innsendt) {
                return b.innsendt.localeCompare(a.innsendt);
            }
            return 0;
        }),
    );

    const sisteMeldekortIHverKjede = meldekortGrupperPåKjede.map(
        (meldekortArray) => meldekortArray[0],
    );

    return (
        <>
            <PageHeader tekstId={'innsendteTittel'} />
            <div className={style.header}>
                <Heading size={'medium'} level={'2'}>
                    {sisteMeldekortIHverKjede.length > 0 ? (
                        <Tekst id={'innsendteHeading'} />
                    ) : (
                        <Tekst id={'ingenInnsendteMeldekort'} />
                    )}
                </Heading>
                <InternLenke path={getPath(siteRoutes.forside)}>
                    <Tekst id={'innsendteTilbake'} />
                </InternLenke>
            </div>
            {sisteMeldekortIHverKjede.map((meldekort) => (
                <Accordion key={meldekort.id}>
                    <Accordion.Item>
                        <Accordion.Header>
                            <Tekst
                                id={'innsendtMeldekortAccordionHeader'}
                                resolverProps={{
                                    uke1: meldekort.uke1,
                                    uke2: meldekort.uke2,
                                    fraOgMed: formatterDato({ dato: meldekort.fraOgMed }),
                                    tilOgMed: formatterDato({ dato: meldekort.tilOgMed }),
                                }}
                            />
                        </Accordion.Header>
                        <Accordion.Content>
                            <VStack gap="4">
                                {meldekortTilKorrigering === meldekort.id && error && (
                                    <Alert variant="error" size="small">
                                        <Tekst id={'feilSisteMeldekortOpplysninger'} />
                                    </Alert>
                                )}
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
                                            <Tekst id={'endreMeldekort'} />
                                        </Button>
                                    </HStack>
                                ) : (
                                    <Tekst id={'ikkeInnsendt'} />
                                )}
                            </VStack>
                            <Kalender meldekort={meldekort} steg="kvittering" />
                            {(meldekortGrupperPåKjede.find((g) =>
                                g.some((m) => m.id === meldekort.id),
                            )?.length ?? 0) > 1 && (
                                <InternLenke
                                    path={getPath(siteRoutes.meldekortForKjede, {
                                        //slipper å ha / i url'en mellom periodene.
                                        kjedeId: meldekort.kjedeId.replaceAll('/', '_'),
                                    })}
                                >
                                    <Tekst id={'tidligereMeldekortForPeriode'} />
                                </InternLenke>
                            )}
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
