import React from 'react';
import { Link } from '@navikt/ds-react';

type Props = {
    children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const EksternLenke = ({ children, ...rest }: Props) => {
    return (
        <Link rel="noopener noreferrer" {...rest}>
            {children}
        </Link>
    );
};
