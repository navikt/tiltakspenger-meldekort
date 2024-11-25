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

    const [valgtStatus, setValgtStatus] = useState<MeldekortDagStatus | null>(
        valgtMeldekortDag?.status || null
    );

    const lukk = () => {
        setValgtMeldekortDag(null);
    };

    const lagreOgLukk = (status: MeldekortDagStatus | null) => {
        lagreMeldekortDag({
            ...valgtMeldekortDag!,
            status,
        });
        lukk();
    };

    useEffect(() => {
        setValgtStatus(valgtMeldekortDag?.status || null);
    }, [valgtMeldekortDag]);

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
                        lagreOgLukk(null);
                    }}
                >
                    <Tekst id={valgtStatus ? 'slett' : 'avbryt'} />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
