import { ReadMore } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';

export const FyllUtHjelp = () => {
    return <ReadMore header={<Tekst id={'fyllUtLesMerHeader'} />}>{'Blah blah'}</ReadMore>;
};
