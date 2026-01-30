import { TeksterProps, TekstId } from '@tekster/typer.ts';

import { useSpråk } from '@context/språk/useSpråk.ts';

export const Tekst = <Id extends TekstId>(props: TeksterProps<Id>) => {
    const { getTeksterForSpråk } = useSpråk();

    return getTeksterForSpråk({ ...props }).join(' ');
};
