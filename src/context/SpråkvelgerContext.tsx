import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { TeksterLocale } from '@tekster/typer.ts';
import { onLanguageSelect } from '@navikt/nav-dekoratoren-moduler';

type SpråkvelgerState = {
    valgtSpråk: TeksterLocale;
    setValgtSpråk: (språk: TeksterLocale) => void;
};

const SpråkvelgerContext = createContext<SpråkvelgerState>({} as SpråkvelgerState);

type Props = PropsWithChildren<{
    defaultSpråk: TeksterLocale;
}>;

export const SpråkProvider = ({ defaultSpråk, children }: Props) => {
    const [valgtSpråk, setValgtSpråk] = useState(defaultSpråk);

    useEffect(() => {
        onLanguageSelect((language) => {
            if (language.locale === 'nb' || language.locale === 'en') {
                setValgtSpråk(language.locale);
            }
        });
    }, []);

    return (
        <SpråkvelgerContext.Provider
            value={{
                valgtSpråk,
                setValgtSpråk,
            }}
        >
            {children}
        </SpråkvelgerContext.Provider>
    );
};

export const useValgtSpråk = () => {
    return useContext(SpråkvelgerContext);
};
