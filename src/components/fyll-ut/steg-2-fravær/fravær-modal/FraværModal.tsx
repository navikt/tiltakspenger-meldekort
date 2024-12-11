import { Button, Modal, RadioGroup } from '@navikt/ds-react';
import { MeldekortDagStatus } from '@typer/meldekort-utfylling';
import { useEffect, useState } from 'react';
import { Tekst } from '@components/tekst/Tekst';
import { formatterDato } from '@utils/datetime';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { FraværStatusPanel } from '@components/fyll-ut/steg-2-fravær/fravær-modal/status/FraværStatusPanel';

import style from './FraværModal.module.css';

export const FraværModal = () => {
    const { valgtMeldekortDag, setValgtMeldekortDag, lagreMeldekortDag } = useMeldekortUtfylling();

    const initiellStatus = valgtMeldekortDag?.status || MeldekortDagStatus.IkkeRegistrert;

    const [valgtStatus, setValgtStatus] = useState<MeldekortDagStatus>(initiellStatus);

    const lukk = () => {
        setValgtMeldekortDag(null);
    };

    const lagreOgLukk = (status: MeldekortDagStatus) => {
        if (valgtMeldekortDag) {
            lagreMeldekortDag({
                ...valgtMeldekortDag,
                status,
            });
        }
        lukk();
    };

    useEffect(() => {
        setValgtStatus(initiellStatus);
    }, [valgtMeldekortDag, initiellStatus]);

    return (
        <Modal
            open={!!valgtMeldekortDag}
            onClose={lukk}
            header={{
                heading: valgtMeldekortDag
                    ? formatterDato({ dato: valgtMeldekortDag.dato, medUkeDag: true })
                    : '',
            }}
            closeOnBackdropClick={true}
            className={style.modal}
        >
            <Modal.Body>
                <RadioGroup
                    value={valgtStatus}
                    legend={<Tekst id={'fraværModalHeader'} />}
                    onChange={(value: MeldekortDagStatus) => {
                        setValgtStatus(value);
                    }}
                >
                    <FraværStatusPanel
                        status={MeldekortDagStatus.FraværSyk}
                        ingressId={'fraværModalSykIngress'}
                        valgtStatus={valgtStatus}
                    />
                    <FraværStatusPanel
                        status={MeldekortDagStatus.FraværSyktBarn}
                        ingressId={'fraværModalSyktBarnIngress'}
                        valgtStatus={valgtStatus}
                    />
                    <FraværStatusPanel
                        status={MeldekortDagStatus.FraværAnnet}
                        ingressId={'fraværModalAnnetGodkjentIngress'}
                        valgtStatus={valgtStatus}
                    />
                    <FraværStatusPanel
                        status={MeldekortDagStatus.IkkeDeltatt}
                        ingressId={'fraværModalIkkeGodkjentIngress'}
                        valgtStatus={valgtStatus}
                    />
                </RadioGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={!valgtStatus}
                    variant={'primary'}
                    onClick={() => {
                        lagreOgLukk(valgtStatus);
                    }}
                >
                    <Tekst id={'lagre'} />
                </Button>
                <Button
                    variant={'secondary'}
                    onClick={() => {
                        lagreOgLukk(MeldekortDagStatus.IkkeRegistrert);
                    }}
                >
                    <Tekst id={valgtStatus ? 'slett' : 'avbryt'} />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
