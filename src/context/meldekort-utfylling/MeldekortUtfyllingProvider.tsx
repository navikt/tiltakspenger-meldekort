import React, { useCallback, useState } from 'react';
import { MeldekortUtfyllingContext } from '@context/meldekort-utfylling/MeldekortUtfyllingContext';
import { MeldekortSteg, STEG_REKKEFOLGE } from '@common/typer/BrukersMeldekortUtfylling';
import { formatterDato, getUkenummer } from '@utils/datetime.ts';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { getPath, siteRoutes } from '@common/siteRoutes.ts';
import { Meldekort, MeldekortDag, MeldekortStatus } from '@common/typer/MeldekortBruker';

type Props = {
    navigate?: (path: string) => void;
    children: React.ReactNode;
};

export const MeldekortUtfyllingProvider = ({ navigate, children }: Props) => {
    const [meldekortUtfylling, setMeldekortUtfylling] = useState<Meldekort | undefined>(undefined);
    const [valgtMeldekortDag, setValgtMeldekortDag] = useState<MeldekortDag | null>(null);
    const [meldekortSteg, setMeldekortSteg] = useState<MeldekortSteg>(STEG_REKKEFOLGE[0]);
    const [harHattFravær, setHarHattFravær] = useState<boolean | null>(null);
    const [harMottattLønn, setHarMottattLønn] = useState<boolean | null>(null);
    const [visValideringsfeil, setVisValideringsfeil] = useState<boolean | null>(null);

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
                navigate(getPath(siteRoutes.forside));
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

        const { fraOgMed, tilOgMed } = meldekortUtfylling;
        return {
            ukerTekst: (
                <Tekst
                    id={'undertekstUker'}
                    resolverProps={{ uke1: getUkenummer(fraOgMed), uke2: getUkenummer(tilOgMed) }}
                />
            ),
            datoerTekst: (
                <Tekst
                    id={'undertekstDatoer'}
                    resolverProps={{
                        fraOgMed: formatterDato({ dato: fraOgMed, medUkeDag: false }),
                        tilOgMed: formatterDato({ dato: tilOgMed, medUkeDag: false }),
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
