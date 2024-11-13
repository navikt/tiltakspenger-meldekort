import { Modal, Radio, RadioGroup } from '@navikt/ds-react';
import { MeldekortDag, MeldekortDagStatus } from '@typer/meldekort-utfylling';
import { useEffect, useState } from 'react';
import { Tekst } from '@components/tekst/Tekst';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';

import style from './MeldekortDagModal.module.css';
import { formatterDato } from '@utils/datetime';

type DeltattValg = 'deltatt' | 'ikkeDeltatt';

type Props = {
    dag: MeldekortDag | null;
    setValgtDag: (dag: MeldekortDag | null) => void;
};

export const MeldekortDagModal = ({ dag, setValgtDag }: Props) => {
    const [valg, setValg] = useState<DeltattValg | null>(null);

    useEffect(() => {
        if (dag) {
            console.log(`Opening ${dag.dato}`);
        }
    }, [dag]);

    return (
        <Modal
            open={!!dag}
            onClose={() => {
                console.log(`Closing ${dag?.dato}`);
                setValgtDag(null);
            }}
            header={{
                heading: dag
                    ? formatterDato(dag.dato, true)
                    : '',
            }}
            closeOnBackdropClick={true}
            className={style.modal}
        >
            <Modal.Body>
                <RadioGroup
                    legend={<Tekst id={'meldekortHvaVilDu'} />}
                    onChange={(value: DeltattValg) => {
                        console.log(`Changed: ${value}`);
                        setValg(value);
                    }}
                >
                    <Radio value={'deltatt'}>
                        <Tekst id={'meldekortHarDeltatt'} />
                    </Radio>
                    {valg === 'deltatt' && (
                        <RadioGroup
                            legend={'Valgt deltatt'}
                            hideLegend={true}
                            className={style.underValg}
                        >
                            <Radio value={MeldekortDagStatus.DeltattMedLønn}>{'Med lønn'}</Radio>
                            <Radio value={MeldekortDagStatus.DeltattUtenLønn}>{'Uten lønn'}</Radio>
                        </RadioGroup>
                    )}
                    <Radio value={'ikkeDeltatt'}>
                        <Tekst id={'meldekortHarIkkeDeltatt'} />
                    </Radio>
                    {valg === 'ikkeDeltatt' && (
                        <RadioGroup
                            legend={'Valgt ikke deltatt'}
                            hideLegend={true}
                            className={style.underValg}
                        >
                            <Radio value={MeldekortDagStatus.FraværSyk}>{'Syk'}</Radio>
                            <Radio value={MeldekortDagStatus.FraværSyktBarn}>{'Sykt barn eller syk barnepasser'}</Radio>
                            <Radio value={MeldekortDagStatus.FraværAnnet}>{'Annet godkjent fravær'}</Radio>
                            <Radio value={MeldekortDagStatus.IkkeDeltatt}>{'Annet ikke godkjent fravær'}</Radio>
                        </RadioGroup>
                    )}
                </RadioGroup>
            </Modal.Body>
        </Modal>
    );
};
