import { Button, Modal, RadioGroup } from '@navikt/ds-react';
import { MeldekortDagStatus } from '@typer/meldekort-utfylling';
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
                    value={valgtStatus}
                    legend={<Tekst id={'meldekortHvaVilDu'} />}
                    onChange={(value: MeldekortDagStatus) => {
                        console.log(`Valgte ${value}`);
                        setValgtStatus(value);
                    }}
                >
                    <MeldekortDagStatusValg
                        valg={MeldekortDagStatus.Deltatt}
                        tittel="Har deltatt på tiltak"
                        ingress="Du har deltatt på tiltaket ditt som normalt"
                    />
                    <MeldekortDagStatusValg
                        valg={MeldekortDagStatus.FraværSyk}
                        tittel={'Syk'}
                        ingress={'Du har vært syk'}
                    />
                    <MeldekortDagStatusValg
                        valg={MeldekortDagStatus.FraværSyktBarn}
                        tittel={'Sykt barn'}
                        ingress={'Du har hatt sykt barn eller syk barnepasser'}
                    />
                    <MeldekortDagStatusValg
                        valg={MeldekortDagStatus.FraværAnnet}
                        tittel={'Annet godkjent fravær'}
                        ingress={'Du har annet fravær som er godkjent av Nav'}
                    />
                    <MeldekortDagStatusValg
                        valg={MeldekortDagStatus.IkkeDeltatt}
                        tittel={'Annet fravær'}
                        ingress={'Annet fravær som ikke er godkjent av Nav'}
                    />
                </RadioGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={!valgtStatus}
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
                            status: null,
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
