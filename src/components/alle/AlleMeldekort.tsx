import { Accordion, BodyShort, Heading } from '@navikt/ds-react';
import { MeldekortUtfylling } from '@typer/meldekort-utfylling.ts';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { formatterDato } from '@utils/datetime';
import { Kalender } from '@components/fyll-ut/kalender/Kalender';
import { PageHeader } from '@components/page-header/PageHeader.tsx';

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
                    {'Her er alle meldekortene dine'}
                </Heading>
                <InternLenke path={'/'}>{'Tilbake'}</InternLenke>
            </div>

            {alleMeldekort.map((meldekort) => (
                <Accordion key={meldekort.id}>
                    <Accordion.Item>
                        <Accordion.Header>{`${formatterDato({ dato: meldekort.periode.fraOgMed })} - ${formatterDato({ dato: meldekort.periode.tilOgMed })}`}</Accordion.Header>
                        <Accordion.Content>
                            <BodyShort>{meldekort.innsendt ? 'Innsendt' : 'Ikke innsendt'}</BodyShort>
                            <Kalender meldekort={meldekort} steg="innsendt" />
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            ))}
        </>
    );
};
