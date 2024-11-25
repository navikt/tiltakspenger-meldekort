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
                    legend={<Tekst id={'meldekortHvaVilDu'} />}
                    onChange={(value: MeldekortDagStatus) => {
                        setValgtStatus(value);
                    }}
                >
                    <FraværStatusPanel
                        status={MeldekortDagStatus.FraværSyk}
                        ingressId={'sykIngress'}
                    />
                    <FraværStatusPanel
                        status={MeldekortDagStatus.FraværSyktBarn}
                        ingressId={'syktBarnIngress'}
                    />
                    <FraværStatusPanel
                        status={MeldekortDagStatus.FraværAnnet}
                        ingressId={'annetFraværIngress'}
                    />
                    <FraværStatusPanel
                        status={MeldekortDagStatus.IkkeDeltatt}
                        ingressId={'ikkeDeltattIngress'}
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
                    {'Lagre'}
                </Button>
                <Button
                    variant={'secondary'}
                    onClick={() => {
                        lagreOgLukk(null);
                    }}
                >
                    {valgtStatus ? 'Slett' : 'Avbryt'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
