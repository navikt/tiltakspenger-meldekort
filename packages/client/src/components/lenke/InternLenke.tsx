import React from 'react';
import { Link as RouterLink } from 'wouter';
import { Link } from '@navikt/ds-react';
import { TeksterLocale } from '@meldekort/common/locale';
import { addLocaleSuffix } from '@meldekort/common/urls';

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
