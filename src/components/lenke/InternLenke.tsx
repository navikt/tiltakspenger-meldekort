import React from 'react';

const baseUrl = import.meta.env.BASE_URL;

type Props = {
    children: React.ReactNode;
    href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const InternLenke = ({ children, href, ...rest }: Props) => {
    return (
        <a {...rest} href={`${baseUrl}${href}`}>
            {children}
        </a>
    );
};
