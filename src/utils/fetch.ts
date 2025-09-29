import { appConfig } from '@common/appConfig';
import { Meldekort } from '@common/typer/MeldekortBruker';

import useSWRMutation from 'swr/mutation';

type Options = RequestInit & { params?: Record<string, unknown> };

const objectToQueryString = (params?: Record<string, unknown>) =>
    params
        ? Object.entries(params).reduce(
              (acc, [k, v], i) =>
                  v !== undefined
                      ? `${acc}${i ? '&' : '?'}${k}=${encodeURIComponent(
                            typeof v === 'object' ? JSON.stringify(v) : v.toString(),
                        )}`
                      : acc,
              '',
          )
        : '';

const fetchWithRetry = async (
    url: string,
    options: Options = {},
    retries = 1,
): Promise<Response> => {
    const { params, ...init } = options;

    const urlWithParams = `${url}${objectToQueryString(params)}`;

    try {
        const res = await fetch(urlWithParams, init);
        if (res.ok) {
            return res;
        }

        throw new Error(`${res.status} - ${res.statusText}`);
    } catch (e) {
        if (retries > 0) {
            console.log(`Failed to fetch from ${urlWithParams}, retrying`);
            return fetchWithRetry(url, options, retries - 1);
        }

        console.error(`Failed to fetch from ${urlWithParams} - ${e}`);
        throw e;
    }
};

export const fetchJson = async <ResponseType>(
    url: string,
    options?: Options,
): Promise<ResponseType | null> =>
    fetchWithRetry(url, options)
        .then((res) => res.json() as ResponseType)
        .catch((e) => {
            console.error(`Failed to fetch json from ${url} - ${e}`);
            return null;
        });

export const fetchSendInn = async (
    meldekortUtfylling: Meldekort,
    baseUrl: string,
): Promise<boolean> =>
    fetch(`${baseUrl}/api/send-inn`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(meldekortUtfylling),
    })
        .then((res) => {
            if (res.ok) {
                return true;
            } else {
                console.error(`Feil-response ved innsending - ${res.status}`);
                return false;
            }
        })
        .catch((e) => {
            console.error(`Innsending feilet - ${e}`);
            return false;
        });

type TriggerOptions<T> = {
    onSuccess?: (data: T) => void;
    onError?: (error: unknown) => void;
    onSettled?: () => void;
};

type Trigger<Payload, Response> = Payload extends undefined
    ? (options?: TriggerOptions<Response>) => Promise<Response>
    : (payload: Payload, options?: TriggerOptions<Response>) => Promise<Response>;

type ApiError = { melding: string; kode: string };

/**
 * Brukes sammen med [apiFetcher] som handler for å håndtere API-kall med SWR.
 */
export function useApi<RequestBody = undefined, Response = unknown>(args: {
    key: string;
    handler: (body: RequestBody) => Promise<Response>;
    onSuccess?: (data: Response) => void;
    onError?: (error: ApiError) => void;
}) {
    const { trigger, isMutating, error, data } = useSWRMutation(
        (body: RequestBody) => [args.key, body],
        (_, { arg }) => {
            return args.handler(arg);
        },
        {
            onSuccess: args.onSuccess,
            onError: args.onError,
        },
    );

    return {
        trigger: trigger as Trigger<RequestBody, Response>,
        isLoading: isMutating,
        error,
        data,
    };
}

export async function apiFetcher<RequestBody, ResponseBody>(params: {
    url: string;
    method: 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    body: RequestBody;
}): Promise<ResponseBody> {
    const { url, method, body } = params;

    const isDemoMode = window.location.pathname.includes('/demo');

    const res = await fetch(
        `${appConfig.baseUrl}/${isDemoMode ? 'demo/' : ''}api/${url.startsWith('/') ? url.slice(1) : url}`,
        {
            method,
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        },
    );

    if (!res.ok) {
        const message = await res.text();
        throw new Error(`Request failed: ${res.status} - ${message}`);
    }

    return res.json();
}
