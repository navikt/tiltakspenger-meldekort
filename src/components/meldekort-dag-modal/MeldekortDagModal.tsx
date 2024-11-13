import { Button, Modal, Radio, RadioGroup } from '@navikt/ds-react';
import {
    MeldekortDagStatus,
    MeldekortDeltattUndervalg,
    MeldekortIkkeDeltattUndervalg,
} from '@typer/meldekort-utfylling';
import { useEffect, useState } from 'react';
import { Tekst } from '@components/tekst/Tekst';
import { formatterDato } from '@utils/datetime';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';

import style from './MeldekortDagModal.module.css';

export const MeldekortDagModal = () => {
    const { valgtMeldekortDag, setValgtMeldekortDag, lagreMeldekortDag } = useMeldekortUtfylling();

    const [valgtStatus, setValgtStatus] = useState<MeldekortDagStatus | null>(
        valgtMeldekortDag?.status || null
    );

    const lukk = () => {
        setValgtMeldekortDag(null);
    };

    useEffect(() => {
        setValgtStatus(valgtMeldekortDag?.status || null);
    }, [valgtMeldekortDag]);

    return (
        <Modal
            open={!!valgtMeldekortDag}
            onClose={lukk}
            header={{
                heading: valgtMeldekortDag ? formatterDato(valgtMeldekortDag.dato, true) : '',
            }}
            closeOnBackdropClick={true}
            className={style.modal}
        >
            <Modal.Body>
                <RadioGroup
                    value={valgtStatus?.deltattValg}
                    legend={<Tekst id={'meldekortHvaVilDu'} />}
                    onChange={(value: MeldekortDagStatus['deltattValg']) => {
                        console.log(`Valgte ${value}`);
                        setValgtStatus({ deltattValg: value });
                    }}
                >
                    <Radio value={'deltatt'}>
                        <Tekst id={'meldekortHarDeltatt'} />
                    </Radio>
                    {valgtStatus?.deltattValg === 'deltatt' && (
                        <RadioGroup
                            value={valgtStatus?.underValg}
                            legend={'Valgt deltatt'}
                            hideLegend={true}
                            className={style.underValg}
                            onChange={(value) => {
                                setValgtStatus({ ...valgtStatus, underValg: value });
                            }}
                        >
                            <Radio value={MeldekortDeltattUndervalg.DeltattMedLønn}>
                                {'Med lønn'}
                            </Radio>
                            <Radio value={MeldekortDeltattUndervalg.DeltattUtenLønn}>
                                {'Uten lønn'}
                            </Radio>
                        </RadioGroup>
                    )}
                    <Radio value={'ikkeDeltatt'}>
                        <Tekst id={'meldekortHarIkkeDeltatt'} />
                    </Radio>
                    {valgtStatus?.deltattValg === 'ikkeDeltatt' && (
                        <RadioGroup
                            value={valgtStatus?.underValg}
                            legend={'Valgt ikke deltatt'}
                            hideLegend={true}
                            className={style.underValg}
                            onChange={(value) => {
                                setValgtStatus({ ...valgtStatus, underValg: value });
                            }}
                        >
                            <Radio value={MeldekortIkkeDeltattUndervalg.FraværSyk}>{'Syk'}</Radio>
                            <Radio value={MeldekortIkkeDeltattUndervalg.FraværSyktBarn}>
                                {'Sykt barn eller syk barnepasser'}
                            </Radio>
                            <Radio value={MeldekortIkkeDeltattUndervalg.FraværAnnet}>
                                {'Annet godkjent fravær'}
                            </Radio>
                            <Radio value={MeldekortIkkeDeltattUndervalg.IkkeDeltatt}>
                                {'Annet ikke godkjent fravær'}
                            </Radio>
                        </RadioGroup>
                    )}
                </RadioGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={!valgtStatus?.underValg}
                    variant={'primary'}
                    onClick={() => {
                        lagreMeldekortDag({
                            ...valgtMeldekortDag!,
                            status: valgtStatus!,
                        });
                        lukk();
                    }}
                >
                    {'Lagre'}
                </Button>
                <Button
                    variant={'secondary'}
                    onClick={() => {
                        lagreMeldekortDag({
                            ...valgtMeldekortDag!,
                            status: { deltattValg: 'ikkeValgt' },
                        });
                        lukk();
                    }}
                >
                    {'Slett'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
