import { BodyLong, Heading, ReadMore } from '@navikt/ds-react';

export const FyllUt = () => {
    return (
        <div>
            <Heading size={'medium'}>{'Fyll ut meldekortet'}</Heading>
            <BodyLong>
                {
                    'Klikk på datoen du skal melde for. Du kan velge mellom jobb, syk, ferie/fravær eller tiltak/kurs/utdanning.'
                }
            </BodyLong>
            <ReadMore header={'Les mer om hva som skal føres på meldekortet'}>
                {'Blah blah'}
            </ReadMore>
        </div>
    );
};
