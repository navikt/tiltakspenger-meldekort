import React from 'react';
import { Link as RouterLink } from 'wouter';
import { Link } from '@navikt/ds-react';

type Props = {
    children: React.ReactNode;
    path: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

export const InternLenke = ({ children, path, ...rest }: Props) => {
    return (
        <Link as={RouterLink} {...rest} href={path}>
            {children}
        </Link>
    );
};
