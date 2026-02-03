import React from 'react';
import { Link } from '@navikt/ds-react';

type Props = {
    children: React.ReactNode;
    href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const EksternLenke = ({ children, href }: Props) => {
    return (
        <Link rel="noopener noreferrer" href={href}>
            {children}
        </Link>
    );
};
