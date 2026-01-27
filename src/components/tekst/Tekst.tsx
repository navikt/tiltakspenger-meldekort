import { getTekster } from '@tekster/tekster.ts';
import { TeksterProps, TekstId } from '@tekster/typer.ts';
import { useValgtSpråk } from '@context/SpråkvelgerContext.tsx';

export const Tekst = <Id extends TekstId>(props: TeksterProps<Id>) => {
    const { valgtSpråk } = useValgtSpråk();

    return getTekster({ ...props, locale: valgtSpråk }).join(' ');
};
