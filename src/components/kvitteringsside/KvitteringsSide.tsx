import { Alert } from '@navikt/ds-react';
import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { PageHeader } from '@components/page-header/PageHeader.tsx';

import style from './KvitteringsSide.module.css';
import { Tekst } from '@components/tekst/Tekst.tsx';

export const KvitteringsSide = () => {
    return (
        <>
            <PageHeader tekstId={'kvitteringTittel'} />
            <div>
                <Alert variant={'success'} className={style.kvittering}>
                    <TekstSegmenter id={'kvittering'} />
                </Alert>
                <InternLenke path={'/'}>
                    <Tekst id={'kvitteringTilbake'} />
                </InternLenke>
            </div>
        </>
    );
};
