import { createContext } from 'react';
import { TeksterLocale } from '@meldekort/common/locale';
import { TeksterProps, TekstId } from '@tekster/typer';

type SpråkvelgerState = {
    valgtSpråk: TeksterLocale;
    getTekstForSpråk: <Id extends TekstId>(props: TeksterProps<Id>) => string;
    getTeksterForSpråk: <Id extends TekstId>(props: TeksterProps<Id>) => string[];
};

export const SpråkContext = createContext<SpråkvelgerState>({} as SpråkvelgerState);
