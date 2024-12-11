import { Heading, Table } from '@navikt/ds-react';
import { MeldekortUtfylling } from '@typer/meldekort-utfylling';
import { Lenke } from '@components/lenke/Lenke';
import { formatterDato } from '@utils/datetime';

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
            <Table>
                <Table.Header>
                    <Table.HeaderCell>{'Id'}</Table.HeaderCell>
                    <Table.HeaderCell>{'Status'}</Table.HeaderCell>
                    <Table.HeaderCell>{'Fra'}</Table.HeaderCell>
                    <Table.HeaderCell>{'Til'}</Table.HeaderCell>
                </Table.Header>
                {alleMeldekort.map((meldekort) => (
                    <Table.Row key={meldekort.id}>
                        <Table.DataCell>{meldekort.id}</Table.DataCell>
                        <Table.DataCell>{meldekort.status}</Table.DataCell>
                        <Table.DataCell>
                            {formatterDato({ dato: meldekort.periode.fraOgMed })}
                        </Table.DataCell>
                        <Table.DataCell>
                            {formatterDato({ dato: meldekort.periode.tilOgMed })}
                        </Table.DataCell>
                    </Table.Row>
                ))}
            </Table>
        </div>
    );
};
