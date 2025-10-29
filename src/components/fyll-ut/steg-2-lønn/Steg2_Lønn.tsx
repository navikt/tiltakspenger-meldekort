import React, { useRef, useState } from 'react';
import style from './Steg2_Lønn.module.css';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper.tsx';
import { Alert, HStack, Radio, RadioGroup, ReadMore } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { TekstId } from '@tekster/typer.ts';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { DagerUtfyltTeller } from '@components/fyll-ut/dager-utfylt-teller/DagerUtfyltTeller.tsx';
import { getPath, getPathForMeldekortSteg, siteRoutes } from '@common/siteRoutes.ts';
import { useRouting } from '@routing/useRouting';
import { MeldekortStegButtons } from '@components/fyll-ut/MeldekortStegButtons.tsx';
import { useInitMeldekortSteg } from '@components/fyll-ut/useInitMeldekortSteg.tsx';
import { getTekst, getTekster } from '@tekster/tekster.ts';
import { Meldekort, MeldekortDagStatus } from '@common/typer/MeldekortBruker';
import { TekstMedLenke } from '@components/lenke/TekstMedLenke.tsx';

type SSRProps = {
    brukersMeldekort: Meldekort;
    kanFylleUtHelg: boolean;
};

export const Steg2_Lønn = ({ brukersMeldekort, kanFylleUtHelg }: SSRProps) => {
    const { navigate } = useRouting();
    const {
        meldekortUtfylling,
        setMeldekortUtfylling,
        setMeldekortSteg,
        harMottattLønn,
        setHarMottattLønn,
    } = useMeldekortUtfylling();
    const [feil, setFeil] = useState<TekstId | null>(null);
    const varselRef = useRef<HTMLDivElement>(null);

    useInitMeldekortSteg(brukersMeldekort, 'lønn');

    if (!meldekortUtfylling) return;

    return (
        <MeldekortStegWrapper>
            <HStack gap="4">
                <div>
                    <Tekst id={'lønnIngress'} />
                </div>
                <RadioGroup
                    legend={<Tekst id={'lønnHarMottattLønnSpørsmål'} />}
                    value={harMottattLønn}
                    error={feil && <Tekst id={feil} />}
                    onChange={(harMottattLønnSpørsmålSvar: boolean) => {
                        setFeil(null);
                        setHarMottattLønn(harMottattLønnSpørsmålSvar);
                        if (harMottattLønnSpørsmålSvar === false) {
                            setMeldekortUtfylling(fjernLønn(meldekortUtfylling));
                        }
                    }}
                    className={style.lønnValg}
                >
                    <Radio value={false}>
                        <Tekst id={'lønnHarMottattLønnSvarNei'} />
                    </Radio>
                    <Radio value={true}>
                        <Tekst id={'lønnHarMottattLønnSvarJa'} />
                    </Radio>
                </RadioGroup>
            </HStack>
            {harMottattLønn && (
                <>
                    <Kalender
                        meldekort={meldekortUtfylling}
                        steg={'lønn'}
                        className={style.kalender}
                        kanFylleUtHelg={kanFylleUtHelg}
                    />
                    <DagerUtfyltTeller
                        brukersMeldekort={brukersMeldekort}
                        meldekortUtfylling={meldekortUtfylling}
                        className={style.teller}
                        ref={varselRef}
                    />
                </>
            )}
            <div className={style.knapperOgVarsel}>
                {feil && (
                    <Alert variant={'error'} className={style.varsel}>
                        <Tekst id={feil} />
                    </Alert>
                )}
                <MeldekortStegButtons
                    onNesteClick={() => {
                        if (harMottattLønn === null) {
                            setFeil('lønnSpørsmålIkkeValgt');
                            return false;
                        }

                        setFeil(null);
                        setMeldekortSteg('deltatt');
                        navigate(getPathForMeldekortSteg('deltatt', meldekortUtfylling.id));
                        return true;
                    }}
                    onForrigeClick={() => {
                        setMeldekortSteg('fravær');
                        navigate(getPathForMeldekortSteg('fravær', meldekortUtfylling.id));
                    }}
                    onAvbrytClick={() => {
                        setMeldekortSteg('fravær');
                        navigate(getPath(siteRoutes.forside));
                    }}
                />
            </div>
        </MeldekortStegWrapper>
    );
};

const fjernLønn = (meldekortUtfylling: Meldekort) => ({
    ...meldekortUtfylling,
    dager: meldekortUtfylling.dager.map((dag) => ({
        ...dag,
        status:
            dag.status === MeldekortDagStatus.DELTATT_MED_LØNN_I_TILTAKET
                ? MeldekortDagStatus.IKKE_BESVART
                : dag.status,
    })),
});
