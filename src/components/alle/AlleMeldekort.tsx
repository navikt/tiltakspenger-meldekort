import { Accordion, BodyShort, Heading } from '@navikt/ds-react';
import { MeldekortUtfylling } from '@typer/meldekort-utfylling';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { formatterDato } from '@utils/datetime';
import { Kalender } from '@components/fyll-ut/kalender/Kalender';

import style from './AlleMeldekort.module.css';
import { Fragment } from 'react';

type Props = {
    alleMeldekort: MeldekortUtfylling[];
};

export const AlleMeldekort = ({ alleMeldekort }: Props) => {
    return (
        <div>
            <div className={style.header}>
                <Heading size={'medium'} level={'2'}>
                    {'Her er alle meldekortene dine'}
                </Heading>
                <InternLenke path={'/'}>{'Tilbake'}</InternLenke>
            </div>

            {alleMeldekort.map((meldekort) => (
                <Fragment key={meldekort.id}>
                    <Accordion>
                        <Accordion.Item>
                            <Accordion.Header>{`${formatterDato({ dato: meldekort.periode.fraOgMed })}-${formatterDato({ dato: meldekort.periode.tilOgMed })}`}</Accordion.Header>
                            <Accordion.Content>
                                <BodyShort>Innsendt av bruker </BodyShort>
                                <Kalender meldekort={meldekort} steg="innsendt" />
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>
                </Fragment>
            ))}
        </div>
    );
};
