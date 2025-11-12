import { Accordion, BodyLong, Heading, Link } from '@navikt/ds-react';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { formatterDato } from '@utils/datetime';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { InnsendteMeldekortProps } from '@common/typer/alle-meldekort.ts';
import { useEffect } from 'react';
import { getPath, siteRoutes } from '@common/siteRoutes.ts';
import { appConfig } from '@common/appConfig.ts';
import { ArenaMeldekortStatus } from '@common/typer/meldekort-bruker.ts';
import { Meldekort } from '@common/typer/MeldekortBruker';
import { SisteInnsendteMeldekort } from '@components/innsendte/siste-innsendte/SisteInnsendteMeldekort.tsx';

import style from './InnsendteMeldekort.module.css';

type Props = InnsendteMeldekortProps;

export const InnsendteMeldekort = ({
    meldekort: meldekortListe,
    arenaMeldekortStatus,
    kanSendeInnHelgForMeldekort,
}: Props) => {
    useEffect(() => {
        scrollTo(0, 0);
    }, []);

    const meldekortGruppertPåKjede = Object.values(
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
                <InternLenke path={getPath(siteRoutes.forside)}>
                    <Tekst id={'innsendteTilbake'} />
                </InternLenke>
            </div>

            {meldekortGruppertPåKjede.map((meldekortPåKjede) => {
                const sisteMeldekort = meldekortPåKjede[0];

                return (
                    <Accordion key={sisteMeldekort.id}>
                        <Accordion.Item>
                            <Accordion.Header>
                                <Tekst
                                    id={'innsendtMeldekortAccordionHeader'}
                                    resolverProps={{
                                        uke1: sisteMeldekort.uke1,
                                        uke2: sisteMeldekort.uke2,
                                        fraOgMed: formatterDato({ dato: sisteMeldekort.fraOgMed }),
                                        tilOgMed: formatterDato({ dato: sisteMeldekort.tilOgMed }),
                                    }}
                                />
                            </Accordion.Header>
                            <Accordion.Content>
                                <SisteInnsendteMeldekort
                                    meldekort={sisteMeldekort}
                                    visHelg={kanSendeInnHelgForMeldekort}
                                />
                                {meldekortPåKjede.length > 1 && (
                                    <InternLenke
                                        path={getPath(siteRoutes.meldekortForKjede, {
                                            //slipper å ha / i url'en mellom periodene.
                                            kjedeId: sisteMeldekort.kjedeId.replaceAll('/', '_'),
                                        })}
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
