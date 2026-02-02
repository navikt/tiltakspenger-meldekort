import { createContext } from 'react';
import { TeksterLocale } from '@common/locale.ts';
import { TeksterProps, TekstId } from '@tekster/typer.ts';

type SpråkvelgerState = {
    valgtSpråk: TeksterLocale;
    getTekstForSpråk: <Id extends TekstId>(props: TeksterProps<Id>) => string;
    getTeksterForSpråk: <Id extends TekstId>(props: TeksterProps<Id>) => string[];
};

export const SpråkContext = createContext<SpråkvelgerState>({} as SpråkvelgerState);
