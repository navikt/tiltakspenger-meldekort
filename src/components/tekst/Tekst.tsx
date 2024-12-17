import { getTekster, TekstId } from '@tekster/utils';

type Props = {
    id: TekstId;
};

export const Tekst = ({ id }: Props) => {
    return getTekster(id).join(' ');
};
