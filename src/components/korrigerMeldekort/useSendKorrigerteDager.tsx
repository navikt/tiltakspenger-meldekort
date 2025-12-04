import { useCallback, useState } from 'react';
import { MeldekortDag } from '@common/typer/MeldekortBruker';

export const useSendKorrigerteDager = (
    meldekortId: string,
    korrigerteDager: MeldekortDag[],
    baseUrl: string,
): {
    status: 'success' | 'error' | 'loading' | 'initial';
    response: unknown;
    callFn: (args: {
        onLoading?: () => void;
        onSuccess?: () => void;
        onError?: () => void;
    }) => void;
} => {
    const [response, setResponse] = useState<unknown>(null);
    const [status, setStatus] = useState<'success' | 'error' | 'loading' | 'initial'>('initial');

    const callFn = useCallback(
        ({
            onLoading,
            onSuccess,
            onError,
        }: {
            onLoading?: () => void;
            onSuccess?: () => void;
            onError?: () => void;
        }) => {
            setStatus('loading');
            onLoading?.();
            fetch(`${baseUrl}/api/korriger`, {
                method: 'PATCH',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    meldekortId: meldekortId,
                    korrigerteDager: korrigerteDager.map((dag) => ({
                        dato: dag.dag,
                        status: dag.status,
                    })),
                }),
            })
                .then((res) => {
                    if (res.ok) {
                        setStatus('success');
                        setResponse(res);
                        onSuccess?.();
                    } else {
                        console.error(`Feil-response ved innsending - ${res.status}`);
                        setStatus('error');
                        setResponse(res);
                        onError?.();
                    }
                })
                .catch((e) => {
                    console.error(`Innsending feilet - ${e}`);
                    setStatus('error');
                });
        },
        [meldekortId, korrigerteDager, baseUrl],
    );

    return { status, response, callFn };
};
