import { Accordion, BodyShort, Heading } from '@navikt/ds-react';
import { MeldekortUtfylling } from '../../../commonSrc/typer/meldekort-utfylling.ts';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { formatterDato } from '@utils/datetime';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { PageHeader } from '@components/page-header/PageHeader.tsx';
import { Tekst } from '@components/tekst/Tekst.tsx';

import style from './AlleMeldekort.module.css';

type Props = {
    alleMeldekort: MeldekortUtfylling[];
};

export const AlleMeldekort = ({ alleMeldekort }: Props) => {
    return (
        <>
            <PageHeader />
            <div className={style.header}>
                <Heading size={'medium'} level={'2'}>
                    <Tekst id={'alleHeading'} />
                </Heading>
                <InternLenke path={'/'}>
                    <Tekst id={'alleTilbake'} />
                </InternLenke>
            </div>

            {alleMeldekort.map((meldekort) => (
                <Accordion key={meldekort.id}>
                    <Accordion.Item>
                        <Accordion.Header>{`${formatterDato({ dato: meldekort.periode.fraOgMed })} - ${formatterDato({ dato: meldekort.periode.tilOgMed })}`}</Accordion.Header>
                        <Accordion.Content>
                            <BodyShort>
                                {meldekort.innsendt ? (
                                    <Tekst
                                        id={'alleInnsendt'}
                                        resolverProps={{ dato: meldekort.innsendt }}
                                    />
                                ) : (
                                    <Tekst id={'alleIkkeInnsendt'} />
                                )}
                            </BodyShort>
                            <Kalender meldekort={meldekort} steg="innsendt" />
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            ))}
        </>
    );
};
