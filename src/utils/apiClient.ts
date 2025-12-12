import { useCallback, useState } from 'react';

export interface ApiError {
    statusCode: number;
    errorBody: ErrorBody;
}

export interface ErrorBody {
    melding: string;
    kode: string | ErrorCodes;
}

export enum ErrorCodes {
    meldekort_allerede_korrigert_og_ikke_lenger_gyldig = 'meldekort_allerede_korrigert_og_ikke_lenger_gyldig',
}

type Method = 'POST' | 'PATCH' | 'GET';

export type ApiClientResult<TSuccess> = ApiClientSuccessResult<TSuccess> | ApiClientFailureResult;
export type ApiClientSuccessResult<TSuccess> = { status: 'ok'; data: TSuccess; statusCode: number };
export type ApiClientFailureResult = { status: 'error'; error: ApiError };

/**
 * En enkel fetch wrapper som returnerer et standardisert resultatobjekt.
 *
 * Støtter JSON, tekst, eller ingen responsbody.
 */
const apiClient = async <TSuccess>(arg: {
    url: string;
    method: Method;
    body?: Record<string, any>;
}) => {
    const res = await fetch(arg.url, {
        method: arg.method,
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: arg.body ? JSON.stringify(arg.body) : undefined,
    });

    const text = await res.text();

    if (res.ok) {
        let data;
        try {
            data = text ? JSON.parse(text) : null;
        } catch {
            data = text || null;
        }

        return {
            status: 'ok' as const,
            data: data as TSuccess,
            statusCode: res.status,
        };
    }

    let errorBody: ErrorBody;
    try {
        errorBody = text
            ? JSON.parse(text)
            : { melding: 'Ukjent server feil', kode: res.status.toString() };
    } catch {
        errorBody = text
            ? { melding: text, kode: res.status.toString() }
            : { melding: 'Ukjent server feil', kode: res.status.toString() };
    }

    return { status: 'error' as const, error: { statusCode: res.status, errorBody } };
};

/**
 * En fetch hook med innebygd håndtering av states.
 */
export const useApiClient = <TSuccess = unknown>(args: {
    url: string;
    method: Method;
    onSuccess?: (data: TSuccess) => void;
    onError?: (error: ApiError) => void;
}): {
    apiStatus: 'initial' | 'loading' | 'success' | 'error';
    callApi: (args: {
        body?: Record<string, any>;
        onSuccess?: (data: TSuccess) => void;
        onError?: (error: ApiError) => void;
    }) => void;
    response: ApiClientResult<TSuccess> | null;
    resetToInitial: () => void;
} => {
    const [apiStatus, setApiStatus] = useState<'initial' | 'loading' | 'success' | 'error'>(
        'initial',
    );
    const [response, setResponse] = useState<ApiClientResult<TSuccess> | null>(null);

    const callApi = useCallback(
        async (callApiArgs: {
            body?: Record<string, any>;
            onSuccess?: (data: TSuccess) => void;
            onError?: (error: ApiError) => void;
        }) => {
            setApiStatus('loading');
            const res = await apiClient<TSuccess>({
                url: args.url,
                method: args.method,
                body: callApiArgs.body,
            });

            if (res.status === 'ok') {
                setApiStatus('success');
                setResponse(res);
                args.onSuccess?.(res.data);
                callApiArgs.onSuccess?.(res.data);
            } else {
                setApiStatus('error');
                setResponse(res);
                args.onError?.(res.error);
                callApiArgs.onError?.(res.error);
            }
        },
        [args],
    );

    const resetToInitial = useCallback(() => {
        setApiStatus('initial');
        setResponse(null);
    }, []);

    return { apiStatus, callApi, response, resetToInitial };
};
