import { Alert } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { TilUtfylling } from '@components/forside/til-utfylling/TilUtfylling';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { TekstParagrafer } from '@components/tekst/TekstParagrafer';
import { MeldekortUtfylling } from '@typer/meldekort-utfylling.ts';
import { SisteMeldekortStatus } from '@components/forside/siste-meldekort-status/SisteMeldekortStatus';

import style from './Forside.module.css';

type Props = {
    meldekort?: MeldekortUtfylling;
};

export const Forside = ({ meldekort }: Props) => {
    if (!meldekort) {
        return (
            <Alert variant={'info'} contentMaxWidth={false}>
                {'Denne brukeren har ingen meldekort for tiltakspenger'}
            </Alert>
        );
    }

    return (
        <>
            <TekstParagrafer id={'forsideIngress'} spacing={true} />
            {meldekort.innsendt ? (
                <SisteMeldekortStatus meldekort={meldekort} />
            ) : (
                <TilUtfylling nesteMeldekortId={meldekort.id} />
            )}
            <InternLenke path={'/alle'} className={style.tidligere}>
                <Tekst id={'forsideSeOgEndre'} />
            </InternLenke>
        </>
    );
};
