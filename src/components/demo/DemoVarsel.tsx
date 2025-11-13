import { Tekst } from '@components/tekst/Tekst.tsx';
import { Alert } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { EksternLenke } from '@components/lenke/EksternLenke.tsx';
import { appConfig } from '@common/appConfig.ts';

// TODO Bare mens brukertest pågår, se https://trello.com/c/G6ICjV3j/1399-planlegge-brukertest-av-meldekortet
export const DemoVarsel = () => {
    const [isDemoMode, setIsDemoMode] = useState(false);

    useEffect(() => {
        setIsDemoMode(window.location.pathname.includes(appConfig.demoRoutePrefix));
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
                        <EksternLenke href={appConfig.baseUrl}>
                            <Tekst id={'kvitteringTilbake'} />
                        </EksternLenke>
                    </Alert>
                </div>
            )}
        </>
    );
};
