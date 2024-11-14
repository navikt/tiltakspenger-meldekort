import React from 'react';
import Link, { LinkProps } from 'next/link';

type Props = {
    children: React.ReactNode;
} & LinkProps;

export const Lenke = ({ children, ...rest }: Props) => {
    return <Link {...rest}>{children}</Link>;
};
