import React from 'react';
import { usePreloadPageProps } from '@context/useFetchPageData.ts';
import { Link } from 'wouter';

type Props = {
    children: React.ReactNode;
    path: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const InternLenke = ({ children, path, ...rest }: Props) => {
    return (
        <Link {...rest} href={path}>
            {children}
        </Link>
    );
};
