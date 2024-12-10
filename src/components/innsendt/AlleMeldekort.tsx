import { Heading } from '@navikt/ds-react';
import { MeldekortUtfylling } from '@typer/meldekort-utfylling';

type Props = {
    alleMeldekort: MeldekortUtfylling[];
};

export const AlleMeldekort = ({ alleMeldekort }: Props) => {
    return (
        <div>
            <Heading size={'medium'} level={'2'}>
                {'Her er alle meldekortene dine'}
            </Heading>
            {alleMeldekort.map((meldekort) => (
                <div
                    key={meldekort.id}
                >{`${meldekort.id} // ${meldekort.status} // ${meldekort.periode.fraOgMed}-${meldekort.periode.tilOgMed}`}</div>
            ))}
        </div>
    );
};
