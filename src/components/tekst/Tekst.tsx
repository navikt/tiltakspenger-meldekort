import { teksterNb } from '@components/tekst/nb';

const tekster = {
    nb: teksterNb,
};

type Props = {
    id: keyof typeof teksterNb;
};

export const Tekst = ({ id }: Props) => {
    return tekster['nb'][id];
};
