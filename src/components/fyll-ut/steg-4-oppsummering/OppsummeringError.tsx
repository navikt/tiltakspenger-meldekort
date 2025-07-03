import React from 'react';
import style from './OppsummeringError.module.css';
import { ErrorSummary } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { TekstId } from '@tekster/typer.ts';

type Props = {
    tekstId: TekstId;
    onClick?: () => void;
    href?: string;
};

/**
 * Komponent som viser frem feil enten som en lenke til et sted på samme side (href) eller som en
 * knapp som tar brukeren til et annet meldekortsteg (onClick).
 */
export const OppsummeringError = ({ tekstId, onClick, href }: Props) => {
    return href ? (
        <ErrorSummary.Item href={href}>
            <Tekst id={tekstId} />
        </ErrorSummary.Item>
    ) : (
        <ErrorSummary.Item as="button" className={style.errorSummaryItemAsLink} onClick={onClick}>
            <Tekst id={tekstId} />
        </ErrorSummary.Item>
    );
};
