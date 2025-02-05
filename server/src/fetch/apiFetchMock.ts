import { fetchFraApi } from '@fetch/apiFetch';
import { MeldekortDagStatus } from '@client/typer/meldekort-utfylling';
import { MeldekortTilBrukerDTO } from '@client/typer/meldekort-dto';

export const fetchFraApiMock: typeof fetchFraApi = async (_1, path, _2, body) => {
    if (path === 'siste') {
        return mockResponse(200, mockMeldekort[0]);
    }

    if (path === 'alle') {
        return mockResponse(200, mockMeldekort);
    }

    if (path === 'send-inn') {
        const innsendtMeldekort = JSON.parse(body as string);
        const meldekort = mockMeldekort.find((mk) => mk.id === innsendtMeldekort?.id);

        if (!meldekort) {
            return mockResponse(500, null);
        }

        meldekort.dager = meldekort.dager.map((dag, index) => ({
            ...dag,
            status: innsendtMeldekort.dager[index].status,
        }));

        meldekort.innsendt = new Date().toISOString();

        return mockResponse(200, null);
    }

    if (path.startsWith('meldekort/')) {
        const meldekortId = path.split('/')[1];
        const meldekort = mockMeldekort.find((mk) => mk.id === meldekortId);
        return mockResponse(meldekort ? 200 : 404, meldekort);
    }

    return mockResponse(404, null);
};

const mockResponse = (status: number, body: any) =>
    ({
        status,
        ok: status >= 200 && status < 300,
        json: () => body,
    }) as unknown as ReturnType<typeof fetchFraApiMock>;

const mockMeldekort: MeldekortTilBrukerDTO[] = [
    {
        id: 'meldekort_2',
        meldeperiodeId: 'periode_2',
        versjon: 1,
        meldeperiodeKjedeId: 'kjede_2',
        fraOgMed: '2025-01-06',
        tilOgMed: '2025-01-19',
        maksAntallDager: 6,
        dager: [
            ...Array.from({ length: 4 }).map((_, i) => ({
                status: MeldekortDagStatus.IkkeRegistrert,
                harRett: false,
                dag: `2025-01-0${6 + i}`,
            })),
            ...Array.from({ length: 10 }).map((_, i) => ({
                status: MeldekortDagStatus.IkkeRegistrert,
                harRett: true,
                dag: `2025-01-1${i}`,
            })),
        ],
    },
    {
        id: 'meldekort_1',
        meldeperiodeId: 'periode_1',
        versjon: 1,
        meldeperiodeKjedeId: 'kjede_1',
        fraOgMed: '2024-12-23',
        tilOgMed: '2025-01-05',
        maksAntallDager: 6,
        dager: [
            ...Array.from({ length: 4 }).map((_, i) => ({
                status: MeldekortDagStatus.IkkeRegistrert,
                harRett: false,
                dag: `2025-01-0${6 + i}`,
            })),
            ...Array.from({ length: 10 }).map((_, i) => ({
                status: MeldekortDagStatus.IkkeRegistrert,
                harRett: true,
                dag: `2025-01-1${i}`,
            })),
        ],
    },
];
