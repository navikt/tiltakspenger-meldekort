import { Button, Checkbox } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { useEffect, useState } from 'react';
import { Lenke } from '@components/lenke/Lenke';
import classNames from 'classnames';

import style from './TilUtfylling.module.css';

type Props = {
    nesteMeldekortId: string;
};

export const TilUtfylling = ({ nesteMeldekortId }: Props) => {
    const [harBekreftet, setHarBekreftet] = useState(false);

    useEffect(() => {
        setHarBekreftet(false);
    }, [])

    return (
        <>
            <Checkbox onChange={() => setHarBekreftet(!harBekreftet)}>
                <Tekst id={'forsideBekrefter'} />
            </Checkbox>
            <Button
                className={classNames(style.knapp)}
                variant={harBekreftet ? 'primary' : 'primary-neutral'}
                as={Lenke}
                disabled={!harBekreftet}
                href={`/[meldekortId]/fyll-ut?meldekortId=${nesteMeldekortId}`}
            >
                <Tekst id={'neste'} />
            </Button>
        </>
    );
};
