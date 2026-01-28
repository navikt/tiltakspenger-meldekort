import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { erLocaleGyldig, TeksterLocale } from '@common/locale.ts';
import { useLocation } from 'wouter';
import { onLanguageSelect } from '@navikt/nav-dekoratoren-moduler';
import { replaceLocaleSuffix } from '@common/urls.ts';
import { SpråkContext } from './SpråkContext.tsx';
import { TeksterProps, TekstId } from '@tekster/typer.ts';
import { getTekst, getTekster } from '@tekster/tekster.ts';

type Props = PropsWithChildren<{
    defaultSpråk: TeksterLocale;
}>;

export const SpråkProvider = ({ defaultSpråk, children }: Props) => {
    const [valgtSpråk, setValgtSpråk] = useState(defaultSpråk);

    const [path, navigate] = useLocation();

    useEffect(() => {
        onLanguageSelect((language) => {
            if (erLocaleGyldig(language.locale)) {
                const nyPath = replaceLocaleSuffix(path, language.locale);
                setValgtSpråk(language.locale);
                navigate(nyPath);
            }
        });
    }, [path]);

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
