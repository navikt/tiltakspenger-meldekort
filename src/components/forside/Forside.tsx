import { Alert, BodyLong, Button } from '@navikt/ds-react';
import { Tekst } from '@components/tekst/Tekst';
import { TilUtfylling } from '@components/forside/til-utfylling/TilUtfylling';
import { Lenke } from '@components/lenke/Lenke';

import style from './Forside.module.css';

type Props = {
    nesteMeldekortId?: string;
};

export const Forside = ({ nesteMeldekortId }: Props) => {
    return (
        <>
            <BodyLong spacing={true}>
                <Tekst id={'forsideIngress1'} />
            </BodyLong>
            <BodyLong spacing={true}>
                <Tekst id={'forsideIngress2'} />
            </BodyLong>
            <BodyLong spacing={true}>
                <Tekst id={'forsideIngress3'} />
            </BodyLong>
            <BodyLong weight={'semibold'} size={'large'}>
                <Tekst id={'forsideTakk'} />
            </BodyLong>
            <BodyLong spacing={true}>
                <Tekst id={'forsideOpplysninger'} />
            </BodyLong>
            {nesteMeldekortId ? (
                <TilUtfylling nesteMeldekortId={nesteMeldekortId} />
            ) : (
                <>
                    <Alert
                        variant={'info'}
                        contentMaxWidth={false}
                        className={style.ingenMeldekort}
                    >
                        <Tekst id={'forsideIngenMeldekort'} />
                        <Button
                            size={'small'}
                            variant={'primary'}
                            className={style.genererKnapp}
                            onClick={() => {
                                fetch(`${window.location.origin}/tiltakspenger/meldekort/api/generer-meldekort`, {
                                    credentials: 'include',
                                }).then((res) => {
                                    if (res.ok) {
                                        window.location.reload();
                                    } else {
                                        window.alert(
                                            `Generering av meldekort feilet med kode ${res.status}`
                                        );
                                    }
                                });
                            }}
                        >
                            {'Generer et meldekort for denne brukeren'}
                        </Button>
                    </Alert>
                </>
            )}
            <Lenke href={'/innsendt'} className={style.tidligere}>
                <Tekst id={'forsideSeOgEndre'} />
            </Lenke>
        </>
    );
};
