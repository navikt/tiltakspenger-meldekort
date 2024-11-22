import { teksterNb, TekstId } from '@components/tekst/nb';

const tekster = {
    nb: teksterNb,
};

type Props = {
    id: TekstId;
};

export const Tekst = ({ id }: Props) => {
    return tekster['nb'][id];
};
