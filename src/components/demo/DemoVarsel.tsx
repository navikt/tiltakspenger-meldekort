import { InternLenke } from '@components/lenke/InternLenke.tsx';
import { getPath, siteRoutes } from '@common/siteRoutes.ts';
import { Tekst } from '@components/tekst/Tekst.tsx';
import { Alert } from '@navikt/ds-react';
import { useEffect, useState } from 'react';

// TODO Bare mens brukertest pågår, se https://trello.com/c/G6ICjV3j/1399-planlegge-brukertest-av-meldekortet
export const DemoVarsel = () => {
    const [isDemoMode, setIsDemoMode] = useState(false);

    useEffect(() => {
        setIsDemoMode(window.location.pathname.includes('/demo'));
    }, []);

    return (
        <>
            {isDemoMode && (
                <div style={{ paddingBottom: '1rem' }}>
                    <Alert variant="info">
                        Dette er en demo av Nav sitt nye meldekort for tiltakspenger som brukes i
                        forbindelse med brukertester. Dersom du ikke har meldt deg på en brukertest
                        så kan du komme tilbake til ditt meldekort med lenken under.
                        <br />
                        <InternLenke path={getPath(siteRoutes.forside)}>
                            <Tekst id={'kvitteringTilbake'} />
                        </InternLenke>
                    </Alert>
                </div>
            )}
        </>
    );
};
