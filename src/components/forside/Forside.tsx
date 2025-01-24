import { Alert } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { TilUtfylling } from '@components/forside/til-utfylling/TilUtfylling';
import { Lenke } from '@components/lenke/Lenke';
import { TekstParagrafer } from '@components/tekst/TekstParagrafer';

import style from './Forside.module.css';

type Props = {
    nesteMeldekortId?: string;
};

export const Forside = ({ nesteMeldekortId }: Props) => {
    return (
        <>
            <TekstParagrafer id={'forsideIngress'} spacing={true} />
            <TekstParagrafer id={'forsideTakk'} weight={'semibold'} size={'large'} />
            <TekstParagrafer id={'forsideOpplysninger'} spacing={true} />
            {nesteMeldekortId ? (
                <TilUtfylling nesteMeldekortId={nesteMeldekortId} />
            ) : (
                <>
                    <Alert
                        variant={'info'}
                        contentMaxWidth={false}
                        className={style.ingenMeldekort}
                    >
                        <Tekst id={'forsideIngenMeldekort'} />
                    </Alert>
                </>
            )}
            <Lenke href={'/alle'} className={style.tidligere}>
                <Tekst id={'forsideSeOgEndre'} />
            </Lenke>
        </>
    );
};
