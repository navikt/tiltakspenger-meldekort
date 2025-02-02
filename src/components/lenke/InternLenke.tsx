import React from 'react';
import { NavLink } from 'react-router';
import { useFetchPageProps, usePreloadPageProps } from '@context/useFetchPageData.ts';

type Props = {
    children: React.ReactNode;
    path: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const InternLenke = ({ children, path, ...rest }: Props) => {
    usePreloadPageProps(path);

    return (
        <NavLink {...rest} to={path} onClick={(arg) => console.log(`Navigating to ${path}`)}>
            {children}
        </NavLink>
    );
};
