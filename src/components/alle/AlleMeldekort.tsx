import { Accordion, BodyShort, Heading } from '@navikt/ds-react';
import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling.ts';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { formatterDato, formatterDatoTid } from '@utils/datetime';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Tekst } from '@components/tekst/Tekst.tsx';

import style from './AlleMeldekort.module.css';
import { useEffect } from 'react';
import { getPath, siteRoutes } from '@common/siteRoutes.ts';

type Props = {
    alleMeldekort: MeldekortUtfylling[];
};

export const AlleMeldekort = ({ alleMeldekort }: Props) => {
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

            {alleMeldekort.map((meldekort) => (
                <Accordion key={meldekort.id}>
                    <Accordion.Item>
                        <Accordion.Header>
                            <Tekst
                                id={'allePerMeldekortOverskrift'}
                                resolverProps={{
                                    uke1: meldekort.uke1,
                                    uke2: meldekort.uke2,
                                    fraOgMed: formatterDato({ dato: meldekort.periode.fraOgMed }),
                                    tilOgMed: formatterDato({ dato: meldekort.periode.tilOgMed }),
                                }}
                            />
                        </Accordion.Header>
                        <Accordion.Content>
                            <BodyShort>
                                {meldekort.innsendt ? (
                                    <Tekst
                                        id={'alleInnsendt'}
                                        resolverProps={{
                                            dato: formatterDatoTid(meldekort.innsendt),
                                        }}
                                    />
                                ) : (
                                    <Tekst id={'alleIkkeInnsendt'} />
                                )}
                            </BodyShort>
                            <Kalender meldekort={meldekort} steg="kvittering" />
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            ))}
        </>
    );
};
