import { Radio } from '@navikt/ds-react';
import { classNames } from '@utils/classNames.ts';

import { statusTilTekstId } from '@components/kalender/dag-felles/dagFellesUtils';
import { TekstSegmenter } from '@components/tekst/TekstSegmenter.tsx';
import { TekstId } from '@tekster/typer.ts';

import style from './FraværStatusPanel.module.css';
import { MeldekortDagStatus } from '@common/typer/MeldekortBruker';
import { useValgtSpråk } from '@context/SpråkvelgerContext.tsx';

type Props = {
    status: MeldekortDagStatus;
    valgtStatus: MeldekortDagStatus | null;
    ingressId: TekstId;
};

export const FraværStatusPanel = ({ status, ingressId }: Props) => {
    const { valgtSpråk } = useValgtSpråk();
    return (
        <Radio value={status} className={classNames(style.valg)}>
            <TekstSegmenter id={statusTilTekstId[status]} weight={'semibold'} locale={valgtSpråk} />
            <TekstSegmenter id={ingressId} className={style.ingress} locale={valgtSpråk} />
        </Radio>
    );
};
