import { Checkbox } from '@navikt/ds-react';
import { classNames } from '@utils/classNames.ts';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { formatterDato } from '@utils/datetime';
import { Tekst } from '@components/tekst/Tekst';

import style from './DeltattDagPanel.module.css';
import { MeldekortdagOppsummering } from '@components/kalender/statisk-dag/StatiskDagPanel.tsx';
import { dagStatusMedFravær } from '@components/kalender/dag-felles/dagFellesUtils.ts';
import { MeldekortDag, MeldekortDagStatus } from '@common/typer/MeldekortBruker';
import { useValgtSpråk } from '@context/SpråkvelgerContext.tsx';

type Props = {
    dag: MeldekortDag;
};

export const DeltattDagPanel = ({ dag }: Props) => {
    const { lagreMeldekortDag } = useMeldekortUtfylling();
    const { valgtSpråk } = useValgtSpråk();

    const erValgt = dag.status === MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET;

    const { status } = dag;

    const harHattFravær = dagStatusMedFravær.has(dag.status);
    const harMottattLønn = status === MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET;

    if (harHattFravær || harMottattLønn) return <MeldekortdagOppsummering dag={dag} />;

    return (
        <Checkbox
            onChange={(e) => {
                lagreMeldekortDag({
                    ...dag,
                    status: e.target.checked
                        ? MeldekortDagStatus.DELTATT_UTEN_LØNN_I_TILTAKET
                        : MeldekortDagStatus.IKKE_BESVART,
                });
            }}
            checked={erValgt}
            className={classNames(style.dag, erValgt && style.valgt)}
        >
            <Tekst id={'deltattDagPrefix'} />
            {formatterDato({ dato: dag.dag, medUkeDag: true, locale: valgtSpråk })}
        </Checkbox>
    );
};
