import Link, { LinkProps } from 'next/link';
import React from 'react';

type Props = {
    children: React.ReactNode;
} & LinkProps;

export const Lenke = ({ children, ...rest }: Props) => {
    return <Link {...rest}>{children}</Link>;
};
