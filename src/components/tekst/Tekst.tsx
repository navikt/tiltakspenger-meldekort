import { getTekster } from '@tekster/tekster.ts';
import { TeksterProps, TekstId } from '@tekster/typer.ts';

export const Tekst = <Id extends TekstId>(props: TeksterProps<Id>) => {
    return getTekster(props).join(' ');
};
