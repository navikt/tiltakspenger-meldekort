import { useRef, useState } from 'react';
import style from './Steg1_Fravær.module.css';
import { Alert, HStack, Radio, RadioGroup } from '@navikt/ds-react';
import { Kalender } from '@components/kalender/Kalender';
import { useMeldekortUtfylling } from '@context/meldekort-utfylling/useMeldekortUtfylling';
import { Tekst } from '@components/tekst/Tekst';
import { DagerUtfyltTeller } from '@components/fyll-ut/dager-utfylt-teller/DagerUtfyltTeller';
import { FraværHjelp } from '@components/fyll-ut/steg-1-fravær/hjelp/FraværHjelp';
import { TekstId } from '@tekster/typer';
import { FraværModal } from '@components/fyll-ut/steg-1-fravær/fravær-modal/FraværModal';
import { MeldekortStegWrapper } from '@components/fyll-ut/MeldekortStegWrapper';
import { useRouting } from '@routing/useRouting';
import { getPath, getPathForMeldekortSteg, siteRoutePaths } from '@meldekort/common/siteRoutePaths';
import { dagStatusMedFravær } from '@components/kalender/meldekortDagUtils';
import { MeldekortStegButtons } from '@components/fyll-ut/MeldekortStegButtons';
import { useInitMeldekortSteg } from '@components/fyll-ut/useInitMeldekortSteg';
import { Meldekort, MeldekortDagStatus } from '@meldekort/common/typer/MeldekortBruker';

type SSRProps = {
    brukersMeldekort: Meldekort;
    kanFylleUtHelg: boolean;
};

export const Steg1_Fravær = ({ brukersMeldekort, kanFylleUtHelg }: SSRProps) => {
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

    if (!meldekortUtfylling) {
        return null;
    }

    return (
        <MeldekortStegWrapper>
            <HStack gap="space-16">
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
                    <Radio value={false}>
                        <Tekst id={'fraværHarHattFraværSvarNei'} />
                    </Radio>
                    <Radio value={true}>
                        <Tekst id={'fraværHarHattFraværSvarJa'} />
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
                        kanFylleUtHelg={kanFylleUtHelg}
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
                        navigate(getPath(siteRoutePaths.forside));
                    }}
                    onAvbrytClick={() => {
                        fjernFravær(meldekortUtfylling);
                        setMeldekortSteg('fravær');
                        navigate(getPath(siteRoutePaths.forside));
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
