import React, { useCallback, useState } from 'react';
import { MeldekortUtfyllingContext } from '@context/meldekort-utfylling/MeldekortUtfyllingContext';
import { MeldekortSteg, STEG_REKKEFOLGE } from '@meldekort/common/typer/BrukersMeldekortUtfylling';
import { formatterDato } from '@utils/datetime.ts';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { getPath, siteRoutePaths } from '@meldekort/common/siteRoutePaths';
import { Meldekort, MeldekortDag, MeldekortStatus } from '@meldekort/common/typer/MeldekortBruker';
import { useRouting } from '@routing/useRouting.ts';
import { useSpråk } from '@context/språk/useSpråk.ts';

type Props = {
    children: React.ReactNode;
};

export const MeldekortUtfyllingProvider = ({ children }: Props) => {
    const { navigate } = useRouting();

    const [meldekortUtfylling, setMeldekortUtfylling] = useState<Meldekort | undefined>(undefined);
    const [valgtMeldekortDag, setValgtMeldekortDag] = useState<MeldekortDag | null>(null);
    const [meldekortSteg, setMeldekortSteg] = useState<MeldekortSteg>(STEG_REKKEFOLGE[0]);
    const [harHattFravær, setHarHattFravær] = useState<boolean | null>(null);
    const [harMottattLønn, setHarMottattLønn] = useState<boolean | null>(null);
    const [visValideringsfeil, setVisValideringsfeil] = useState<boolean | null>(null);
    const { valgtSpråk } = useSpråk();

    const lagreMeldekortDag = useCallback(
        (dag: MeldekortDag) => {
            if (!meldekortUtfylling) {
                return;
            }

            const meldekortDagerUpdated = [...meldekortUtfylling.dager].map((d) =>
                d.dag === dag.dag ? dag : d,
            );

            setMeldekortUtfylling({
                ...meldekortUtfylling,
                dager: meldekortDagerUpdated,
            });
        },
        [meldekortUtfylling],
    );

    const redirectHvisMeldekortErInnsendt = useCallback(
        (
            meldekortFraBackend: Meldekort,
            meldekortFraKlient: Meldekort | undefined,
            nåværendeSteg: MeldekortSteg,
        ) => {
            // Kvitteringssiden sin redirect kan ikke sjekke meldekortutfylling i state da denne blir oppdatert
            // etter innsending. Den sjekker derfor bare meldekortet fra backend (via SSR) for å fange opp caser
            // der bruker har hoppet rett til kvitteringssiden ved å f.eks endre URLen i nettleseren.
            if (!navigate || nåværendeSteg === 'kvittering') {
                return;
            }

            const { INNSENDT } = MeldekortStatus;
            const meldekortFraBackendErInnsendt = meldekortFraBackend.status === INNSENDT;
            const meldekortFraKlientErInnsendt = meldekortFraKlient?.status === INNSENDT;

            if (meldekortFraBackendErInnsendt || meldekortFraKlientErInnsendt) {
                navigate(getPath(siteRoutePaths.forside));
                return;
            }
        },
        [navigate],
    );

    const getUndertekster = () => {
        if (!meldekortUtfylling) {
            return {
                ukerTekst: <div />,
                datoerTekst: <div />,
            };
        }

        const { fraOgMed, tilOgMed, uke1, uke2 } = meldekortUtfylling;
        return {
            ukerTekst: (
                <Tekst
                    id={'undertekstUker'}
                    resolverProps={{
                        uke1,
                        uke2,
                    }}
                />
            ),
            datoerTekst: (
                <Tekst
                    id={'undertekstDatoer'}
                    resolverProps={{
                        fraOgMed: formatterDato({
                            dato: fraOgMed,
                            medUkeDag: false,
                            medÅr: uke1 > uke2, // Vis år for første uke dersom meldeperioden krysser årsskifte
                            locale: valgtSpråk,
                        }),
                        tilOgMed: formatterDato({
                            dato: tilOgMed,
                            medUkeDag: false,
                            medÅr: true,
                            locale: valgtSpråk,
                        }),
                    }}
                />
            ),
        };
    };

    return (
        <MeldekortUtfyllingContext.Provider
            value={{
                meldekortUtfylling,
                setMeldekortUtfylling,
                valgtMeldekortDag,
                setValgtMeldekortDag,
                lagreMeldekortDag,
                meldekortSteg,
                setMeldekortSteg,
                getUndertekster,
                redirectHvisMeldekortErInnsendt,
                harHattFravær,
                setHarHattFravær,
                harMottattLønn,
                setHarMottattLønn,
                visValideringsfeil,
                setVisValideringsfeil,
            }}
        >
            {children}
        </MeldekortUtfyllingContext.Provider>
    );
};
