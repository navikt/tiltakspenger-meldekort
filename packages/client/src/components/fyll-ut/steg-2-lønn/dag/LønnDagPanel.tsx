import { Checkbox } from '@navikt/ds-react';
import { classNames } from '@utils/classNames';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { formatterDato } from '@utils/datetime';
import { Tekst } from '@components/tekst/Tekst';

import style from './LønnDagPanel.module.css';
import { MeldekortdagOppsummering } from '@components/kalender/statisk-dag/StatiskDagPanel';
import { dagStatusMedFravær } from '@components/kalender/meldekortDagUtils';
import { MeldekortDag, MeldekortDagStatus } from '@meldekort/common/typer/MeldekortBruker';

import { useSpråk } from '@context/språk/useSpråk';

type Props = {
    dag: MeldekortDag;
};

export const LønnDagPanel = ({ dag }: Props) => {
    const { lagreMeldekortDag } = useMeldekortUtfylling();
    const { valgtSpråk } = useSpråk();

    const erValgt = dag.status === MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET;
    const harHattFravær = dagStatusMedFravær.has(dag.status);
    const harDeltatt = dag.status === MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET;

    if (harHattFravær || harDeltatt) {
        return <MeldekortdagOppsummering dag={dag} />;
    }

    return (
        <Checkbox
            onChange={(e) => {
                lagreMeldekortDag({
                    ...dag,
                    status: e.target.checked
                        ? MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET
                        : MeldekortDagStatus.IKKE_BESVART,
                });
            }}
            checked={erValgt}
            className={classNames(style.dag, erValgt && style.valgtLønn)}
        >
            <Tekst id={'lønnDagPrefix'} />
            {formatterDato({ dato: dag.dag, medUkeDag: true, locale: valgtSpråk })}
        </Checkbox>
    );
};
