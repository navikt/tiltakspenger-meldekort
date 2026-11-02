import style from './OppsummeringError.module.css';
import { ErrorSummary } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { TeksterProps, TekstId } from '@tekster/typer';

type Props = {
    tekst: TeksterProps<TekstId>;
    onClick?: () => void;
    href?: string;
};

/**
 * Komponent som viser frem feil enten som en lenke til et sted på samme side (href) eller som en
 * knapp som tar brukeren til et annet meldekortsteg (onClick).
 */
export const OppsummeringError = ({ tekst, onClick, href }: Props) => {
    return href ? (
        <ErrorSummary.Item href={href}>
            <Tekst {...tekst} />
        </ErrorSummary.Item>
    ) : (
        <ErrorSummary.Item as="button" className={style.errorSummaryItemAsLink} onClick={onClick}>
            <Tekst {...tekst} />
        </ErrorSummary.Item>
    );
};
