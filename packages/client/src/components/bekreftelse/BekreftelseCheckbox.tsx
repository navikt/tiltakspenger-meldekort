import { ErrorMessage } from '@navikt/ds-react';
import { CheckboxCard } from '@navikt/ds-react/PREVIEW/CheckboxCard';
import { ReactNode, useId } from 'react';

import style from './BekreftelseCheckbox.module.css';

type Props = {
    label: ReactNode;
    checked: boolean;
    onChange: (checked: boolean) => void;
    error?: ReactNode;
    id?: string;
};

export const BekreftelseCheckbox = ({ label, checked, onChange, error, id }: Props) => {
    const errorId = useId();
    const farge = error ? 'danger' : checked ? 'success' : 'warning';

    return (
        <div data-color={farge}>
            <CheckboxCard
                className={style.kort}
                id={id}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                error={!!error}
                errorId={errorId}
            >
                {label}
            </CheckboxCard>
            <div id={errorId} role={'alert'} className={style.feil}>
                {error && <ErrorMessage showIcon>{error}</ErrorMessage>}
            </div>
        </div>
    );
};
