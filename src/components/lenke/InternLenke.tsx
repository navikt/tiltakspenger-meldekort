import React from 'react';
import { Link as RouterLink } from 'wouter';
import { Link } from '@navikt/ds-react';
import { TeksterLocale } from '@common/locale.ts';
import { addLocaleSuffix } from '@common/urls.ts';

type Props = {
    children: React.ReactNode;
    path: string;
    locale: TeksterLocale;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

export const InternLenke = ({ children, path, locale }: Props) => {
    return (
        <Link as={RouterLink} href={addLocaleSuffix(path, locale)}>
            {children}
        </Link>
    );
};
