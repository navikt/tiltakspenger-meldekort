import React from 'react';
import Link, { LinkProps } from 'next/link';

type Props = {
    children: React.ReactNode;
} & LinkProps &
    React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Lenke = ({ children, href, ...rest }: Props) => {
    return (
        <Link {...rest} href={href || ''}>
            {children}
        </Link>
    );
};
