import { Heading } from '@navikt/ds-react';
import { MeldekortUtfylling } from '@typer/meldekort-utfylling';
import { Lenke } from '@components/lenke/Lenke';

import style from './AlleMeldekort.module.css';

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
                <Lenke href={'/'}>{'Tilbake'}</Lenke>
            </div>
            {alleMeldekort.map((meldekort) => (
                <div
                    key={meldekort.id}
                >{`${meldekort.id} // ${meldekort.status} // ${meldekort.periode.fraOgMed}-${meldekort.periode.tilOgMed}`}</div>
            ))}
        </div>
    );
};
