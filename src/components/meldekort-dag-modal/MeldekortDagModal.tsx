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
import { MeldekortDagStatusValg } from '@components/meldekort-dag-modal/status-valg/MeldekortDagStatusValg';

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
                            value={
                                valgtStatus?.underValg || MeldekortDeltattUndervalg.DeltattUtenLønn
                            }
                            legend={'Valgt deltatt'}
                            hideLegend={true}
                            className={style.underValg}
                            onChange={(value) => {
                                setValgtStatus({ ...valgtStatus, underValg: value });
                            }}
                        >
                            <MeldekortDagStatusValg
                                status={MeldekortDeltattUndervalg.DeltattUtenLønn}
                                tittel={'Uten lønn'}
                                ingress={'Du har deltatt på tiltak uten lønn fra tiltaksarrangør'}
                            />
                            <MeldekortDagStatusValg
                                status={MeldekortDeltattUndervalg.DeltattMedLønn}
                                tittel={'Med lønn'}
                                ingress={
                                    'Du har deltatt på tiltak og fått lønn fra tiltaksarrangør'
                                }
                            />
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
                            <MeldekortDagStatusValg
                                status={MeldekortIkkeDeltattUndervalg.FraværSyk}
                                tittel={'Syk'}
                                ingress={'Du har vært syk'}
                            />
                            <MeldekortDagStatusValg
                                status={MeldekortIkkeDeltattUndervalg.FraværSyktBarn}
                                tittel={'Sykt barn'}
                                ingress={'Du har hatt sykt barn eller syk barnepasser'}
                            />
                            <MeldekortDagStatusValg
                                status={MeldekortIkkeDeltattUndervalg.FraværAnnet}
                                tittel={'Annet godkjent fravær'}
                                ingress={'Du har annet fravær som er godkjent av Nav'}
                            />
                            <MeldekortDagStatusValg
                                status={MeldekortIkkeDeltattUndervalg.IkkeDeltatt}
                                tittel={'Annet fravær'}
                                ingress={'Annet fravær som ikke er godkjent av Nav'}
                            />
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
