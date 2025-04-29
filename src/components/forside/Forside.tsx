import { Alert } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { TilUtfylling } from '@components/forside/til-utfylling/TilUtfylling';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { MeldekortUtfylling } from '@common/typer/meldekort-utfylling.ts';
import { SisteMeldekortStatus } from '@components/forside/siste-meldekort-status/SisteMeldekortStatus';
import { PageHeader } from '@components/page-header/PageHeader.tsx';

import style from './Forside.module.css';
import { getPath, siteRoutes } from '@common/siteRoutes.ts';

type Props = {
    meldekort?: MeldekortUtfylling;
};

export const Forside = ({ meldekort }: Props) => {
    return (
        <>
            <PageHeader tekstId={'sideTittel'} />
            {meldekort ? (
                <>
                    <TekstSegmenter id={'forsideIngress'} spacing={true} />
                    {meldekort.innsendt ? (
                        <SisteMeldekortStatus meldekort={meldekort} />
                    ) : (
                        <TilUtfylling nesteMeldekortId={meldekort.id} />
                    )}
                    <InternLenke path={getPath(siteRoutes.alle)} className={style.tidligere}>
                        <Tekst id={'forsideSeOgEndre'} />
                    </InternLenke>
                </>
            ) : (
                <Alert variant={'info'} contentMaxWidth={false}>
                    <Tekst id={'forsideIkkeTiltakspenger'} />
                </Alert>
            )}
        </>
    );
};
