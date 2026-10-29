import { Request } from 'express';
import { FetchFraApi } from '@fetch/apiFetch';

export const mockResponse = (status: number, body: unknown) =>
    ({
        status,
        ok: status >= 200 && status < 300,
        json: async () => body,
        text: async () => (body === undefined || body === null ? '' : JSON.stringify(body)),
    }) as unknown as Awaited<ReturnType<FetchFraApi>>;

export const lesCookie = (req: Request, navn: string): string | null => {
    const header = req.headers.cookie;
    if (!header) {
        return null;
    }

    for (const del of header.split(';')) {
        const [key, ...verdi] = del.trim().split('=');
        if (key === navn) {
            return decodeURIComponent(verdi.join('='));
        }
    }

    return null;
};
