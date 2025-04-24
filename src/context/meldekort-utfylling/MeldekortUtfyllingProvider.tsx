import React, { useCallback, useState } from 'react';
import { MeldekortUtfyllingContext } from '@context/meldekort-utfylling/MeldekortUtfyllingContext';
import {
    MeldekortDag,
    MeldekortSteg,
    MeldekortUtfylling,
} from '../../../commonSrc/typer/meldekort-utfylling.ts';
import { formatterDato, getUkenummer } from '@utils/datetime.ts';
import { Tekst } from '@components/tekst/Tekst.tsx';

type Props = {
    setMeldekortSteg?: (steg: MeldekortSteg) => void;
    children: React.ReactNode;
};

export const MeldekortUtfyllingProvider = ({ setMeldekortSteg, children }: Props) => {
    const [meldekortUtfylling, setMeldekortUtfylling] = useState<MeldekortUtfylling | undefined>(
        undefined
    );
    const [valgtMeldekortDag, setValgtMeldekortDag] = useState<MeldekortDag | null>(null);
    const [forrigeSteg, setForrigeSteg] = useState<MeldekortSteg | undefined>(undefined);

    const lagreMeldekortDag = useCallback(
        (dag: MeldekortDag) => {
            if (!meldekortUtfylling) {
                return;
            }

            const meldekortDagerUpdated = [...meldekortUtfylling.dager];
            meldekortDagerUpdated[dag.index] = dag;

            setMeldekortUtfylling({
                ...meldekortUtfylling,
                dager: meldekortDagerUpdated,
            });
        },
        [meldekortUtfylling]
    );

    const getUndertekster = () => {
        if (!meldekortUtfylling) {
            return {
                ukerTekst: <div />,
                datoerTekst: <div />,
            };
        }

        const { fraOgMed, tilOgMed } = meldekortUtfylling.periode;
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
                setMeldekortUtfylling: setMeldekortUtfylling,
                valgtMeldekortDag,
                setValgtMeldekortDag,
                lagreMeldekortDag,
                setMeldekortSteg,
                forrigeSteg,
                setForrigeSteg,
                getUndertekster,
            }}
        >
            {children}
        </MeldekortUtfyllingContext.Provider>
    );
};
