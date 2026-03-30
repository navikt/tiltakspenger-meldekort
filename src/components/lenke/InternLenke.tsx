import React from 'react';
import { Link as RouterLink } from 'wouter';
import { Link } from '@navikt/ds-react';
import { TeksterLocale } from '@common/locale.ts';
import { addLocaleSuffix } from '@common/urls.ts';

type Props = {
    children: React.ReactNode;
    path: string;
    locale: TeksterLocale;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'data-color'>;

export const InternLenke = ({ children, path, locale, ...rest }: Props) => {
    return (
        <Link {...rest} as={RouterLink} href={addLocaleSuffix(path, locale)}>
            {children}
        </Link>
    );
};
