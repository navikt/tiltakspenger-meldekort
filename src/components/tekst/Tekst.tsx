import { teksterNb } from '@tekster/nb';

export type TekstId = keyof typeof teksterNb;

type Tekster = Record<TekstId, string>;

const tekster: Record<string, Tekster> = {
    nb: teksterNb,
} as const;

type Props = {
    id: TekstId;
};

export const Tekst = ({ id }: Props) => {
    return tekster['nb'][id];
};
