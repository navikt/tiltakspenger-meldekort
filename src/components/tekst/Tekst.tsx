import { getTekster, TeksterProps, TekstId } from '@tekster/utils';

export const Tekst = <Id extends TekstId>(props: TeksterProps<Id>) => {
    return getTekster(props).join(' ');
};
