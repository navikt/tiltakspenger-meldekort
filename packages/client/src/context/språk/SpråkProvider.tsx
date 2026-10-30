import { PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { erLocaleGyldig } from '@meldekort/common/locale';
import { useLocation } from 'wouter';
import { onLanguageSelect, setParams } from '@navikt/nav-dekoratoren-moduler';
import { getLocaleFromPath, replaceLocaleSuffix } from '@meldekort/common/urls';
import { SpråkContext } from './SpråkContext';
import { TeksterProps, TekstId } from '@tekster/typer';
import { getTekst, getTekster } from '@tekster/tekster';

// URL-en er eneste kilde til valgt språk. Språkvelgeren i dekoratøren navigerer bare til riktig URL.
export const SpråkProvider = ({ children }: PropsWithChildren) => {
    const [path, navigate] = useLocation();
    const valgtSpråk = getLocaleFromPath(path);

    useEffect(() => {
        onLanguageSelect((language) => {
            if (erLocaleGyldig(language.locale)) {
                navigate(replaceLocaleSuffix(path, language.locale));
            }
        });
    }, [path, navigate]);

    // Holder dekoratøren i synk når språket endres uten språkvelgeren, f.eks. ved tilbake-navigering
    const forrigeSpråk = useRef(valgtSpråk);

    useEffect(() => {
        if (forrigeSpråk.current !== valgtSpråk) {
            forrigeSpråk.current = valgtSpråk;
            setParams({ language: valgtSpråk });
        }
    }, [valgtSpråk]);

    const getTekstForSpråk = useCallback(
        <Id extends TekstId>(props: TeksterProps<Id>) => {
            return getTekst({ ...props, locale: valgtSpråk });
        },
        [valgtSpråk],
    );

    const getTeksterForSpråk = useCallback(
        <Id extends TekstId>(props: TeksterProps<Id>) => {
            return getTekster({ ...props, locale: valgtSpråk });
        },
        [valgtSpråk],
    );

    return (
        <SpråkContext.Provider
            value={{
                valgtSpråk,
                getTekstForSpråk,
                getTeksterForSpråk,
            }}
        >
            {children}
        </SpråkContext.Provider>
    );
};
