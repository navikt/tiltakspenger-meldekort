import { Modal, Radio, RadioGroup } from '@navikt/ds-react';
import { MeldekortDagStatus } from '@typer/meldekort-utfylling';
import { useEffect, useState } from 'react';
import { Tekst } from '@components/tekst/Tekst';
import { formatterDato } from '@utils/datetime';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';

import style from './MeldekortDagModal.module.css';

type DeltattValg = 'deltatt' | 'ikkeDeltatt';

export const MeldekortDagModal = () => {
    const { valgtMeldekortDag, setValgtMeldekortDag } = useMeldekortUtfylling();

    const [valg, setValg] = useState<DeltattValg | null>(null);

    useEffect(() => {
        if (valgtMeldekortDag) {
            console.log(`Opening ${valgtMeldekortDag.dato}`);
        }
    }, [valgtMeldekortDag]);

    return (
        <Modal
            open={!!valgtMeldekortDag}
            onClose={() => {
                console.log(`Closing ${valgtMeldekortDag?.dato}`);
                setValgtMeldekortDag(null);
            }}
            header={{
                heading: valgtMeldekortDag ? formatterDato(valgtMeldekortDag.dato, true) : '',
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
                            <Radio value={MeldekortDagStatus.FraværSyktBarn}>
                                {'Sykt barn eller syk barnepasser'}
                            </Radio>
                            <Radio value={MeldekortDagStatus.FraværAnnet}>
                                {'Annet godkjent fravær'}
                            </Radio>
                            <Radio value={MeldekortDagStatus.IkkeDeltatt}>
                                {'Annet ikke godkjent fravær'}
                            </Radio>
                        </RadioGroup>
                    )}
                </RadioGroup>
            </Modal.Body>
        </Modal>
    );
};
