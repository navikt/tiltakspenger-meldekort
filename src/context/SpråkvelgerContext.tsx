import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { onLanguageSelect } from '@navikt/nav-dekoratoren-moduler';
import { TeksterLocale } from '@common/typer/locale.ts';
import { replaceLocaleSuffix } from '@common/urls.ts';
import { useLocation } from 'wouter';

type SpråkvelgerState = {
    valgtSpråk: TeksterLocale;
};

const SpråkvelgerContext = createContext<SpråkvelgerState>({} as SpråkvelgerState);

type Props = PropsWithChildren<{
    defaultSpråk: TeksterLocale;
}>;

export const SpråkProvider = ({ defaultSpråk, children }: Props) => {
    const [valgtSpråk, setValgtSpråk] = useState(defaultSpråk);

    const [path, navigate] = useLocation();

    useEffect(() => {
        onLanguageSelect((language) => {
            if (language.locale === 'nb' || language.locale === 'en') {
                const nyPath = replaceLocaleSuffix(path, language.locale);
                setValgtSpråk(language.locale);
                navigate(nyPath);
            }
        });
    }, [path]);

    return (
        <SpråkvelgerContext.Provider
            value={{
                valgtSpråk,
            }}
        >
            {children}
        </SpråkvelgerContext.Provider>
    );
};

export const useValgtSpråk = () => {
    return useContext(SpråkvelgerContext);
};
