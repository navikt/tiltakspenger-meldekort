import React, { useRef, useState } from 'react';
import style from './Steg1_Fravær.module.css';
import { Alert, HStack, Radio, RadioGroup } from '@navikt/ds-react';
import { Kalender } from '@components/kalender/Kalender.tsx';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Tekst } from '@components/tekst/Tekst';
import { DagerUtfyltTeller } from '@components/fyll-ut/dager-utfylt-teller/DagerUtfyltTeller.tsx';
import { FraværHjelp } from '@components/fyll-ut/steg-1-fravær/hjelp/FraværHjelp.tsx';
import { TekstId } from '@tekster/typer.ts';
import { FraværModal } from '@components/fyll-ut/steg-1-fravær/fravær-modal/FraværModal.tsx';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper.tsx';
import { useRouting } from '@routing/useRouting.ts';
import { getPath, getPathForMeldekortSteg, siteRoutes } from '@common/siteRoutes.ts';
import { dagStatusMedFravær } from '@components/kalender/dag-felles/dagFellesUtils.ts';
import { MeldekortStegButtons } from '@components/fyll-ut/MeldekortStegButtons.tsx';
import { useInitMeldekortSteg } from '@components/fyll-ut/useInitMeldekortSteg.tsx';
import { Meldekort, MeldekortDagStatus } from '@common/typer/MeldekortBruker';

type SSRProps = {
    brukersMeldekort: Meldekort;
};

export const Steg1_Fravær = ({ brukersMeldekort }: SSRProps) => {
    const { navigate } = useRouting();
    const {
        meldekortUtfylling,
        setMeldekortUtfylling,
        setMeldekortSteg,
        harHattFravær,
        setHarHattFravær,
    } = useMeldekortUtfylling();
    const varselRef = useRef<HTMLDivElement>(null);
    const [feil, setFeil] = useState<TekstId | null>(null);

    useInitMeldekortSteg(brukersMeldekort, 'fravær');

    if (!meldekortUtfylling) return;

    return (
        <MeldekortStegWrapper>
            <HStack gap="4">
                <Tekst id="fraværIngress" />
                <RadioGroup
                    legend={<Tekst id={'fraværStegFraværSpørsmål'} />}
                    value={harHattFravær}
                    error={feil && <Tekst id={feil} />}
                    onChange={(harHattFraværSpørsmålSvar: boolean) => {
                        setFeil(null);
                        setHarHattFravær(harHattFraværSpørsmålSvar);
                        if (!harHattFraværSpørsmålSvar) {
                            setMeldekortUtfylling(fjernFravær(meldekortUtfylling));
                        }
                    }}
                    className={style.fraværValg}
                >
                    <Radio value={true}>
                        <Tekst id={'fraværHarHattFraværSvarJa'} />
                    </Radio>
                    <Radio value={false}>
                        <Tekst id={'fraværHarHattFraværSvarNei'} />
                    </Radio>
                </RadioGroup>
            </HStack>

            {harHattFravær && (
                <>
                    <FraværHjelp />
                    <Kalender
                        meldekort={meldekortUtfylling}
                        steg={'fravær'}
                        className={style.kalender}
                    />
                    <DagerUtfyltTeller
                        brukersMeldekort={brukersMeldekort}
                        meldekortUtfylling={meldekortUtfylling}
                        className={style.teller}
                        ref={varselRef}
                    />
                    <FraværModal />
                </>
            )}
            <div className={style.knapperOgVarsel}>
                {feil && feil !== 'fraværSpørsmålIkkeValgt' && (
                    <Alert variant={'error'} className={style.varsel}>
                        <Tekst id={feil} />
                    </Alert>
                )}
                <MeldekortStegButtons
                    onNesteClick={() => {
                        if (harHattFravær === null) {
                            setFeil('fraværSpørsmålIkkeValgt');
                            return false;
                        }

                        setFeil(null);
                        setMeldekortSteg('lønn');
                        navigate(getPathForMeldekortSteg('lønn', meldekortUtfylling.id));
                        return true;
                    }}
                    onForrigeClick={() => {
                        setMeldekortSteg('fravær');
                        navigate(getPath(siteRoutes.forside));
                    }}
                    onAvbrytClick={() => {
                        fjernFravær(meldekortUtfylling);
                        setMeldekortSteg('fravær');
                        navigate(getPath(siteRoutes.forside));
                    }}
                />
            </div>
        </MeldekortStegWrapper>
    );
};

const fjernFravær = (meldekortUtfylling: Meldekort) => ({
    ...meldekortUtfylling,
    dager: meldekortUtfylling.dager.map((dag) => ({
        ...dag,
        status: dagStatusMedFravær.has(dag.status) ? MeldekortDagStatus.IKKE_BESVART : dag.status,
    })),
});
