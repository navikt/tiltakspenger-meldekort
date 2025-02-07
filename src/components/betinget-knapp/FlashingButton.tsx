import { Button, ButtonProps } from '@navikt/ds-react';
import React, { useState } from 'react';
import { classNames } from '@utils/classNames.ts';

import style from './BetingetKnapp.module.css';

type Props = {
    onClick: (e: React.MouseEvent) => boolean;
} & Omit<ButtonProps, 'onClick'>;


export const FlashingButton = ({ onClick, children, className, ...buttonProps }: Props) => {
    const [flash, setFlash] = useState(false);

    return (
        <>
            <Button
                {...buttonProps}
                className={classNames(flash && style.flash, className)}
                onClick={(e) => {
                    if (!onClick(e) && !flash) {
                        setFlash(true);
                        setTimeout(() => setFlash(false), 650);
                    }
                }}
            >
                {children}
            </Button>
        </>
    );
};
