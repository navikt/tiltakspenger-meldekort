import React from 'react';
import { Link } from '@navikt/ds-react';

type Props = {
    children: React.ReactNode;
    path: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const EksternLenke = ({ children, path }: Props) => {
    return (
        <Link href={path} target="_blank" rel="noopener noreferrer">
            {children}
        </Link>
    );
};
