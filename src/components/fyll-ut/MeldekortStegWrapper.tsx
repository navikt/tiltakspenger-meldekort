import React, { useEffect, useRef } from 'react';
import style from './MeldekortStegWrapper.module.css';

type Props = {
    children: React.ReactNode;
};

export const MeldekortStegWrapper = ({ children }: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollTo(0, 0);
        ref.current?.focus();
    }, []);

    return (
        <div ref={ref} tabIndex={-1} className={style.wrapper}>
            {children}
        </div>
    );
};
