import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import style from '@components/fyll-ut/steg-2-fravær/Steg2_Fravær.module.css';
import { Alert, Button, Checkbox } from '@navikt/ds-react';
import { useState } from 'react';
import { Tekst } from '@components/tekst/Tekst';
import { MeldekortDagStatus } from '@typer/meldekort-utfylling';
import { Kalender } from '@components/fyll-ut/kalender/Kalender';
import { tilMeldekortInnsending } from '@utils/transformMeldekort';

export const Steg3_Bekreft = () => {
    const [harBekreftet, setHarBekreftet] = useState(false);

    const { setMeldekortSteg, meldekortUtfylling } = useMeldekortUtfylling();

    // TODO: redirect til forsiden el. hvis ingen meldekortUtfylling finnes
    if (!meldekortUtfylling) {
        return <div>{'Åh nei, fant ingen meldekort!'}</div>;
    }

    const harFravær = meldekortUtfylling?.meldekortDager.some(
        (dag) => dag.status && dag.status !== MeldekortDagStatus.Deltatt
    );

    return (
        <>
            <Alert variant={'warning'}>
                <Tekst id={'bekreftStegIkkeSendtEnnå'} />
            </Alert>
            <Kalender meldekort={meldekortUtfylling} steg={'bekreft'} />
            <Checkbox onChange={() => setHarBekreftet(!harBekreftet)}>
                <Tekst id={'bekreftStegCheckbox'} />
            </Checkbox>
            <div className={style.knapper}>
                <Button
                    onClick={() => {
                        setMeldekortSteg(harFravær ? 'fravær' : 'deltatt');
                    }}
                >
                    <Tekst id={'forrige'} />
                </Button>
                <Button
                    disabled={!harBekreftet}
                    onClick={() => {
                        fetch(`/tiltakspenger/meldekort/api/send-inn`, {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'content-type': 'application/json',
                            },
                            body: JSON.stringify(tilMeldekortInnsending(meldekortUtfylling)),
                        }).then((res) => {
                            if (res.ok) {
                                window.location.assign(
                                    `/tiltakspenger/meldekort/${meldekortUtfylling!.id}/kvittering`
                                );
                            } else {
                                window.alert(`Innsending feilet med feilkode ${res.status}`);
                            }
                        });
                    }}
                >
                    <Tekst id={'sendInn'} />
                </Button>
            </div>
        </>
    );
};
