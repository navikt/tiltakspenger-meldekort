import { Button, Dialog, RadioGroup } from '@navikt/ds-react';

import { useEffect, useState } from 'react';
import { Tekst } from '@components/tekst/Tekst';
import { formatterDato } from '@utils/datetime';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { FraværStatusPanel } from '@components/fyll-ut/steg-1-fravær/fravær-modal/status/FraværStatusPanel';

import { MeldekortDagStatus } from '@meldekort/common/typer/MeldekortBruker';

import { useSpråk } from '@context/språk/useSpråk';

export const FraværModal = () => {
    const { valgtMeldekortDag, setValgtMeldekortDag, lagreMeldekortDag } = useMeldekortUtfylling();
    const { valgtSpråk } = useSpråk();

    const initiellStatus = valgtMeldekortDag?.status || MeldekortDagStatus.IKKE_BESVART;

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
        if (!valgtMeldekortDag) return;

        // Det er trygt å oppdatere state her fordi effekten kun trigges når valgtMeldekortDag endres, ikke for hver render
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValgtStatus(valgtMeldekortDag.status || MeldekortDagStatus.IKKE_BESVART);
    }, [valgtMeldekortDag]);

    return (
        <Dialog
            open={!!valgtMeldekortDag}
            onOpenChange={(open) => {
                if (!open) lukk();
            }}
        >
            <Dialog.Popup width={'small'}>
                <Dialog.Header>
                    <Dialog.Title>
                        {valgtMeldekortDag
                            ? formatterDato({
                                  dato: valgtMeldekortDag.dag,
                                  medUkeDag: true,
                                  locale: valgtSpråk,
                              })
                            : ''}
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <RadioGroup
                        value={valgtStatus}
                        legend={<Tekst id={'fraværModalHeader'} />}
                        onChange={(value: MeldekortDagStatus) => {
                            setValgtStatus(value);
                        }}
                    >
                        <FraværStatusPanel
                            status={MeldekortDagStatus.FRAVÆR_SYK}
                            ingressId={'fraværModalSykIngress'}
                            valgtStatus={valgtStatus}
                        />
                        <FraværStatusPanel
                            status={MeldekortDagStatus.FRAVÆR_SYKT_BARN}
                            ingressId={'fraværModalSyktBarnIngress'}
                            valgtStatus={valgtStatus}
                        />
                        <FraværStatusPanel
                            status={
                                MeldekortDagStatus.FRAVÆR_STERKE_VELFERDSGRUNNER_ELLER_JOBBINTERVJU
                            }
                            ingressId={'fraværModalSterkeVelferdsgrunnerEllerJobbintervjuIngress'}
                            valgtStatus={valgtStatus}
                        />
                        <FraværStatusPanel
                            status={MeldekortDagStatus.FRAVÆR_ANNET}
                            ingressId={'fraværModalIkkeGodkjentIngress'}
                            valgtStatus={valgtStatus}
                        />
                    </RadioGroup>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button
                        variant={'secondary'}
                        onClick={() => lagreOgLukk(MeldekortDagStatus.IKKE_BESVART)}
                    >
                        <Tekst
                            id={
                                valgtStatus === MeldekortDagStatus.IKKE_BESVART
                                    ? 'avbryt'
                                    : 'nullstill'
                            }
                        />
                    </Button>
                    <Button variant={'primary'} onClick={() => lagreOgLukk(valgtStatus)}>
                        <Tekst id={'lagre'} />
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
