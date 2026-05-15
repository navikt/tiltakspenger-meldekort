import { TeksterProps, TekstId } from '@tekster/typer';

import { useSpråk } from '@context/språk/useSpråk';

export const Tekst = <Id extends TekstId>(props: TeksterProps<Id>) => {
    const { getTeksterForSpråk } = useSpråk();

    return getTeksterForSpråk({ ...props }).join(' ');
};
