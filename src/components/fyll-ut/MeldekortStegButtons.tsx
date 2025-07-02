import { Button } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { FlashingButton } from '@components/flashing-button/FlashingButton.tsx';
import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@navikt/aksel-icons';
import { TekstId } from '@tekster/typer';
import style from './MeldekortStegButtons.module.css';

type Props = {
    onNesteClick: () => boolean;
    nesteButtonTekst?: TekstId;
    nesteButtonIcon?: React.ReactNode;
    onForrigeClick: () => void;
    onAvbrytClick: () => void;
};

export const MeldekortStegButtons = ({
    onNesteClick,
    nesteButtonTekst = 'neste',
    nesteButtonIcon = <ArrowRightIcon fontSize="1.5rem" aria-hidden />,
    onForrigeClick,
    onAvbrytClick,
}: Props) => {
    return (
        <div>
            <div
                style={{
                    flexDirection: 'row',
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '0.5rem',
                }}
            >
                <div className={style.knapper}>
                    <Button
                        variant={'secondary'}
                        onClick={onForrigeClick}
                        icon={<ArrowLeftIcon fontSize="1.5rem" aria-hidden />}
                    >
                        <Tekst id={'forrige'} />
                    </Button>
                    <FlashingButton
                        onClick={onNesteClick}
                        icon={nesteButtonIcon}
                        iconPosition={'right'}
                    >
                        <Tekst id={nesteButtonTekst} />
                    </FlashingButton>
                </div>
            </div>
            <Button variant={'tertiary'} onClick={onAvbrytClick}>
                <Tekst id={'avbryt'} />
            </Button>
        </div>
    );
};
