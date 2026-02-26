import { Accordion, BodyLong, Heading, Link } from '@navikt/ds-react';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { formatterDato } from '@utils/datetime';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Tekst } from '@components/tekst/Tekst.tsx';
import {
    InnsendteMeldekortProps,
    MeldekortMedSisteMeldeperiode,
} from '@common/typer/alle-meldekort.ts';
import { useEffect } from 'react';
import { getPath, siteRoutePaths } from '@common/siteRoutePaths.ts';
import { appConfig } from '@common/appConfig.ts';
import { ArenaMeldekortStatus } from '@common/typer/meldekort-bruker.ts';
import { SisteInnsendteMeldekort } from '@components/innsendte/siste-innsendte/SisteInnsendteMeldekort.tsx';

import style from './InnsendteMeldekort.module.css';

import { useSpråk } from '@context/språk/useSpråk.ts';

type Props = InnsendteMeldekortProps;

export const InnsendteMeldekort = ({
    meldekortMedSisteMeldeperiode: meldekortListe,
    arenaMeldekortStatus,
    kanSendeInnHelgForMeldekort,
}: Props) => {
    useEffect(() => {
        scrollTo(0, 0);
    }, []);

    const meldekortGruppertPåKjede = Object.values(
        Object.groupBy(
            meldekortListe,
            (meldekortMedSisteMeldeperiode) => meldekortMedSisteMeldeperiode.meldekort.kjedeId,
        ),
    ).map((meldekortArray) =>
        //object.values har loose typing som gjør at den gir ut undefined som en del av typen
        //dette er i realiteten ikke et problem fordi en tom liste gir {} i groupBy, og Object.values({}) gir da ut en tom liste
        (meldekortArray as MeldekortMedSisteMeldeperiode[]).toSorted((a, b) => {
            if (a.meldekort.innsendt && b.meldekort.innsendt) {
                return b.meldekort.innsendt.localeCompare(a.meldekort.innsendt);
            }
            return 0;
        }),
    );
    const { valgtSpråk } = useSpråk();

    return (
        <>
            <PageHeader tekstId={'innsendteTittel'} />

            <div className={style.header}>
                <Heading size={'medium'} level={'2'}>
                    {meldekortGruppertPåKjede.length > 0 ? (
                        <Tekst id={'innsendteHeading'} />
                    ) : (
                        <Tekst id={'ingenInnsendteMeldekort'} />
                    )}
                </Heading>
                <InternLenke path={getPath(siteRoutePaths.forside)} locale={valgtSpråk}>
                    <Tekst id={'innsendteTilbake'} />
                </InternLenke>
            </div>

            {meldekortGruppertPåKjede.map((meldekortPåKjede) => {
                const sisteMeldekort = meldekortPåKjede[0];

                return (
                    <Accordion key={sisteMeldekort.meldekort.id}>
                        <Accordion.Item>
                            <Accordion.Header>
                                <Tekst
                                    id={'innsendtMeldekortAccordionHeader'}
                                    resolverProps={{
                                        uke1: sisteMeldekort.meldekort.uke1,
                                        uke2: sisteMeldekort.meldekort.uke2,
                                        fraOgMed: formatterDato({
                                            dato: sisteMeldekort.meldekort.fraOgMed,
                                            locale: valgtSpråk,
                                        }),
                                        tilOgMed: formatterDato({
                                            dato: sisteMeldekort.meldekort.tilOgMed,
                                            locale: valgtSpråk,
                                        }),
                                    }}
                                />
                            </Accordion.Header>
                            <Accordion.Content>
                                <SisteInnsendteMeldekort
                                    meldekort={sisteMeldekort.meldekort}
                                    visHelg={kanSendeInnHelgForMeldekort}
                                    finnesNyereMeldeperiode={
                                        sisteMeldekort.meldekort.meldeperiodeId !==
                                        sisteMeldekort.sisteMeldeperiode.meldeperiodeId
                                    }
                                />
                                {meldekortPåKjede.length > 1 && (
                                    <InternLenke
                                        path={getPath(siteRoutePaths.meldekortForKjede, {
                                            //slipper å ha / i url'en mellom periodene.
                                            kjedeId: sisteMeldekort.meldekort.kjedeId.replaceAll(
                                                '/',
                                                '_',
                                            ),
                                        })}
                                        locale={valgtSpråk}
                                    >
                                        <Tekst id={'tidligereMeldekortForPeriode'} />
                                    </InternLenke>
                                )}
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>
                );
            })}

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
